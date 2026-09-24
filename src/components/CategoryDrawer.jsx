import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, ChevronDown, ChevronRight, Search, 
  Coffee, Laptop, Smartphone, Shirt, Footprints, 
  Sparkles, Cpu, Home, Trophy, Watch, Grid, 
  ShieldCheck, Headphones, ArrowRight
} from 'lucide-react';

export const CategoryDrawer = () => {
  const { 
    categories, 
    categoryDrawerOpen, 
    setCategoryDrawerOpen, 
    selectedCategory, 
    selectCategoryFromDrawer,
    openInfoModal
  } = useShop();

  const [expandedCatIds, setExpandedCatIds] = useState(['cat-chaussures']); // default expand Chaussures
  const [drawerSearch, setDrawerSearch] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && categoryDrawerOpen) {
        setCategoryDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [categoryDrawerOpen, setCategoryDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (categoryDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [categoryDrawerOpen]);

  if (!categoryDrawerOpen) return null;

  const toggleExpand = (catId, e) => {
    e.stopPropagation();
    setExpandedCatIds(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  // Map category icon names to Lucide icons
  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Coffee': return <Coffee size={18} />;
      case 'Laptop': return <Laptop size={18} />;
      case 'Smartphone': return <Smartphone size={18} />;
      case 'Shirt': return <Shirt size={18} />;
      case 'Footprints': return <Footprints size={18} />;
      case 'Sparkles': return <Sparkles size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'Home': return <Home size={18} />;
      case 'Trophy': return <Trophy size={18} />;
      case 'Watch': return <Watch size={18} />;
      case 'Grid': return <Grid size={18} />;
      default: return <Grid size={18} />;
    }
  };

  // Filter categories and subcategories by search query
  const filteredCategories = categories.filter(cat => {
    if (!drawerSearch.trim()) return true;
    const q = drawerSearch.toLowerCase().trim();
    const matchCat = cat.name.toLowerCase().includes(q) || (cat.description && cat.description.toLowerCase().includes(q));
    const matchSub = cat.subcategories?.some(sub => sub.name.toLowerCase().includes(q));
    return matchCat || matchSub;
  });

  return (
    <div 
      className="category-drawer-overlay" 
      onClick={() => setCategoryDrawerOpen(false)}
      aria-modal="true"
      role="dialog"
    >
      <aside 
        className="category-drawer-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="cat-drawer-header">
          <div className="cat-drawer-brand">
            <span className="drawer-hamburger-icon">☰</span>
            <div>
              <h3>Rayons & Catégories</h3>
              <p className="cat-drawer-subtitle">Explorez tous nos départements</p>
            </div>
          </div>
          <button 
            type="button" 
            className="cat-drawer-close-btn"
            onClick={() => setCategoryDrawerOpen(false)}
            aria-label="Fermer le menu des catégories"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search inside categories */}
        <div className="cat-drawer-search-box">
          <div className="cat-drawer-input-wrap">
            <Search size={16} className="search-ico" />
            <input 
              type="text" 
              placeholder="Chercher un rayon, sous-catégorie..."
              value={drawerSearch}
              onChange={(e) => setDrawerSearch(e.target.value)}
            />
            {drawerSearch && (
              <button 
                type="button" 
                className="clear-search"
                onClick={() => setDrawerSearch("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* "Tous les articles" quick link */}
        <div className="drawer-all-link-wrapper">
          <button 
            type="button"
            className={`drawer-all-btn ${selectedCategory === "Tous les articles" ? 'active' : ''}`}
            onClick={() => selectCategoryFromDrawer("Tous les articles")}
          >
            <span className="cat-icon-badge all-icon">
              <Sparkles size={18} />
            </span>
            <span className="drawer-all-label">Tous les articles & nouveautés</span>
            <ArrowRight size={16} className="drawer-arrow" />
          </button>
        </div>

        {/* Categories List with expandable subcategories */}
        <div className="cat-drawer-scroll-area">
          <div className="cat-drawer-list">
            {filteredCategories.map(cat => {
              const isExpanded = expandedCatIds.includes(cat.id);
              const isSelected = selectedCategory === cat.name;

              return (
                <div key={cat.id} className={`cat-accordion-item ${isExpanded ? 'is-expanded' : ''} ${isSelected ? 'is-active-cat' : ''}`}>
                  {/* Category Row */}
                  <div 
                    className="cat-accordion-header"
                    onClick={() => selectCategoryFromDrawer(cat.name)}
                  >
                    <div className="cat-header-left">
                      <span className="cat-icon-badge">
                        {renderCategoryIcon(cat.iconName)}
                      </span>
                      <div className="cat-text-group">
                        <span className="cat-title-text">{cat.name}</span>
                        {cat.description && (
                          <span className="cat-desc-hint">{cat.description}</span>
                        )}
                      </div>
                    </div>

                    <div className="cat-header-right">
                      {cat.badge && (
                        <span className={`cat-drawer-badge ${cat.badgeColor || 'orange'}`}>
                          {cat.badge}
                        </span>
                      )}
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <button 
                          type="button" 
                          className="cat-expand-toggle-btn"
                          onClick={(e) => toggleExpand(cat.id, e)}
                          title={isExpanded ? "Replier" : "Développer"}
                          aria-label={`Développer ${cat.name}`}
                        >
                          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Subcategories Dropdown */}
                  {cat.subcategories && cat.subcategories.length > 0 && isExpanded && (
                    <div className="cat-subcategories-list">
                      <button 
                        type="button" 
                        className="cat-sub-item see-all-sub"
                        onClick={() => selectCategoryFromDrawer(cat.name)}
                      >
                        <span>Tout afficher dans {cat.name}</span>
                        <ArrowRight size={14} />
                      </button>

                      {cat.subcategories.map(sub => (
                        <button 
                          key={sub.id} 
                          type="button" 
                          className="cat-sub-item"
                          onClick={() => selectCategoryFromDrawer(cat.name, sub.name)}
                        >
                          <span className="sub-name">
                            {sub.name}
                            {sub.hot && <span className="sub-hot-tag">Promo</span>}
                          </span>
                          {sub.count > 0 && (
                            <span className="sub-count-pill">{sub.count}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="cat-drawer-footer">
          <button 
            type="button" 
            className="drawer-footer-link"
            onClick={() => {
              setCategoryDrawerOpen(false);
              openInfoModal('returns');
            }}
          >
            <ShieldCheck size={16} />
            <span>Garantie Retours (30 jours)</span>
          </button>

          <button 
            type="button" 
            className="drawer-footer-link"
            onClick={() => {
              setCategoryDrawerOpen(false);
              openInfoModal('contact');
            }}
          >
            <Headphones size={16} />
            <span>Support WhatsApp 7j/7</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
