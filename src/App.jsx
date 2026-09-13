import { useState } from "react";

import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import products from "./products";

import "./App.css";

function App() {

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const addToCart = (product) => {

    const existingProduct = cart.find(
      item => item.id === product.id
    );

    if (existingProduct) {

      setCart(
        cart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }
  };

  const filteredProducts = products.filter(product => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>

      <Navbar
        cartCount={cartCount}
        setShowCart={setShowCart}
      />

      <main>

        <section className="hero">

          <div>

            <p className="small-title">
              WELCOME TO SHOPCART
            </p>

            <h1>
              Everything You Need,
              <br />
              In One Place.
            </h1>

            <p>
              Discover amazing products at affordable prices.
            </p>

          </div>

        </section>


        <section className="products-section">

          <div className="section-top">

            <h2>Our Products</h2>

            <div className="filters">

              <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >

                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Fitness">Fitness</option>
                <option value="Stationery">Stationery</option>

              </select>

            </div>

          </div>


          <div className="product-grid">

            {filteredProducts.map(product => (

              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />

            ))}

          </div>

        </section>

      </main>


      {showCart && (

        <Cart
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
        />

      )}

    </div>
  );
}

export default App;