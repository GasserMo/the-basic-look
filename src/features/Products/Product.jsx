import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function Product({ product }) {
  const navigate = useNavigate();
  return (
    <div className="w-[40%] border flex flex-col flex-auto md:min-w-[25%] md:max-w-[30%] md:border py-5">
      <img
        className="mx-auto"
        src={`https://chicwardrobe-znz5.onrender.com/${product.image}`}
        width={220}
        alt={product.name}
      />
      <p className="mx-auto overflow-hidden overflow-ellipsis w-full  whitespace-nowrap">
        {product.name}
      </p>
      <p className="mx-auto overflow-hidden text-ellipsis whitespace-nowrap">
        {product.price} EGP
      </p>
      <button
        onClick={() => navigate(`/products/${product._id}`)}
        className="hover:bg-gray-800 bg-black text-white mx-3 flex-auto min-w-[20%] text-center py-1 font-sans rounded-lg"
      >
        Show Details
      </button>
    </div>
  );
}

export default Product;
