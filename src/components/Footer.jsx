import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, Headphones, RefreshCw, Send, Store, ArrowRight, Sparkles } from 'lucide-react';
import { productCategories } from '../data/products';

export const Footer = () => {
  const { setSelectedCategory, openInfoModal, showToast, setActiveModal, vendorUser } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast("Merci ! Vous êtes inscrit aux ventes privées MetaMall.", "success");
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="site-footer">
      {/* Reassurance Bar */}
      <div className="footer-reassurance-bar">
        <div className="footer-container reassurance-grid">
          <div className="reassurance-col">
            <Truck className="r-icon" />
            <div>
              <strong>Livraison Express Sécurisée</strong>
              <p>Partout en Côte d'Ivoire & sous-région</p>
            </div>
          </div>
          <div className="reassurance-col">
            <ShieldCheck className="r-icon" />
            <div>
              <strong>Garantie Satisfait ou Remboursé</strong>
              <p>30 jours pour tester et échanger sans frais</p>
            </div>
          </div>
          <div className="reassurance-col">
            <RefreshCw className="r-icon" />
            <div>
              <strong>Paiement Mobile Money & CB</strong>
              <p>Orange, MTN, Wave, Moov & Cartes Visa/MC</p>
            </div>
          </div>
          <div className="reassurance-col">
            <Headphones className="r-icon" />
            <div>
              <strong>Service Client Réactif 7j/7</strong>
              <p>Support WhatsApp & appel direct</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Callout Banner: "Devenir Vendeur sur MetaMall" */}
      <div className="footer-vendor-banner">
        <div className="footer-container vendor-banner-inner">
          <div className="v-banner-left">
            <div className="v-banner-icon-circle">
              <Store size={26} />
            </div>
            <div className="v-banner-text">
              <h3>Vous êtes commerçant, artisan ou distributeur ?</h3>
              <p>Ouvrez votre boutique sur MetaMall, touchez des milliers d'acheteurs et gérez vos ventes en toute simplicité.</p>
            </div>
          </div>
          <div className="v-banner-right">
            <button 
              type="button" 
              className="btn-footer-vendor"
              onClick={() => setActiveModal('vendorPortal')}
            >
              <Sparkles size={16} />
              <span>{vendorUser ? "Mon Espace Vendeur" : "Devenir Vendeur sur MetaMall"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main-links">
        <div className="footer-container footer-cols-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <div className="brand-logo footer-logo">
              <span className="logo-meta">Meta</span>
              <span className="logo-mall">Mall</span>
              <span className="logo-badge">PRO</span>
            </div>
            <p className="brand-desc">
              Votre place de marché moderne pour les équipements professionnels, vêtements de travail, informatique, électroménager et jardinage. Des articles authentiques aux meilleurs tarifs avec réductions garanties.
            </p>
            <div className="payment-providers-badges">
              <span className="prov-badge orange-badge">Orange Money</span>
              <span className="prov-badge mtn-badge">MTN MoMo</span>
              <span className="prov-badge wave-badge">Wave</span>
              <span className="prov-badge moov-badge">Moov Money</span>
              <span className="prov-badge card-badge">Visa / MC</span>
            </div>
          </div>

          {/* Col 2: Rayons */}
          <div className="footer-col">
            <h4 className="footer-col-title">Rayons Populaires</h4>
            <ul className="footer-links-list">
              {productCategories.slice(1).map(cat => (
                <li key={cat}>
                  <button 
                    type="button" 
                    className="footer-link-btn"
                    onClick={() => {
                      setSelectedCategory(cat);
                      window.scrollTo({ top: 500, behavior: 'smooth' });
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Client & Politiques */}
          <div className="footer-col">
            <h4 className="footer-col-title">Aide & Garanties</h4>
            <ul className="footer-links-list">
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn"
                  onClick={() => openInfoModal('returns')}
                >
                  Politique de retour (30 jours)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn"
                  onClick={() => openInfoModal('faq')}
                >
                  Foire Aux Questions (FAQ)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn"
                  onClick={() => openInfoModal('contact')}
                >
                  Nous contacter & WhatsApp
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn"
                  onClick={() => openInfoModal('privacy')}
                >
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn"
                  onClick={() => openInfoModal('privacy')}
                >
                  Conditions Générales de Vente (CGV)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn highlight-vendor-link"
                  onClick={() => setActiveModal('vendorPortal')}
                >
                  💼 {vendorUser ? "Tableau de Bord Vendeur" : "Devenir Vendeur MetaMall"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col">
            <h4 className="footer-col-title">Ventes Privées & Promos</h4>
            <p className="newsletter-text">
              Inscrivez-vous pour recevoir nos réductions exclusives jusqu'à -50% chaque semaine.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Votre adresse email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" aria-label="S'inscrire">
                <Send size={16} />
              </button>
            </form>
            <span className="newsletter-promise">🔒 Nous ne spammons jamais. Désinscription en 1 clic.</span>
          </div>
        </div>
      </div>

      {/* Bottom Subfooter */}
      <div className="sub-footer">
        <div className="footer-container sub-footer-inner">
          <p>© 2026 MetaMall Store — Tous droits réservés. Inspiré du design Etsy.</p>
          <div className="sub-footer-credits">
            <span>Développé avec passion pour une expérience e-commerce optimale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
