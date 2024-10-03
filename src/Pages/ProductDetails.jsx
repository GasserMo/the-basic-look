/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/apiProducts";
import Product from "../features/Products/Product";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../features/Cart/cartSlice";
import { HiCheckCircle } from "react-icons/hi2"; // Importing mail and check mark icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductDetails() {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to handle success
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById({ id: productId });
        setProduct(data.product);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct();
  }, [productId]);

  const dispatch = useDispatch();

  async function handleAddItem() {
    if (!userData) {
      toast.error("You need to log in before adding items to the cart.");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(
        addToCart({ id: productId, size: selectedSize, quantity: 1 })
      ).then((response) => {
        console.log("Item added to cart successfully:", response);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  }
  if (error) {
    return <div className="p-5">Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="flex space-x-2 justify-center items-center text-center p-5 bg-white dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex md:flex-row  mb-8 p-10 ">
      <img
        className="w-[90%] md:w-[20%] "
        src={`https://chicwardrobe-znz5.onrender.com/${product.image}`}
        width={200}
        alt={product.name}
      />
      <div className="md:flex-col md:items-start font-light md:w-[60%] md:ml-5 ">
        <p className="mx-auto text-ellipsis text-xl">
          <span> Name: </span>
          {product.name}
        </p>
        <p className="text-xl">
          {" "}
          <span>Price: </span>
          {product.price} EGP
        </p>
        <div className="mx-auto text-ellipsis pb-2 text-xl ">
          {" "}
          <div className="pb-2"> Size: </div>
          <div className="flex space-x-4">
            {["S", "M", "L"].map((size) => (
              <div
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`cursor-pointer px-3  border rounded-md ${
                  selectedSize === size ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className="flex space-x-2 w-[30%] p-3  items-centerbg-white">
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
          </div>
        ) : isSubmitted ? (
          <div
            className="flex justify-center items-center w-[50%] bg-black text-white
           text-center font-sans rounded-lg py-1 px-5"
          >
            <HiCheckCircle size={20} />
            <p className="items-center  ">Success</p>
          </div>
        ) : (
          <button
            onClick={handleAddItem}
            className="  md:w-[30%] bg-black text-white
           text-center py-1 px-5 font-sans rounded-lg hover:bg-gray-800"
          >
            Add To Cart
          </button>
        )}
      </div>
      <ToastContainer className="flex justify-center" />{" "}
      {/* Add ToastContainer here */}
    </div>
  );
}

export default ProductDetails;
