export const initialProducts = [
  {
    id: "p-boots",
    title: "Bottes de Sécurité Tactiques & Imperméables Renforcées Acier (Chantier Pro)",
    category: "Vêtements & Chaussures",
    price: 57600,
    originalPrice: 72000,
    discount: 20,
    rating: 4.9,
    reviewCount: 148,
    badge: "Offre Spéciale -20%",
    isStarProduct: true,
    isBestSeller: true,
    images: [
      "/images/boots-1.jpg",
      "/images/boots-2.jpg"
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    colors: [
      { name: "Noir Onyx", hex: "#1a1a1a", border: "#333" },
      { name: "Kaki Militaire", hex: "#4b5320", border: "#5d6728" },
      { name: "Marron Cuir", hex: "#5c3a21", border: "#794c2b" }
    ],
    models: [
      { name: "Coque Acier Standard", extraPrice: 0 },
      { name: "Renforcée Anti-perforation S3", extraPrice: 3500 },
      { name: "Pro Grand Froid & Étanche Extrême", extraPrice: 6000 }
    ],
    description: "La référence absolue pour les professionnels du bâtiment, de la logistique et des chantiers extrêmes. Dotée d'une coque en acier trempé résistant aux chocs de 200 Joules, d'une semelle Kevlar anti-perforation et d'un cuir nubuck imperméable hydrofuge. Respirante et ultra-confortable pour les longues journées de travail.",
    features: [
      "Coque en acier trempé certifiée EN ISO 20345 (200J)",
      "Membrane hydrophobe étanche 100% waterproof",
      "Semelle d'usure crantée antidérapante SRC résistante aux huiles",
      "Plaque intercalaire en Kevlar flexible anti-clous",
      "Doublure respirante anti-transpiration avec semelle mémoire de forme",
      "Système de laçage rapide haute résistance"
    ],
    stock: 24,
    sku: "SEC-BOOT-2026-X",
    reviews: [
      {
        id: "r1",
        author: "Kouamé B.",
        verified: true,
        rating: 5,
        date: "14 Septembre 2026",
        comment: "Excellente paire ! Je suis chef de chantier à Abidjan, la coque en acier m'a déjà sauvé d'un bloc de béton tombé de 1 mètre. Très confortables même après 10h debout.",
        sizeBought: "Taille 43"
      },
      {
        id: "r2",
        author: "Mamadou D.",
        verified: true,
        rating: 5,
        date: "08 Septembre 2026",
        comment: "Imperméabilité parfaite testée dans la boue et les flaques d'eau. La réduction de 20% vaut vraiment le coup (57 600 FCFA au lieu de 72 000). Reçue en 24h.",
        sizeBought: "Taille 42"
      },
      {
        id: "r3",
        author: "Christelle T.",
        verified: true,
        rating: 5,
        date: "28 Août 2026",
        comment: "Commandées pour mon époux artisan. La finition est soignée, le cuir est robuste et l'amorti au talon réduit la fatigue. Très satisfaite !",
        sizeBought: "Taille 44"
      },
      {
        id: "r4",
        author: "Ibrahim S.",
        verified: true,
        rating: 4,
        date: "15 Août 2026",
        comment: "Très solide et bonne accroche au sol sur sol glissant. Prendre sa pointure habituelle. Je recommande sans hésiter.",
        sizeBought: "Taille 41"
      }
    ]
  },
  {
    id: "p-elec-1",
    title: "Robot Cuiseur Multifonction Pro MasterChef 1400W avec Balance & Écran Tactile",
    category: "Électroménager",
    price: 135000,
    originalPrice: 180000,
    discount: 25,
    rating: 4.8,
    reviewCount: 94,
    badge: "Top Vente -25%",
    isStarProduct: false,
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["Bol 3.5 Litres", "Bol XL 5.0 Litres (+15 000 FCFA)"],
    colors: [
      { name: "Inox Brossé", hex: "#b0b0b0", border: "#888" },
      { name: "Noir Mat", hex: "#222222", border: "#444" }
    ],
    models: [
      { name: "Standard 8 Accessoires", extraPrice: 0 },
      { name: "Pack Chef avec Cuiseur Vapeur XXL", extraPrice: 15000 }
    ],
    description: "Cuisinez comme un chef étoilé sans effort : 18 programmes automatiques, découpe, pétrit, cuit à la vapeur, mijote et hache avec une précision chirurgicale.",
    features: ["Moteur silencieux 1400W", "Bol acier inox 304 compatible lave-vaisselle", "Livre de 300 recettes inclus"],
    stock: 12,
    sku: "ELC-ROB-1400W",
    reviews: [
      { id: "r-e1", author: "Aïssatou K.", verified: true, rating: 5, date: "10 Septembre 2026", comment: "Gain de temps incroyable pour les repas de famille. Cuisson vapeur au top." }
    ]
  },
  {
    id: "p-pc-1",
    title: "PC Portable UltraBook Pro 15.6'' Full HD IPS (Core i7, 16Go RAM, 512Go SSD NVMe)",
    category: "Informatique & Accessoires",
    price: 345000,
    originalPrice: 460000,
    discount: 25,
    rating: 4.9,
    reviewCount: 82,
    badge: "Promo Flash -25%",
    isStarProduct: false,
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["15.6 Pouces FHD", "16 Pouces QHD (+35 000 FCFA)"],
    colors: [
      { name: "Gris Sidéral", hex: "#4b5563", border: "#374151" },
      { name: "Argent Métallique", hex: "#d1d5db", border: "#9ca3af" }
    ],
    models: [
      { name: "512 Go SSD / 16 Go RAM", extraPrice: 0 },
      { name: "1 To SSD / 32 Go RAM Pro", extraPrice: 50000 }
    ],
    description: "Performances incomparables pour le télétravail, le graphisme et la bureautique intensive. Châssis aluminium brossé ultra-léger (1.4 kg) avec batterie longue durée de 14 heures.",
    features: ["Processeur Intel Core i7 12 cœurs", "Clavier rétroéclairé avec pavé numérique", "Wi-Fi 6 & Bluetooth 5.3 rapide"],
    stock: 8,
    sku: "INF-PC-I7-PRO",
    reviews: [
      { id: "r-pc1", author: "Jean-Marc L.", verified: true, rating: 5, date: "02 Septembre 2026", comment: "Démarrage en 5 secondes, très fluide pour le multitâche et le montage photo." }
    ]
  },
  {
    id: "p-phyto-1",
    title: "Pulvérisateur Électrique Rechargeable Dorsal 16L avec Lance Télescopique Cuivre",
    category: "Produits Phytosanitaires & Jardin",
    price: 38000,
    originalPrice: 48000,
    discount: 20,
    rating: 4.7,
    reviewCount: 63,
    badge: "Spécial Jardin -20%",
    isStarProduct: false,
    isBestSeller: false,
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["Capacité 16 Litres", "Capacité 20 Litres (+5 000 FCFA)"],
    colors: [
      { name: "Bleu Agricole", hex: "#1e40af", border: "#1d4ed8" },
      { name: "Vert Forêt", hex: "#15803d", border: "#166534" }
    ],
    models: [
      { name: "Batterie Lithium 8Ah (4h autonomie)", extraPrice: 0 },
      { name: "Batterie Lithium 12Ah Haute Durée", extraPrice: 6000 }
    ],
    description: "Indispensable pour l'entretien agricole, vergers et traitement phytosanitaire biologique. Fini le pompage manuel fatigant : régulateur de pression électronique réglable de 1.5 à 5 bars.",
    features: ["Lance télescopique extensible 120cm", "4 buses interchangeables incluses", "Bretelles rembourrées grand confort"],
    stock: 35,
    sku: "JAR-PULV-16L",
    reviews: [
      { id: "r-phy1", author: "Sékou O.", verified: true, rating: 5, date: "24 Août 2026", comment: "Traitement de mes 2 hectares de plantation en un temps record. Batterie très endurante." }
    ]
  },
  {
    id: "p-gadget-1",
    title: "Montre Connectée Ultra Pro AMOLED Étanche 50M avec GPS & Surveillance Santé",
    category: "Gadgets & Électronique",
    price: 29500,
    originalPrice: 45000,
    discount: 34,
    rating: 4.9,
    reviewCount: 112,
    badge: "Super Promo -34%",
    isStarProduct: false,
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["Cadran 45mm", "Cadran 49mm Titane (+4 000 FCFA)"],
    colors: [
      { name: "Orange Sport", hex: "#ea580c", border: "#c2410c" },
      { name: "Noir Minuit", hex: "#18181b", border: "#27272a" },
      { name: "Gris Titane", hex: "#71717a", border: "#52525b" }
    ],
    models: [
      { name: "Bracelet Silicone Respirant", extraPrice: 0 },
      { name: "Pack Double Bracelet (Silicone + Acier)", extraPrice: 3500 }
    ],
    description: "Écran Retina AMOLED toujours allumé, suivi cardiofréquencemètre en temps réel, saturation O2, appels Bluetooth clairs et plus de 100 modes sportifs intégrés.",
    features: ["Écran haute résolution 466x466 pixels", "Autonomie record de 10 à 14 jours", "Boîtier résistant en alliage de zinc et titane"],
    stock: 40,
    sku: "GAD-WATCH-ULTRA",
    reviews: [
      { id: "r-w1", author: "Patrick E.", verified: true, rating: 5, date: "11 Septembre 2026", comment: "Le bracelet orange est magnifique, synchronisation instantanée avec mon smartphone !" }
    ]
  },
  {
    id: "p-vet-2",
    title: "Veste de Travail Multi-Poches Imperméable & Coupe-Vent Haute Visibilité",
    category: "Vêtements & Chaussures",
    price: 26000,
    originalPrice: 35000,
    discount: 25,
    rating: 4.8,
    reviewCount: 52,
    badge: "Pro -25%",
    isStarProduct: false,
    isBestSeller: false,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Noir & Orange", hex: "#ea580c", border: "#c2410c" },
      { name: "Gris Anthracite", hex: "#374151", border: "#1f2937" },
      { name: "Bleu Marine", hex: "#1e3a8a", border: "#172554" }
    ],
    models: [
      { name: "Version Standard 6 Poches", extraPrice: 0 },
      { name: "Version Hiver Doublée Polaire", extraPrice: 4000 }
    ],
    description: "Idéale en combinaison avec les bottes de chantier : tissu indéchirable Ripstop résistant aux frottements, renforts aux coudes et bandes réfléchissantes 3M.",
    features: ["Tissu Ripstop déperlant", "6 poches dont 2 zippées étanches", "Capuche ajustable amovible"],
    stock: 19,
    sku: "VET-VESTE-PRO",
    reviews: [
      { id: "r-v1", author: "Marc A.", verified: true, rating: 5, date: "05 Septembre 2026", comment: "Très robuste, les poches sont super bien pensées pour les outils." }
    ]
  },
  {
    id: "p-pc-2",
    title: "Casque Audio Pro Sans Fil à Réduction de Bruit Active Hybride (ANC)",
    category: "Informatique & Accessoires",
    price: 42000,
    originalPrice: 60000,
    discount: 30,
    rating: 4.9,
    reviewCount: 77,
    badge: "Son HD -30%",
    isStarProduct: false,
    isBestSeller: false,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["Taille Unique Ajustable"],
    colors: [
      { name: "Noir Mat", hex: "#18181b", border: "#3f3f46" },
      { name: "Blanc Argent", hex: "#e4e4e7", border: "#a1a1aa" }
    ],
    models: [
      { name: "Standard avec Étui Rigide", extraPrice: 0 },
      { name: "Pack Studio avec Câble Hi-Res & Adaptateur Avion", extraPrice: 3000 }
    ],
    description: "Isolation sonore parfaite contre les bruits ambiants. Haut-parleurs dynamiques 40mm pour des basses profondes et des aigus cristallins. 45h d'autonomie.",
    features: ["Réduction active jusqu'à -38dB", "Microphones beamforming pour appels nets", "Charge rapide USB-C (10 min = 5h d'écoute)"],
    stock: 22,
    sku: "INF-CASQUE-ANC",
    reviews: [
      { id: "r-c1", author: "Cynthia M.", verified: true, rating: 5, date: "30 Août 2026", comment: "Incroyable pour télétravailler dans le calme !" }
    ]
  },
  {
    id: "p-elec-2",
    title: "Cafetière Expresso Broyeur à Grains Italienne Automatique 19 Bars",
    category: "Électroménager",
    price: 185000,
    originalPrice: 240000,
    discount: 22,
    rating: 4.8,
    reviewCount: 45,
    badge: "Saveur Café -22%",
    isStarProduct: false,
    isBestSeller: false,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80"
    ],
    sizes: ["Réservoir 1.8 Litres"],
    colors: [
      { name: "Noir Piano", hex: "#0f172a", border: "#334155" },
      { name: "Inox Métal", hex: "#94a3b8", border: "#64748b" }
    ],
    models: [
      { name: "Expresso & Cappuccino Automatique", extraPrice: 0 },
      { name: "Pack Barista avec Carafe à Lait Isotherme", extraPrice: 18000 }
    ],
    description: "Savourez l'arôme authentique d'un café fraîchement moulu chez vous. Pompe italienne 19 bars, mousse de lait onctueuse et réglage de finesse de mouture.",
    features: ["Broyeur conique en acier inoxydable", "Buse vapeur pour latte art", "Nettoyage automatique au démarrage"],
    stock: 10,
    sku: "ELC-CAFE-19B",
    reviews: [
      { id: "r-cf1", author: "David N.", verified: true, rating: 5, date: "12 Septembre 2026", comment: "Le goût du café est incomparable par rapport aux capsules !" }
    ]
  }
];

export const productCategories = [
  "Tous les articles",
  "Vêtements & Chaussures",
  "Électroménager",
  "Informatique & Accessoires",
  "Produits Phytosanitaires & Jardin",
  "Gadgets & Électronique"
];
