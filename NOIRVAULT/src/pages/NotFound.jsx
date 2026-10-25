import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-number">4<span>0</span>4</div>
      <div className="eyebrow"><span className="eyebrow-dot" /> LOST IN THE VOID</div>
      <h1>This page took<br /><em>a different orbit.</em></h1>
      <p>Whatever you were looking for, it isn't here. Let's get you back to something good.</p>
      <div className="not-found-actions"><Link to="/" className="button-primary"><ArrowLeft size={16} /> Back home</Link><Link to="/products" className="button-quiet">Browse products <ArrowRight size={16} /></Link></div>
    </section>
  );
}
