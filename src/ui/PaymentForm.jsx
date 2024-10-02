/* eslint-disable no-unused-vars */
/* 
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
function PaymentForm() {
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#000101",
        color: "#140101",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#a09872" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { sessionId } = paymentMethod;
        const response = await axios.post(
          `https://chicwardrobe-znz5.onrender.com/orders/checkout`,
          {
            amount: 1000,
            sessionId,
          }
        );
        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("error" + error);
      }
    } else {
      console.log(error.message);
    }
  };
  return !success ? (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className=" ">
          <CardElement options={CARD_OPTIONS}></CardElement>
        </div>
      </fieldset>
      <button className="flex bg-blue-400 p-11 text-white ">Pay</button>
    </form>
  ) : (
    <div>
      <h2>You just bough a sweet</h2>
    </div>
  );
}
*/
/*export default PaymentForm;
 */
