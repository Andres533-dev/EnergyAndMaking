import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "./Servicespage.css";
import imgTableros from "../Assets/images/tablero_electrico.jpeg";

const ITEMS = [
  {
    title: "Instalaciones Residenciales",
    desc: "Diseño y montaje de redes eléctricas para viviendas: tableros, circuitos, tomas e iluminación con certificación RETIE y norma NTC 2050.",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    alt: "Instalación eléctrica residencial",
  },
  {
    title: "Instalaciones Industriales y Comerciales",
    desc: "Sistemas de media y baja tensión para plantas, bodegas y centros de distribución. Diseñamos, construimos y mantenemos proyectos eléctricos hasta 34,5 kV.",
    img: imgTableros,
    alt: "Tablero eléctrico industrial Energy and Making",
  },
  {
    title: "Tableros y Centros de Control",
    desc: "Fabricación, montaje y mantenimiento de tableros eléctricos, MCC y celdas de distribución a medida. Suministramos equipos, repuestos y herramientas.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Tablero de control eléctrico",
  },
  {
    title: "Energías Renovables",
    desc: "Diseño, construcción y mantenimiento de sistemas fotovoltaicos solares para industrias, comercios y hogares. Proyectos ejecutados con certificación y garantía.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    alt: "Paneles solares instalación",
  },
  {
    title: "Iluminación LED y Eficiencia Energética",
    desc: "Reconversión de sistemas convencionales a LED con estudios de eficiencia energética. Asesoramiento en seguridad eléctrica y retorno de inversión.",
    img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
    alt: "Iluminación LED industrial",
  },
  {
    title: "Estudios, Certificaciones y Suministro",
    desc: "Memorias de cálculo, planos as-built, certificaciones RETIE/RETILAP e inspecciones de obra. Suministro de materiales eléctricos industriales y residenciales.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    alt: "Ingenieros revisando planos eléctricos",
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

export default function ServicioElectrico() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="sp-hero">
          <div className="sp-hero_bg">
            <img
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80"
              alt="Ingeniería eléctrica"
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
              Ingeniería <br /><em>Eléctrica</em>
            </h1>
            <p className="sp-hero_sub">
              Diseñamos, construimos y mantenemos sistemas eléctricos industriales, comerciales y residenciales. Incluye energías renovables y suministro de materiales.
            </p>
            <a href="/#contacto" className="btn btn-primary sp-hero_cta">
              Solicitar cotización <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        </section>

        <section className="sp-grid-section">
          <div className="sp-grid-section_header">
            <span className="section-label">Lo que incluye</span>
            <h2 className="section-title">Servicios eléctricos</h2>
            <p className="sp-grid-section_sub">
              Cubrimos cada etapa de tu proyecto: desde el diseño hasta la certificación final, con emergencias atendidas 24/7.
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
            <h2 className="sp-cta_title">Hablemos de tu instalación eléctrica</h2>
            <p className="sp-cta_desc">
              Nuestro equipo certifica y ejecuta tu proyecto con los más altos estándares de seguridad. Respondemos en menos de 24 horas y atendemos emergencias 24/7.
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