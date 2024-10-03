/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/Cart/cartSlice";
import CartItem from "../features/Cart/CartItem";
import { checkout, goToPayment } from "../services/apiOrders";
import { loadStripe } from "@stripe/stripe-js";
import { gState } from "../Pages/Context";

import { useNavigate } from "react-router-dom";

function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkingOut, setCheckoutOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // New loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { setData } = useContext(gState);

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true); // Start loading
      await dispatch(fetchCart()); // Fetch the cart data
      setIsLoading(false); // Stop loading
    };
    loadCart();
  }, [dispatch]);

  const publicKey =
    "pk_test_51OHwL2AdAEP20rghX2I5FnprUmOzcdfn3feKAXtnqbxFbjh6xcxnTcvosRA5WpxOlAqOwzY3BksL8rkJB1Hjq22q00MgrdGBAz";

  const stripePromise = loadStripe(publicKey);

  const handleGotoPayment = async (e) => {
    try {
      e.preventDefault();
      setCheckoutOut(true);

      const id = await goToPayment();
      await setData((prevState) => {
        return {
          ...prevState,
          sessionId: id,
        };
      });
      navigate("/checkout");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.error);
    } finally {
      setCheckoutOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-grow  justify-center space-x-2  items-center  p-5">
        <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }
  if (cart.length == 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className=" font-medium text-2xl mt-5">Your Cart is Empty</p>
        <a className="hover:text-cyan-700" href="/products">
          Start Shopping →
        </a>
      </div>
    );
  }

  return (
    <div className="my-12">
      <p className="font-bold text-2xl my-8 text-center">My Cart</p>
      <hr className="border-t border-gray-200 my-5" />
      <div className="md:flex md:justify-between ">
        <div className="flex flex-col w-[60%]  ">
          {cart.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>
        <hr></hr>
        <div className="   flex flex-col md:w-[30%] mx-4 md:right-0 md:mr-8 my-5">
          <div>
            <p className="text-lg">Total: {totalPrice} EGP</p>
            <p className="text-md">Shipping calculated at checkout</p>
            <hr className="border-t border-gray-200 my-5" />
          </div>
          <div>
            <div
              onClick={(e) => handleGotoPayment(e)}
              className={`bg-black cursor-pointer
             text-white text-center py-2 rounded-md hover:bg-gray-800 transition duration-300 ${
               isLoading && "opacity-50 cursor-not-allowed"
             }`}
            >
              {checkingOut ? "Loading..." : "Go to Payment"}
            </div>
            {errorMessage && (
              <div>
                <p className="text-red-500">{errorMessage}</p>
                <a className="hover:text-cyan-700" href="/account">
                  Add your address →
                </a>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
