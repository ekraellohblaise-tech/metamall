import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, Mail, MapPin, Package, LogOut, Heart, Clock, CheckCircle2
} from 'lucide-react';

export const ProfileModal = () => {
  const { user, logout, setActiveModal, orders, formatPrice, wishlist, products, openProductDetail } = useShop();

  if (!user) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="profile-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={() => setActiveModal(null)}
        >
          <X size={20} />
        </button>

        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-avatar-wrap">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="profile-info-wrap">
            <h3>{user.name}</h3>
            <span className="profile-email-badge">
              <Mail size={13} /> {user.email}
            </span>
            <span className="profile-provider-tag">Compte vérifié via {user.provider}</span>
          </div>
          <button 
            type="button" 
            className="btn-logout-small"
            onClick={logout}
            title="Se déconnecter"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Profile Content Body */}
        <div className="profile-tabs-content">
          {/* Section: Coordonnées de livraison */}
          <div className="profile-section-card">
            <h4>
              <MapPin size={16} /> Coordonnées par défaut
            </h4>
            <div className="profile-details-grid">
              <div>
                <label>Téléphone :</label>
                <p>{user.phone}</p>
              </div>
              <div>
                <label>Ville & Pays :</label>
                <p>{user.city}, {user.country}</p>
              </div>
              <div className="full-col">
                <label>Adresse de livraison enregistrée :</label>
                <p>{user.address}</p>
              </div>
            </div>
          </div>

          {/* Section: Commandes récentes */}
          <div className="profile-section-card">
            <h4>
              <Package size={16} /> Historique des commandes ({orders.length})
            </h4>

            {orders.length === 0 ? (
              <div className="empty-orders-notice">
                <Clock size={24} />
                <p>Aucune commande passée pour le moment.</p>
              </div>
            ) : (
              <div className="orders-timeline">
                {orders.map((ord) => (
                  <div key={ord.id} className="order-history-card">
                    <div className="ord-top-row">
                      <div>
                        <strong>N° {ord.id}</strong>
                        <span className="ord-date">{ord.date}</span>
                      </div>
                      <span className="status-badge paid">
                        <CheckCircle2 size={13} /> {ord.status}
                      </span>
                    </div>

                    <div className="ord-items-list">
                      {ord.items?.map((it, i) => (
                        <div key={i} className="ord-item-line">
                          <span>{it.quantity}x {it.title} ({it.size || "Standard"})</span>
                          <span>{formatPrice(it.unitPrice * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="ord-footer-row">
                      <span>Règlement : <em>{ord.paymentMethod}</em></span>
                      <strong>Total : {formatPrice(ord.total)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Articles favoris */}
          {wishlistProducts.length > 0 && (
            <div className="profile-section-card">
              <h4>
                <Heart size={16} color="#ef4444" /> Vos articles favoris ({wishlistProducts.length})
              </h4>
              <div className="wishlist-horizontal-scroll">
                {wishlistProducts.map(p => (
                  <div 
                    key={p.id} 
                    className="mini-wishlist-card"
                    onClick={() => {
                      setActiveModal(null);
                      openProductDetail(p);
                    }}
                  >
                    <img src={p.images?.[0]} alt={p.title} />
                    <div className="mini-wishlist-info">
                      <h5>{p.title}</h5>
                      <span className="mini-price">{formatPrice(p.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
