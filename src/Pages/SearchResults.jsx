/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/apiProducts";
import Product from "../features/Products/Product";

function SearchResults() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await getProducts();
        const allProducts = data.products;

        // Filter products based on the search term
        if (searchTerm) {
          const filtered = allProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setErrorMessage("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center mb-8">
      <p className="font-medium text-2xl my-8">Search Results</p>
      {errorMessage && <p>Sorry, there is something wrong.</p>}
      {isLoading ? (
        <div className="flex space-x-2 justify-center items-center text-center p-5 bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="flex flex-wrap gap-4 w-[85%]">
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No results found for ${searchTerm}.</p>
      )}
    </div>
  );
}

export default SearchResults;
