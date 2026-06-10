import React, { createContext, useContext } from "react";
import { useAuth } from "./Useauth";

// Crear el contexto
const AuthContext = createContext(null);

// Proveedor de contexto
export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
}
