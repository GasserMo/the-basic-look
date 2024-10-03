import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Info() {
  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 flex justify-around px-5 mt-5 pb-8">
      <div className="flex flex-col w-[30%]">
        <p className="font-bold text-white mt-5 mb-5">Follow us</p>
        <div className="flex space-x-2 ">
          <FaFacebook
            onClick={() =>
              handleSocialClick("https://www.facebook.com/gasser713")
            }
            className="cursor-pointer text-black hover:text-white"
          />
          <FaTwitter
            onClick={() => handleSocialClick("https://x.com/jeesarr")}
            className="cursor-pointer text-black hover:text-white"
          />
          <FaLinkedin
            onClick={() =>
              handleSocialClick(
                "https://www.linkedin.com/in/gasser-mohamed-628923274/"
              )
            }
            className="cursor-pointer text-black hover:text-white"
          />
        </div>
      </div>

      <div className="flex flex-col   w-[30%]">
        <p className="font-bold text-white mt-5 mb-5">Shop</p>
        <div>
          <p
            onClick={() => navigate(`/collections/Masculine`)}
            className="font-normal hover:text-gray-500 text-white 
            cursor-pointer transition duration-500 ease-in-out transform"
          >
            Men
          </p>
          <p
            onClick={() => navigate(`/collections/feminine`)}
            className="font-normal hover:text-gray-500 text-white 
            cursor-pointer transition duration-500 ease-in-out transform"
          >
            Women
          </p>
        </div>
      </div>
      <div className="flex flex-col  w-[30%] ">
        <p className="font-bold text-white mt-5 mb-5">Store Policies</p>
        <div>
          <p
            onClick={() => navigate("/shipping")}
            className="font-normal hover:text-gray-500 text-white 
            cursor-pointer transition duration-500 ease-in-out transform"
          >
            Shipping & Delivery
          </p>
          <p
            onClick={() => navigate("/exchange-policy")}
            className="font-normal hover:text-gray-500 text-white 
            cursor-pointer transition duration-500 ease-in-out transform"
          >
            Exchange & Refund Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
