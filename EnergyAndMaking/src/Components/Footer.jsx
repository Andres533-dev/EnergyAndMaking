import "./Footer.css";

const SOCIAL_LINKS = [
  { icon: "bxl-facebook", label: "Facebook" },
  { icon: "bxl-instagram", label: "Instagram" },
  { icon: "bxl-linkedin", label: "LinkedIn" },
  { icon: "bxl-whatsapp", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="footer_brand">
          <div className="footer_logo">
            <img src="../Assets/images/Logo1.png" alt="Energy and Making Logo" />
          </div>
          <p>Ingeniería eléctrica, mantenimiento y ferretería al servicio de Colombia.</p>
        </div>

        <div className="footer_links">
          <h4>Navegación</h4>
          <a href="#servicios">Servicios</a>
          <a href="#ferreteria">Ferretería</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="footer_contact">
          <h4>Contacto</h4>
          <p><i className="bx bx-map" /> Calle 25B #74-35 OF 101, Bogotá</p>
          <p><i className="bx bx-phone" /> 320 239 9053</p>
        </div>

        <div className="footer_social">
          <h4>Síguenos</h4>
          <div className="footer_social-icons">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href="#"
                className="footer_social-icon"
                aria-label={s.label}
              >
                <i className={`bx ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <span>© 2025 Energy and Making S.A.S. Todos los derechos reservados.</span>
        <span>Bogotá, Colombia</span>
      </div>
    </footer>
  );
}