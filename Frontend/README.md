# 👥 Frontend - Sistema de Gestión de Usuarios

Aplicación React moderna para gestionar usuarios con autenticación completa y operaciones CRUD. Parte del proyecto Bootcamp 2025 - Lab 3.

## ✨ Características

- **🔐 Autenticación completa**: Login y registro de usuarios
- **👤 Gestión de usuarios**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **💾 Persistencia local**: Todos los datos se almacenan en localStorage
- **🎨 Interfaz moderna**: Diseño responsive y atractivo
- **🛡️ Validaciones**: Validación de formularios y manejo de errores
- **👑 Sistema de roles**: El primer usuario registrado es administrador

## 🚀 Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar la aplicación:**
   ```bash
   npm start
   ```

3. **Abrir en el navegador:**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

## 📱 Funcionalidades

### Autenticación
- **Registro**: Crear nueva cuenta con nombre, apellido, email y contraseña
- **Login**: Iniciar sesión con email y contraseña
- **Logout**: Cerrar sesión de forma segura

### Gestión de Usuarios
- **Ver usuarios**: Tabla con todos los usuarios registrados
- **Crear usuario**: Agregar nuevos usuarios al sistema
- **Editar usuario**: Modificar información de usuarios existentes
- **Eliminar usuario**: Remover usuarios del sistema
- **Búsqueda visual**: Avatares con iniciales y estados de usuario

### Características Técnicas
- **localStorage**: Persistencia de datos local
- **React Context**: Manejo de estado global
- **Hook personalizado**: `useLocalStorage` para sincronización reactiva
- **Validaciones**: Email, contraseñas y campos obligatorios
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthPage.js          # Página principal de autenticación
│   │   ├── LoginForm.js         # Formulario de login
│   │   └── RegisterForm.js      # Formulario de registro
│   └── Dashboard/
│       ├── Dashboard.js         # Panel principal
│       ├── Header.js           # Cabecera con navegación
│       ├── UsersTable.js       # Tabla de usuarios
│       └── UserModal.js        # Modal para crear/editar usuarios
├── context/
│   └── AuthContext.js          # Context para autenticación y usuarios
├── hooks/
│   └── useLocalStorage.js      # Hook personalizado para localStorage
├── App.js                      # Componente principal
├── index.js                    # Punto de entrada
└── index.css                   # Estilos globales
```

## 📋 Dependencias Principales

- **React 18**: Framework principal
- **use-local-storage-state**: Librería para manejo de localStorage
- **lucide-react**: Iconos modernos (opcional)

## 🎯 Casos de Uso

1. **Primer uso**: Registra tu cuenta (serás administrador)
2. **Gestión diaria**: Login, ver usuarios, crear/editar/eliminar
3. **Administración**: El primer usuario puede gestionar todos los demás
4. **Persistencia**: Todos los datos se mantienen entre sesiones

## 🔒 Seguridad

- Validación de formularios en el frontend
- Verificación de duplicados de email
- Protección contra auto-eliminación
- Validación de formato de email y longitud de contraseña

## 🎨 Interfaz

- Diseño moderno con gradientes y sombras
- Animaciones suaves en botones y elementos
- Tabla responsive con información detallada
- Modales para edición con validación en tiempo real
- Mensajes de error y éxito informativos

---

**¡Listo para usar!** 🚀 Solo ejecuta `npm start` y comienza a gestionar usuarios.
