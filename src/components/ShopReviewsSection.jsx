import React from 'react';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp, Award, Users } from 'lucide-react';
import { shopRatingSummary, shopTestimonials, trustHighlights } from '../data/shopReviews';

export const ShopReviewsSection = () => {
  return (
    <section className="shop-reviews-section">
      <div className="reviews-section-container">
        {/* Section Header */}
        <div className="section-title-center">
          <span className="section-badge">Confiance & Satisfaction</span>
          <h2>Ce que nos clients disent de MetaMall</h2>
          <p>Plus de 2 480 commandes livrées avec succès et des clients 100% satisfaits</p>
        </div>

        {/* Global Shop Rating Showcase Card */}
        <div className="global-rating-showcase">
          <div className="rating-score-box">
            <div className="big-rating-number">{shopRatingSummary.average}</div>
            <div className="stars-cluster-lg">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <div className="rating-total-count">Basé sur {shopRatingSummary.totalReviews.toLocaleString('fr-FR')} avis clients</div>
            <div className="verified-rate-tag">
              <CheckCircle2 size={15} color="#16a34a" /> {shopRatingSummary.verifiedBuyerRate} d'avis positifs
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="rating-breakdown-box">
            {shopRatingSummary.breakdown.map((item) => (
              <div key={item.stars} className="breakdown-bar-row">
                <span className="bar-label">{item.stars} étoiles</span>
                <div className="bar-track">
                  <div className="bar-progress" style={{ width: `${item.percentage}%` }} />
                </div>
                <span className="bar-percent">{item.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Guarantee Highlights */}
          <div className="rating-guarantees-box">
            <div className="g-item">
              <Award size={24} className="g-icon" />
              <div>
                <strong>Boutique Certifiée</strong>
                <p>Articles 100% conformes et authentiques</p>
              </div>
            </div>
            <div className="g-item">
              <ShieldCheck size={24} className="g-icon" />
              <div>
                <strong>Garantie 30 Jours</strong>
                <p>Remboursement ou échange sans frais</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {shopTestimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="test-header">
                <div className="stars-row">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="test-date">{t.date}</span>
              </div>

              <h4 className="test-title">"{t.title}"</h4>
              <p className="test-comment">{t.comment}</p>

              <div className="test-footer">
                <div className="test-author-avatar">
                  {t.author.charAt(0)}
                </div>
                <div className="test-author-info">
                  <strong>{t.author}</strong>
                  <span>{t.location} • {t.role}</span>
                </div>
              </div>

              {t.purchasedItem && (
                <div className="test-item-bought">
                  <span>Achat certifié : <strong>{t.purchasedItem}</strong></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 4 Trust Highlights Columns */}
        <div className="trust-pillars-row">
          {trustHighlights.map((th, idx) => (
            <div key={idx} className="trust-pillar-card">
              <div className="pillar-icon-wrap">
                {idx === 0 && <ShieldCheck size={24} />}
                {idx === 1 && <Award size={24} />}
                {idx === 2 && <Users size={24} />}
                {idx === 3 && <ThumbsUp size={24} />}
              </div>
              <h4>{th.title}</h4>
              <p>{th.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
