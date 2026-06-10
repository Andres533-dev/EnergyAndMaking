import { useState, useEffect } from "react";
import "./Header.css";
import logo from "../Assets/images/Logo1.png";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios", highlight: false },
  { href: "#ferreteria", label: "Ferretería", highlight: true },
];

function Navbar({ menuOpen, toggleMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="navbar_brand">
        <div className="navbar_logo">
          <img src={logo} alt="Energy and Making Logo" />
        </div>
        <div className="navbar_company">
          <span className="navbar_name">Energy and Making</span>
        </div>
      </div>

      <nav className="navbar_nav">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`navbar_link${l.highlight ? " navbar_link-highlight" : ""}`}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <button
        className={`navbar_hamburger${menuOpen ? " open" : ""}`}
        onClick={toggleMenu}
        aria-label="Menú"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <div className={`mobile-menu${open ? " open" : ""}`} id="mobileMenu">
      {NAV_LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="mobile-menu_link"
          onClick={onClose}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu  = () => setMenuOpen(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}