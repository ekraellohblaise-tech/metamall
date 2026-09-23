import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export const AuthModal = () => {
  const { setActiveModal, loginWithGoogle, loginWithEmail } = useShop();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithEmail(email, password, name);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="auth-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={() => setActiveModal(null)}
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-logo-badge">MetaMall</div>
          <h2>{isRegisterMode ? "Créer un compte client" : "Bienvenue sur MetaMall"}</h2>
          <p className="auth-subtitle">
            Accédez à vos commandes, vos favoris et profitez des promotions exclusives.
          </p>
        </div>

        {/* 1-Click Google / Gmail Login Button */}
        <div className="auth-quick-providers">
          <button 
            type="button" 
            className="btn-google-login"
            onClick={loginWithGoogle}
          >
            <svg className="google-icon-svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continuer avec Google (Gmail)</span>
          </button>
        </div>

        <div className="auth-separator">
          <span>ou avec votre adresse e-mail</span>
        </div>

        {/* Email Password Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <div className="form-field">
              <label>Nom complet :</label>
              <div className="input-with-icon">
                <User size={16} />
                <input 
                  type="text" 
                  placeholder="Ex: Alexandre Kouassi"
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-field">
            <label>Adresse e-mail :</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input 
                type="email" 
                placeholder="votre.email@exemple.com"
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Mot de passe :</label>
            <div className="input-with-icon">
              <Lock size={16} />
              <input 
                type="password" 
                placeholder="••••••••"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-submit">
            {isRegisterMode ? "Créer mon compte" : "Se connecter"}
          </button>
        </form>

        <div className="auth-toggle-footer">
          {isRegisterMode ? (
            <p>
              Vous possédez déjà un compte ?{" "}
              <button type="button" onClick={() => setIsRegisterMode(false)}>
                Connectez-vous ici
              </button>
            </p>
          ) : (
            <p>
              Pas encore de compte ?{" "}
              <button type="button" onClick={() => setIsRegisterMode(true)}>
                Inscrivez-vous gratuitement
              </button>
            </p>
          )}
        </div>

        <div className="auth-security-badge">
          <ShieldCheck size={14} />
          <span>Données protégées et conformité RGPD</span>
        </div>
      </div>
    </div>
  );
};
