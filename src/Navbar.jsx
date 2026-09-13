function Navbar({ cartCount, setShowCart }) {

  return (

    <nav className="navbar">

      <div className="logo">
        🛍️SHOPCART
      </div>

      <button
        className="cart-button"
        onClick={() => setShowCart(true)}
      >
        🛒 Cart

        <span>
          {cartCount}
        </span>

      </button>

    </nav>

  );
}

export default Navbar;