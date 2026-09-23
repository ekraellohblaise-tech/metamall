// Architecture des bannières événementielles défilantes pour la Hero Section
// Extensible facilement pour ajouter, supprimer ou modifier des événements (Black Friday, Déstockage, Vente Spéciale...)

export const initialHeroEvents = [
  {
    id: "hero-boots",
    productId: "p-boots",
    eventType: "special", // 'special', 'blackfriday', 'destockage', 'flash'
    eventBadge: "🔥 VENTE SPÉCIALE EXCLUSIVE",
    eventSubtitle: "Offre Limitée Chantier & Sécurité Pro",
    title: "Bottes de Sécurité Tactiques",
    highlightTitle: "Imperméables & Coque Acier 200J",
    description: "Protection certifiée EN ISO 20345 contre l'écrasement, semelle Kevlar anti-perforation et membrane 100% hydrofuge.",
    price: 57600,
    originalPrice: 72000,
    discount: 20,
    rating: 4.9,
    reviewCount: 148,
    mainImage: "/images/boots-1.jpg",
    secondaryImage: "/images/boots-2.jpg",
    secondaryLabel: "Vue Réelle",
    specPill: "Pointures : 39 au 46",
    stockStatus: "En Stock Immédiat",
    features: [
      "Coque Acier Trempé 200J",
      "100% Imperméable / Waterproof",
      "Semelle Kevlar Anti-clous"
    ],
    accentGradient: "linear-gradient(135deg, #f1641e 0%, #dc2626 100%)",
    glowColor: "rgba(241, 100, 30, 0.6)"
  },
  {
    id: "hero-laptop",
    productId: "p-pc-1",
    eventType: "blackfriday",
    eventBadge: "⚡ BLACK FRIDAY TECH",
    eventSubtitle: "Performance Maximale & Garantie 2 Ans",
    title: "PC Portable UltraBook Pro 15.6''",
    highlightTitle: "Intel Core i7 • 16Go RAM • SSD 512Go",
    description: "Châssis aluminium brossé ultra-léger (1.4kg), écran Full HD IPS anti-reflet et batterie record de 14 heures d'autonomie.",
    price: 345000,
    originalPrice: 460000,
    discount: 25,
    rating: 4.9,
    reviewCount: 82,
    mainImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    secondaryLabel: "Châssis Alu",
    specPill: "16 Go RAM / 512 Go SSD",
    stockStatus: "Dernières unités",
    features: [
      "Intel Core i7 12 Cœurs",
      "Clavier Rétroéclairé",
      "Wi-Fi 6 & Charge Rapide"
    ],
    accentGradient: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    glowColor: "rgba(168, 85, 247, 0.6)"
  },
  {
    id: "hero-watch",
    productId: "p-gadget-1",
    eventType: "destockage",
    eventBadge: "🏷️ DÉSTOCKAGE MASSIF",
    eventSubtitle: "Jusqu'à épuisement définitif du stock",
    title: "Montre Connectée Ultra Pro AMOLED",
    highlightTitle: "Étanche 50M • GPS • Santé & Sport",
    description: "Écran Retina AMOLED haute luminosité, capteur cardiaque en temps réel, appels Bluetooth et autonomie longue de 14 jours.",
    price: 29500,
    originalPrice: 45000,
    discount: 34,
    rating: 4.9,
    reviewCount: 112,
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    secondaryLabel: "Double Bracelet",
    specPill: "Cadran 45mm Titane",
    stockStatus: "Liquidation Stock",
    features: [
      "Écran AMOLED 466x466 px",
      "Étanche immersion 50 Mètres",
      "Autonomie 10 à 14 jours"
    ],
    accentGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    glowColor: "rgba(16, 185, 129, 0.6)"
  },
  {
    id: "hero-robot",
    productId: "p-elec-1",
    eventType: "flash",
    eventBadge: "💥 PROMO FLASH DU JOUR",
    eventSubtitle: "Électroménager Chef Étoilé",
    title: "Robot Cuiseur Multifonction Pro 1400W",
    highlightTitle: "Écran Tactile & Balance Intégrée",
    description: "18 programmes automatiques : pétrit, cuit à la vapeur, mijote et découpe avec bol inox 304 compatible lave-vaisselle.",
    price: 135000,
    originalPrice: 180000,
    discount: 25,
    rating: 4.8,
    reviewCount: 94,
    mainImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80",
    secondaryLabel: "Pack XXL",
    specPill: "Moteur 1400W / Bol 3.5L",
    stockStatus: "En Stock Immédiat",
    features: [
      "Moteur Puissant 1400W Silencieux",
      "18 Programmes Automatiques",
      "Livre 300 Recettes Inclus"
    ],
    accentGradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    glowColor: "rgba(245, 158, 11, 0.6)"
  }
];
