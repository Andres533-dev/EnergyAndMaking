import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import { ProductProvider } from "./Components/ProductContext";
import App from "./Components/App";
import Ferreteria from "./Components/Ferreteria";
import Servicioelectrico from "./Components/Servicioelectrico";
import Ingenieriaelectronica from "./Components/Ingenieriaelectronica";
import Serviciolocativo from "./Components/Serviciolocativo";
import Mantenimiento from "./Components/Mantenimiento";
import Refrigeracion from "./Components/Refrigeracion";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/ferreteria" element={<Ferreteria />} />
            <Route path="/servicios-electricos" element={<Servicioelectrico />} />
            <Route path="/ingenieria-electronica" element={<Ingenieriaelectronica />} />
            <Route path="/servicios-locativos" element={<Serviciolocativo />} />
            <Route path="/mantenimiento" element={<Mantenimiento />} />
            <Route path="/refrigeracion" element={<Refrigeracion />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);