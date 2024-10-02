/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function FormRow({
  type,
  id,
  placeholder,
  label,
  onChange,
  value,
  isValid,
  validationMessage,
}) {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className=" text-lg  mb-1 font-semibold">{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`border font-thin text-sm rounded-sm p-4 mb-1 w-full 
          ${
            isValid === false
              ? "border-red-500"
              : isValid === true
              ? "border-green-500"
              : "border-gray-300"
          }`}
      />{" "}
      {isValid === false && (
        <p className="text-red-500 text-sm">{validationMessage}</p>
      )}
    </div>
  );
}

export default FormRow;
