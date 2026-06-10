import React, { createContext, useContext } from "react";
import { useProducts } from "./Useproducts";

// Crear el contexto
const ProductContext = createContext(null);

// Proveedor de contexto
export function ProductProvider({ children }) {
  const products = useProducts();

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

// Hook para usar el contexto
export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext debe usarse dentro de un ProductProvider");
  }
  return context;
}
