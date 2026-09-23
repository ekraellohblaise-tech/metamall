import React, { useRef, useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, Footprints, Coffee, Laptop, Sprout, Watch, 
  Smartphone, Shirt, Home, Dumbbell, Grid,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export const CategoryNav = () => {
  const { selectedCategory, setSelectedCategory } = useShop();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Complete list of categories for the carousel
  const allNavCategories = [
    { name: "Tous les articles", icon: Sparkles, badge: null },
    { name: "Vêtements & Chaussures", icon: Footprints, badge: "Offre Bottes", badgeColor: "red" },
    { name: "Électroménager", icon: Coffee, badge: "Promo", badgeColor: "orange" },
    { name: "Informatique & Accessoires", icon: Laptop, badge: "Tech", badgeColor: "purple" },
    { name: "Produits Phytosanitaires & Jardin", icon: Sprout, badge: null },
    { name: "Gadgets & Électronique", icon: Watch, badge: "-34%", badgeColor: "red" },
    { name: "Téléphones & Accessoires", icon: Smartphone, badge: "Nouveau", badgeColor: "blue" },
    { name: "Mode & Beauté", icon: Shirt, badge: null },
    { name: "Maison & Décoration", icon: Home, badge: null },
    { name: "Sports & Loisirs", icon: Dumbbell, badge: null },
    { name: "Autres Catégories", icon: Grid, badge: null }
  ];

  // Update scroll buttons state
  const checkScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  // Smooth scroll by distance
  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 280;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="category-nav-bar" aria-label="Navigation des rayons">
      <div className="category-nav-container">
        <div className="category-carousel-wrapper">
          
          {/* Left Navigation Arrow Button */}
          <button
            type="button"
            className={`cat-nav-btn prev-btn ${canScrollLeft ? 'visible' : 'dimmed'}`}
            onClick={() => scroll('left')}
            aria-label="Faire défiler vers la gauche"
            title="Catégories précédentes"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Left Fade Gradient Mask */}
          <div className={`cat-nav-fade fade-left ${canScrollLeft ? 'active' : ''}`} />

          {/* Scrollable Categories Carousel */}
          <div className="category-scroll-list" ref={scrollContainerRef}>
            {allNavCategories.map(cat => {
              const isSelected = selectedCategory === cat.name;
              const IconComponent = cat.icon;

              return (
                <button
                  key={cat.name}
                  type="button"
                  className={`category-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <span className="cat-icon">
                    <IconComponent size={16} />
                  </span>
                  <span className="cat-name">{cat.name}</span>
                  {cat.badge && (
                    <span className={`cat-pill-badge badge-${cat.badgeColor || 'orange'}`}>
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Fade Gradient Mask */}
          <div className={`cat-nav-fade fade-right ${canScrollRight ? 'active' : ''}`} />

          {/* Right Navigation Arrow Button */}
          <button
            type="button"
            className={`cat-nav-btn next-btn ${canScrollRight ? 'visible' : 'dimmed'}`}
            onClick={() => scroll('right')}
            aria-label="Faire défiler vers la droite"
            title="Catégories suivantes"
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </div>
    </nav>
  );
};
