import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, 
  Check, Plus, Minus, Send, Share2, Zap
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    setActiveModal, 
    formatPrice, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    addProductReview,
    showToast
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewFormOpen, setReviewFormOpen] = useState(false);

  if (!selectedProduct) return null;

  const currentSize = selectedSize || selectedProduct.sizes?.[0] || "";
  const currentColor = selectedColor || selectedProduct.colors?.[0] || null;
  const currentModel = selectedModel || selectedProduct.models?.[0] || null;

  const isLiked = wishlist.includes(selectedProduct.id);

  // Calculate dynamic price based on model variant
  const extraPrice = currentModel?.extraPrice || 0;
  const currentPrice = selectedProduct.price + extraPrice;
  const currentOriginalPrice = selectedProduct.originalPrice ? selectedProduct.originalPrice + extraPrice : null;

  const handleAddToCart = (buyNow = false) => {
    addToCart(selectedProduct, {
      size: currentSize,
      color: currentColor?.name || "Standard",
      model: currentModel?.name || "Standard",
      extraPrice: extraPrice,
      quantity: quantity
    });

    if (buyNow) {
      setActiveModal('checkout');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) {
      showToast("Veuillez saisir un commentaire.", "info");
      return;
    }
    addProductReview(selectedProduct.id, {
      author: newReviewAuthor.trim() || "Client Vérifié",
      rating: Number(newReviewRating),
      comment: newReviewComment.trim(),
      sizeBought: currentSize ? `Taille ${currentSize}` : null
    });
    setNewReviewComment("");
    setReviewFormOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={() => setActiveModal(null)}
          aria-label="Fermer"
        >
          <X size={22} />
        </button>

        {/* Scrollable Body Container */}
        <div className="product-modal-body-scroll">
          <div className="product-modal-grid">
            {/* LEFT: Adaptive Visual Gallery */}
            <div className="modal-gallery-col">
            <div className="main-adaptive-frame">
              <img 
                src={selectedProduct.images?.[activeImageIndex] || selectedProduct.images?.[0]} 
                alt={selectedProduct.title}
                className="main-view-image"
              />
              {selectedProduct.discount > 0 && (
                <div className="badge-promo-overlay">
                  -{selectedProduct.discount}%
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {selectedProduct.images?.length > 1 && (
              <div className="thumbnails-row">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Vue ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Trust highlights banner under gallery */}
            <div className="modal-trust-cards">
              <div className="m-trust-item">
                <Truck size={18} className="trust-icon" />
                <div>
                  <strong>Livraison Rapide</strong>
                  <p>Expédié sous 24h, suivi en direct</p>
                </div>
              </div>
              <div className="m-trust-item">
                <ShieldCheck size={18} className="trust-icon" />
                <div>
                  <strong>Garantie 30 Jours</strong>
                  <p>Satisfait ou remboursé / échange de pointure</p>
                </div>
              </div>
              <div className="m-trust-item">
                <RefreshCw size={18} className="trust-icon" />
                <div>
                  <strong>Paiements Sécurisés</strong>
                  <p>Orange Money, MTN, Wave, Moov & CB</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Options & Actions */}
          <div className="modal-details-col">
            <div className="product-meta-header">
              <span className="meta-category-badge">{selectedProduct.category}</span>
              <div className="meta-sku-row">
                <span className="sku-text">Réf: {selectedProduct.sku || 'MM-2026'}</span>
                <button 
                  type="button" 
                  className="share-btn-text"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast("Lien de l'article copié !", "info");
                  }}
                >
                  <Share2 size={14} /> Partager
                </button>
              </div>
            </div>

            <h2 className="modal-product-title">{selectedProduct.title}</h2>

            {/* Stars & Reviews Summary */}
            <div className="modal-rating-summary">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className="star-fill"
                    fill={i < Math.floor(selectedProduct.rating || 5) ? "#f59e0b" : "#e2e8f0"}
                    color={i < Math.floor(selectedProduct.rating || 5) ? "#f59e0b" : "#cbd5e1"}
                  />
                ))}
              </div>
              <span className="rating-grade">{(selectedProduct.rating || 5.0).toFixed(1)} / 5</span>
              <span className="rating-separator">•</span>
              <a href="#reviews-section" className="rating-anchor">
                {selectedProduct.reviewCount || selectedProduct.reviews?.length || 0} avis clients certifiés
              </a>
            </div>

            {/* Pricing Section (Strikethrough and Discount Badge) */}
            <div className="modal-pricing-box">
              <div className="price-row-main">
                <span className="modal-final-price">
                  {formatPrice(currentPrice)}
                </span>
                {currentOriginalPrice && (
                  <span className="modal-strikethrough-price">
                    {formatPrice(currentOriginalPrice)}
                  </span>
                )}
                {selectedProduct.discount > 0 && (
                  <span className="modal-discount-pill">
                    Économisez {selectedProduct.discount}%
                  </span>
                )}
              </div>
              <div className="modal-savings-alert">
                <Check size={14} />
                <span>Vous économisez {formatPrice((currentOriginalPrice || currentPrice) - currentPrice)} sur cet article !</span>
              </div>
            </div>

            {/* Variant 1: Size Selector */}
            {selectedProduct.sizes?.length > 0 && (
              <div className="variant-block">
                <div className="variant-label-row">
                  <span className="variant-label">Pointure / Taille :</span>
                  <span className="variant-selected-value">{currentSize}</span>
                </div>
                <div className="size-buttons-grid">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`size-btn ${currentSize === sz ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant 2: Color Selector */}
            {selectedProduct.colors?.length > 0 && (
              <div className="variant-block">
                <div className="variant-label-row">
                  <span className="variant-label">Couleur sélectionnée :</span>
                  <span className="variant-selected-value">{currentColor?.name}</span>
                </div>
                <div className="colors-swatch-row">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`color-swatch-btn ${currentColor?.name === c.name ? 'selected' : ''}`}
                      style={{ backgroundColor: c.hex, borderColor: c.border }}
                      title={c.name}
                      onClick={() => setSelectedColor(c)}
                    >
                      {currentColor?.name === c.name && <Check size={14} color="#fff" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant 3: Model / Version Selector */}
            {selectedProduct.models?.length > 0 && (
              <div className="variant-block">
                <div className="variant-label-row">
                  <span className="variant-label">Modèle / Version :</span>
                </div>
                <div className="models-select-list">
                  {selectedProduct.models.map((m) => (
                    <div
                      key={m.name}
                      className={`model-option-card ${currentModel?.name === m.name ? 'selected' : ''}`}
                      onClick={() => setSelectedModel(m)}
                    >
                      <div className="model-radio-circle">
                        {currentModel?.name === m.name && <div className="radio-inner" />}
                      </div>
                      <div className="model-info">
                        <span className="model-name">{m.name}</span>
                        {m.extraPrice > 0 && (
                          <span className="model-extra-price">+{formatPrice(m.extraPrice)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Purchase Buttons */}
            <div className="purchase-cta-box">
              <div className="qty-row">
                <span className="qty-title">Quantité :</span>
                <div className="qty-counter">
                  <button 
                    type="button" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={15} />
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <span className="stock-indicator">
                  <span className="stock-dot" /> En stock ({selectedProduct.stock || 24} disponibles)
                </span>
              </div>

              <div className="cta-buttons-stack">
                <button 
                  type="button" 
                  className="btn-modal-add-cart"
                  onClick={() => handleAddToCart(false)}
                >
                  <ShoppingCart size={18} />
                  <span>Ajouter au Panier</span>
                </button>

                <button 
                  type="button" 
                  className="btn-modal-buy-now"
                  onClick={() => handleAddToCart(true)}
                >
                  <span>Acheter Maintenant ({formatPrice(currentPrice * quantity)})</span>
                </button>
              </div>

              <button 
                type="button" 
                className={`btn-wishlist-toggle ${isLiked ? 'liked' : ''}`}
                onClick={() => toggleWishlist(selectedProduct.id)}
              >
                <Heart size={16} fill={isLiked ? "#ef4444" : "none"} color={isLiked ? "#ef4444" : "currentColor"} />
                <span>{isLiked ? "Enregistré dans vos favoris" : "Ajouter à ma liste d'envies"}</span>
              </button>
            </div>

            {/* Description & Technical Features */}
            <div className="product-description-tabs">
              <h3>Description du produit</h3>
              <p className="desc-paragraph">{selectedProduct.description}</p>

              {selectedProduct.features?.length > 0 && (
                <div className="features-checklist">
                  <h4>Points forts & Spécifications :</h4>
                  <ul>
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i}>
                        <Check size={15} className="check-bullet" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile-Only Trust Cards (placed after description so it doesn't push down the buy box) */}
            <div className="modal-trust-cards modal-trust-cards-mobile">
              <div className="m-trust-item">
                <Truck size={18} className="trust-icon" />
                <div>
                  <strong>Livraison Rapide</strong>
                  <p>Expédié sous 24h, suivi en direct</p>
                </div>
              </div>
              <div className="m-trust-item">
                <ShieldCheck size={18} className="trust-icon" />
                <div>
                  <strong>Garantie 30 Jours</strong>
                  <p>Satisfait ou remboursé / échange de pointure</p>
                </div>
              </div>
              <div className="m-trust-item">
                <RefreshCw size={18} className="trust-icon" />
                <div>
                  <strong>Paiements Sécurisés</strong>
                  <p>Orange Money, MTN, Wave, Moov & CB</p>
                </div>
              </div>
            </div>

            {/* CUSTOMER REVIEWS SECTION */}
            <div id="reviews-section" className="modal-reviews-section">
              <div className="reviews-section-header">
                <div>
                  <h3>Avis Clients Vérifiés</h3>
                  <p className="reviews-sub">Ce que pensent les utilisateurs de cet article</p>
                </div>
                <button 
                  type="button" 
                  className="btn-open-review-form"
                  onClick={() => setReviewFormOpen(!reviewFormOpen)}
                >
                  {reviewFormOpen ? "Fermer le formulaire" : "Écrire un avis"}
                </button>
              </div>

              {/* Review Submission Form */}
              {reviewFormOpen && (
                <form className="add-review-form" onSubmit={handleReviewSubmit}>
                  <h4>Déposer votre évaluation</h4>
                  
                  <div className="rating-picker">
                    <span>Votre note :</span>
                    <div className="picker-stars">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <button
                          key={st}
                          type="button"
                          className="star-pick-btn"
                          onClick={() => setNewReviewRating(st)}
                        >
                          <Star 
                            size={22} 
                            fill={st <= newReviewRating ? "#f59e0b" : "none"} 
                            color={st <= newReviewRating ? "#f59e0b" : "#cbd5e1"} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Votre nom ou pseudonyme :</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Kouamé K." 
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Votre commentaire :</label>
                    <textarea 
                      rows={3}
                      placeholder="Partagez votre retour d'expérience sur la qualité, la taille, etc."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-submit-review">
                    <Send size={15} />
                    <span>Publier mon avis</span>
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="reviews-list">
                {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                  selectedProduct.reviews.map((rev) => (
                    <div key={rev.id} className="review-comment-card">
                      <div className="rev-header">
                        <div className="rev-user-meta">
                          <div className="rev-avatar-circle">
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <span className="rev-author-name">{rev.author}</span>
                            {rev.verified && (
                              <span className="rev-verified-pill">
                                <Check size={11} /> Achat Vérifié
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="rev-date">{rev.date}</span>
                      </div>

                      <div className="rev-stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < rev.rating ? "#f59e0b" : "#e2e8f0"} 
                            color={i < rev.rating ? "#f59e0b" : "#cbd5e1"} 
                          />
                        ))}
                        {rev.sizeBought && (
                          <span className="rev-variant-tag">{rev.sizeBought}</span>
                        )}
                      </div>

                      <p className="rev-text">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-reviews-text">Soyez le premier à donner votre avis sur cet article !</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Sticky Bottom Conversion Bar (Visible instantly on Mobile & Web) */}
        <div className="modal-bottom-sticky-bar">
          <div className="sticky-bar-info">
            <img 
              src={selectedProduct.images?.[activeImageIndex] || selectedProduct.images?.[0]} 
              alt={selectedProduct.title} 
              className="sticky-bar-thumb" 
            />
            <div className="sticky-bar-texts">
              <div className="sticky-bar-title-row">
                <span className="sticky-bar-title">{selectedProduct.title}</span>
                <span className="sticky-bar-badge-stock">En stock</span>
              </div>
              
              <div className="sticky-bar-meta-variants">
                {currentSize && <span className="sticky-variant-chip">{currentSize}</span>}
                {currentColor && (
                  <span className="sticky-variant-chip">
                    <span 
                      className="sticky-color-dot" 
                      style={{ backgroundColor: currentColor.hex }}
                    />
                    {currentColor.name}
                  </span>
                )}
                {currentModel && <span className="sticky-variant-chip">{currentModel.name}</span>}
              </div>

              <div className="sticky-bar-prices">
                <span className="sticky-bar-current-price">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {currentOriginalPrice && (
                  <span className="sticky-bar-original-price">
                    {formatPrice(currentOriginalPrice * quantity)}
                  </span>
                )}
                {selectedProduct.discount > 0 && (
                  <span className="sticky-bar-discount">
                    -{selectedProduct.discount}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="sticky-bar-actions">
            {/* Quick Quantity Counter in Sticky Bar */}
            <div className="sticky-qty-stepper">
              <button 
                type="button" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuer la quantité"
                className="sticky-qty-btn"
              >
                <Minus size={13} />
              </button>
              <span className="sticky-qty-value">{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Augmenter la quantité"
                className="sticky-qty-btn"
              >
                <Plus size={13} />
              </button>
            </div>

            {/* Secondary CTA: Ajouter au Panier */}
            <button
              type="button"
              className="sticky-btn-add-cart"
              onClick={() => handleAddToCart(false)}
              title="Ajouter cet article au panier"
            >
              <ShoppingCart size={17} />
              <span className="sticky-btn-label">Ajouter</span>
            </button>

            {/* Primary CTA: Commander Express / Acheter Maintenant */}
            <button
              type="button"
              className="sticky-btn-buy-now"
              onClick={() => handleAddToCart(true)}
              title="Acheter et passer commande immédiatement"
            >
              <Zap size={16} className="sticky-zap-icon" />
              <span className="sticky-btn-label">Acheter Maintenant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
