import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Tag, ShieldCheck, Check
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartSavings, 
    cartItemCount, 
    formatPrice, 
    setActiveModal,
    showToast
  } = useShop();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "METAMALL" || code === "PROMO10" || code === "ETSY10") {
      const discountVal = Math.round(cartSubtotal * 0.10);
      setPromoDiscountAmount(discountVal);
      setPromoApplied(true);
      showToast("Code promo -10% appliqué avec succès !", "success");
    } else {
      showToast("Code promo invalide. Essayez 'METAMALL' ou 'PROMO10'", "info");
    }
  };

  // Shipping calculation: Free over 50,000 FCFA, otherwise 2,500 FCFA
  const shippingCost = cartSubtotal >= 50000 || cartSubtotal === 0 ? 0 : 2500;
  const finalTotal = Math.max(0, cartSubtotal - promoDiscountAmount + shippingCost);

  return (
    <div className="drawer-overlay" onClick={() => setActiveModal(null)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={22} className="drawer-icon" />
            <h2>Votre Panier ({cartItemCount})</h2>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={() => setActiveModal(null)}
            aria-label="Fermer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="shipping-progress-banner">
          {cartSubtotal >= 50000 ? (
            <div className="free-shipping-success">
              <Check size={16} />
              <span>Félicitations ! Vous bénéficiez de la <strong>Livraison Gratuite</strong> !</span>
            </div>
          ) : (
            <div className="shipping-hint">
              <span>Ajoutez encore <strong>{formatPrice(50000 - cartSubtotal)}</strong> pour la livraison gratuite !</span>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${Math.min(100, (cartSubtotal / 50000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Items List */}
        <div className="drawer-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon-circle">
                <ShoppingBag size={48} />
              </div>
              <h3>Votre panier est vide</h3>
              <p>Découvrez notre sélection de bottes de sécurité, ordinateurs et équipements !</p>
              <button 
                type="button" 
                className="btn-discover-products"
                onClick={() => setActiveModal(null)}
              >
                Commencer mes achats
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartKey} className="cart-item-row">
                <div className="cart-item-img-container">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.title}</h4>
                  
                  <div className="cart-item-variants">
                    {item.size && <span className="variant-pill">Pointure: {item.size}</span>}
                    {item.color && <span className="variant-pill">Couleur: {item.color}</span>}
                    {item.model && item.model !== "Standard" && (
                      <span className="variant-pill">{item.model}</span>
                    )}
                  </div>

                  <div className="cart-item-price-row">
                    <span className="cart-item-unit-price">
                      {formatPrice(item.unitPrice)}
                    </span>
                    {item.unitOriginalPrice > item.unitPrice && (
                      <span className="cart-item-old-price">
                        {formatPrice(item.unitOriginalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-pill">
                      <button 
                        type="button"
                        onClick={() => updateCartQuantity(item.cartKey, item.quantity - 1)}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => updateCartQuantity(item.cartKey, item.quantity + 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button 
                      type="button" 
                      className="cart-remove-item-btn"
                      onClick={() => removeFromCart(item.cartKey)}
                      title="Supprimer l'article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Form */}
            <form className="promo-code-box" onSubmit={handleApplyPromo}>
              <div className="promo-input-group">
                <Tag size={16} className="tag-icon" />
                <input 
                  type="text" 
                  placeholder="Code promo (ex: METAMALL)" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <button type="submit" disabled={promoApplied}>
                  {promoApplied ? "Appliqué" : "Appliquer"}
                </button>
              </div>
            </form>

            {/* Calculations Breakdown */}
            <div className="cart-breakdown">
              <div className="breakdown-row">
                <span>Sous-total</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {cartSavings > 0 && (
                <div className="breakdown-row savings-row">
                  <span>Remises articles</span>
                  <span className="saving-text">-{formatPrice(cartSavings)}</span>
                </div>
              )}
              {promoApplied && (
                <div className="breakdown-row promo-row">
                  <span>Code Promo -10%</span>
                  <span className="saving-text">-{formatPrice(promoDiscountAmount)}</span>
                </div>
              )}
              <div className="breakdown-row">
                <span>Frais de livraison</span>
                <span>{shippingCost === 0 ? "Offerts (0 FCFA)" : formatPrice(shippingCost)}</span>
              </div>
              <div className="breakdown-row total-row">
                <span>Total à régler</span>
                <span className="total-amount-highlight">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              type="button" 
              className="btn-checkout-start"
              onClick={() => setActiveModal('checkout')}
            >
              <span>Passer la commande</span>
              <ArrowRight size={18} />
            </button>

            <div className="drawer-trust-note">
              <ShieldCheck size={15} />
              <span>Paiement 100% sécurisé par Mobile Money & Carte bancaire</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
