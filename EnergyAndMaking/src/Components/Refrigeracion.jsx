import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "./Servicespage.css";

const ITEMS = [
  {
    title: "Refrigeración Comercial",
    desc: "Instalación y mantenimiento de cuartos fríos, vitrinas refrigeradas y conservadores para supermercados, restaurantes y cadenas de alimentos.",
    img: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&q=80",
    alt: "Equipo de refrigeración comercial",
  },
  {
    title: "Refrigeración Industrial",
    desc: "Sistemas de refrigeración de gran capacidad para plantas de alimentos, laboratorios farmacéuticos y bodegas de almacenamiento en frío.",
    img: "https://images.unsplash.com/photo-1565992441121-4367ef2f19a4?w=800&q=80",
    alt: "Cuarto frío industrial",
  },
  {
    title: "Aire Acondicionado",
    desc: "Instalación, recarga y mantenimiento de sistemas Split, VRF, Chiller y fan-coil para oficinas, restaurantes, centros de datos y plantas industriales.",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    alt: "Instalación de aire acondicionado",
  },
  {
    title: "Diagnóstico y Recarga de Gas",
    desc: "Detección de fugas, evacuación y recarga con refrigerantes R-410A, R-32, R-404A y R-134a bajo protocolo ambiental vigente.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Recarga de gas refrigerante",
  },
  {
    title: "Mantenimiento Preventivo y Correctivo",
    desc: "Planes de mantenimiento periódico: limpieza de condensadores, revisión de compresores, verificación de presiones y análisis de consumo energético. Atención 24/7.",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    alt: "Mantenimiento de equipo de refrigeración",
  },
  {
    title: "Control y Monitoreo de Temperatura",
    desc: "Integración de controladores digitales y sensores IoT para monitoreo remoto de temperatura, alarmas en tiempo real y garantía de cadena de frío.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "Control digital de temperatura",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ServiceCard({ item, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`sp-card${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      <div className="sp-card_img-wrap">
        <img src={item.img} alt={item.alt} className="sp-card_img" />
        <div className="sp-card_img-overlay" />
      </div>
      <div className="sp-card_body">
        <h3 className="sp-card_title">{item.title}</h3>
        <p className="sp-card_desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function Refrigeracion() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="sp-hero">
          <div className="sp-hero_bg">
            <img
              src="https://images.unsplash.com/photo-1565992441121-4367ef2f19a4?w=1400&q=80"
              alt="Refrigeración industrial"
              className="sp-hero_img"
            />
            <div className="sp-hero_overlay" />
          </div>
          <div className="sp-hero_content">
            <a href="/" className="sp-back">
              <i className="bx bx-arrow-back" /> Volver al inicio
            </a>
            <span className="sp-hero_label">Nuestros servicios</span>
            <h1 className="sp-hero_title">
              Refrigeración <br /><em>Industrial</em>
            </h1>
            <p className="sp-hero_sub">
              Instalación, diagnóstico y mantenimiento de equipos de refrigeración comercial e industrial. Garantizamos la cadena de frío de tu negocio con atención 24/7.
            </p>
            <a href="/#contacto" className="btn btn-primary sp-hero_cta">
              Solicitar cotización <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        </section>

        <section className="sp-grid-section">
          <div className="sp-grid-section_header">
            <span className="section-label">Lo que incluye</span>
            <h2 className="section-title">Servicios de refrigeración</h2>
            <p className="sp-grid-section_sub">
              Soluciones integrales de frío para cualquier escala de operación, con técnicos certificados y repuestos originales.
            </p>
          </div>
          <div className="sp-grid">
            {ITEMS.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </section>

        <section className="sp-cta">
          <div className="sp-cta_inner">
            <span className="section-label section-label-light">¿Tienes un proyecto?</span>
            <h2 className="sp-cta_title">Mantén tu cadena de frío sin interrupciones</h2>
            <p className="sp-cta_desc">
              Diseñamos y mantenemos tu sistema de refrigeración con técnicos especializados. Respondemos en menos de 24 horas y atendemos emergencias 24/7.
            </p>
            <a href="/#contacto" className="btn btn-primary sp-cta_btn">
              Contáctanos ahora <i className="bx bx-send" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}