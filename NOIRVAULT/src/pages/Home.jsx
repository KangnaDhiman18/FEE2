import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import Toast from "../components/Toast";

export default function Home() {
  const [toast, setToast] = useState("");
  return (
    <>
      <Toast message={toast} onClose={() => setToast("")} />
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE NEXT FORM OF EVERYDAY</div>
          <h1>Less ordinary.<br /><span>More</span> <em>you.</em></h1>
          <p className="hero-description">Discover design-forward essentials made to move your world. A little unexpected. Entirely unforgettable.</p>
          <div className="hero-actions">
            <Link to="/products" className="button-primary">Explore collection <ArrowRight size={17} /></Link>
            <Link to="/about" className="button-quiet">Our philosophy <ArrowDownRight size={16} /></Link>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars"><span>N</span><span>V</span><span>✦</span></div>
            <div><strong>4.9/5</strong><small>Made for the detail-obsessed</small></div>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-grid" />
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />
          <div className="hero-orb"><div className="orb-highlight" /><div className="orb-core" /></div>
          <div className="hero-float-card float-top"><span className="float-icon"><Sparkles size={15} /></span><div><b>Curated, not crowded</b><small>Only the good stuff.</small></div></div>
          <div className="hero-float-card float-bottom"><span className="live-dot" /><div><b>THE OBJECT EDIT / 001</b><small>Future classics, found here.</small></div></div>
          <span className="hero-vertical-label">FORM MEETS FUNCTION — EST. 2026</span>
          <div className="hero-number">01<span> / 04</span></div>
        </div>
        <div className="hero-scroll"><span /> SCROLL TO DISCOVER</div>
      </section>

      <section className="trust-strip">
        <div><ShieldCheck size={18} /><span>Thoughtfully selected</span></div>
        <div><Truck size={18} /><span>Free shipping over ₹2,999</span></div>
        <div><RotateCcw size={18} /><span>Easy 7-day returns</span></div>
      </section>

      <section className="section-block featured-section">
        <div className="section-heading">
          <div><div className="eyebrow">THE SHORTLIST / 2026</div><h2>Objects with <em>presence.</em></h2></div>
          <Link to="/products" className="text-link">View all products <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid home-product-grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdded={setToast} />)}
        </div>
      </section>
      <section className="manifesto">
        <div className="manifesto-symbol">N<span>°</span></div>
        <div className="manifesto-copy"><div className="eyebrow">A SMALL MANIFESTO</div><h2>Good design isn't<br />extra. It's <em>essential.</em></h2></div>
        <p>We believe the things you use every day should make you feel something. So we seek out useful objects with a point of view — built for real life, chosen with intention.</p>
        <Link to="/about" className="manifesto-link">Get to know us <ArrowRight size={16} /></Link>
      </section>
    </>
  );
}
