/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { gState } from "../Pages/Context";
import { loadStripe } from "@stripe/stripe-js";
import { fetchCart } from "../features/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../features/Cart/CartItem";

const stripePromise = loadStripe(
  "pk_test_51NY7b0LsdqxwRmtKhZgtqGLxX3r9P4L8EdILFIbuTBjYvelOlb0Nw3nmo5Nn3dDrnp0x3mZco0wwcbcaedrVjQ0z00Si2dDTbD"
);
function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  useEffect(() => {
    const loadCart = async () => {
      await dispatch(fetchCart()); // Fetch the cart data
    };
    loadCart();
  }, [dispatch]);

  const { data } = useContext(gState);
  const { defaultAddressId } = data;
  const { sessionId } = data;

  const handleCheckout = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
    if (error) {
      console.error(error);
    }
    console.log("sessionnnn" + sessionId);
  };

  return (
    <div className="my-12">
      <p className="font-bold text-2xl my-8 text-center">My Cart</p>
      <hr className="border-t border-gray-200 my-5" />
      <div className="flex justify-between ">
        <div className="flex flex-col w-[60%]  ">
          {cart.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>

        <div className="flex flex-col w-[30%]  right-0 mr-8 my-5">
          <div>
            <p className="text-lg">Total: {totalPrice} EGP</p>
            <p className="text-md">Shipping calculated at checkout</p>
            <hr className="border-t border-gray-200 my-5" />
          </div>
          <div>
            <div
              onClick={(e) => handleCheckout(e)}
              className="bg-black cursor-pointer
           text-white text-center py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
