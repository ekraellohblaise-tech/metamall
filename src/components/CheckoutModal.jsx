import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, ArrowLeft, 
  Lock, Phone, MapPin, User, Check, Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const { 
    cart, 
    cartSubtotal, 
    formatPrice, 
    setActiveModal, 
    user, 
    createOrder,
    showToast
  } = useShop();

  const [step, setStep] = useState(1); // 1: Delivery Info, 2: Payment, 3: Confirmation
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user ? user.name : "Alexandre Kouassi",
    phone: user ? user.phone : "+225 07 88 45 12 30",
    city: user ? user.city : "Abidjan",
    address: user ? user.address : "Cocody Angré 8ème Tranche, Villa 42",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("mobile_money"); // 'mobile_money' or 'card'
  const [mobileProvider, setMobileProvider] = useState("orange"); // 'orange', 'mtn', 'wave', 'moov'
  const [mobilePhone, setMobilePhone] = useState(deliveryInfo.phone);

  const [cardData, setCardData] = useState({
    number: "4111 2222 3333 4444",
    name: deliveryInfo.fullName,
    expiry: "09/28",
    cvc: "824"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const shippingCost = cartSubtotal >= 50000 || cartSubtotal === 0 ? 0 : 2500;
  const totalAmount = cartSubtotal + shippingCost;

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address) {
      showToast("Veuillez renseigner tous les champs obligatoires.", "info");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate real API payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      const order = createOrder({
        customer: deliveryInfo,
        paymentMethod: paymentMethod === 'mobile_money' ? `Mobile Money (${mobileProvider.toUpperCase()})` : 'Carte Bancaire',
        paymentDetails: paymentMethod === 'mobile_money' ? { provider: mobileProvider, phone: mobilePhone } : { last4: cardData.number.slice(-4) },
        subtotal: cartSubtotal,
        shipping: shippingCost,
        total: totalAmount,
        status: "Payée & En préparation"
      });

      setCompletedOrder(order);
      setStep(3);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }

      showToast("Paiement validé avec succès ! Votre commande est confirmée.", "success");
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={() => !isProcessing && setActiveModal(null)}>
      <div className="checkout-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="checkout-header">
          <div className="checkout-title-row">
            <Lock size={20} className="lock-icon" />
            <h2>Paiement Sécurisé MetaMall</h2>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={() => setActiveModal(null)}
            disabled={isProcessing}
          >
            <X size={20} />
          </button>
        </div>

        {/* Multi-step indicator */}
        <div className="checkout-steps-bar">
          <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-circle">{step > 1 ? <Check size={14} /> : "1"}</span>
            <span className="step-text">Livraison</span>
          </div>
          <div className="step-divider" />
          <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-circle">{step > 2 ? <Check size={14} /> : "2"}</span>
            <span className="step-text">Paiement Mobile / CB</span>
          </div>
          <div className="step-divider" />
          <div className={`step-node ${step === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-text">Confirmation</span>
          </div>
        </div>

        {/* STEP 1: DELIVERY INFO */}
        {step === 1 && (
          <form className="checkout-step-body" onSubmit={handleDeliverySubmit}>
            <h3 className="section-title">Coordonnées de Livraison</h3>
            
            <div className="form-grid-2">
              <div className="form-field">
                <label>Nom & Prénom(s) *</label>
                <div className="input-with-icon">
                  <User size={16} />
                  <input 
                    type="text" 
                    required 
                    value={deliveryInfo.fullName}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Numéro de Téléphone (WhatsApp / SMS) *</label>
                <div className="input-with-icon">
                  <Phone size={16} />
                  <input 
                    type="tel" 
                    required 
                    placeholder="+225 07 00 00 00 00"
                    value={deliveryInfo.phone}
                    onChange={(e) => {
                      setDeliveryInfo({ ...deliveryInfo, phone: e.target.value });
                      setMobilePhone(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Ville / Commune *</label>
                <div className="input-with-icon">
                  <MapPin size={16} />
                  <input 
                    type="text" 
                    required 
                    placeholder="Abidjan, Yamoussoukro, Bouaké..."
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Adresse précise / Repère de livraison *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Quartier, Rue, Bâtiment ou repère connu"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Instructions particulières pour le livreur (Optionnel)</label>
              <textarea 
                rows={2} 
                placeholder="Ex: Appeler avant d'arriver, livraison après 14h..."
                value={deliveryInfo.notes}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
              />
            </div>

            {/* Mini Summary */}
            <div className="order-summary-box">
              <div className="summary-title">Récapitulatif de votre commande :</div>
              <div className="summary-items-preview">
                {cart.map(item => (
                  <div key={item.cartKey} className="mini-item">
                    <span>{item.quantity}x {item.title} ({item.size})</span>
                    <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
                  </div>
                ))}
              </div>
              <div className="summary-total-line">
                <span>Total net (Livraison {shippingCost === 0 ? "Offerte" : formatPrice(shippingCost)}) :</span>
                <span className="highlight-amount">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="checkout-action-row">
              <button 
                type="button" 
                className="btn-back"
                onClick={() => setActiveModal('cart')}
              >
                <ArrowLeft size={16} /> Retour au Panier
              </button>
              <button type="submit" className="btn-proceed">
                Continuer vers le Paiement ({formatPrice(totalAmount)})
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD (MOBILE MONEY & CARD) */}
        {step === 2 && (
          <form className="checkout-step-body" onSubmit={handlePaymentSubmit}>
            <h3 className="section-title">Choisissez votre mode de paiement</h3>

            {/* Payment Method Selector Tabs */}
            <div className="payment-options-grid">
              {/* Mobile Money Option */}
              <div 
                className={`payment-option-card ${paymentMethod === 'mobile_money' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('mobile_money')}
              >
                <div className="option-header">
                  <div className="radio-circle">
                    {paymentMethod === 'mobile_money' && <div className="radio-dot" />}
                  </div>
                  <Smartphone size={20} className="option-icon" />
                  <div>
                    <strong>Mobile Money</strong>
                    <p>Orange, MTN, Wave, Moov</p>
                  </div>
                </div>
                <span className="popular-badge">Recommandé</span>
              </div>

              {/* Bank Card Option */}
              <div 
                className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="option-header">
                  <div className="radio-circle">
                    {paymentMethod === 'card' && <div className="radio-dot" />}
                  </div>
                  <CreditCard size={20} className="option-icon" />
                  <div>
                    <strong>Carte Bancaire</strong>
                    <p>Visa, Mastercard Sécurisée</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE MONEY DETAILS */}
            {paymentMethod === 'mobile_money' && (
              <div className="mobile-money-details-box">
                <label className="provider-select-label">Sélectionnez votre opérateur Mobile Money :</label>
                <div className="provider-buttons-grid">
                  <button
                    type="button"
                    className={`provider-btn orange ${mobileProvider === 'orange' ? 'active' : ''}`}
                    onClick={() => setMobileProvider('orange')}
                  >
                    <span className="p-badge-dot orange-bg" />
                    <strong>Orange Money</strong>
                  </button>

                  <button
                    type="button"
                    className={`provider-btn mtn ${mobileProvider === 'mtn' ? 'active' : ''}`}
                    onClick={() => setMobileProvider('mtn')}
                  >
                    <span className="p-badge-dot mtn-bg" />
                    <strong>MTN MoMo</strong>
                  </button>

                  <button
                    type="button"
                    className={`provider-btn wave ${mobileProvider === 'wave' ? 'active' : ''}`}
                    onClick={() => setMobileProvider('wave')}
                  >
                    <span className="p-badge-dot wave-bg" />
                    <strong>Wave</strong>
                  </button>

                  <button
                    type="button"
                    className={`provider-btn moov ${mobileProvider === 'moov' ? 'active' : ''}`}
                    onClick={() => setMobileProvider('moov')}
                  >
                    <span className="p-badge-dot moov-bg" />
                    <strong>Moov Money</strong>
                  </button>
                </div>

                <div className="form-field mt-3">
                  <label>Numéro de compte {mobileProvider.toUpperCase()} :</label>
                  <div className="input-with-icon">
                    <Smartphone size={16} />
                    <input 
                      type="tel"
                      required
                      value={mobilePhone}
                      onChange={(e) => setMobilePhone(e.target.value)}
                      placeholder="+225 07 00 00 00 00"
                    />
                  </div>
                </div>

                <div className="mobile-payment-instructions">
                  <p>
                    📌 <strong>Comment ça se passe ?</strong> Après avoir cliqué sur "Payer", vous recevrez une invite de confirmation sur votre téléphone pour valider le montant de <strong>{formatPrice(totalAmount)}</strong> avec votre code secret Mobile Money.
                  </p>
                </div>
              </div>
            )}

            {/* CARD DETAILS */}
            {paymentMethod === 'card' && (
              <div className="card-details-box">
                <div className="form-field">
                  <label>Numéro de Carte Bancaire :</label>
                  <div className="input-with-icon">
                    <CreditCard size={16} />
                    <input 
                      type="text" 
                      required 
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Date d'expiration (MM/AA) :</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      maxLength={5}
                    />
                  </div>
                  <div className="form-field">
                    <label>Cryptogramme (CVC) :</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="123"
                      value={cardData.cvc}
                      onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Nom inscrit sur la carte :</label>
                  <input 
                    type="text" 
                    required 
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Security Guarantee Note */}
            <div className="security-notice">
              <ShieldCheck size={16} />
              <span>Chiffrement SSL 256-bits. Vos informations financières ne sont jamais conservées.</span>
            </div>

            <div className="checkout-action-row">
              <button 
                type="button" 
                className="btn-back"
                onClick={() => setStep(1)}
                disabled={isProcessing}
              >
                <ArrowLeft size={16} /> Modifier les coordonnées
              </button>
              <button 
                type="submit" 
                className="btn-proceed pay-btn"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="spinner-text">Validation en cours...</span>
                ) : (
                  <span>Payer {formatPrice(totalAmount)} en toute sécurité</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMATION RECEIPT */}
        {step === 3 && completedOrder && (
          <div className="checkout-success-view">
            <div className="success-icon-badge">
              <CheckCircle2 size={48} color="#16a34a" />
            </div>

            <h2>Commande Confirmée avec Succès !</h2>
            <p className="success-subtitle">
              Merci pour votre confiance. Votre commande n° <strong>{completedOrder.id}</strong> a bien été enregistrée et transmise à notre entrepôt pour préparation immédiate.
            </p>

            {/* Printable Receipt Card */}
            <div className="receipt-card">
              <div className="receipt-header">
                <div>
                  <div className="receipt-brand">MetaMall Store</div>
                  <span className="receipt-date">{completedOrder.date}</span>
                </div>
                <div className="receipt-order-id">
                  <span>N° Commande</span>
                  <strong>{completedOrder.id}</strong>
                </div>
              </div>

              <div className="receipt-customer-details">
                <div>
                  <strong>Client :</strong> {completedOrder.customer.fullName}
                </div>
                <div>
                  <strong>Téléphone :</strong> {completedOrder.customer.phone}
                </div>
                <div>
                  <strong>Livraison :</strong> {completedOrder.customer.address}, {completedOrder.customer.city}
                </div>
                <div>
                  <strong>Moyen de Paiement :</strong> {completedOrder.paymentMethod}
                </div>
                <div>
                  <strong>Statut :</strong> <span className="status-badge paid">{completedOrder.status}</span>
                </div>
              </div>

              <div className="receipt-items-table">
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="receipt-row">
                    <span>{it.quantity}x {it.title} ({it.size || "Standard"})</span>
                    <strong>{formatPrice(it.unitPrice * it.quantity)}</strong>
                  </div>
                ))}
              </div>

              <div className="receipt-total-line">
                <span>Total Payé :</span>
                <strong>{formatPrice(completedOrder.total)}</strong>
              </div>
            </div>

            <div className="success-actions-row">
              <button 
                type="button" 
                className="btn-print-receipt"
                onClick={() => window.print()}
              >
                <Printer size={16} /> Imprimer le reçu
              </button>
              <button 
                type="button" 
                className="btn-finish-shopping"
                onClick={() => setActiveModal(null)}
              >
                Retourner à la boutique
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
