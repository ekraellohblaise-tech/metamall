import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, Store, TrendingUp, Package, PlusCircle, ShoppingBag, 
  DollarSign, CheckCircle2, AlertTriangle, Eye, Trash2, 
  UploadCloud, Star, ArrowLeft, LogOut, ShieldCheck, Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { productCategories } from '../data/products';

const generateProductId = () => 'p-' + Date.now();
const generateSku = () => 'MM-' + Math.floor(1000 + Math.random() * 9000);
const generateImageId = () => 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);

export const VendorPortal = () => {
  const { 
    vendorUser, 
    vendorLogin, 
    vendorRegister, 
    vendorLogout, 
    products, 
    saveProduct, 
    deleteProduct, 
    formatPrice, 
    setActiveModal, 
    setSelectedProduct, 
    showToast,
    orders
  } = useShop();

  // Active view inside portal: 'dashboard', 'inventory', 'addProduct', 'orders'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Auth form states (when not logged in)
  const [authMode, setAuthMode] = useState('register'); // 'login' or 'register'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration state
  const [regStoreName, setRegStoreName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Abidjan');
  const [regCategory, setRegCategory] = useState('Vêtements & Chaussures');
  const [regDescription, setRegDescription] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Add Product form state
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('Vêtements & Chaussures');
  const [pOriginalPrice, setPOriginalPrice] = useState(45000);
  const [pDiscount, setPDiscount] = useState(15);
  const [pStock, setPStock] = useState(25);
  const [pDescription, setPDescription] = useState('');
  const [pFeatures, setPFeatures] = useState('Qualité garantie 100%, Finition soignée, Confortable & Résistant');
  
  // Dynamic Sizes / Variants
  const [pSizes, setPSizes] = useState(['40', '41', '42', '43', '44']);
  const [customSizeInput, setCustomSizeInput] = useState('');

  // Colors
  const [pColors, setPColors] = useState([
    { name: 'Noir', hex: '#111827' },
    { name: 'Marron', hex: '#78350f' }
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#2563eb');

  // Model Versions
  const [pModels, setPModels] = useState([
    { name: 'Édition Standard', extraPrice: 0 }
  ]);
  const [newModelName, setNewModelName] = useState('');
  const [newModelPrice, setNewModelPrice] = useState(0);

  // Local Image Uploads state (drag & drop / file picker)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageError, setImageError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Filter in inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'inStock', 'lowStock', 'outOfStock'

  // Computed price
  const computedFinalPrice = Math.round(Number(pOriginalPrice) * (1 - Number(pDiscount) / 100));
  const savings = Math.max(0, Number(pOriginalPrice) - computedFinalPrice);

  // Handle local image file uploads with 2MB validation
  const handleFiles = (files) => {
    setImageError(null);
    const validFiles = Array.from(files);

    validFiles.forEach(file => {
      // 2MB = 2 * 1024 * 1024 bytes
      const maxSizeBytes = 2 * 1024 * 1024;
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

      if (file.size > maxSizeBytes) {
        setImageError(`Attention : Le fichier "${file.name}" dépasse la limite recommandée de 2 Mo (${fileSizeMB} Mo).`);
      }

      if (!file.type.startsWith('image/')) {
        setImageError(`Le fichier "${file.name}" n'est pas un format d'image valide.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [
          ...prev, 
          {
            id: generateImageId(),
            dataUrl: e.target.result,
            name: file.name,
            sizeMB: fileSizeMB,
            isOverLimit: file.size > maxSizeBytes
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  // Add custom size
  const handleAddSize = () => {
    if (customSizeInput.trim() && !pSizes.includes(customSizeInput.trim())) {
      setPSizes([...pSizes, customSizeInput.trim()]);
      setCustomSizeInput('');
    }
  };

  const handleRemoveSize = (sz) => {
    setPSizes(pSizes.filter(s => s !== sz));
  };

  // Add custom color
  const handleAddColor = () => {
    if (newColorName.trim()) {
      setPColors([...pColors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName('');
    }
  };

  const handleRemoveColor = (name) => {
    setPColors(pColors.filter(c => c.name !== name));
  };

  // Add custom model
  const handleAddModel = () => {
    if (newModelName.trim()) {
      setPModels([...pModels, { name: newModelName.trim(), extraPrice: Number(newModelPrice) || 0 }]);
      setNewModelName('');
      setNewModelPrice(0);
    }
  };

  const handleRemoveModel = (name) => {
    setPModels(pModels.filter(m => m.name !== name));
  };

  // Submit product creation
  const handlePublishProduct = (e) => {
    e.preventDefault();
    if (!pTitle.trim()) {
      showToast("Veuillez saisir un nom pour l'article.", "error");
      return;
    }

    // Default image if none uploaded
    const finalImages = uploadedImages.length > 0 
      ? uploadedImages.map(img => img.dataUrl)
      : ["/images/boots-1.jpg"];

    const newProd = {
      id: generateProductId(),
      title: pTitle.trim(),
      category: pCategory,
      originalPrice: Number(pOriginalPrice),
      discount: Number(pDiscount),
      price: computedFinalPrice,
      rating: 5.0,
      reviewCount: 0,
      badge: Number(pDiscount) > 0 ? `Promo -${pDiscount}%` : "Nouveau",
      images: finalImages,
      sizes: pSizes.length > 0 ? pSizes : ["Standard"],
      colors: pColors.length > 0 ? pColors.map(c => ({ name: c.name, hex: c.hex, border: '#888' })) : [{ name: "Standard", hex: "#111", border: "#888" }],
      models: pModels.length > 0 ? pModels : [{ name: "Version Standard", extraPrice: 0 }],
      description: pDescription.trim() || `Produit authentique proposé par ${vendorUser?.storeName || 'MetaMall Vendeur Partenaire'}.`,
      features: pFeatures.split(',').map(f => f.trim()).filter(Boolean),
      stock: Number(pStock) || 20,
      sku: generateSku(),
      vendorId: vendorUser?.id || 'ven-default',
      vendorName: vendorUser?.storeName || 'Boutique Partenaire',
      reviews: []
    };

    saveProduct(newProd);
    showToast(`L'article "${newProd.title}" a été publié avec succès !`, "success");
    
    // Reset form
    setPTitle('');
    setPDescription('');
    setUploadedImages([]);
    setActiveTab('inventory');
  };

  // Mock initial sales history for vendor
  const vendorOrders = [
    {
      id: "CMD-894102",
      date: "24 Septembre 2026, 14:20",
      customer: "Koffi Michel",
      phone: "+225 07 11 22 33 44",
      item: "Bottes de Sécurité Acier",
      variant: "Taille 42 • Noir",
      total: 57600,
      payment: "Orange Money",
      status: "Livré"
    },
    {
      id: "CMD-893945",
      date: "23 Septembre 2026, 18:45",
      customer: "Aïcha Diallo",
      phone: "+225 05 99 88 77 66",
      item: "Combinaison Haute Visibilité Pro",
      variant: "Taille L • Orange Fluo",
      total: 32000,
      payment: "Wave",
      status: "Expédiée"
    },
    {
      id: "CMD-893120",
      date: "22 Septembre 2026, 10:15",
      customer: "Sékou Touré",
      phone: "+225 01 44 55 66 77",
      item: "Chaussures de Travail Étanches",
      variant: "Taille 43 • Marron",
      total: 48000,
      payment: "MTN MoMo",
      status: "En préparation"
    },
    ...orders.map(o => ({
      id: o.id,
      date: o.date,
      customer: o.customerName || "Client Direct",
      phone: o.customerPhone || "+225 07 xx xx xx",
      item: o.items?.[0]?.title || "Article commandé",
      variant: o.items?.[0]?.size ? `Taille ${o.items[0].size}` : "Standard",
      total: o.total || 45000,
      payment: o.paymentMethod || "Mobile Money",
      status: "En préparation"
    }))
  ];

  // Filtered inventory products
  const vendorInventory = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(inventorySearch.toLowerCase()) || 
                          p.category.toLowerCase().includes(inventorySearch.toLowerCase());
    if (!matchesSearch) return false;
    if (stockFilter === 'inStock') return (p.stock || 0) > 10;
    if (stockFilter === 'lowStock') return (p.stock || 0) > 0 && (p.stock || 0) <= 10;
    if (stockFilter === 'outOfStock') return (p.stock || 0) === 0;
    return true;
  });

  // Total sales calculation
  const totalVendorRevenue = vendorOrders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="modal-backdrop vendor-portal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="vendor-portal-window" onClick={(e) => e.stopPropagation()}>
        
        {/* ===================================================================
            HEADER: Vendor Top Navigation
            =================================================================== */}
        <header className="vendor-window-header">
          <div className="v-header-brand">
            <div className="v-badge-pro">
              <Store size={20} />
              <span>MetaMall Vendeur PRO</span>
            </div>
            {vendorUser && (
              <div className="v-store-identity">
                <span className="v-store-name">{vendorUser.storeName}</span>
                <span className="v-verified-badge">
                  <ShieldCheck size={13} /> Certifié
                </span>
              </div>
            )}
          </div>

          <div className="v-header-actions">
            <button 
              type="button" 
              className="v-btn-back-store"
              onClick={() => setActiveModal(null)}
              title="Retourner à la boutique"
            >
              <ArrowLeft size={16} />
              <span>Voir la Boutique</span>
            </button>

            {vendorUser && (
              <button 
                type="button" 
                className="v-btn-logout"
                onClick={vendorLogout}
                title="Se déconnecter de l'espace vendeur"
              >
                <LogOut size={16} />
              </button>
            )}

            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => setActiveModal(null)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* ===================================================================
            UNAUTHENTICATED STATE: Login or Register
            =================================================================== */}
        {!vendorUser ? (
          <div className="vendor-auth-view">
            <div className="v-hero-banner">
              <div className="v-hero-content">
                <span className="v-hero-tag">Opportunité Professionnelle</span>
                <h2>Vendez vos Produits sur MetaMall</h2>
                <p>
                  Rejoignez la première place de marché moderne. Développez vos ventes en Côte d'Ivoire & dans la sous-région, recevez vos paiements par Mobile Money et suivez vos performances en direct.
                </p>
                <div className="v-hero-perks">
                  <div className="perk-item">
                    <CheckCircle2 size={16} className="perk-check" />
                    <span>0 FCFA de frais d'inscription</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={16} className="perk-check" />
                    <span>Paiements sécurisés (Wave, Orange, MTN, CB)</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={16} className="perk-check" />
                    <span>Tableau de bord de gestion des stocks & ventes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="v-auth-container">
              {/* Auth Switcher Tabs */}
              <div className="v-auth-tabs">
                <button 
                  type="button" 
                  className={`v-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthMode('register')}
                >
                  <Store size={16} />
                  <span>Ouvrir une Boutique (Devenir Vendeur)</span>
                </button>
                <button 
                  type="button" 
                  className={`v-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  <span>Connexion Vendeur</span>
                </button>
              </div>

              {/* REGISTER FORM */}
              {authMode === 'register' && (
                <form 
                  className="v-auth-form" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!regStoreName.trim() || !regEmail.trim()) {
                      showToast("Veuillez renseigner le nom de la boutique et votre email.", "error");
                      return;
                    }
                    vendorRegister({
                      storeName: regStoreName,
                      ownerName: regOwnerName,
                      email: regEmail,
                      phone: regPhone,
                      city: regCity,
                      category: regCategory,
                      description: regDescription,
                      password: regPassword
                    });
                  }}
                >
                  <div className="form-grid-2">
                    <div className="v-form-group">
                      <label>Nom de votre boutique / enseigne *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ex: Ivoire BTP & Confort"
                        value={regStoreName}
                        onChange={(e) => setRegStoreName(e.target.value)}
                      />
                    </div>
                    <div className="v-form-group">
                      <label>Nom complet du gérant *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ex: Amadou Traoré"
                        value={regOwnerName}
                        onChange={(e) => setRegOwnerName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="v-form-group">
                      <label>Adresse Email professionnelle *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="vendeur@entreprise.ci"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                      />
                    </div>
                    <div className="v-form-group">
                      <label>Téléphone / WhatsApp commercial *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+225 07 00 00 00 00"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="v-form-group">
                      <label>Ville & Quartier</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Abidjan (Cocody / Marcory)"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                      />
                    </div>
                    <div className="v-form-group">
                      <label>Catégorie principale</label>
                      <select 
                        value={regCategory} 
                        onChange={(e) => setRegCategory(e.target.value)}
                      >
                        {productCategories.slice(1).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="v-form-group">
                    <label>Description de votre activité & vos produits</label>
                    <textarea 
                      rows={2} 
                      placeholder="Présentez brièvement vos articles pour rassurer vos futurs clients..."
                      value={regDescription}
                      onChange={(e) => setRegDescription(e.target.value)}
                    />
                  </div>

                  <div className="v-form-group">
                    <label>Mot de passe du compte vendeur *</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="v-btn-primary-auth">
                    <Store size={18} />
                    <span>Créer ma Boutique & Accéder au Tableau de Bord</span>
                  </button>

                  <div className="v-demo-auth-box">
                    <span>Ou démarrez instantanément :</span>
                    <button 
                      type="button" 
                      className="v-btn-demo-login"
                      onClick={() => vendorLogin("demo@maisonivoire.ci")}
                    >
                      <Sparkles size={16} />
                      <span>Tester avec le Compte Démo Vendeur (1-Clic)</span>
                    </button>
                  </div>
                </form>
              )}

              {/* LOGIN FORM */}
              {authMode === 'login' && (
                <form 
                  className="v-auth-form" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    vendorLogin(loginEmail, loginPassword);
                  }}
                >
                  <div className="v-form-group">
                    <label>Votre Email de Vendeur</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="amadou.traore@maisonivoire.ci"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="v-form-group">
                    <label>Mot de passe</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="v-btn-primary-auth">
                    <span>Se Connecter à mon Espace Vendeur</span>
                  </button>

                  <div className="v-demo-auth-box">
                    <span>Accès rapide sans mot de passe :</span>
                    <button 
                      type="button" 
                      className="v-btn-demo-login"
                      onClick={() => vendorLogin("amadou.traore@maisonivoire.ci")}
                    >
                      <Sparkles size={16} />
                      <span>Connexion Rapide avec Compte Démo</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* ===================================================================
              AUTHENTICATED STATE: FULL VENDOR DASHBOARD
              =================================================================== */
          <div className="vendor-dashboard-view">
            
            {/* Dashboard Sidebar Navigation */}
            <nav className="v-dash-nav">
              <button 
                type="button" 
                className={`v-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <TrendingUp size={18} />
                <span>Vue d'ensemble & Ventes</span>
              </button>

              <button 
                type="button" 
                className={`v-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
                onClick={() => setActiveTab('inventory')}
              >
                <Package size={18} />
                <span>Mes Produits & Stocks ({products.length})</span>
              </button>

              <button 
                type="button" 
                className={`v-nav-item v-nav-highlight ${activeTab === 'addProduct' ? 'active' : ''}`}
                onClick={() => setActiveTab('addProduct')}
              >
                <PlusCircle size={18} />
                <span>Ajouter un Produit</span>
              </button>

              <button 
                type="button" 
                className={`v-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={18} />
                <span>Suivi des Commandes ({vendorOrders.length})</span>
              </button>
            </nav>

            {/* Main Content Area */}
            <main className="v-dash-content">

              {/* -----------------------------------------------------------
                  TAB 1: DASHBOARD & STATS
                  ----------------------------------------------------------- */}
              {activeTab === 'dashboard' && (
                <div className="v-tab-pane">
                  <div className="v-pane-header">
                    <div>
                      <h2>Tableau de Bord des Ventes</h2>
                      <p>Suivez l'activité et l'évolution financière de votre boutique en temps réel</p>
                    </div>
                    <button 
                      type="button" 
                      className="v-btn-accent"
                      onClick={() => setActiveTab('addProduct')}
                    >
                      <PlusCircle size={16} />
                      <span>Nouveau Produit</span>
                    </button>
                  </div>

                  {/* KPI Cards */}
                  <div className="v-kpi-grid">
                    <div className="v-kpi-card">
                      <div className="kpi-icon-wrap green-kpi">
                        <DollarSign size={22} />
                      </div>
                      <div className="kpi-data">
                        <span className="kpi-label">Chiffre d'Affaires Réalisé</span>
                        <h3 className="kpi-value">{formatPrice(totalVendorRevenue)}</h3>
                        <span className="kpi-trend positive">
                          <ArrowUpRight size={14} /> +24% ce mois-ci
                        </span>
                      </div>
                    </div>

                    <div className="v-kpi-card">
                      <div className="kpi-icon-wrap orange-kpi">
                        <ShoppingBag size={22} />
                      </div>
                      <div className="kpi-data">
                        <span className="kpi-label">Commandes Clients</span>
                        <h3 className="kpi-value">{vendorOrders.length}</h3>
                        <span className="kpi-trend positive">
                          <ArrowUpRight size={14} /> 100% payées & sécurisées
                        </span>
                      </div>
                    </div>

                    <div className="v-kpi-card">
                      <div className="kpi-icon-wrap blue-kpi">
                        <Package size={22} />
                      </div>
                      <div className="kpi-data">
                        <span className="kpi-label">Articles en Ligne</span>
                        <h3 className="kpi-value">{products.length}</h3>
                        <span className="kpi-subtext">Visibles sur MetaMall</span>
                      </div>
                    </div>

                    <div className="v-kpi-card">
                      <div className="kpi-icon-wrap yellow-kpi">
                        <Star size={22} />
                      </div>
                      <div className="kpi-data">
                        <span className="kpi-label">Satisfaction Boutique</span>
                        <h3 className="kpi-value">{vendorUser.rating || '4.9'} / 5</h3>
                        <span className="kpi-subtext">{vendorUser.reviewCount || 38} évaluations certifiées</span>
                      </div>
                    </div>
                  </div>

                  {/* Sales Evolution Chart & Insights */}
                  <div className="v-analytics-row">
                    <div className="v-chart-card">
                      <div className="v-chart-header">
                        <h4>Évolution Mensuelle des Ventes (FCFA)</h4>
                        <span className="v-chart-period">6 derniers mois</span>
                      </div>
                      <div className="v-bars-chart">
                        {[
                          { month: 'Avr', amount: 840000, height: '42%' },
                          { month: 'Mai', amount: 1120000, height: '56%' },
                          { month: 'Juin', amount: 1450000, height: '68%' },
                          { month: 'Juil', amount: 1890000, height: '80%' },
                          { month: 'Août', amount: 2210000, height: '88%' },
                          { month: 'Sept', amount: totalVendorRevenue, height: '100%', highlight: true }
                        ].map((bar, idx) => (
                          <div key={idx} className="chart-bar-col">
                            <span className="bar-tooltip">{formatPrice(bar.amount)}</span>
                            <div className="bar-track">
                              <div 
                                className={`bar-fill ${bar.highlight ? 'bar-current' : ''}`}
                                style={{ height: bar.height }}
                              />
                            </div>
                            <span className="bar-label">{bar.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="v-summary-card">
                      <h4>Performance des Canaux de Paiement</h4>
                      <div className="v-payment-breakdown">
                        <div className="p-break-row">
                          <span className="p-name">Wave Côte d'Ivoire</span>
                          <span className="p-share">46%</span>
                        </div>
                        <div className="p-bar"><div className="p-fill wave" style={{ width: '46%' }} /></div>

                        <div className="p-break-row">
                          <span className="p-name">Orange Money</span>
                          <span className="p-share">32%</span>
                        </div>
                        <div className="p-bar"><div className="p-fill orange" style={{ width: '32%' }} /></div>

                        <div className="p-break-row">
                          <span className="p-name">MTN MoMo & Cartes Bancaires</span>
                          <span className="p-share">22%</span>
                        </div>
                        <div className="p-bar"><div className="p-fill mtn" style={{ width: '22%' }} /></div>
                      </div>

                      <div className="v-quick-tip-box">
                        <strong>💡 Conseil Vendeur :</strong>
                        <p>Les articles avec au moins 2 photos et un rabais supérieur à 15% enregistrent 3x plus d'achats immédiats.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------------
                  TAB 2: INVENTORY & STOCK MANAGEMENT
                  ----------------------------------------------------------- */}
              {activeTab === 'inventory' && (
                <div className="v-tab-pane">
                  <div className="v-pane-header">
                    <div>
                      <h2>Catalogue & Stocks de la Boutique</h2>
                      <p>Gérez vos articles, surveillez vos disponibilités et ajustez vos tarifs</p>
                    </div>
                    <button 
                      type="button" 
                      className="v-btn-accent"
                      onClick={() => setActiveTab('addProduct')}
                    >
                      <PlusCircle size={16} />
                      <span>Ajouter un Article</span>
                    </button>
                  </div>

                  {/* Search and Filters */}
                  <div className="v-filter-toolbar">
                    <input 
                      type="text" 
                      placeholder="Rechercher par référence, titre..."
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      className="v-search-input"
                    />

                    <div className="v-filter-chips">
                      <button 
                        type="button" 
                        className={`chip-btn ${stockFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setStockFilter('all')}
                      >
                        Tous ({products.length})
                      </button>
                      <button 
                        type="button" 
                        className={`chip-btn ${stockFilter === 'inStock' ? 'active' : ''}`}
                        onClick={() => setStockFilter('inStock')}
                      >
                        En Stock
                      </button>
                      <button 
                        type="button" 
                        className={`chip-btn ${stockFilter === 'lowStock' ? 'active' : ''}`}
                        onClick={() => setStockFilter('lowStock')}
                      >
                        Stock Faible (&lt; 10)
                      </button>
                    </div>
                  </div>

                  {/* Inventory Table */}
                  <div className="v-table-responsive">
                    <table className="v-inventory-table">
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Catégorie</th>
                          <th>Prix Vente</th>
                          <th>Remise</th>
                          <th>Stock Disponible</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorInventory.map(prod => (
                          <tr key={prod.id}>
                            <td className="prod-cell">
                              <img 
                                src={prod.images?.[0] || '/images/boots-1.jpg'} 
                                alt={prod.title} 
                                className="table-prod-thumb" 
                              />
                              <div className="table-prod-info">
                                <strong>{prod.title}</strong>
                                <span className="sku-tag">SKU: {prod.sku || prod.id}</span>
                              </div>
                            </td>
                            <td>
                              <span className="cat-badge-simple">{prod.category}</span>
                            </td>
                            <td className="price-cell">
                              <strong>{formatPrice(prod.price)}</strong>
                              {prod.originalPrice > prod.price && (
                                <del>{formatPrice(prod.originalPrice)}</del>
                              )}
                            </td>
                            <td>
                              {prod.discount > 0 ? (
                                <span className="discount-pill-green">-{prod.discount}%</span>
                              ) : (
                                <span className="no-discount-pill">Prix net</span>
                              )}
                            </td>
                            <td>
                              <div className="stock-level-cell">
                                <span className={`stock-status-dot ${(prod.stock || 24) > 10 ? 'ok' : 'low'}`} />
                                <strong>{prod.stock || 24} unités</strong>
                              </div>
                            </td>
                            <td className="actions-cell">
                              <button 
                                type="button" 
                                className="action-btn-view"
                                title="Voir sur la boutique"
                                onClick={() => {
                                  setSelectedProduct(prod);
                                  setActiveModal('productDetail');
                                }}
                              >
                                <Eye size={15} />
                              </button>
                              <button 
                                type="button" 
                                className="action-btn-delete"
                                title="Supprimer cet article"
                                onClick={() => {
                                  if (window.confirm(`Confirmez-vous la suppression de "${prod.title}" ?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------------
                  TAB 3: COMPLETE PRODUCT CREATION TOOL WITH IMAGE UPLOAD (2MB)
                  ----------------------------------------------------------- */}
              {activeTab === 'addProduct' && (
                <div className="v-tab-pane">
                  <div className="v-pane-header">
                    <div>
                      <h2>Ajouter un Nouvel Article</h2>
                      <p>Renseignez les détails complets de votre produit et chargez vos photos</p>
                    </div>
                  </div>

                  <form className="v-add-product-form" onSubmit={handlePublishProduct}>
                    
                    {/* SECTION A: Informations de base */}
                    <div className="v-form-section">
                      <h3>1. Informations Essentielles</h3>
                      
                      <div className="v-form-group">
                        <label>Titre de l'article *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Ex: Bottes de Sécurité Chantier en Cuir Renforcé"
                          value={pTitle}
                          onChange={(e) => setPTitle(e.target.value)}
                        />
                      </div>

                      <div className="form-grid-2">
                        <div className="v-form-group">
                          <label>Catégorie MetaMall *</label>
                          <select 
                            value={pCategory} 
                            onChange={(e) => setPCategory(e.target.value)}
                          >
                            {productCategories.slice(1).map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="v-form-group">
                          <label>Quantité initiale en stock *</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="5000" 
                            required 
                            value={pStock}
                            onChange={(e) => setPStock(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="v-form-group">
                        <label>Description détaillée du produit *</label>
                        <textarea 
                          rows={3} 
                          required 
                          placeholder="Décrivez les atouts majeurs, l'utilité, la qualité des matériaux et les garanties offertes..."
                          value={pDescription}
                          onChange={(e) => setPDescription(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* SECTION B: Tarification & Promotions */}
                    <div className="v-form-section">
                      <h3>2. Tarification & Remises Promotionnelles</h3>
                      
                      <div className="form-grid-3">
                        <div className="v-form-group">
                          <label>Prix régulier / barré (FCFA) *</label>
                          <input 
                            type="number" 
                            min="500" 
                            step="500" 
                            required 
                            value={pOriginalPrice}
                            onChange={(e) => setPOriginalPrice(e.target.value)}
                          />
                        </div>

                        <div className="v-form-group">
                          <label>Pourcentage de réduction (%)</label>
                          <input 
                            type="number" 
                            min="0" 
                            max="90" 
                            value={pDiscount}
                            onChange={(e) => setPDiscount(e.target.value)}
                          />
                        </div>

                        <div className="v-form-group live-price-preview">
                          <label>Prix client calculé :</label>
                          <div className="v-price-result">
                            <span className="v-calc-final">{formatPrice(computedFinalPrice)}</span>
                            {savings > 0 && (
                              <span className="v-calc-savings">Économie : {formatPrice(savings)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION C: Upload d'images depuis l'ordinateur (Max 2 Mo) */}
                    <div className="v-form-section">
                      <div className="section-title-with-badge">
                        <h3>3. Photos du Produit (Téléchargement depuis votre appareil)</h3>
                        <span className="max-size-pill">
                          ⚠️ Taille max recommandée : 2 Mo par image
                        </span>
                      </div>

                      {imageError && (
                        <div className="v-image-alert">
                          <AlertTriangle size={18} />
                          <span>{imageError}</span>
                        </div>
                      )}

                      {/* Drag & Drop Zone */}
                      <div 
                        className={`v-dropzone ${isDragging ? 'dragging' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          multiple 
                          accept="image/*" 
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files) handleFiles(e.target.files);
                          }}
                        />
                        <div className="dropzone-inner">
                          <UploadCloud size={44} className="upload-cloud-icon" />
                          <h4>Glissez-déposez vos photos ici ou cliquez pour parcourir</h4>
                          <p>Formats supportés : JPG, PNG, WEBP • Taille maximale recommandée : <strong>2 Mo</strong></p>
                          <span className="btn-browse-files">Choisir des fichiers depuis mon ordinateur</span>
                        </div>
                      </div>

                      {/* Image Previews Gallery */}
                      {uploadedImages.length > 0 && (
                        <div className="v-previews-grid">
                          {uploadedImages.map((img, index) => (
                            <div key={img.id} className="v-preview-card">
                              <img src={img.dataUrl} alt={img.name} />
                              <div className="preview-overlay">
                                {index === 0 && <span className="main-image-tag">Couverture</span>}
                                <span className={`image-size-tag ${img.isOverLimit ? 'warning' : ''}`}>
                                  {img.sizeMB} Mo
                                </span>
                                <button 
                                  type="button" 
                                  className="btn-del-img"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(img.id);
                                  }}
                                  title="Supprimer cette image"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* SECTION D: Tailles / Pointures & Couleurs */}
                    <div className="v-form-section">
                      <h3>4. Déclinaisons (Pointures, Tailles & Couleurs)</h3>

                      {/* Tailles / Pointures */}
                      <div className="v-form-group">
                        <label>Pointures ou Tailles disponibles :</label>
                        <div className="chips-manager-row">
                          {pSizes.map(sz => (
                            <span key={sz} className="v-variant-chip">
                              {sz}
                              <button type="button" onClick={() => handleRemoveSize(sz)}>×</button>
                            </span>
                          ))}
                        </div>
                        <div className="add-subchip-row">
                          <input 
                            type="text" 
                            placeholder="Ajouter une pointure/taille (ex: 45, XL...)"
                            value={customSizeInput}
                            onChange={(e) => setCustomSizeInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }}
                          />
                          <button type="button" onClick={handleAddSize} className="btn-add-chip">
                            Ajouter
                          </button>
                        </div>
                      </div>

                      {/* Couleurs */}
                      <div className="v-form-group">
                        <label>Couleurs disponibles :</label>
                        <div className="chips-manager-row">
                          {pColors.map(c => (
                            <span key={c.name} className="v-color-chip">
                              <span className="chip-color-dot" style={{ backgroundColor: c.hex }} />
                              {c.name}
                              <button type="button" onClick={() => handleRemoveColor(c.name)}>×</button>
                            </span>
                          ))}
                        </div>
                        <div className="add-subchip-row color-picker-row">
                          <input 
                            type="text" 
                            placeholder="Nom de couleur (ex: Bleu Marine)"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                          />
                          <input 
                            type="color" 
                            value={newColorHex}
                            onChange={(e) => setNewColorHex(e.target.value)}
                            className="color-wheel-input"
                            title="Choisir la couleur"
                          />
                          <button type="button" onClick={handleAddColor} className="btn-add-chip">
                            Ajouter Couleur
                          </button>
                        </div>
                      </div>

                      {/* Versions / Modèles */}
                      <div className="v-form-group">
                        <label>Modèles ou Versions avec supplément :</label>
                        <div className="chips-manager-row">
                          {pModels.map(m => (
                            <span key={m.name} className="v-model-chip">
                              {m.name} {m.extraPrice > 0 ? `(+${formatPrice(m.extraPrice)})` : ''}
                              <button type="button" onClick={() => handleRemoveModel(m.name)}>×</button>
                            </span>
                          ))}
                        </div>
                        <div className="add-subchip-row">
                          <input 
                            type="text" 
                            placeholder="Nom version (ex: Version Renforcée)"
                            value={newModelName}
                            onChange={(e) => setNewModelName(e.target.value)}
                          />
                          <input 
                            type="number" 
                            min="0" 
                            step="500" 
                            placeholder="Supplément FCFA (optionnel)"
                            value={newModelPrice}
                            onChange={(e) => setNewModelPrice(e.target.value)}
                            style={{ maxWidth: '140px' }}
                          />
                          <button type="button" onClick={handleAddModel} className="btn-add-chip">
                            Ajouter Modèle
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SECTION E: Spécifications */}
                    <div className="v-form-section">
                      <h3>5. Spécifications & Points forts</h3>
                      <div className="v-form-group">
                        <label>Points forts (séparés par des virgules)</label>
                        <input 
                          type="text" 
                          placeholder="Embout acier 200J, Semelle anti-perforation, Cuir imperméable"
                          value={pFeatures}
                          onChange={(e) => setPFeatures(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Form Submit Actions */}
                    <div className="v-form-submit-bar">
                      <button 
                        type="button" 
                        className="btn-cancel-form"
                        onClick={() => setActiveTab('inventory')}
                      >
                        Annuler
                      </button>

                      <button type="submit" className="btn-publish-product">
                        <Sparkles size={18} />
                        <span>🚀 Publier cet Article sur MetaMall</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* -----------------------------------------------------------
                  TAB 4: ORDERS & SALES TRACKING
                  ----------------------------------------------------------- */}
              {activeTab === 'orders' && (
                <div className="v-tab-pane">
                  <div className="v-pane-header">
                    <div>
                      <h2>Suivi des Ventes & Commandes</h2>
                      <p>Consultez les commandes enregistrées et expédiez vos colis rapidement</p>
                    </div>
                  </div>

                  <div className="v-table-responsive">
                    <table className="v-inventory-table">
                      <thead>
                        <tr>
                          <th>N° Commande</th>
                          <th>Date</th>
                          <th>Client</th>
                          <th>Article & Déclinaison</th>
                          <th>Montant Payé</th>
                          <th>Paiement</th>
                          <th>Statut Commande</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorOrders.map(ord => (
                          <tr key={ord.id}>
                            <td className="order-id-cell">
                              <strong>{ord.id}</strong>
                            </td>
                            <td className="date-cell">
                              <span className="order-date-text">{ord.date}</span>
                            </td>
                            <td>
                              <div className="client-meta">
                                <strong>{ord.customer}</strong>
                                <span className="client-phone">{ord.phone}</span>
                              </div>
                            </td>
                            <td>
                              <div className="ordered-item-cell">
                                <span className="item-title">{ord.item}</span>
                                <span className="item-variant">{ord.variant}</span>
                              </div>
                            </td>
                            <td className="price-cell">
                              <strong>{formatPrice(ord.total)}</strong>
                            </td>
                            <td>
                              <span className="payment-method-pill">{ord.payment}</span>
                            </td>
                            <td>
                              <span className={`status-pill ${
                                ord.status === 'Livré' ? 'delivered' : 
                                ord.status === 'Expédiée' ? 'shipped' : 'pending'
                              }`}>
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  );
};
