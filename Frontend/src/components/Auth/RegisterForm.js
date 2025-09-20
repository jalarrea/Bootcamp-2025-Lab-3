import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { register, login, setCurrentUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes cuando el usuario empiece a escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.age) {
        throw new Error('Todos los campos son obligatorios');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor ingresa un email válido');
      }

      // Validar longitud de contraseña
      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Validar edad
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 1 || age > 120) {
        throw new Error('Por favor ingresa una edad válida (1-120 años)');
      }

      // Registrar usuario
      const newUser = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age)
      });

      setSuccess('¡Cuenta creada exitosamente! Iniciando sesión...');
      
      // Auto-login inmediato usando el usuario recién creado
      try {
        console.log('Usuario recién registrado:', newUser);
        console.log('Intentando auto-login inmediato');
        
        // Usar directamente el newUser para hacer login
        setCurrentUser(newUser);
        
      } catch (error) {
        console.error('Error en auto-login:', error);
        setError('Usuario creado, pero hubo un problema con el login automático. Intenta iniciar sesión manualmente.');
        setSuccess('');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Crear Cuenta</h1>
          <p>Únete a nuestra plataforma</p>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                placeholder="Tu nombre"
                disabled={loading}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                placeholder="Tu apellido"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input"
              placeholder="Tu edad"
              min="1"
              max="120"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Mínimo 6 caracteres"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="Repite tu contraseña"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-switch">
          <span>¿Ya tienes cuenta? </span>
          <button onClick={onSwitchToLogin}>
            Inicia sesión aquí
          </button>
        </div>

        {/* Botón temporal para debug */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => {
              if (window.confirm('¿Limpiar localStorage? Esto eliminará todos los datos.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            style={{
              background: 'none',
              border: '1px solid #dc2626',
              color: '#dc2626',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            🗑️ Limpiar Datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
