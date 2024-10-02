/* eslint-disable react/prop-types */
import { useState } from "react";
import FormRow from "./FormRow";

function SubmitForm(handleSubmit) {
  const [addressLine, setAddressLine] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div>
      <form className="font-thin flex flex-col w-[50%]" onSubmit={handleSubmit}>
        <div>
          <FormRow
            value={postalCode}
            label="postalCode"
            id="postalCode"
            type="text"
            placeholder="Enter your postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <FormRow
            value={state}
            label="state"
            id="state"
            type="text"
            placeholder="Enter your setState"
            onChange={(e) => setState(e.target.value)}
          />
          <FormRow
            value={city}
            label="city"
            id="city"
            type="text"
            placeholder="Enter your city"
            onChange={(e) => setCity(e.target.value)}
          />
          <FormRow
            value={phone}
            label="phone"
            id="phone"
            type="text"
            placeholder="Enter your phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormRow
            value={addressLine}
            label="addressLine"
            id="addressLine"
            type="text"
            placeholder="Enter your addressLine"
            onChange={(e) => setAddressLine(e.target.value)}
          />
          <FormRow
            value={country}
            label="country"
            id="country"
            type="text"
            placeholder="Enter your country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`bg-black text-white px-9 py-2 mb-5 font-thin rounded-sm `}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default SubmitForm;
