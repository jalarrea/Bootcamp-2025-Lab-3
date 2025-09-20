import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

  // Función para registrar un nuevo usuario
  const register = (userData) => {
    const { email, password, firstName, lastName, age } = userData;
    
    console.log('Registrando usuario:', userData);
    console.log('Usuarios actuales antes del registro:', users);
    
    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // En una app real, esto debería estar hasheado
      firstName,
      lastName,
      age: age, // Ya viene como número desde el componente
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Nuevo usuario creado:', newUser);

    // Agregar usuario a la lista
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      console.log('Lista de usuarios actualizada:', updatedUsers);
      return updatedUsers;
    });
    
    return newUser;
  };

  // Función para iniciar sesión
  const login = (email, password) => {
    console.log('Intentando login con:', { email, password });
    console.log('Usuarios disponibles para login:', users);
    
    const user = users.find(user => {
      console.log('Comparando con usuario:', { userEmail: user.email, userPassword: user.password });
      return user.email === email && user.password === password;
    });
    
    if (!user) {
      console.log('No se encontró usuario con esas credenciales');
      throw new Error('Credenciales incorrectas');
    }

    console.log('Login exitoso para:', user);
    setCurrentUser(user);
    return user;
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
  };

  // Función para actualizar un usuario
  const updateUser = (userId, updatedData) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, ...updatedData, updatedAt: new Date().toISOString() }
          : user
      )
    );

    // Si el usuario actualizado es el usuario actual, actualizar también currentUser
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prevUser => ({ ...prevUser, ...updatedData, updatedAt: new Date().toISOString() }));
    }
  };

  // Función para eliminar un usuario
  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    // Si el usuario eliminado es el usuario actual, cerrar sesión
    if (currentUser && currentUser.id === userId) {
      logout();
    }
  };

  // Función para verificar si el usuario actual es admin (primer usuario registrado)
  const isAdmin = () => {
    if (!currentUser || users.length === 0) return false;
    return currentUser.id === users[0].id;
  };

  const value = {
    users,
    currentUser,
    register,
    login,
    logout,
    updateUser,
    deleteUser,
    isAdmin,
    isAuthenticated: !!currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
