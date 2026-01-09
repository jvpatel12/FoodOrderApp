import { useContext } from "react";
import Modal from "./UI/Model.jsx";
import CartContext from "../Hooks/CartContext";
import { formatting } from "../assets/formatting.js";
import UserProgressContext from "../Hooks/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CarItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function closeCart() {
    userCtx.hideCart();
  }

  function goToCheckout() {
    userCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={userCtx.progress === "cart"}>
      <h2>Your Cart</h2>

      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrese={() => cartCtx.addItem(item)}
            onDecrese={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>

      <p className="cart-total">{formatting.format(cartTotal)}</p>

      <p className="modal-actions">
        <Button textOnly onClick={closeCart}>
          Close
        </Button>

        {cartCtx.items.length > 0 && (
          <Button onClick={goToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
