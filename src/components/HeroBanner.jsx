import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { initialHeroEvents } from '../data/heroEventsData';
import { 
  ShieldCheck, Truck, ArrowRight, Zap, Star, CheckCircle, 
  ChevronLeft, ChevronRight, ShoppingCart, Sparkles, Tag, Flame
} from 'lucide-react';

export const HeroBanner = () => {
  const { products, openProductDetail, formatPrice, addToCart, setActiveModal } = useShop();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const heroEvents = initialHeroEvents;
  const currentEvent = heroEvents[currentSlideIndex];

  // Find linked product from shop context if available, otherwise fallback
  const linkedProduct = products.find(p => p.id === currentEvent.productId) || {
    id: currentEvent.productId,
    title: currentEvent.title,
    price: currentEvent.price,
    originalPrice: currentEvent.originalPrice,
    discount: currentEvent.discount,
    images: [currentEvent.mainImage, currentEvent.secondaryImage],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    colors: [{ name: "Standard", hex: "#1a1a1a" }],
    models: [{ name: "Standard", extraPrice: 0 }]
  };

  // Auto-play slideshow every 5.5 seconds (slides from right to left)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % heroEvents.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, heroEvents.length]);

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % heroEvents.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + heroEvents.length) % heroEvents.length);
  };

  // Touch Swipe for mobile (swipe right to left -> next, left to right -> prev)
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      // Swiped left -> next
      handleNextSlide();
    } else if (distance < -50) {
      // Swiped right -> prev
      handlePrevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Direct Add to Cart from Hero Section
  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(linkedProduct, {
      size: linkedProduct.sizes?.[0] || "Standard",
      color: linkedProduct.colors?.[0]?.name || "Standard",
      model: linkedProduct.models?.[0]?.name || "Standard",
      quantity: 1
    });
  };

  // Direct Checkout
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(linkedProduct, {
      size: linkedProduct.sizes?.[0] || "Standard",
      color: linkedProduct.colors?.[0]?.name || "Standard",
      model: linkedProduct.models?.[0]?.name || "Standard",
      quantity: 1
    });
    setActiveModal('checkout');
  };

  // Render appropriate icon based on event type
  const renderEventIcon = (type) => {
    switch (type) {
      case 'blackfriday':
        return <Zap size={15} className="event-beacon-icon" />;
      case 'destockage':
        return <Tag size={15} className="event-beacon-icon" />;
      case 'flash':
        return <Sparkles size={15} className="event-beacon-icon" />;
      default:
        return <Flame size={15} className="event-beacon-icon" />;
    }
  };

  return (
    <div 
      className="hero-banner-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-banner-container">
        
        {/* Events Tabs / Quick Switcher Bar */}
        <div className="hero-events-switcher-bar">
          <span className="switcher-label hide-mobile">Événements en cours :</span>
          <div className="switcher-tabs">
            {heroEvents.map((evt, idx) => (
              <button
                key={evt.id}
                type="button"
                className={`event-tab-pill ${idx === currentSlideIndex ? 'active' : ''}`}
                onClick={() => setCurrentSlideIndex(idx)}
                title={evt.eventBadge}
              >
                <span className="tab-dot" />
                <span className="tab-title">{evt.eventBadge.split(' ')[1] || evt.eventBadge}</span>
                <span className="tab-discount">-{evt.discount}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="hero-carousel-viewport">
          {/* Previous / Next Arrow Buttons */}
          <button 
            type="button" 
            className="hero-nav-arrow arrow-left" 
            onClick={handlePrevSlide}
            aria-label="Événement précédent"
            title="Précédent"
          >
            <ChevronLeft size={22} />
          </button>
          
          <button 
            type="button" 
            className="hero-nav-arrow arrow-right" 
            onClick={handleNextSlide}
            aria-label="Événement suivant"
            title="Suivant"
          >
            <ChevronRight size={22} />
          </button>

          {/* Active Event Slide with Animated Right-to-Left Entrance */}
          <div key={currentEvent.id} className="hero-grid hero-slide-active">
            
            {/* Left Hero Content */}
            <div className="hero-content">
              
              {/* Glowing / Shimmering Neon Event Tag & Badge */}
              <div className="hero-badge-row">
                <div 
                  className={`glowing-event-badge glow-${currentEvent.eventType}`}
                  style={{ '--glow-color': currentEvent.glowColor }}
                >
                  <span className="beacon-pulse-ring" />
                  <span className="beacon-dot" />
                  {renderEventIcon(currentEvent.eventType)}
                  <span className="badge-text-glow">{currentEvent.eventBadge}</span>
                </div>

                <div className="event-discount-shimmer">
                  <span>-{currentEvent.discount}% IMMÉDIAT</span>
                </div>
              </div>

              {/* Product Headline */}
              <h1 className="hero-title">
                {currentEvent.title} <br />
                <span className="hero-highlight">{currentEvent.highlightTitle}</span>
              </h1>

              {/* Subtitle / Key Hook */}
              <p className="hero-subtitle">
                {currentEvent.description}
              </p>

              {/* Price Showcase with Strikethrough & Discount */}
              <div className="hero-price-card">
                <div className="hero-price-meta">
                  <span className="price-label">Prix promotionnel événement :</span>
                  <div className="price-display-group">
                    <span className="price-current-large">
                      {formatPrice(currentEvent.price)}
                    </span>
                    <span className="price-original-strikethrough">
                      {formatPrice(currentEvent.originalPrice)}
                    </span>
                    <span className="discount-pill-large">
                      Gain {formatPrice(currentEvent.originalPrice - currentEvent.price)} (-{currentEvent.discount}%)
                    </span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="hero-rating-badge">
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="star-filled" fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="rating-score">{currentEvent.rating}/5</span>
                  <span className="rating-count">({currentEvent.reviewCount} avis)</span>
                </div>
              </div>

              {/* Key Bullet Features */}
              <div className="hero-feature-tags">
                {currentEvent.features.map((feat, idx) => (
                  <div key={idx} className="feat-item">
                    <CheckCircle size={15} className="feat-check" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons (Add to Cart & Direct Buy) */}
              <div className="hero-actions-row">
                <button 
                  type="button" 
                  className="btn-primary-hero"
                  onClick={handleQuickAdd}
                  title="Ajouter cet article au panier"
                >
                  <ShoppingCart size={18} />
                  <span>Ajouter au Panier</span>
                </button>

                <button 
                  type="button" 
                  className="btn-secondary-hero"
                  onClick={handleBuyNow}
                  title="Commander directement"
                >
                  <span>Commander Express ({formatPrice(currentEvent.price)})</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="btn-tertiary-hero"
                  onClick={() => openProductDetail(linkedProduct)}
                  title="Voir toutes les options et caractéristiques"
                >
                  <span>Options & Fiche</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <Truck size={15} />
                  <span>Livraison Rapide 24/48h</span>
                </div>
                <div className="trust-item">
                  <ShieldCheck size={15} />
                  <span>Garantie 30 Jours Satisfait</span>
                </div>
                <div className="trust-item">
                  <span className="mobile-money-pill">Orange Money • MTN • Wave • CB</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card (Adaptive Framing with Real Visuals) */}
            <div className="hero-media-wrapper" onClick={() => openProductDetail(linkedProduct)}>
              <div className="hero-card-frame">
                {/* Product Visual */}
                <div className="hero-image-adaptive-container">
                  <img 
                    src={currentEvent.mainImage} 
                    alt={currentEvent.title} 
                    className="hero-main-img"
                  />
                  {currentEvent.secondaryImage && (
                    <div className="floating-preview-thumbnail">
                      <img src={currentEvent.secondaryImage} alt={currentEvent.secondaryLabel || "Aperçu"} />
                      <span>{currentEvent.secondaryLabel || "Vue Pro"}</span>
                    </div>
                  )}
                </div>

                {/* Overlay Flash Badge */}
                <div className="floating-discount-tag">
                  <span className="tag-save">REMISE ÉVÉNEMENT</span>
                  <span className="tag-num">-{currentEvent.discount}%</span>
                </div>

                <div className="hero-image-footer">
                  <div className="spec-pill">{currentEvent.specPill}</div>
                  <div className="spec-pill stock">{currentEvent.stockStatus}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="hero-carousel-pagination">
          {heroEvents.map((evt, idx) => (
            <button
              key={evt.id}
              type="button"
              className={`pagination-bullet ${idx === currentSlideIndex ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Aller au produit ${idx + 1} : ${evt.title}`}
            >
              <span className="bullet-fill" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
