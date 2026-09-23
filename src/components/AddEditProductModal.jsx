import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, PlusCircle, Edit3, Check } from 'lucide-react';
import { productCategories } from '../data/products';

export const AddEditProductModal = () => {
  const { 
    products, 
    saveProduct, 
    updateProductPrice, 
    selectedProduct, 
    setActiveModal,
    formatPrice
  } = useShop();

  const [activeTab, setActiveTab] = useState(selectedProduct ? 'edit' : 'add'); // 'edit' or 'add'

  // Edit existing price state
  const [editProductId, setEditProductId] = useState(selectedProduct ? selectedProduct.id : products[0]?.id || "");
  const currentEditingProduct = products.find(p => p.id === editProductId) || products[0];

  const [newOriginalPrice, setNewOriginalPrice] = useState(currentEditingProduct?.originalPrice || 72000);
  const [newDiscount, setNewDiscount] = useState(currentEditingProduct?.discount || 20);

  // Add new product state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Vêtements & Chaussures");
  const [addOriginalPrice, setAddOriginalPrice] = useState(60000);
  const [addDiscount, setAddDiscount] = useState(15);
  const [newImageUrl, setNewImageUrl] = useState("/images/boots-1.jpg");
  const [newSizes, setNewSizes] = useState("40, 41, 42, 43, 44");
  const [newColors, setNewColors] = useState("Noir, Marron, Kaki");
  const [newDescription, setNewDescription] = useState("");

  const handleProductSelectChange = (id) => {
    setEditProductId(id);
    const prod = products.find(p => p.id === id);
    if (prod) {
      setNewOriginalPrice(prod.originalPrice || prod.price);
      setNewDiscount(prod.discount || 0);
    }
  };

  const handleSavePrice = (e) => {
    e.preventDefault();
    updateProductPrice(editProductId, newOriginalPrice, newDiscount);
    setActiveModal(null);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const orig = Number(addOriginalPrice);
    const disc = Number(addDiscount);
    const calculatedFinalPrice = Math.round(orig * (1 - disc / 100));

    const productToAdd = {
      id: 'p-' + Date.now(),
      title: newTitle.trim() || "Nouvel Article MetaMall",
      category: newCategory,
      originalPrice: orig,
      discount: disc,
      price: calculatedFinalPrice,
      rating: 5.0,
      reviewCount: 1,
      badge: disc > 0 ? `Promo -${disc}%` : "Nouveau",
      images: [newImageUrl.trim() || "/images/boots-1.jpg"],
      sizes: newSizes ? newSizes.split(',').map(s => s.trim()).filter(Boolean) : ["Standard"],
      colors: newColors ? newColors.split(',').map((c, i) => ({
        name: c.trim(),
        hex: i === 0 ? "#111" : i === 1 ? "#5c3a21" : "#4b5320",
        border: "#888"
      })) : [{ name: "Standard", hex: "#111", border: "#888" }],
      models: [{ name: "Version Standard", extraPrice: 0 }],
      description: newDescription.trim() || "Article de qualité supérieure sélectionné par MetaMall.",
      stock: 30,
      sku: "MM-" + Math.floor(1000 + Math.random() * 9000),
      reviews: []
    };

    saveProduct(productToAdd);
    setActiveModal(null);
  };

  const computedEditFinalPrice = Math.round(Number(newOriginalPrice) * (1 - Number(newDiscount) / 100));
  const computedAddFinalPrice = Math.round(Number(addOriginalPrice) * (1 - Number(addDiscount) / 100));

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="admin-product-panel" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={() => setActiveModal(null)}
        >
          <X size={20} />
        </button>

        <div className="admin-panel-header">
          <div className="admin-tag">Espace Vendeur & Gestion</div>
          <h2>Gestion des Articles & Tarifs</h2>
        </div>

        {/* Tab switcher */}
        <div className="admin-tabs-row">
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <Edit3 size={16} />
            <span>Modifier un Prix & Remise</span>
          </button>
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <PlusCircle size={16} />
            <span>Ajouter un Nouvel Article</span>
          </button>
        </div>

        {/* TAB 1: EDIT PRICE & DISCOUNT */}
        {activeTab === 'edit' && (
          <form className="admin-form" onSubmit={handleSavePrice}>
            <div className="form-field">
              <label>Sélectionner l'article à modifier :</label>
              <select 
                value={editProductId} 
                onChange={(e) => handleProductSelectChange(e.target.value)}
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({formatPrice(p.price)})
                  </option>
                ))}
              </select>
            </div>

            {currentEditingProduct && (
              <div className="product-preview-strip">
                <img src={currentEditingProduct.images?.[0]} alt="" />
                <div>
                  <strong>{currentEditingProduct.title}</strong>
                  <p>Catégorie : {currentEditingProduct.category}</p>
                </div>
              </div>
            )}

            <div className="form-grid-2">
              <div className="form-field">
                <label>Prix Normal de Base (FCFA) :</label>
                <input 
                  type="number" 
                  min="0"
                  step="500"
                  required
                  value={newOriginalPrice}
                  onChange={(e) => setNewOriginalPrice(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Pourcentage de réduction (%) :</label>
                <input 
                  type="number" 
                  min="0"
                  max="90"
                  required
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                />
              </div>
            </div>

            {/* Calculated Final Price Alert */}
            <div className="price-calc-summary">
              <div>
                <span>Prix normal barré :</span>
                <strong>{formatPrice(Number(newOriginalPrice))}</strong>
              </div>
              <div>
                <span>Remise appliquée :</span>
                <strong className="text-red">-{newDiscount}%</strong>
              </div>
              <div className="final-highlight">
                <span>Prix final affiché au client :</span>
                <strong className="final-price-text">{formatPrice(computedEditFinalPrice)}</strong>
              </div>
            </div>

            <button type="submit" className="btn-admin-submit">
              <Check size={16} />
              <span>Enregistrer les nouveaux tarifs</span>
            </button>
          </form>
        )}

        {/* TAB 2: ADD NEW PRODUCT */}
        {activeTab === 'add' && (
          <form className="admin-form" onSubmit={handleCreateProduct}>
            <div className="form-field">
              <label>Titre de l'article :</label>
              <input 
                type="text" 
                required 
                placeholder="Ex: Bottes Tout-Terrain Pro en Cuir"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Rayon / Catégorie :</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  {productCategories.filter(c => c !== "Tous les articles").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>URL ou Chemin de l'image :</label>
                <input 
                  type="text" 
                  placeholder="/images/boots-1.jpg ou URL web"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Prix normal initial (FCFA) :</label>
                <input 
                  type="number" 
                  min="0"
                  step="500"
                  required
                  value={addOriginalPrice}
                  onChange={(e) => setAddOriginalPrice(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Pourcentage de remise (%) :</label>
                <input 
                  type="number" 
                  min="0"
                  max="90"
                  required
                  value={addDiscount}
                  onChange={(e) => setAddDiscount(e.target.value)}
                />
              </div>
            </div>

            <div className="price-calc-summary">
              <span>Prix final calculé : </span>
              <strong className="final-price-text">{formatPrice(computedAddFinalPrice)}</strong>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Pointures / Tailles (séparées par des virgules) :</label>
                <input 
                  type="text" 
                  placeholder="39, 40, 41, 42, 43, 44, 45"
                  value={newSizes}
                  onChange={(e) => setNewSizes(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Couleurs (séparées par des virgules) :</label>
                <input 
                  type="text" 
                  placeholder="Noir, Kaki, Marron"
                  value={newColors}
                  onChange={(e) => setNewColors(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Description du produit :</label>
              <textarea 
                rows={2}
                placeholder="Spécifications, matériaux, avantages..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-admin-submit">
              <PlusCircle size={16} />
              <span>Publier l'article sur la boutique</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
