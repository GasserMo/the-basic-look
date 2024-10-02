/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const gState = createContext();

const Context = ({ children }) => {
  const [data, setData] = useState({
    /*    collection: "all",
    defaultAddressId: "",
    adminEditForm: {
      id: "",
      name: "",
      price: "",
      size: "",
      description: "",
      gender: "",
      collectionSeason: "",
      image: null,
    },
    addressEditForm: {
      addressLine: "",
      country: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    }, 
        searchKeyword: "",
*/
    sessionId: "",
    totalPrice: null,
  });

  return (
    <gState.Provider value={{ data, setData }}>{children}</gState.Provider>
  );
};

export default Context;
