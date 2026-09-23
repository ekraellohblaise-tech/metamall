import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, ShoppingCart, Heart, User, PlusCircle, X, Globe, 
  Menu, ShieldCheck, Headphones, ChevronDown
} from 'lucide-react';
import { productCategories } from '../data/products';

export const Header = () => {
  const { 
    cartItemCount, 
    cartSubtotal, 
    wishlist, 
    user, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    currency, 
    setCurrency, 
    formatPrice, 
    setActiveModal,
    openInfoModal,
    setCategoryDrawerOpen
  } = useShop();

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled reactively by state
  };

  return (
    <header className="site-header">
      {/* Top Banner Announcement */}
      <div className="announcement-bar">
        <div className="announcement-inner">
          <div className="announcement-text">
            <span className="announcement-tag">PROMO SPÉCIALE</span>
            <span className="announcement-msg">🔥 Vente Flash : jusqu'à <strong>-35%</strong> de réduction !</span>
          </div>
          <div className="announcement-right">
            <button 
              type="button" 
              className="top-link hide-mobile"
              onClick={() => openInfoModal('returns')}
            >
              <ShieldCheck size={14} /> Garantie 30 Jours
            </button>
            <button 
              type="button" 
              className="top-link hide-mobile"
              onClick={() => openInfoModal('contact')}
            >
              <Headphones size={14} /> Assistance 7j/7
            </button>
            
            {/* Currency Switcher */}
            <div className="currency-selector-wrapper">
              <button 
                type="button" 
                className="currency-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              >
                <Globe size={14} />
                <span>{currency}</span>
                <ChevronDown size={12} />
              </button>
              {currencyDropdownOpen && (
                <div className="currency-dropdown">
                  <button 
                    type="button"
                    className={`curr-opt ${currency === 'FCFA' ? 'active' : ''}`}
                    onClick={() => { setCurrency('FCFA'); setCurrencyDropdownOpen(false); }}
                  >
                    FCFA (XOF / XAF)
                  </button>
                  <button 
                    type="button"
                    className={`curr-opt ${currency === 'EUR' ? 'active' : ''}`}
                    onClick={() => { setCurrency('EUR'); setCurrencyDropdownOpen(false); }}
                  >
                    EUR (€)
                  </button>
                  <button 
                    type="button"
                    className={`curr-opt ${currency === 'USD' ? 'active' : ''}`}
                    onClick={() => { setCurrency('USD'); setCurrencyDropdownOpen(false); }}
                  >
                    USD ($)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-header">
        <div className="header-container">
          {/* Professional Hamburger Menu Button (Desktop & Mobile) */}
          <button 
            type="button" 
            className="hamburger-menu-btn"
            onClick={() => setCategoryDrawerOpen(true)}
            aria-label="Ouvrir toutes les catégories"
            title="Toutes les catégories"
          >
            <Menu size={22} className="hamburger-icon" />
            <span className="hamburger-label hide-mobile">Rayons</span>
          </button>

          {/* Logo */}
          <div className="logo-section">
            <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); setSelectedCategory("Tous les articles"); setSearchQuery(""); }}>
              <span className="logo-meta">Meta</span>
              <span className="logo-mall">Mall</span>
              <span className="logo-badge">PRO</span>
            </a>
          </div>

          {/* Search Bar with Category Dropdown */}
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-category-select">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {productCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "Tous les articles" ? "Toutes catégories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-input-wrapper">
              <input 
                type="text"
                placeholder="Rechercher des bottes, ordinateurs, électroménager..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button type="submit" className="search-submit-btn" aria-label="Lancer la recherche">
              <Search size={18} />
            </button>
          </form>

          {/* Action Buttons */}
          <div className="header-actions">
            {/* Quick Add / Manage Product Button */}
            <button 
              type="button" 
              className="action-btn seller-action-btn"
              onClick={() => setActiveModal('addEditProduct')}
              title="Ajouter ou modifier un article / prix"
            >
              <PlusCircle size={18} />
              <span className="btn-label hide-mobile">Gérer Produits</span>
            </button>

            {/* User Profile / Auth */}
            <button 
              type="button" 
              className="action-btn user-btn"
              onClick={() => setActiveModal(user ? 'profile' : 'auth')}
            >
              {user ? (
                <div className="user-avatar-badge">
                  <img src={user.avatar} alt={user.name} />
                  <span className="user-name-label hide-mobile">{user.name.split(' ')[0]}</span>
                </div>
              ) : (
                <>
                  <User size={20} />
                  <span className="btn-label hide-mobile">Connexion</span>
                </>
              )}
            </button>

            {/* Wishlist */}
            <button 
              type="button" 
              className="action-btn wishlist-btn hide-mobile"
              onClick={() => setActiveModal(user ? 'profile' : 'auth')}
              title="Mes Favoris"
            >
              <div className="icon-with-badge">
                <Heart size={20} />
                {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
              </div>
              <span className="btn-label hide-mobile">Favoris</span>
            </button>

            {/* Shopping Cart Button */}
            <button 
              type="button" 
              className="cart-action-btn"
              onClick={() => setActiveModal('cart')}
              aria-label="Panier d'achat"
            >
              <div className="icon-with-badge">
                <ShoppingCart size={22} />
                {cartItemCount > 0 && <span className="cart-badge-count">{cartItemCount}</span>}
              </div>
              <div className="cart-info-text hide-mobile">
                <span className="cart-sublabel">Mon Panier</span>
                <span className="cart-amount">{formatPrice(cartSubtotal)}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Row (visible on small screens) */}
        <div className="mobile-search-row">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <Search size={16} className="m-search-ico" />
            <input 
              type="text" 
              placeholder="Rechercher bottes, ordinateurs, électroménager..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="m-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Effacer"
              >
                <X size={15} />
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};
