import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "./Servicespage.css";

const ITEMS = [
  {
    title: "Mantenimiento Eléctrico Preventivo y Correctivo",
    desc: "Termografías, análisis de calidad de energía, revisión de tableros y reparación inmediata de fallas eléctricas en instalaciones industriales, comerciales y residenciales.",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    alt: "Técnico revisando tablero eléctrico",
  },
  {
    title: "Mantenimiento Electrónico",
    desc: "Limpieza, ajuste y calibración de equipos electrónicos de producción, alarmas, UPS, variadores de velocidad y sistemas de comunicación.",
    img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80",
    alt: "Mantenimiento de equipos electrónicos",
  },
  {
    title: "Mantenimiento Hidráulico y Plomería",
    desc: "Inspección, limpieza y reparación de redes de agua potable, aguas residuales y desagües. Mantenimiento a redes hidrosanitarias con equipos de videoinspección.",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    alt: "Plomería y redes hidrosanitarias",
  },
  {
    title: "Mantenimiento a Cubiertas y Locativo",
    desc: "Reparación de cubiertas, filtraciones, grietas, enchapes y pintura. Mantenimiento a puertas, ventanas y elementos de construcción civil.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Mantenimiento civil de cubierta",
  },
  {
    title: "Mantenimiento a Mobiliarios y Carpintería",
    desc: "Mantenimiento, reparación y fabricación de mobiliarios en madera y metal. Carpintería metálica y de madera para restaurantes, oficinas y espacios comerciales.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "Carpintería y mobiliario",
  },
  {
    title: "Contratos de Mantenimiento 24/7",
    desc: "Planes periódicos (mensual, trimestral, semestral) con atención de emergencias 24/7. Reportes detallados del estado de tus instalaciones y garantía de respuesta.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    alt: "Contrato de mantenimiento",
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

export default function Mantenimiento() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="sp-hero">
          <div className="sp-hero_bg">
            <img
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1400&q=80"
              alt="Mantenimiento integral"
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
              Mantenimiento <br /><em>Integral</em>
            </h1>
            <p className="sp-hero_sub">
              Mantenimiento eléctrico, electrónico, hidráulico, locativo y de mobiliarios. Atención de emergencias 24/7 en Bogotá y alrededores.
            </p>
            <a href="/#contacto" className="btn btn-primary sp-hero_cta">
              Solicitar cotización <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        </section>

        <section className="sp-grid-section">
          <div className="sp-grid-section_header">
            <span className="section-label">Lo que incluye</span>
            <h2 className="section-title">Servicios de mantenimiento</h2>
            <p className="sp-grid-section_sub">
              Prevenimos fallas antes de que ocurran y respondemos con rapidez cuando se presentan. Te ayudamos y nos encargamos de todo.
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
            <h2 className="sp-cta_title">Prevé fallas antes de que ocurran</h2>
            <p className="sp-cta_desc">
              Diseñamos un plan de mantenimiento a la medida de tus instalaciones. Respondemos en menos de 24 horas y atendemos emergencias 24/7.
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