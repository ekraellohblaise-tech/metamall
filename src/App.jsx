import React, { useMemo } from 'react';
import { ShopProvider } from './context/ShopProvider';
import { useShop } from './context/ShopContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { AddEditProductModal } from './components/AddEditProductModal';
import { ShopReviewsSection } from './components/ShopReviewsSection';
import { InfoModals } from './components/InfoModals';
import { Footer } from './components/Footer';
import { CategoryDrawer } from './components/CategoryDrawer';
import { VendorPortal } from './components/VendorPortal';
import { 
  ArrowUpDown, PlusCircle, CheckCircle2, 
  Info, AlertTriangle, Footprints, Coffee, Laptop, Sprout, Watch
} from 'lucide-react';

const MainContent = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    sortBy, 
    setSortBy,
    activeModal, 
    setActiveModal,
    toast 
  } = useShop();

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "Tous les articles") {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount-desc') {
      list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sortBy === 'rating-desc') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // 'featured' -> star products first, then bestsellers
      list.sort((a, b) => {
        if (a.isStarProduct && !b.isStarProduct) return -1;
        if (!a.isStarProduct && b.isStarProduct) return 1;
        return 0;
      });
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} />}
          {toast.type === 'info' && <Info size={18} />}
          {toast.type === 'error' && <AlertTriangle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Header & Nav */}
      <Header />
      <CategoryNav />

      {/* Hero Banner (visible when no specific search is active) */}
      {!searchQuery && selectedCategory === "Tous les articles" && (
        <HeroBanner />
      )}

      {/* Featured Categories Grid (Etsy-style circular / card previews) */}
      {!searchQuery && selectedCategory === "Tous les articles" && (
        <section className="featured-categories-section">
          <div className="main-content-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-title-clean">Explorer par Univers</h2>
                <p className="section-subtitle-clean">Trouvez rapidement les meilleurs articles pour votre quotidien et votre activité</p>
              </div>
            </div>

            <div className="category-cards-grid">
              {[
                { name: "Vêtements & Chaussures", tag: "Bottes & Chantiers", count: "8 articles", bg: "#fef3c7", icon: <Footprints size={24} /> },
                { name: "Informatique & Accessoires", tag: "PC & Périphériques", count: "12 articles", bg: "#e0e7ff", icon: <Laptop size={24} /> },
                { name: "Électroménager", tag: "Cuisine & Maison", count: "10 articles", bg: "#ffedd5", icon: <Coffee size={24} /> },
                { name: "Produits Phytosanitaires & Jardin", tag: "Agri & Jardinage", count: "6 articles", bg: "#dcfce7", icon: <Sprout size={24} /> },
                { name: "Gadgets & Électronique", tag: "Montres & Audio", count: "15 articles", bg: "#f3e8ff", icon: <Watch size={24} /> }
              ].map(cat => (
                <div 
                  key={cat.name} 
                  className="cat-feature-card"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <div className="cat-feature-icon-circle" style={{ backgroundColor: cat.bg }}>
                    {cat.icon}
                  </div>
                  <h4>{cat.name}</h4>
                  <span className="cat-tag-pill">{cat.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalog & Products Grid */}
      <main className="catalog-section" id="catalog">
        <div className="main-content-container">
          {/* Controls Bar: Category Title, Counts, Sort Dropdown & Quick Add Product */}
          <div className="catalog-toolbar">
            <div className="toolbar-left">
              <h2 className="catalog-heading">
                {selectedCategory}
                {searchQuery && <span className="search-term-badge">pour "{searchQuery}"</span>}
              </h2>
              <span className="results-count-text">
                {filteredProducts.length} article{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="toolbar-right">
              {/* Quick Seller Add/Edit button */}
              <button 
                type="button" 
                className="btn-toolbar-manage"
                onClick={() => setActiveModal('vendorPortal')}
              >
                <PlusCircle size={15} />
                <span>Espace Vendeur & Produits</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="sort-by-wrapper">
                <ArrowUpDown size={15} className="sort-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Tri : Recommandations</option>
                  <option value="discount-desc">Tri : Meilleures réductions (%)</option>
                  <option value="price-asc">Tri : Prix le plus bas</option>
                  <option value="price-desc">Tri : Prix le plus élevé</option>
                  <option value="rating-desc">Tri : Meilleurs avis clients</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter badges */}
          {(selectedCategory !== "Tous les articles" || searchQuery) && (
            <div className="active-filters-strip">
              <span className="filter-label">Filtres actifs :</span>
              {selectedCategory !== "Tous les articles" && (
                <span className="filter-tag">
                  {selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory("Tous les articles")}>×</button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-tag">
                  Recherche : "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery("")}>×</button>
                </span>
              )}
              <button 
                type="button" 
                className="clear-all-filters-btn"
                onClick={() => { setSelectedCategory("Tous les articles"); setSearchQuery(""); }}
              >
                Réinitialiser
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <h3>Aucun article ne correspond à votre recherche</h3>
              <p>Essayez de modifier vos critères de recherche ou explorez une autre catégorie.</p>
              <button 
                type="button" 
                className="btn-reset-search"
                onClick={() => { setSelectedCategory("Tous les articles"); setSearchQuery(""); }}
              >
                Voir tous les articles
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Global Shop Reviews & Social Proof */}
      <ShopReviewsSection />

      {/* Site Footer */}
      <Footer />

      {/* Interactive Modals & Navigation Drawer */}
      <CategoryDrawer />
      {activeModal === 'productDetail' && <ProductDetailModal />}
      {activeModal === 'cart' && <CartDrawer />}
      {activeModal === 'checkout' && <CheckoutModal />}
      {activeModal === 'auth' && <AuthModal />}
      {activeModal === 'profile' && <ProfileModal />}
      {activeModal === 'addEditProduct' && <AddEditProductModal />}
      {activeModal === 'vendorPortal' && <VendorPortal />}
      {activeModal === 'info' && <InfoModals />}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ShopProvider>
        <MainContent />
      </ShopProvider>
    </ErrorBoundary>
  );
}
