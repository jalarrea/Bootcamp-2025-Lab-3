import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          👥 Gestión de Usuarios
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#6b7280' }}>
            Bienvenido, <strong>{currentUser?.firstName} {currentUser?.lastName}</strong>
          </span>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
