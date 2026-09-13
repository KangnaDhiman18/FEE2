function Cart({ cart, setCart, setShowCart }) {

  const increaseQuantity = (id) => {

    setCart(
      cart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };


  const decreaseQuantity = (id) => {

    setCart(
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
    );

  };


  const removeItem = (id) => {

    setCart(
      cart.filter(item => item.id !== id)
    );

  };


  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  return (

    <div className="cart-overlay">

      <div className="cart">

        <div className="cart-header">

          <h2>🛒 Your Cart</h2>

          <button
            className="close-btn"
            onClick={() => setShowCart(false)}
          >
            ✕
          </button>

        </div>


        {cart.length === 0 ? (

          <div className="empty-cart">

            <div>🛒</div>

            <h3>
              Your cart is empty
            </h3>

            <p>
              Add some products to your cart.
            </p>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {cart.map(item => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹{item.price}
                    </p>

                    <div className="quantity">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    🗑️
                  </button>

                </div>

              ))}

            </div>


            <div className="cart-footer">

              <div className="total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  alert("Order placed successfully! 🎉")
                }
              >
                Checkout
              </button>

            </div>

          </>

        )}

      </div>

    </div>

  );
}

export default Cart;