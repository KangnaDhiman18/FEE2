import { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus, Check } from "lucide-react";
import { addToCart } from "../redux/cartSlice";
import { formatPrice } from "../hooks/useCart";

export default function ProductCard({ product, onAdded }) {
  const dispatch = useDispatch();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    dispatch(addToCart(product));
    setJustAdded(true);
    onAdded(`${product.name} added to your bag`);
    window.setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <article className={`product-card accent-${product.accent}`}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <span className="image-orbit" />
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <p>{product.description}</p>
        <button className={`add-button${justAdded ? " added" : ""}`} onClick={handleAdd}>
          {justAdded ? <Check size={16} /> : <Plus size={16} />}
          {justAdded ? "Added" : "Add to bag"}
        </button>
      </div>
    </article>
  );
}
