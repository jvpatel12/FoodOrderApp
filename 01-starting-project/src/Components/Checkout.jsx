import { useState, useContext } from "react";
import Modal from "./UI/Model.jsx";
import UserProgressContext from "../Hooks/UserProgressContext.jsx";
import CartContext from "../Hooks/CartContext";
import Button from "./UI/Button.jsx";
import { useHttp } from "../Hooks/useHttp.js";

export default function Checkout() {
  const userCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { isLoading, error: serverError, sendRequest } = useHttp(
    `${apiUrl}/orders`,
    { method: "POST" }
  );

  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function close() {
    userCtx.hideCheckout();
    setIsSubmitted(false);
    resetForm();
  }

  function resetForm() {
    setFullName("");
    setStreet("");
    setEmail("");
    setPhone("");
    setErrors({});
  }
 
  function validate() {
    const e = {};
    if (!fullName.trim()) e.fullName = "Required";
    if (!street.trim()) e.street = "Required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid";
    if (!phone.trim() || !/^[\d+\- ]{7,15}$/.test(phone)) e.phone = "Invalid";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitHandler(ev) {
    ev.preventDefault();
    if (!validate()) return;

    const order = {
      items: cartCtx.items,
      customer: {
        name: fullName,
        email,
        street,
        phone,
        "postal-code": "00000",
        city: "Unknown",
      },
    };

    try {
      await sendRequest({ order });
      // clear cart
      cartCtx.items.slice().forEach((item) => cartCtx.removeItem(item.id));
      // show success message
      setIsSubmitted(true);
      // auto close after 2 seconds
      setTimeout(() => {
        userCtx.hideCheckout();
        setIsSubmitted(false);
        resetForm();
      }, 2000);
      console.log("Order successful");
    } catch (err) {
      // error is already handled by useHttp hook and set in serverError state
      console.error("Order failed:", err);
    }
  }

  return (
    <Modal open={userCtx.progress === "checkout"} className="checkout">
      {isSubmitted ? (
        <div className="success-message">
          <h2>✓ Order Submitted Successfully!</h2>
          <p>Thank you for your order. We'll prepare it right away.</p>
          <p className="confirmation-text">Order confirmation has been sent to <strong>{email}</strong></p>
        </div>
      ) : (
        <>
          <h2>Checkout</h2>

          <form onSubmit={submitHandler}>
            <div className="control">
              <label>Full name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            <div className="control">
              <label>Street</label>
              <input value={street} onChange={(e) => setStreet(e.target.value)} />
              {errors.street && <p className="error">{errors.street}</p>}
            </div>

            <div className="control">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="control">
              <label>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            {serverError && <p className="error server-error">{serverError}</p>}

            <div className="actions">
              <Button type="button" onClick={close} className="cancel" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Confirm"}
              </Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}
