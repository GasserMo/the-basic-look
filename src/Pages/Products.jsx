/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getProducts } from "../services/apiProducts";
import { useEffect } from "react";
import Product from "../features/Products/Product";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await getProducts();
        const Allproducts = data.products;
        console.log(Allproducts);

        setProducts(Allproducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col  items-center mb-8">
      <p className="font-medium text-2xl my-8">Products</p>
      {errorMessage && <p>Sorry there is something wrong </p>}
      {isLoading ? (
        <div className="flex space-x-2 justify-center items-center text-center p-5 bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4  w-[75%]">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
