export const initialCategories = [
  {
    id: "cat-electromenagers",
    name: "Electroménagers",
    slug: "electromenagers",
    iconName: "Coffee",
    badge: "Populaire",
    badgeColor: "orange",
    description: "Cuisine, préparation, froid et entretien ménager",
    subcategories: [
      { id: "sub-cuisine", name: "Robots & Préparation culinaire", count: 24 },
      { id: "sub-cuisson", name: "Cuiseurs, Fours & Micro-ondes", count: 18 },
      { id: "sub-cafetieres", name: "Cafetières & Broyeurs expressos", count: 12 },
      { id: "sub-froid", name: "Réfrigérateurs & Congélateurs", count: 8 },
      { id: "sub-entretien", name: "Aspirateurs & Nettoyeurs vapeur", count: 15 }
    ]
  },
  {
    id: "cat-informatique",
    name: "Informatique",
    slug: "informatique",
    iconName: "Laptop",
    badge: null,
    description: "PC portables, bureaux, écrans et périphériques",
    subcategories: [
      { id: "sub-pc-portables", name: "Ordinateurs portables & Ultrabooks", count: 32 },
      { id: "sub-pc-bureau", name: "PC de bureau & Stations fixes", count: 14 },
      { id: "sub-ecrans", name: "Écrans & Moniteurs Full HD / 4K", count: 19 },
      { id: "sub-peripheriques", name: "Claviers, Souris & Tapis ergonomiques", count: 45 },
      { id: "sub-stockage", name: "Disques SSD NVMe, Disques durs & Clés USB", count: 28 },
      { id: "sub-reseau", name: "Routeurs Wi-Fi 6 & Équipements réseau", count: 11 }
    ]
  },
  {
    id: "cat-telephones",
    name: "Téléphones et accessoires",
    slug: "telephones-accessoires",
    iconName: "Smartphone",
    badge: "Nouveau",
    badgeColor: "blue",
    description: "Smartphones récents, protections et chargeurs",
    subcategories: [
      { id: "sub-smartphones", name: "Smartphones Android & iOS", count: 38 },
      { id: "sub-coques", name: "Coques, Étuis & Films en verre trempé", count: 85 },
      { id: "sub-chargeurs", name: "Chargeurs rapides GaN & Câbles tressés", count: 54 },
      { id: "sub-powerbanks", name: "Batteries externes & Stations solaires", count: 22 },
      { id: "sub-supports", name: "Supports voiture & Kits mains libres", count: 16 }
    ]
  },
  {
    id: "cat-mode",
    name: "Mode et vêtements",
    slug: "mode-vetements",
    iconName: "Shirt",
    badge: null,
    description: "Vêtements professionnels, homme et femme",
    subcategories: [
      { id: "sub-vetements-travail", name: "Vestes de travail multi-poches & EPI", count: 29 },
      { id: "sub-homme", name: "Mode Homme (Chemises, Pantalons, Polos)", count: 64 },
      { id: "sub-femme", name: "Mode Femme (Robes, Ensembles, Vestes)", count: 72 },
      { id: "sub-securite-epi", name: "Gilets haute visibilité & Combinaisons", count: 18 }
    ]
  },
  {
    id: "cat-chaussures",
    name: "Chaussures",
    slug: "chaussures",
    iconName: "Footprints",
    badge: null,
    description: "Bottes de sécurité acier, baskets et chaussures pro",
    subcategories: [
      { id: "sub-bottes-securite", name: "Bottes de sécurité acier (Chantier Pro)", count: 24, hot: true },
      { id: "sub-chaussures-travail", name: "Chaussures de travail étanches", count: 16 },
      { id: "sub-sneakers", name: "Baskets légères & Sneakers respirantes", count: 42 },
      { id: "sub-ville-cuir", name: "Mocassins & Chaussures de ville en cuir", count: 19 },
      { id: "sub-sandales", name: "Sandales & Chaussures de détente", count: 15 }
    ]
  },
  {
    id: "cat-beaute",
    name: "Beauté et soins",
    slug: "beaute-soins",
    iconName: "Sparkles",
    badge: null,
    description: "Soins visage, corps, hygiène et parfums",
    subcategories: [
      { id: "sub-visage", name: "Soins du visage & Sérums hydratants", count: 33 },
      { id: "sub-corps", name: "Soins corporels & Huiles végétales", count: 27 },
      { id: "sub-parfums", name: "Parfums & Eaux de toilette de marque", count: 21 },
      { id: "sub-rasage", name: "Tondeuses de précision & Soins de barbe", count: 19 },
      { id: "sub-hygiene", name: "Hygiène quotidienne & Savons artisanaux", count: 36 }
    ]
  },
  {
    id: "cat-electronique",
    name: "Électronique",
    slug: "electronique",
    iconName: "Cpu",
    badge: null,
    description: "Audio haute fidélité, caméras et solaire",
    subcategories: [
      { id: "sub-audio", name: "Casques Bluetooth ANC & Écouteurs sans fil", count: 31 },
      { id: "sub-enceintes", name: "Enceintes portables étanches", count: 17 },
      { id: "sub-cameras", name: "Caméras de surveillance Wi-Fi", count: 14 },
      { id: "sub-energie-solaire", name: "Kits solaires & Onduleurs autonomes", count: 12 },
      { id: "sub-cables", name: "Câblage HDMI, Adaptateurs & Hubs USB-C", count: 40 }
    ]
  },
  {
    id: "cat-maison",
    name: "Maison et décoration",
    slug: "maison-decoration",
    iconName: "Home",
    badge: null,
    description: "Luminaires, décoration intérieure et literie",
    subcategories: [
      { id: "sub-luminaires", name: "Luminaires design & Lampes solaires", count: 25 },
      { id: "sub-rangement", name: "Étagères & Rangements modulables", count: 18 },
      { id: "sub-linge", name: "Linge de lit & Draps de bain", count: 22 },
      { id: "sub-deco-murale", name: "Tableaux, Miroirs & Horloges modernes", count: 29 },
      { id: "sub-art-table", name: "Art de la table & Services de vaisselle", count: 16 }
    ]
  },
  {
    id: "cat-sport",
    name: "Sport",
    slug: "sport",
    iconName: "Trophy",
    badge: null,
    description: "Équipements fitness, outdoor et sports d'équipe",
    subcategories: [
      { id: "sub-fitness", name: "Haltères, Élastiques & Tapis d'entraînement", count: 20 },
      { id: "sub-tenues-sport", name: "Tenues techniques respirantes & Maillots", count: 28 },
      { id: "sub-outdoor", name: "Randonnée, Camping & Sacs tactiques", count: 19 },
      { id: "sub-ballons", name: "Ballons de Football, Basket & Accessoires", count: 14 },
      { id: "sub-gourdes", name: "Gourdes isothermes & Shakers protéines", count: 12 }
    ]
  },
  {
    id: "cat-accessoires",
    name: "Accessoires",
    slug: "accessoires",
    iconName: "Watch",
    badge: null,
    description: "Montres connectées, maroquinerie et lunettes",
    subcategories: [
      { id: "sub-montres", name: "Montres connectées AMOLED & Trackers santé", count: 26 },
      { id: "sub-maroquinerie", name: "Sacoches cuir, Portefeuilles & Ceintures", count: 34 },
      { id: "sub-lunettes", name: "Lunettes de soleil UV400 & Anti-lumière bleue", count: 22 },
      { id: "sub-casquettes", name: "Casquettes tactiques & Bonnets d'hiver", count: 15 },
      { id: "sub-bijoux", name: "Bracelets acier & Parures artisanales", count: 18 }
    ]
  },
  {
    id: "cat-autres",
    name: "Autres catégories",
    slug: "autres-categories",
    iconName: "Grid",
    badge: null,
    description: "Produits phytosanitaires, bricolage et auto-moto",
    subcategories: [
      { id: "sub-phyto", name: "Produits phytosanitaires & Pulvérisateurs 16L", count: 14 },
      { id: "sub-bricolage", name: "Outillage à main & Boîtes à outils pro", count: 32 },
      { id: "sub-auto-moto", name: "Accessoires Auto, Moto & Entretien moteur", count: 21 },
      { id: "sub-animalerie", name: "Alimentation & Soins pour animaux", count: 9 },
      { id: "sub-papeterie", name: "Fournitures scolaires & Matériel de bureau", count: 16 }
    ]
  }
];

/**
 * Helper architecture: Facilitates adding, updating, and removing categories 
 * via backend APIs or administration panels.
 */
export const categoryHelpers = {
  createCategory: (newCat) => ({
    id: newCat.id || `cat-${Date.now()}`,
    name: newCat.name,
    slug: newCat.slug || newCat.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    iconName: newCat.iconName || "Grid",
    badge: newCat.badge || null,
    badgeColor: newCat.badgeColor || "orange",
    description: newCat.description || "",
    subcategories: newCat.subcategories || []
  }),

  createSubcategory: (catId, subName) => ({
    id: `sub-${Date.now()}`,
    name: subName,
    count: 0
  })
};
