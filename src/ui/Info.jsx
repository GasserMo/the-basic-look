import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Info() {
  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="bg-gray-800 flex justify-around mt-5">
      <div className="flex flex-col ">
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
      <div className="flex flex-col ">
        <p className="font-bold text-white mt-5  mb-5">Useful Links</p>
        <div className="mb-5">
          <p className="font-normal text-white ">Insta</p>
          <p className="font-normal text-white ">Insta</p>
          <p className="font-normal text-white ">Insta</p>
        </div>
      </div>
      <div className="flex flex-col  ">
        <p className="font-bold text-white mt-5 mb-5">Shop</p>
        <div>
          <p className="font-normal text-white ">Men</p>
          <p className="font-normal text-white ">Women</p>
        </div>
      </div>
      <div className="flex flex-col ">
        <p className="font-bold text-white mt-5 mb-5">Store Policies</p>
        <div>
          <p className="font-normal text-white ">Shipping & Delivery</p>
          <p className="font-normal text-white ">Exchange & Refund Policy</p>
          <p className="font-normal text-white ">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Info;
