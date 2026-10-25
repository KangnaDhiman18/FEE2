import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { clearCart } from "../redux/cartSlice";
import { useCart, formatPrice } from "../hooks/useCart";

export default function Checkout() {
  const { items, itemCount, subtotal } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", pincode: "" });
  const [error, setError] = useState("");
  const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 149;
  const total = subtotal + shipping;

  function handleSubmit(event) {
    event.preventDefault();
    if (!items.length) {
      setError("Your bag is empty. Add an object before checking out.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }
    setError("");
    setPlaced(true);
    dispatch(clearCart());
  }

  if (placed) {
    return (
      <section className="success-page">
        <div className="success-icon"><CheckCircle2 size={36} /></div>
        <div className="eyebrow">ORDER CONFIRMED / NV-{Math.floor(100000 + Math.random() * 900000)}</div>
        <h1>Excellent <em>choice.</em></h1>
        <p>Thanks, {form.name.split(" ")[0] || "there"}. Your demo order has been placed successfully. This project does not process real payments or ship real items.</p>
        <div className="success-details"><span>ORDER TOTAL</span><strong>{formatPrice(total)}</strong><small>A confirmation would be sent to {form.email} in a live store.</small></div>
        <button className="button-primary" onClick={() => navigate("/products")}>Back to discovery <ArrowRight size={17} /></button>
      </section>
    );
  }

  if (!items.length) {
    return <section className="empty-cart checkout-empty"><div className="empty-bag"><CheckCircle2 size={32} /></div><h1>Nothing to <em>check out.</em></h1><p>Your bag is empty. Find something you love first.</p><Link to="/products" className="button-primary">Browse products <ArrowRight size={17} /></Link></section>;
  }

  return (
    <section className="checkout-page">
      <div className="page-eyebrow"><Link to="/cart"><ArrowLeft size={14} /> BACK TO BAG</Link><span>SECURE CHECKOUT · DEMO</span></div>
      <div className="checkout-heading"><div className="eyebrow">ALMOST YOURS</div><h1>Make it <em>official.</em></h1><p>Just the essentials. You're nearly there.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section-title"><span>01</span><div><h2>Delivery details</h2><p>Where should we send the good stuff?</p></div></div>
          <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
          <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
          <label>Street address<input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no., street, area" /></label>
          <div className="form-two-col"><label>City<input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Your city" /></label><label>PIN code<input required inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })} placeholder="6 digits" /></label></div>
          {error && <p className="form-error">{error}</p>}
          <div className="demo-payment-note"><ShieldCheck size={18} /><span><strong>Demo checkout</strong><small>No real payment details are collected. This is a student project.</small></span></div>
          <button className="checkout-button place-order" type="submit">Place demo order · {formatPrice(total)} <ArrowRight size={17} /></button>
        </form>
        <aside className="checkout-summary"><div className="summary-top"><span>IN YOUR BAG</span><span>{String(itemCount).padStart(2, "0")}</span></div><h2>Order <em>summary.</em></h2>
          <div className="checkout-mini-items">{items.map((item) => <div className="mini-item" key={item.id}><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><small>Qty {item.quantity}</small></div><span>{formatPrice(item.price * item.quantity)}</span></div>)}</div>
          <div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-line"><span>Shipping</span><strong>{shipping ? formatPrice(shipping) : "FREE"}</strong></div><div className="summary-divider" /><div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
        </aside>
      </div>
    </section>
  );
}
