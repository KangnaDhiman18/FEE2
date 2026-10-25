import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { decreaseQuantity, increaseQuantity, removeFromCart, clearCart } from "../redux/cartSlice";
import { useCart, formatPrice } from "../hooks/useCart";

export default function Cart() {
  const { items, itemCount, subtotal } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 149;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <section className="empty-cart">
        <div className="empty-bag"><ShoppingBag size={34} strokeWidth={1.3} /></div>
        <div className="eyebrow">YOUR BAG / 00 ITEMS</div>
        <h1>Room for something <em>good.</em></h1>
        <p>Your bag is taking a little breather. Explore the collection and find something worth bringing home.</p>
        <Link to="/products" className="button-primary">Explore the collection <ArrowRight size={17} /></Link>
        <Link to="/" className="back-home">← Back to home</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="page-eyebrow"><Link to="/products"><ArrowLeft size={14} /> KEEP DISCOVERING</Link><span>YOUR BAG / {String(itemCount).padStart(2, "0")} ITEMS</span></div>
      <div className="cart-title-row"><div><div className="eyebrow">GOOD CHOICES, SO FAR</div><h1>Your <em>bag.</em></h1></div><button className="clear-cart" onClick={() => dispatch(clearCart())}>Clear bag <Trash2 size={14} /></button></div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image"><img src={item.image} alt={item.name} /></div>
              <div className="cart-item-details"><span className="product-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><button className="remove-item" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={13} /> Remove</button></div>
              <div className="cart-item-actions"><strong>{formatPrice(item.price * item.quantity)}</strong><div className="quantity-control"><button onClick={() => dispatch(decreaseQuantity(item.id))} aria-label={`Decrease ${item.name} quantity`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => dispatch(increaseQuantity(item.id))} aria-label={`Increase ${item.name} quantity`}><Plus size={13} /></button></div><small>{formatPrice(item.price)} each</small></div>
            </article>
          ))}
          <Link to="/products" className="continue-link"><ArrowLeft size={15} /> Add something else</Link>
        </div>
        <aside className="order-summary">
          <div className="summary-top"><span>THE DAMAGE (IN A GOOD WAY)</span><span className="summary-spark">✳</span></div>
          <h2>Order <em>summary.</em></h2>
          <div className="summary-line"><span>Subtotal · {itemCount} items</span><strong>{formatPrice(subtotal)}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? "FREE" : formatPrice(shipping)}</strong></div>
          {subtotal > 0 && subtotal < 2999 && <div className="shipping-hint">Add {formatPrice(2999 - subtotal)} more for free shipping.</div>}
          <div className="summary-divider" />
          <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <small className="tax-note">Inclusive of applicable taxes.</small>
          <button className="checkout-button" onClick={() => navigate("/checkout")}>Continue to checkout <ArrowRight size={17} /></button>
          <div className="secure-note">✦ A smooth checkout. Always.</div>
        </aside>
      </div>
    </section>
  );
}
