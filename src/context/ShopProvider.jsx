import React, { useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { initialCategories, categoryHelpers } from '../data/categoriesData';
import { ShopContext } from './ShopContext';

export const ShopProvider = ({ children }) => {
  // Load products from localStorage or default
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('metamall_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialProducts;
  });

  // Categories architecture (extensible from backend)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('metamall_categories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialCategories;
  });

  // Category Drawer Open/Close state
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('metamall_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('metamall_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['p-boots'];
  });

  // User
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('metamall_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null; // not logged in initially
  });

  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState("Tous les articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // 'featured', 'price-asc', 'price-desc', 'discount-desc', 'rating-desc'
  const [currency, setCurrency] = useState("FCFA"); // 'FCFA', 'EUR', 'USD'

  // Modals & Navigation state
  const [activeModal, setActiveModal] = useState(null); // 'productDetail', 'cart', 'checkout', 'auth', 'profile', 'addEditProduct', 'info'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [infoModalType, setInfoModalType] = useState('faq'); // 'faq', 'returns', 'privacy', 'contact'
  
  // Orders history
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('metamall_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Toasts
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('metamall_products', JSON.stringify(products));
    } catch (e) { console.error(e); }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('metamall_cart', JSON.stringify(cart));
    } catch (e) { console.error(e); }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('metamall_wishlist', JSON.stringify(wishlist));
    } catch (e) { console.error(e); }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('metamall_user', JSON.stringify(user));
    } catch (e) { console.error(e); }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('metamall_orders', JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('metamall_categories', JSON.stringify(categories));
    } catch (e) { console.error(e); }
  }, [categories]);

  // Category management methods (Backend / Admin ready)
  const addCategory = (newCat) => {
    const created = categoryHelpers.createCategory(newCat);
    setCategories(prev => [...prev, created]);
    showToast(`Catégorie "${created.name}" ajoutée !`, 'success');
  };

  const updateCategory = (catId, updatedFields) => {
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, ...updatedFields } : c));
    showToast("Catégorie mise à jour !", "success");
  };

  const removeCategory = (catId) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
    showToast("Catégorie supprimée", "info");
  };

  const addSubcategory = (catId, subName) => {
    const sub = categoryHelpers.createSubcategory(catId, subName);
    setCategories(prev => prev.map(c => {
      if (c.id === catId) {
        return { ...c, subcategories: [...(c.subcategories || []), sub] };
      }
      return c;
    }));
    showToast(`Sous-catégorie "${subName}" ajoutée !`, "success");
  };

  const removeSubcategory = (catId, subId) => {
    setCategories(prev => prev.map(c => {
      if (c.id === catId) {
        return { ...c, subcategories: (c.subcategories || []).filter(s => s.id !== subId) };
      }
      return c;
    }));
    showToast("Sous-catégorie retirée", "info");
  };

  const selectCategoryFromDrawer = (categoryName, subcategoryName = null) => {
    setSelectedCategory(categoryName);
    setActiveSubcategory(subcategoryName);
    setCategoryDrawerOpen(false);
    if (subcategoryName) {
      setSearchQuery(subcategoryName);
    } else {
      setSearchQuery("");
    }
  };

  // Price formatting helper
  const formatPrice = (amountInFcfa) => {
    if (!amountInFcfa && amountInFcfa !== 0) return '0 FCFA';
    if (currency === 'EUR') {
      const val = amountInFcfa / 655.957;
      return `${val.toFixed(2)} €`;
    }
    if (currency === 'USD') {
      const val = amountInFcfa / 605.0;
      return `$${val.toFixed(2)}`;
    }
    // Default FCFA
    return `${amountInFcfa.toLocaleString('fr-FR')} FCFA`;
  };

  // Add / Edit Product
  const saveProduct = (newOrUpdatedProduct) => {
    setProducts(prev => {
      const index = prev.findIndex(p => p.id === newOrUpdatedProduct.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...newOrUpdatedProduct };
        return updated;
      } else {
        return [newOrUpdatedProduct, ...prev];
      }
    });
    showToast(newOrUpdatedProduct.id ? "Article mis à jour avec succès !" : "Nouvel article ajouté au catalogue !", "success");
  };

  // Update specific product price and discount
  const updateProductPrice = (productId, newOriginalPrice, newDiscount) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const orig = Number(newOriginalPrice);
        const disc = Number(newDiscount);
        const finalPrice = Math.round(orig * (1 - disc / 100));
        return {
          ...p,
          originalPrice: orig,
          discount: disc,
          price: finalPrice
        };
      }
      return p;
    }));
    showToast("Tarif et remise mis à jour avec succès !", "success");
  };

  // Add Product Review
  const addProductReview = (productId, reviewData) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedReviews = [
          {
            id: 'rev-' + Date.now(),
            author: reviewData.author || (user ? user.name : "Acheteur Vérifié"),
            rating: reviewData.rating,
            comment: reviewData.comment,
            date: "Aujourd'hui",
            verified: true,
            sizeBought: reviewData.sizeBought || null
          },
          ...(p.reviews || [])
        ];
        const newTotalRatings = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newAvg = (newTotalRatings / updatedReviews.length).toFixed(1);
        return {
          ...p,
          rating: Number(newAvg),
          reviewCount: (p.reviewCount || 0) + 1,
          reviews: updatedReviews
        };
      }
      return p;
    }));
    showToast("Votre avis a été publié avec succès !", "success");
  };

  // Cart operations
  const addToCart = (product, options = {}) => {
    const {
      size = product.sizes?.[0] || "Standard",
      color = product.colors?.[0]?.name || "Standard",
      model = product.models?.[0]?.name || "Standard",
      extraPrice = product.models?.[0]?.extraPrice || 0,
      quantity = 1
    } = options;

    const cartKey = `${product.id}-${size}-${color}-${model}`;
    const unitFinalPrice = (product.price || 0) + extraPrice;
    const unitOriginalPrice = (product.originalPrice || 0) + extraPrice;

    setCart(prev => {
      const existing = prev.find(item => item.cartKey === cartKey);
      if (existing) {
        return prev.map(item => 
          item.cartKey === cartKey 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartKey,
            productId: product.id,
            title: product.title,
            image: product.images?.[0] || '',
            category: product.category,
            size,
            color,
            model,
            unitPrice: unitFinalPrice,
            unitOriginalPrice,
            discount: product.discount,
            quantity
          }
        ];
      }
    });

    showToast(`"${product.title.slice(0, 30)}..." ajouté au panier !`, "success");
  };

  const updateCartQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartKey === cartKey ? { ...item, quantity: newQty } : item
    ));
  };

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
    showToast("Article retiré du panier", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Retiré de vos favoris", "info");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Ajouté à vos favoris !", "success");
        return [...prev, productId];
      }
    });
  };

  // Auth
  const loginWithGoogle = () => {
    const mockGoogleUser = {
      name: "Alexandre Kouassi",
      email: "alexandre.kouassi@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      phone: "+225 07 88 45 12 30",
      address: "Cocody Angré 8ème Tranche, Abidjan",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      provider: "Google"
    };
    setUser(mockGoogleUser);
    setActiveModal(null);
    showToast("Connecté avec succès via votre compte Google !", "success");
  };

  const loginWithEmail = (email, password, name) => {
    const newUser = {
      name: name || email.split('@')[0],
      email,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      phone: "+225 05 12 34 56 78",
      address: "Plateau Dokui, Abidjan",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      provider: "Email"
    };
    setUser(newUser);
    setActiveModal(null);
    showToast("Connexion réussie !", "success");
  };

  const logout = () => {
    setUser(null);
    setActiveModal(null);
    showToast("Vous avez été déconnecté.", "info");
  };

  // Open product detail
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setActiveModal('productDetail');
  };

  // Open info modal
  const openInfoModal = (type) => {
    setInfoModalType(type);
    setActiveModal('info');
  };

  // Record Order
  const createOrder = (orderData) => {
    const newOrder = {
      id: 'CMD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Cart total calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + (item.unitOriginalPrice * item.quantity), 0);
  const cartSavings = cartOriginalTotal > cartSubtotal ? cartOriginalTotal - cartSubtotal : 0;
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        saveProduct,
        updateProductPrice,
        addProductReview,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartOriginalTotal,
        cartSavings,
        cartItemCount,
        wishlist,
        toggleWishlist,
        user,
        loginWithGoogle,
        loginWithEmail,
        logout,
        categories,
        categoryDrawerOpen,
        setCategoryDrawerOpen,
        activeSubcategory,
        setActiveSubcategory,
        selectCategoryFromDrawer,
        addCategory,
        updateCategory,
        removeCategory,
        addSubcategory,
        removeSubcategory,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        currency,
        setCurrency,
        formatPrice,
        activeModal,
        setActiveModal,
        selectedProduct,
        setSelectedProduct,
        openProductDetail,
        infoModalType,
        setInfoModalType,
        openInfoModal,
        orders,
        createOrder,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
