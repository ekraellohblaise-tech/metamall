import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, HelpCircle, ShieldCheck, FileText, Headphones, ChevronDown, 
  Send, Phone, Mail, MapPin
} from 'lucide-react';
import { faqItems } from '../data/faqData';

export const InfoModals = () => {
  const { activeModal, setActiveModal, infoModalType, setInfoModalType, showToast } = useShop();

  const [openFaqIndices, setOpenFaqIndices] = useState([0]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: 'Demande d\'information', message: '' });

  if (activeModal !== 'info') return null;

  const toggleFaq = (idx) => {
    setOpenFaqIndices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast("Votre message a bien été envoyé ! Notre équipe vous répondra sous 24h.", "success");
    setContactForm({ name: '', email: '', phone: '', subject: 'Demande d\'information', message: '' });
    setActiveModal(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="info-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={() => setActiveModal(null)}
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Tab switcher */}
        <div className="info-tabs-bar">
          <button 
            type="button" 
            className={`info-tab-btn ${infoModalType === 'returns' ? 'active' : ''}`}
            onClick={() => setInfoModalType('returns')}
          >
            <ShieldCheck size={16} />
            <span>Politique de Retours (30j)</span>
          </button>

          <button 
            type="button" 
            className={`info-tab-btn ${infoModalType === 'faq' ? 'active' : ''}`}
            onClick={() => setInfoModalType('faq')}
          >
            <HelpCircle size={16} />
            <span>Questions Fréquentes (FAQ)</span>
          </button>

          <button 
            type="button" 
            className={`info-tab-btn ${infoModalType === 'contact' ? 'active' : ''}`}
            onClick={() => setInfoModalType('contact')}
          >
            <Headphones size={16} />
            <span>Nous Contacter</span>
          </button>

          <button 
            type="button" 
            className={`info-tab-btn ${infoModalType === 'privacy' ? 'active' : ''}`}
            onClick={() => setInfoModalType('privacy')}
          >
            <FileText size={16} />
            <span>Confidentialité & CGV</span>
          </button>
        </div>

        {/* CONTENT 1: RETURNS POLICY */}
        {infoModalType === 'returns' && (
          <div className="info-tab-content">
            <div className="info-hero-box orange-theme">
              <ShieldCheck size={36} />
              <div>
                <h3>Garantie Satisfait ou Remboursé 30 Jours</h3>
                <p>Achetez en toute sérénité. Si un article ne vous convient pas, nous l'échangeons ou le remboursons sans frais.</p>
              </div>
            </div>

            <div className="policy-steps-grid">
              <div className="policy-step-card">
                <span className="step-badge">Étape 1</span>
                <h4>Contactez le Support</h4>
                <p>Envoyez un simple message WhatsApp ou email avec votre numéro de commande pour nous signaler votre souhait de retour ou d'échange de taille.</p>
              </div>

              <div className="policy-step-card">
                <span className="step-badge">Étape 2</span>
                <h4>Remise de l'article</h4>
                <p>L'article (ex: paire de bottes de sécurité) doit être retourné dans son emballage d'origine avec ses étiquettes, sans avoir été porté sur chantier.</p>
              </div>

              <div className="policy-step-card">
                <span className="step-badge">Étape 3</span>
                <h4>Échange ou Remboursement</h4>
                <p>Dès réception, nous vous expédions gratuitement la nouvelle pointure souhaitée ou procédons au remboursement intégral sous 48h via votre mode de paiement initial (Mobile Money ou Carte).</p>
              </div>
            </div>

            <div className="policy-faq-note">
              <strong>Question fréquente :</strong> L'échange de pointure pour les chaussures de sécurité est-il gratuit ?
              <p>Oui ! Le premier échange de pointure est pris en charge à 100% par MetaMall pour vous garantir un ajustement idéal.</p>
            </div>
          </div>
        )}

        {/* CONTENT 2: FAQ */}
        {infoModalType === 'faq' && (
          <div className="info-tab-content">
            <div className="info-hero-box">
              <HelpCircle size={36} />
              <div>
                <h3>Foire Aux Questions (FAQ)</h3>
                <p>Trouvez rapidement des réponses claires à vos interrogations.</p>
              </div>
            </div>

            <div className="faq-accordion-list">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndices.includes(idx);
                return (
                  <div key={idx} className={`faq-accordion-card ${isOpen ? 'open' : ''}`}>
                    <button 
                      type="button" 
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                    >
                      <div className="faq-q-left">
                        <span className="faq-cat-tag">{item.category}</span>
                        <span className="faq-q-title">{item.question}</span>
                      </div>
                      <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="faq-answer-body">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTENT 3: CONTACT US */}
        {infoModalType === 'contact' && (
          <div className="info-tab-content">
            <div className="contact-grid">
              <div className="contact-info-col">
                <h3>Une question ou besoin d'un devis pro ?</h3>
                <p>Nos conseillers sont disponibles 7 jours sur 7 pour vous orienter dans vos choix d'équipements de sécurité, informatique ou électroménager.</p>

                <div className="contact-channels-list">
                  <div className="channel-item">
                    <div className="channel-icon-circle whatsapp">
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong>WhatsApp & Téléphone Support :</strong>
                      <p>+225 07 00 12 34 56 (Assistance directe 8h - 20h)</p>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-circle email">
                      <Mail size={18} />
                    </div>
                    <div>
                      <strong>Email Service Client :</strong>
                      <p>contact@metamall.shop</p>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-circle location">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong>Bureau & Hub Logistique :</strong>
                      <p>Boulevard Valéry Giscard d'Estaing, Abidjan, Côte d'Ivoire</p>
                    </div>
                  </div>
                </div>

                <div className="contact-pro-box">
                  <strong>Commandes de gros & BTP :</strong>
                  <p>Vous souhaitez équiper vos ouvriers en volume ? Profitez de remises dégressives à partir de 10 paires.</p>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <form className="contact-form-col" onSubmit={handleContactSubmit}>
                <h4>Envoyez-nous un message</h4>

                <div className="form-field">
                  <label>Votre Nom *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: David Ouattara"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Votre E-mail *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="nom@exemple.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label>Votre Téléphone</label>
                    <input 
                      type="tel" 
                      placeholder="+225 07..."
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Sujet du message :</label>
                  <select 
                    value={contactForm.subject} 
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  >
                    <option value="Demande d'information">Demande d'information</option>
                    <option value="Suivi de commande">Suivi de commande</option>
                    <option value="Échange de taille / Retour">Échange de taille / Retour</option>
                    <option value="Devis entreprise / BTP">Devis entreprise / BTP</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Votre Message *</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Détaillez votre demande ici..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-send-contact">
                  <Send size={16} />
                  <span>Envoyer mon message</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* CONTENT 4: PRIVACY & TERMS */}
        {infoModalType === 'privacy' && (
          <div className="info-tab-content">
            <div className="terms-container">
              <h3>Politique de Confidentialité & Conditions Générales de Vente (CGV)</h3>
              <p className="terms-update-date">Dernière mise à jour : Septembre 2026</p>

              <h4>1. Protection des données personnelles</h4>
              <p>MetaMall s'engage à protéger la confidentialité de vos données personnelles. Les données collectées (nom, adresse de livraison, numéro de téléphone) sont exclusivement utilisées pour le traitement et l'acheminement de vos commandes ainsi que pour le suivi du service après-vente.</p>

              <h4>2. Sécurité des transactions et paiements</h4>
              <p>Toutes les transactions bancaires et Mobile Money (Orange Money, MTN, Wave, Moov) sont sécurisées par un protocole de chiffrement SSL 256 bits via des passerelles agréées. MetaMall ne conserve aucun code secret ni information sensible de paiement.</p>

              <h4>3. Conformité et authenticité des produits</h4>
              <p>Tous les articles vendus sur MetaMall, notamment les chaussures de sécurité renforcées avec coque acier et semelle anti-perforation, sont certifiés conformes aux normes industrielles et garantis neufs dans leur emballage constructeur.</p>

              <h4>4. Droit de rétractation et retours</h4>
              <p>Conformément à nos engagements de satisfaction, tout acheteur dispose d'un délai de 30 jours à compter de la réception de sa commande pour exercer son droit de rétractation ou demander un échange de modèle ou de pointure.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
