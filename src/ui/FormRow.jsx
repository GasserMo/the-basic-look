/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

function FormRow({
  type,
  id,
  placeholder,
  label,
  onChange,
  value,
  isValid,
  validationMessage,
  showPassword, // New prop to control password visibility
  togglePasswordVisibility,
}) {
  return (
    <div className="flex flex-col mb-4 relative">
      {label && <label className="text-lg mb-1 font-semibold">{label}</label>}
      <div className="relative">
        {" "}
        {/* Wrapper for input and icon */}
        <input
          type={showPassword ? "text" : type} // Change input type based on showPassword
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`border font-thin text-sm rounded-sm p-4 pr-10 mb-1 w-full // Added pr-10 for padding right
          ${
            isValid === false
              ? "border-red-500"
              : isValid === true
              ? "border-green-500"
              : "border-gray-300"
          }`}
        />
        {type === "password" && ( // Only show icon for password input
          <button
            type="button"
            onClick={togglePasswordVisibility} // Call toggle function
            className="absolute right-3 top-4 " // Position the icon
            style={{ background: "transparent", border: "none" }} // Remove background and border
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
            {/* Toggle icon based on state */}
          </button>
        )}
      </div>
      {isValid === false && (
        <p className="text-red-500 text-sm">{validationMessage}</p>
      )}
    </div>
  );
}

export default FormRow;
