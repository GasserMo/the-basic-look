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
    userContext: null,
  });
  /*  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data based on the token or just store the token
      setData((prevState) => ({
        ...prevState,
        userContext: { token }, // You might want to fetch user info using this token
      }));
    }
  }, []); */
  return (
    <gState.Provider value={{ data, setData }}>{children}</gState.Provider>
  );
};

export default Context;
