import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage de forma reactiva
 * @param {string} key - La clave del localStorage
 * @param {any} defaultValue - Valor por defecto si no existe la clave
 * @returns {[any, function]} - [valor, setter]
 */
export const useLocalStorage = (key, defaultValue) => {
  // Función para obtener el valor inicial del localStorage
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Función para actualizar el valor en localStorage y estado
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para ser consistente con useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Escuchar cambios en localStorage desde otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : defaultValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, defaultValue]);

  return [storedValue, setValue];
};
