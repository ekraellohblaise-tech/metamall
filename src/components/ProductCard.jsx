import React from 'react';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingCart, Heart, Edit3, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { 
    openProductDetail, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    formatPrice,
    setActiveModal,
    setSelectedProduct
  } = useShop();

  const isLiked = wishlist.includes(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, {
      size: product.sizes?.[0] || "Standard",
      color: product.colors?.[0]?.name || "Standard",
      model: product.models?.[0]?.name || "Standard",
      quantity: 1
    });
  };

  const handleEditPrice = (e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setActiveModal('addEditProduct');
  };

  return (
    <div 
      className={`product-card ${product.isStarProduct ? 'is-star-card' : ''}`}
      onClick={() => openProductDetail(product)}
    >
      {/* Top Badges & Actions */}
      <div className="card-top-bar">
        <div className="badges-stack">
          {product.discount > 0 && (
            <span className="discount-badge-prominent">
              -{product.discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bestseller-badge">
              Bestseller
            </span>
          )}
        </div>

        <div className="card-actions-top">
          {/* Quick Edit Price Button */}
          <button 
            type="button" 
            className="card-action-icon edit-btn" 
            title="Modifier le tarif / remise"
            onClick={handleEditPrice}
          >
            <Edit3 size={15} />
          </button>

          {/* Wishlist Heart */}
          <button 
            type="button" 
            className={`card-action-icon wishlist-icon ${isLiked ? 'liked' : ''}`}
            title={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart size={16} fill={isLiked ? "#ef4444" : "none"} color={isLiked ? "#ef4444" : "#64748b"} />
          </button>
        </div>
      </div>

      {/* Adaptive Image Framing: The container adapts to the image's proportions */}
      <div className="adaptive-image-container">
        <img 
          src={product.images?.[0]} 
          alt={product.title}
          className="adaptive-product-img"
          loading="lazy"
        />
        {product.images?.length > 1 && (
          <div className="image-variants-hint">
            <span>+{product.images.length} photos</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="product-card-body">
        <div className="product-category-row">
          <span className="product-cat-name">{product.category}</span>
          {product.sizes?.length > 0 && (
            <span className="product-sizes-hint">
              {product.sizes.length} variantes
            </span>
          )}
        </div>

        <h3 className="product-card-title" title={product.title}>
          {product.title}
        </h3>

        {/* Customer Reviews Stars */}
        <div className="product-rating-row">
          <div className="stars-mini">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                className={i < Math.floor(product.rating || 5) ? "star-fill" : "star-empty"}
                fill={i < Math.floor(product.rating || 5) ? "#f59e0b" : "#e2e8f0"}
                color={i < Math.floor(product.rating || 5) ? "#f59e0b" : "#cbd5e1"}
              />
            ))}
          </div>
          <span className="rating-num">{(product.rating || 5.0).toFixed(1)}</span>
          <span className="review-total">({product.reviewCount || 0} avis)</span>
        </div>

        {/* Pricing Area: Strikethrough Regular Price and Bold Discounted Price */}
        <div className="product-pricing-area">
          <div className="prices-column">
            <span className="promo-final-price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-strikethrough-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="economy-label">
              Gain {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="card-footer-buttons">
          <button 
            type="button" 
            className="btn-quick-add"
            onClick={handleQuickAdd}
          >
            <ShoppingCart size={15} />
            <span>Ajouter</span>
          </button>
          <button 
            type="button" 
            className="btn-quick-view"
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
          >
            <Eye size={15} />
            <span>Détails</span>
          </button>
        </div>
      </div>
    </div>
  );
};
