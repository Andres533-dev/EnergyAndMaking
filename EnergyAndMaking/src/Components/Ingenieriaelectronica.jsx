import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "./Servicespage.css";

const ITEMS = [
  {
    title: "CCTV y Videovigilancia",
    desc: "Diseño, instalación y mantenimiento de sistemas de cámaras IP, grabación en la nube y monitoreo remoto para empresas y establecimientos comerciales.",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    alt: "Sistema de cámaras CCTV",
  },
  {
    title: "Sistemas de Alarmas",
    desc: "Instalación de centrales de alarma, sensores de movimiento, contactos magnéticos y sirenas para protección perimetral e interior.",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    alt: "Panel de alarma de seguridad",
  },
  {
    title: "Detección de Incendios",
    desc: "Diseño e instalación de sistemas de detección y alarma contra incendios: detectores de humo, calor, pulsadores y centrales certificadas NFPA.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Sistema de detección de incendios",
  },
  {
    title: "Control de Acceso",
    desc: "Soluciones de acceso biométrico, RFID y tarjetas inteligentes para control de ingreso en empresas, oficinas y plantas industriales.",
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    alt: "Control de acceso biométrico",
  },
  {
    title: "Automatización y PLC",
    desc: "Programación de PLC, HMI y SCADA para control de procesos productivos. Integramos marcas Siemens, Allen-Bradley y Schneider Electric.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "Panel de automatización industrial",
  },
  {
    title: "Mantenimiento Electrónico",
    desc: "Diagnóstico y reparación de tarjetas electrónicas, variadores de velocidad, UPS y fuentes de poder industriales. Atención de emergencias 24/7.",
    img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80",
    alt: "Técnico reparando equipo electrónico",
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

export default function IngenieriaElectronica() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="sp-hero sp-hero--dark">
          <div className="sp-hero_bg">
            <img
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400&q=80"
              alt="Ingeniería electrónica y seguridad"
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
              Ingeniería <br /><em>Electrónica</em>
            </h1>
            <p className="sp-hero_sub">
              Diseñamos, construimos y mantenemos sistemas electrónicos de seguridad: CCTV, alarmas, detección de incendios y automatización para empresas colombianas.
            </p>
            <a href="/#contacto" className="btn btn-primary sp-hero_cta">
              Solicitar cotización <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        </section>

        <section className="sp-grid-section">
          <div className="sp-grid-section_header">
            <span className="section-label">Lo que incluye</span>
            <h2 className="section-title">Servicios electrónicos</h2>
            <p className="sp-grid-section_sub">
              Seguridad electrónica integral y automatización industrial para proteger y optimizar tu negocio.
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
            <h2 className="sp-cta_title">Protege y automatiza tu negocio</h2>
            <p className="sp-cta_desc">
              Nuestros ingenieros electrónicos diseñan la solución de seguridad y automatización más eficiente para tu empresa. Respondemos en menos de 24 horas.
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