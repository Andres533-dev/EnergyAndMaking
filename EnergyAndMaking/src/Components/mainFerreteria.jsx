import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// Importar explícitamente el index de la carpeta Ferreteria
import Ferreteria from "./index";
import Servicioelectrico from "./Servicioelectrico";
import Ingenieriaelectronica from "./Ingenieriaelectronica";
import Serviciolocativo from "./Serviciolocativo";
import Mantenimiento from "./Mantenimiento";
import Refrigeracion from "./Refrigeracion";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
  </React.StrictMode>
);