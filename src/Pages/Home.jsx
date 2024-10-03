/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null); // Track which item is hovered

  const handleMouseEnter = (index) => {
    setHoveredItem(index); // Set the hovered index
  };
  const handleMouseLeave = () => {
    setHoveredItem(null); // Reset the hovered index when leaving
  };

  return (
    <div className="flex flex-col mt-10 items-center">
      <div className="flex flex-row justify-evenly  w-full ">
        <div className="relative border rounded-lg w-[40%]  md:w-auto ">
          <img src="/assets/men.webp" alt="Men" className="rounded-lg  " />
          <span
            className="homePage "
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => navigate(`/collections/Masculine`)}
          >
            Men
          </span>
        </div>
        <div className="relative border rounded-lg w-[40%]  md:w-auto">
          <img src="/assets/women.webp"></img>
          <span
            className="homePage"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => navigate(`/collections/Feminine`)}
          >
            {" "}
            Women
          </span>
        </div>
      </div>
      <br></br>
      <p className="text-black font-extrabold pt-10 pb-10 text-2xl">
        Collections
      </p>

      <div className=" md:flex md:justify-between md:mb-10 md:cursor-pointer">
        <div
          className="rounded-lg mx-11 "
          onClick={() => navigate("/collections/Summer")}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/summer.webp"
            alt="Men"
            className={`rounded-lg transition-all duration-300 ${
              hoveredItem === 0 ? "w-[300px]" : "w-[250px]"
            }`}
            width={250}
          />
          <p
            className=" rounded-md text-black font-thin 
           border-gray-500 border-2 bg-transparent py-2 md:mt-2 my-5 text-center md:md-collection"
          >
            Summer Collection
          </p>
        </div>
        <div
          onClick={() => navigate("/collections/Formal")}
          className="srounded-lg mx-11"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/formal.jpg"
            className={`rounded-lg transition-all duration-300 ${
              hoveredItem === 1 ? "w-[300px]" : "w-[250px]"
            }`}
            width={300}
          ></img>
          <p
            className=" rounded-md text-black font-thin 
            border-gray-500 border-2 bg-transparent py-2 md:mt-2 my-5
             text-center md:md-collection
            "
          >
            Formal Collection
          </p>
        </div>
        <div
          className="rounded-lg mx-11"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/collections/Winter")}
        >
          <img
            src="/assets/winter.webp"
            width={250}
            className={`rounded-lg transition-all duration-300 ${
              hoveredItem === 2 ? "w-[300px]" : "w-[250px]"
            }`}
          ></img>
          <p
            className=" rounded-md text-black font-thin 
            border-gray-500 border-2 bg-transparent py-2 md:mt-2 my-5
             text-center md:md-collection
            "
          >
            Winter Collection
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
