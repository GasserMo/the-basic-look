/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { deleteFromCart, increaseQuantity } from "./cartSlice";
import { useState } from "react";
/* import Spinner from "../../ui/Spinner";
 */
/* eslint-disable react/prop-types */
function CartItem({ item }) {
  const dispatch = useDispatch();
  if (!item.product) return null; // Handle undefined item and product

  const handleRemove = () => {
    dispatch(
      deleteFromCart({
        id: item.product._id,
        size: item.size,
        quantity: item.quantity,
      })
    );
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    dispatch(
      increaseQuantity({
        id: item.product._id,
        size: item.size,
        quantity: newQuantity,
      })
    );
  };

  return (
    <div
      className="border mx-8  flex min-w-[50%]
     max-w-[90%] min-h-48 max-h-64 mt-1 mb-5"
    >
      <img
        src={`https://chicwardrobe-znz5.onrender.com/${item.product.image}`}
        width="100px"
        alt={item.product.name}
      />
      <div className="mx-5 justify-evenly flex flex-col items-start">
        <p className="font-bold overflow-hidden text-ellipsis whitespace-wrap line-clamp-3">
          {item.product.name}
        </p>
        <p>Price: {item.product.price} EGP</p>
        <p>Size: {item.size}</p>

        <div className="flex items-center">
          <p className="mr-2">Quantity:</p>
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className="border rounded px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>

        {item.isDeleting ? (
          <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
          </div>
        ) : (
          <button
            onClick={handleRemove}
            className="bg-red-500  transition duration-300 text-white px-2 py-1 rounded-md hover:bg-red-800"
          >
            {" "}
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default CartItem;
