/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getCollection } from "../services/apiCollections";
import Product from "../features/Products/Product";
import { useParams } from "react-router-dom";

function Collections() {
  const [products, setProducts] = useState([]);
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCollection() {
      setIsLoading(true);

      try {
        const data = await getCollection({ name });
        console.log(data);
        setProducts(data.products);
      } catch (e) {
        console.error("Failed to fetch product:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCollection();
  }, [name]);
  return (
    <div className="flex flex-col  items-center mb-8">
      <p className="font-medium text-2xl my-8">{name} Products</p>
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

export default Collections;
