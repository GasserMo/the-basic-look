/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import {
  HiMiniUser,
  HiMagnifyingGlass,
  HiShoppingCart,
  HiOutlineUser,
  HiOutlineArrowRightEndOnRectangle,
} from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiProducts";
import { gState } from "../Pages/Context";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data, setData } = useContext(gState);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData);
  }, []);
  const location = useLocation(); // Location object to track page navigation

  const logout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    setData((prevState) => {
      return {
        ...prevState,
        userContext: null,
      };
    });
    navigate("/login");
    /* localStorage.removeItem("userData");
    setUserData(null);
    setData((prevState) => {
      return {
        ...prevState,
        userContext: null,
      };
    });
    navigate("/login"); */
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        const Allproducts = data.products;
        console.log(Allproducts);

        setProducts(Allproducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm(""); // Clear search input on close
    setFilteredSuggestions([]); // Clear suggestions when closing
  };
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product._id}`);

    setSearchTerm(product.name);
    setFilteredSuggestions([]);
  };

  useEffect(() => {
    handleCloseSearch();
  }, [location]);

  return (
    <div>
      <div
        className="text-center bg-gray-800 text-white p-2
      capitalize"
      >
        Free Shipping on All orders{" "}
        <span className="text-red-900">above 500 </span>
      </div>
      <div className="relative flex items-center justify-between px-5 mt-5">
        {isSearchOpen ? (
          <form className="flex items-center justify-center p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search here"
              className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Search
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-800 text-white rounded-full px-2
               hover:bg-gray-700 focus:outline-none focus:ring-2
                focus:ring-gray-600 focus:ring-opacity-50"
              onClick={handleCloseSearch}
              aria-label="Close"
            >
              &#10005;
            </button>
          </form>
        ) : (
          <HiMagnifyingGlass
            className="md:text-3xl text-xl  md:mt-2 cursor-pointer hover:text-gray-700"
            onClick={handleOpenSearch}
          />
        )}
        {filteredSuggestions.length > 0 && (
          <ul className="absolute top-14 bg-white shadow-lg rounded-lg w-full max-h-48 overflow-y-auto z-10">
            {filteredSuggestions.map((product) => (
              <li
                key={product.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(product)}
              >
                <div className="flex flex-row ">
                  <img
                    className="mr-4"
                    src={`https://chicwardrobe-znz5.onrender.com/${product.image}`}
                    width={20}
                    alt={product.name}
                  />
                  <p onClick={() => navigate(`/products/${product.id}`)}>
                    {product.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <img
          onClick={() => navigate("/home")}
          className={` ${
            isSearchOpen && `hidden md:block`
          } absolute md:inset-1 inset-1 mx-auto w-[40%]  md:w-auto cursor-pointer`}
          src="/assets/download.jpeg"
        ></img>
        {data.userContext == null ? (
          <div className="flex  space-x-2 ">
            <p
              onClick={() => navigate("/login")}
              className="pr-2 hidden md:block  cursor-pointer hover:text-gray-600 "
            >
              Login
            </p>
            <p
              onClick={() => navigate("/register")}
              className="hidden md:block pr-2   cursor-pointer hover:text-gray-600 "
            >
              Register
            </p>
            <HiMiniUser
              onClick={
                data.userContext == null
                  ? () => navigate("/login")
                  : () => navigate("/account")
              }
              className="md:hidden m-2 text-xl cursor-pointer hover:text-gray-600"
            />
          </div>
        ) : (
          <div className=" flex ">
            <div className="flex ">
              <HiShoppingCart
                className="md:m-2 my-2  md:text-2xl text-xl cursor-pointer hover:text-gray-600"
                onClick={() => navigate("/cart")}
              />
              <HiMiniUser
                className="md:m-2 my-2 mx-2 md:text-2xl text-xl cursor-pointer hover:text-gray-600"
                onClick={() => navigate("/account")}
              />{" "}
            </div>
            <HiOutlineArrowRightEndOnRectangle
              className="md:m-2 my-2  md:text-2xl text-xl cursor-pointer hover:text-gray-600"
              onClick={logout}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center mt-5 ">
        <p
          onClick={() => navigate("/home")}
          className="px-5 cursor-pointer rounded-xl transition duration-500 ease-in-out transform hover:scale-100
 bg-white hover:bg-black hover:text-white "
        >
          Home
        </p>
        <p
          onClick={() => navigate("/products")}
          className="px-5 cursor-pointer rounded-xl transition duration-500 ease-in-out transform hover:scale-100
 bg-white hover:bg-black hover:text-white"
        >
          Products
        </p>
        <p
          onClick={() => navigate("/contact")}
          className="px-5 cursor-pointer rounded-xl
          transition duration-500 ease-in-out transform hover:scale-100
          bg-white hover:bg-black hover:text-white"
        >
          {" "}
          Contact
        </p>
      </div>
    </div>
  );
}

export default Header;
