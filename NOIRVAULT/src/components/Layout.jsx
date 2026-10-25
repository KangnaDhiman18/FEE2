import { useState, useEffect } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { ShoppingBag, Orbit, Menu, X, ArrowUpRight } from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function Layout() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <Link to="/" className="brand" aria-label="NOIRVAULT home">
          <span className="brand-mark"><Orbit size={21} strokeWidth={1.8} /></span>
          <span>NOIR<span className="brand-light">VAULT</span><small>OBJECTS OF DESIRE</small></span>
        </Link>
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav${menuOpen ? " nav-open" : ""}`}>
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/products" className={navClass}>Discover</NavLink>
          <NavLink to="/about" className={navClass}>Our story</NavLink>
        </nav>
        <Link to="/cart" className="header-cart">
          <ShoppingBag size={17} />
          <span>Bag</span>
          <span className="cart-count">{itemCount}</span>
        </Link>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="site-footer">
        <Link to="/" className="footer-brand">NOIRVAULT<span>®</span></Link>
        <p>Curated objects. Considered living.</p>
        <Link to="/products" className="footer-link">Explore the collection <ArrowUpRight size={14} /></Link>
        <span className="footer-copy">© 2026 NOIRVAULT STUDIO</span>
      </footer>
    </div>
  );
}
