import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import "./Styles.css";
import Header from "./Header";
import Footer from "./Footer";
import { saveContactSubmission } from "./Contactservice";

// ── Imágenes del carrusel ────────────────────────────────
import imgFalabella  from "../Assets/images/falabella.svg";
import imgEnel       from "../Assets/images/enel1.jpg";
import imgTelesentinel from "../Assets/images/telesentinel.jpg";
import imgTecnocoa   from "../Assets/images/tecnocoa.png";
import imgEducacion  from "../Assets/images/educacion.png";
import imgTriplo     from "../Assets/images/triplo.png";
import imgBellaVista from "../Assets/images/bella_vista.png";
import imgMetro      from "../Assets/images/metro.jpg";

// ── Credenciales EmailJS desde variables de entorno ──────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ── Data ─────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "bx bx-bolt-circle",
    title: "Ingeniería Eléctrica",
    desc: "Diseño e instalación de sistemas eléctricos industriales y residenciales con los más altos estándares de seguridad.",
    href: "/servicios-electricos",
  },
  {
    icon: "bx bx-chip",
    title: "Ingeniería Electrónica",
    desc: "Soluciones electrónicas a medida: automatización, control de procesos y sistemas embebidos.",
    href: "/ingenieria-electronica",
  },
  {
    icon: "bx bx-building-house",
    title: "Servicios Locativos",
    desc: "Proyectos arquitectónicos funcionales y estéticos, adaptados a tus necesidades y presupuesto.",
    href: "/servicios-locativos",
  },
  {
    icon: "bx bx-wrench",
    title: "Mantenimiento",
    desc: "Mantenimiento preventivo y correctivo de instalaciones eléctricas, electrónicas y civiles.",
    href: "/mantenimiento",
  },
  {
    icon: "bx bx-cool",
    title: "Refrigeración Industrial",
    desc: "Mantenimiento de equipos de refrigeración industrial y comercial con diagnóstico experto.",
    href: "/refrigeracion",
  },
];

const COMPANIES = [
  { name: "Falabella",               src: imgFalabella   },
  { name: "Enel",                    src: imgEnel        },
  { name: "Telesentinel",            src: imgTelesentinel },
  { name: "Tecnocoa",                src: imgTecnocoa    },
  { name: "Ministerio de Educación", src: imgEducacion   },
  { name: "Triplo",                  src: imgTriplo      },
  { name: "Toldos Bella Vista",      src: imgBellaVista  },
  { name: "Metro",                   src: imgMetro       },
];

// ── Hook: scroll reveal ──────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

// ── Hero ─────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <section className="hero">
      <div className="hero_bg">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
          alt="Obra de construcción"
          className="hero_img"
        />
        <div className="hero_overlay" />
      </div>
      <div className={`hero_content${visible ? " visible" : ""}`}>
        <h1 className="hero_title">
          ayudamos y <br />
          <em>nos encargamos</em>
          <br />de todo
        </h1>
        <p className="hero_sub">
          Soluciones en ingeniería eléctrica, mantenimiento, arquitectura y ferretería
          especializada para empresas y hogares en Colombia.
        </p>
        <div className="hero_actions">
          <a href="#contacto" className="btn btn-primary">Solicitar cotización</a>
        </div>
      </div>
    </section>
  );
}

// ── About Intro ──────────────────────────────────────────
function AboutIntro() {
  return (
    <section className="about-intro">
      <div className="about-intro_container">
        <span className="section-label">Energy and Making</span>
        <h2 className="section-title">
          Soluciones que <span>encienden</span> tu proyecto
        </h2>
        <p className="about-intro_text">
          Somos una empresa colombiana especializada en ingeniería eléctrica,
          mantenimiento, arquitectura y ferretería. Acompañamos a empresas y hogares
          con calidad, innovación y un equipo siempre listo para ayudar.
        </p>
        <div className="about-intro_action">
          <a href="#contacto" className="btn btn-primary">
            Conócenos <i className="bx bx-right-arrow-alt" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Carousel ─────────────────────────────────────────────
function Carousel() {
  const doubled = [...COMPANIES, ...COMPANIES];
  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {doubled.map((c, i) => (
          <div className="carousel-card" key={i}>
            <img src={c.src} alt={c.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── About Us / Aliados ───────────────────────────────────
function AboutUs() {
  return (
    <section className="about_us" id="aliados">
      <div className="about_us_content">
        <div className="about_us_header">
          <span className="about_eyebrow">Clientes & aliados</span>
          <h2>
            Empresas que confiaron en <span>nosotros</span>
          </h2>
          <p className="about_subtitle">
            Más de 8 empresas respaldan nuestra trayectoria y calidad
          </p>
          <div className="about_divider" />
        </div>
      </div>
      <Carousel />
    </section>
  );
}

// ── Services ─────────────────────────────────────────────
function Services() {
  return (
    <section className="services" id="servicios">
      <div className="services_header">
        <span className="section-label section-label-light">Lo que hacemos</span>
        <h2 className="section-title section-title-light">Nuestros servicios</h2>
      </div>
      <div className="services_flex">
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="service-card_icon">
              <i className={s.icon} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a href={s.href} className="service-card_link">
              Ver más <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Split / Ferretería ────────────────────────────────────
function Split() {
  const [imgRef, imgVisible]         = useReveal();
  const [contentRef, contentVisible] = useReveal();

  return (
    <section className="split" id="ferreteria">
      <div
        ref={imgRef}
        className={`split_image-wrap${imgVisible ? " visible" : ""}`}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
          alt="Ferretería y materiales"
          className="split_image"
        />
        <div className="split_image-tag">La 24-7 Ferretería</div>
      </div>
      <div
        ref={contentRef}
        className={`split_content${contentVisible ? " visible" : ""}`}
      >
        <span className="section-label">Nuestra ferretería</span>
        <h2 className="section-title">
          Todo lo que tu proyecto necesita, en un solo lugar
        </h2>
        <p className="split_text">
          Contamos con un amplio catálogo de productos: tornillería, herramientas
          eléctricas, pinturas industriales, materiales de plomería, cables,
          interruptores y mucho más. Atención personalizada y despacho a domicilio
          en Bogotá.
        </p>
        <a href="./Ferreteria" className="btn btn-primary">
          Ver catálogo <i className="bx bx-right-arrow-alt" />
        </a>
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────
function Contact() {
  const [infoRef, infoVisible]    = useReveal();
  const [formRef, formVisible]    = useReveal();
  const [fields, setFields]       = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormError("");
    setAlreadySent(false);

    // 1. Intentar guardar en Supabase (verifica duplicado por email)
    const { ok, alreadySent: dup, error: dbError } = await saveContactSubmission(fields);

    if (dup) {
      setSending(false);
      setAlreadySent(true);
      return;
    }

    if (dbError) {
      setSending(false);
      setFormError("Error al procesar tu solicitud. Intenta de nuevo.");
      return;
    }

    // 2. Enviar correo vía EmailJS
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    fields.name,
          email:   fields.email,
          phone:   fields.phone || "No proporcionado",
          message: fields.message,
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (emailError) {
      console.error("EmailJS error:", emailError);
    } finally {
      setFields({ name: "", email: "", phone: "", message: "" });
      setSending(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    }
  };

  return (
    <section className="contact" id="contacto">
      <div
        ref={infoRef}
        className={`contact_info${infoVisible ? " visible" : ""}`}
      >
        <span className="section-label">Contáctanos</span>
        <h2 className="section-title">¿Listo para <br />empezar?</h2>
        <p className="contact_desc">
          Escríbenos o llámanos. Respondemos en menos de 24 horas.
        </p>
        <div className="contact_details">
          <div className="contact_detail">
            <div className="contact_detail-icon">
              <i className="bx bx-map" />
            </div>
            <div>
              <strong>Dirección</strong>
              <span>Calle 25B #74-35 OF 101, Bogotá, Colombia</span>
            </div>
          </div>
          <div className="contact_detail">
            <div className="contact_detail-icon">
              <i className="bx bx-phone" />
            </div>
            <div>
              <strong>Teléfono</strong>
              <span>320 239 9053</span>
            </div>
          </div>
        </div>
      </div>

      <form
        ref={formRef}
        className={`contact_form${formVisible ? " visible" : ""}`}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <div className="form-input-wrap">
            <i className="bx bx-user" />
            <input
              type="text"
              id="name"
              placeholder="Juan Pérez"
              value={fields.name}
              onChange={handleChange}
              required
              disabled={sending}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <div className="form-input-wrap">
            <i className="bx bx-envelope" />
            <input
              type="email"
              id="email"
              placeholder="juan@empresa.com"
              value={fields.email}
              onChange={handleChange}
              required
              disabled={sending}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <div className="form-input-wrap">
            <i className="bx bx-phone" />
            <input
              type="tel"
              id="phone"
              placeholder="+57 300 000 0000"
              value={fields.phone}
              onChange={handleChange}
              disabled={sending}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows={4}
            placeholder="Cuéntanos sobre tu proyecto..."
            value={fields.message}
            onChange={handleChange}
            required
            disabled={sending}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={sending}
        >
          {sending ? "Enviando…" : <>Enviar mensaje <i className="bx bx-send" /></>}
        </button>

        {success && (
          <div className="form-success show">
            <i className="bx bx-check-circle" /> ¡Mensaje enviado! Te contactaremos pronto.
          </div>
        )}

        {alreadySent && (
          <div className="form-success show" style={{ background: "#fff8e1", color: "#7a5800", borderColor: "#ffe082" }}>
            <i className="bx bx-info-circle" /> Ya recibimos un mensaje de este correo. Te contactaremos pronto.
          </div>
        )}

        {formError && (
          <div className="form-success show" style={{ background: "#fdecea", color: "#b71c1c", borderColor: "#ef9a9a" }}>
            <i className="bx bx-error-circle" /> {formError}
          </div>
        )}
      </form>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutIntro />
        <AboutUs />
        <Services />
        <Split />
        <Contact />
      </main>
      <Footer />
    </>
  );
}