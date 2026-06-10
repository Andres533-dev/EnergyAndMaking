import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "./Servicespage.css";

const ITEMS = [
  {
    title: "Remodelación de Restaurantes y Locales",
    desc: "Diseño y ejecución de proyectos de remodelación y adecuación de restaurantes, puntos de venta y establecimientos comerciales cumpliendo normas de uso del suelo.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Restaurante remodelado",
  },
  {
    title: "Adecuación de Oficinas Corporativas",
    desc: "Transformación integral de espacios corporativos: división de ambientes, cielos rasos, pintura y carpintería metálica y de madera a medida.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    alt: "Oficina corporativa remodelada",
  },
  {
    title: "Iluminación, Ventilación y Climatización",
    desc: "Instalación de sistemas de iluminación LED, ventilación industrial y climatización para locales comerciales, restaurantes y oficinas.",
    img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
    alt: "Iluminación de local comercial",
  },
  {
    title: "Construcción en Seco (Drywall)",
    desc: "Divisiones livianas en drywall, tablayeso y superboard con acabados perfectos y aislamiento acústico. Carpintería metálica y de madera en mobiliarios.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Construcción en drywall",
  },
  {
    title: "Pintura y Acabados",
    desc: "Aplicación profesional de pinturas arquitectónicas, texturas, estucados y pinturas epóxicas para pisos y paredes en ambientes industriales y comerciales.",
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
    alt: "Pintura de interiores comerciales",
  },
  {
    title: "Impermeabilizaciones y Cubiertas",
    desc: "Mantenimiento a cubiertas, impermeabilización de terrazas, sótanos y fachadas. Reparación y mantenimiento de instalaciones y equipos en general.",
    img: "https://images.unsplash.com/photo-1587582345426-bf07f534e0be?w=800&q=80",
    alt: "Mantenimiento de cubierta",
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

export default function ServicioLocativo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="sp-hero">
          <div className="sp-hero_bg">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80"
              alt="Servicios locativos y remodelación"
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
              Servicios <br /><em>Locativos</em>
            </h1>
            <p className="sp-hero_sub">
              Remodelamos y adecuamos restaurantes, locales comerciales y oficinas. Carpintería, pintura, iluminación y mantenimiento de instalaciones de principio a fin.
            </p>
            <a href="/#contacto" className="btn btn-primary sp-hero_cta">
              Solicitar cotización <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        </section>

        <section className="sp-grid-section">
          <div className="sp-grid-section_header">
            <span className="section-label">Lo que incluye</span>
            <h2 className="section-title">Servicios locativos</h2>
            <p className="sp-grid-section_sub">
              Desde el diseño hasta el acabado final, gestionamos tu obra con calidad y cumplimiento de normas.
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
            <h2 className="sp-cta_title">Transformemos tu espacio juntos</h2>
            <p className="sp-cta_desc">
              Cuéntanos cómo imaginas tu local u oficina y nuestro equipo te presentará una propuesta detallada. Respondemos en menos de 24 horas.
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