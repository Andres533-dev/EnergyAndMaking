# 📡 Guía de Integración: Base de Datos (Supabase) + Frontend

## 🏗️ Arquitectura General

La aplicación está estructurada en capas para separar la lógica de la base de datos del frontend:

```
┌─────────────────────────────────────────┐
│        Componentes React               │
│  (AuthView, CartView, HomeView, etc)   │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│        Hooks Personalizados (Hooks)    │
│  (useAuth, useProducts, useOrders)     │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Servicios Supabase                │
│ (Authservice, Productservice, etc)     │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Cliente Supabase                  │
│  (Client.js - Configuración)           │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Base de Datos Supabase            │
│  (PostgreSQL + Auth + Storage)         │
└─────────────────────────────────────────┘
```

---

## 📁 Estructura de Archivos

### **Servicios de Supabase** (`/Components/`)
Funciones puras que interactúan directamente con la BD:

- **`Client.js`** - Inicializa el cliente de Supabase
  - Valida variables de entorno
  - Configura autenticación persistente
  
- **`Authservice.js`** - Operaciones de autenticación
  - `register(name, email, password)` - Crear cuenta
  - `login(email, password)` - Iniciar sesión
  - `logout()` - Cerrar sesión
  - `getSession()` - Obtener sesión actual
  - `onAuthStateChange(callback)` - Escuchar cambios de sesión

- **`Profileservice.js`** - Gestión de perfiles de usuario
  - `getProfile(userId)` - Obtener datos del usuario
  - `updateProfile(userId, updates)` - Actualizar perfil

- **`Productservice.js`** - Gestión de productos/ferretería
  - `getProducts()` - Listar todos los productos
  - `getProductsByCategory(categoryId)` - Filtrar por categoría
  - `searchProducts(query)` - Búsqueda por texto
  - `createProduct(payload, adminId)` - Crear producto (admin)
  - `updateProduct(productId, updates)` - Editar producto (admin)
  - `deleteProduct(productId)` - Eliminar producto (admin)

- **`Orderservice.js`** - Gestión de pedidos
  - `createOrder(userId, cartItems)` - Crear pedido desde carrito
  - `getUserOrders(userId)` - Historial de pedidos del usuario

### **Hooks Personalizados** (`/Components/`)
Encapsulan la lógica de estado y cacheado:

- **`Useauth.js`** - Hook de autenticación
  ```javascript
  const { user, profile, isAuthenticated, loading, login, register, logout } = useAuth();
  ```
  - Gestiona sesión del usuario
  - Sincroniza cambios de sesión en tiempo real
  - Carga el perfil completo del usuario

- **`Useproducts.js`** - Hook de productos
  ```javascript
  const { products, loading, error, fetchAll, search, filterByCategory, 
          createProduct, updateProduct, deleteProduct } = useProducts();
  ```
  - Carga y cachea productos
  - Funciones de búsqueda y filtrado

- **`Useorders.js`** - Hook de órdenes
  ```javascript
  const { orders, loading, error, fetchOrders, placeOrder } = useOrders(userId);
  ```
  - Historial de pedidos del usuario
  - Crear pedido desde carrito

### **Contextos Globales** (`/Components/`)
Comparten estado a toda la aplicación:

- **`AuthContext.jsx`** - Proporciona `useAuthContext()`
- **`ProductContext.jsx`** - Proporciona `useProductContext()`

---

## 🔄 Flujo de Datos: Ejemplo Práctico

### **1. Autenticación - Login**

```
Usuario escribe email/password
              ↓
        AuthView.jsx
              ↓
      useAuth() hook
              ↓
   Authservice.login()
              ↓
   supabase.auth.signInWithPassword()
              ↓
    Supabase devuelve user + session
              ↓
 useAuth() guarda en estado local
              ↓
  onLoginSuccess() → cambiar vista a "home"
```

**Código:**
```jsx
// En AuthView.jsx
const { login } = useAuth();
const handleLogin = async () => {
  const { error } = await login(email, password);
  if (!error) onLoginSuccess?.();
};
```

---

### **2. Cargar Productos - Ferretería**

```
Ferreteria.jsx monta
              ↓
    useProducts() hook
              ↓
  useEffect en el hook
              ↓
  Productservice.getProducts()
              ↓
  supabase.from('products').select()
              ↓
  Supabase devuelve array de productos
              ↓
 setProducts() en el hook
              ↓
  Componente re-renderiza con productos
```

**Código:**
```jsx
// En Ferreteria/index.jsx
const { products, loading } = useProducts();

// products se actualiza automáticamente cuando el hook carga
{loading ? <Loading /> : products.map(p => <ProductCard key={p.id} {...p} />)}
```

---

### **3. Hacer un Pedido - Checkout**

```
Usuario hace clic en "Proceder al pago"
              ↓
         CartView.jsx
              ↓
      useOrders(userId)
              ↓
   Orderservice.createOrder()
              ↓
  1. Insertar cabecera en tabla "orders"
  2. Insertar items en tabla "order_items"
              ↓
  Supabase devuelve order con ID
              ↓
  Mostrar confirmación al usuario
  Limpiar carrito
```

**Código:**
```jsx
// En CartView.jsx
const { placeOrder } = useOrders(user?.id);

const handleCheckout = async () => {
  const { order, error } = await placeOrder(cartItems);
  if (!error) {
    showToast(`Pedido #${order.id} realizado`);
    onClear(); // Limpiar carrito
  }
};
```

---

## ⚙️ Configuración Requerida

### **.env** (raíz del proyecto)
```env
VITE_SUPABASE_URL=https://mzfwttvejxliqgrdvsjo.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_W_SKs5nRw8WYpRQ4gbHZ_A_4VAp1Q1z
```

### **Archivos actualizados:**
✅ `.env` - Creado en raíz  
✅ `AuthView.jsx` - Usa `useAuth`  
✅ `CartView.jsx` - Usa `useOrders`  
✅ `index.jsx` (Ferreteria) - Usa `useAuth` y `useProducts`  
✅ `Main.jsx` - Envuelto con `AuthProvider` y `ProductProvider`  
✅ `Client.js`, `Authservice.js`, `Profileservice.js`, `Productservice.js`, `Orderservice.js` - Importan correctamente  

---

## 🚀 Cómo Usar los Hooks en Nuevos Componentes

### **Opción 1: Usar el Hook directamente**
```jsx
import { useAuth } from "./Useauth";

function MiComponente() {
  const { user, login, logout } = useAuth();
  // ... tu código
}
```

### **Opción 2: Usar el Contexto (global)**
```jsx
import { useAuthContext } from "./AuthContext";

function MiComponente() {
  const { user, login, logout } = useAuthContext();
  // ... tu código
}
```

---

## 📊 Modelos de Datos

### **users (auth.users - Supabase Auth)**
```
id: UUID (PK)
email: string
created_at: timestamp
```

### **profiles** (tabla pública)
```
id: UUID (FK → users.id)
name: string
email: string
role: "user" | "admin"
created_at: timestamp
```

### **products**
```
id: UUID
title: string
description: text
price: decimal
category: string
image_url: string (opcional)
created_by: UUID (FK → users.id)
created_at: timestamp
deleted_at: timestamp (soft delete)
```

### **orders**
```
id: UUID
user_id: UUID (FK → users.id)
status: "pending" | "processing" | "shipped" | "delivered"
subtotal: decimal
shipping: decimal
total: decimal
created_at: timestamp
```

### **order_items**
```
id: UUID
order_id: UUID (FK → orders.id)
product_id: UUID (FK → products.id)
title: string (snapshot)
quantity: integer
price: decimal (snapshot)
created_at: timestamp
```

---

## 🔐 Seguridad

- ✅ Credenciales en `.env` (nunca en git)
- ✅ Funciones puras en servicios (fácil de testear)
- ✅ RLS (Row Level Security) debe configurarse en Supabase
- ✅ Roles: `user` (cliente) y `admin` (gestión de productos)

---

## 🛠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| "Faltan variables de entorno" | Crear `.env` en raíz con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` |
| Componentes no pueden acceder al usuario | Envolver en `<AuthProvider>` en `Main.jsx` |
| Productos no cargan | Verificar que la tabla `products` existe en Supabase |
| Login no funciona | Verificar credenciales y que `VITE_SUPABASE_ANON_KEY` sea válida |

---

## 📝 Próximos Pasos

1. **Implementar RLS en Supabase** - Seguridad por fila
2. **Agregar validación de formularios** - Con librerías como `zod` o `yup`
3. **Implementar caché** - Para optimizar consultas
4. **Tests** - Unitarios e integración
5. **Error handling mejorado** - Sentry, LogRocket, etc.

---

**Última actualización:** Junio 2026  
**Versión:** 1.0
