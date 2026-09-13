function ProductCard({ product, addToCart }) {

  return (

    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">

        <p className="category">
          {product.category}
        </p>

        <h3>
          {product.name}
        </h3>

        <div className="product-bottom">

          <span className="price">
            ₹{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductCard;