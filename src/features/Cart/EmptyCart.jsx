/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
function EmptyCart() {
  return (
    <div>
      <Link to="/home">&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some pizzas :</p>
    </div>
  );
}

export default EmptyCart;
