import { useEffect, useState } from "react";
import { useAddAddress, useUpdateAddress } from "../features/account/address";
import FormRow from "../ui/FormRow";
import { deleteAddress, getAddress } from "../services/apiAddress";
import { HiPencil } from "react-icons/hi2";
import { getOrders } from "../services/apiOrders";
function Account() {
  const [addressLine, setAddressLine] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null); // State to track the address being edited
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [orders, setOrders] = useState([]);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(""); // State to store phone error

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/; // At least 10 digits, only numbers
    if (!phoneRegex.test(phone)) {
      setPhoneError("Phone number must be at least 10 digits ");
      return false;
    }
    setPhoneError(""); // Clear error if phone is valid
    return true;
  };
  const fetchAddresses = async () => {
    setIsLoading(true); // Start loading
    const data = await getAddress();
    if (data?.addresses) {
      setAddresses(data.addresses);
    }
    setIsLoading(false); // End loading
  };
  const fetchOrders = async () => {
    setIsLoading(true); // Start loading
    const data = await getOrders();
    console.log("data is " + data.orders);
    if (data?.orders) {
      setOrders(data.orders);
    }
    setIsLoading(false); // End loading
  };

  const { addingAddress, isPending, isSuccess } = useAddAddress(fetchAddresses);
  const { updatingAddress, isUpdated } = useUpdateAddress(fetchAddresses);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addressLine || !country || !postalCode || !state || !city || !phone) {
      alert("Please fill all fields");

      return;
    }
    if (!validatePhone(phone)) {
      return; // Stop form submission if phone is invalid
    }
    if (editAddressId) {
      // If we are editing, call the update function
      await updatingAddress({
        addressLine,
        country,
        postalCode,
        state,
        city,
        phone,
        id: editAddressId, // Pass the ID of the address to update
      });
    } else {
      await addingAddress({
        addressLine,
        country,
        postalCode,
        state,
        city,
        phone,
      });
    }
  };

  const resetFormFields = () => {
    setAddressLine("");
    setCountry("");
    setPostalCode("");
    setState("");
    setCity("");
    setPhone("");
    setEditAddressId(null); // Reset edit address ID
  };

  const handleEditAddress = (address) => {
    setEditAddressId(address._id); // Set the ID of the address being edited
    setAddAddress(true); // Open the address form
  };

  useEffect(() => {
    fetchOrders();
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      resetFormFields(); // Reset the form fields
      setAddAddress(false); // Close the address form
      fetchAddresses(); // Fetch updated addresses
      setEditAddressId(null); // Reset editing state
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isUpdated) {
      resetFormFields(); // Reset the form fields
      setAddAddress(false); // Close the address form
      fetchAddresses(); // Fetch updated addresses
    }
  }, [isUpdated]);
  const handleDeleteAddress = async (id) => {
    setIsDeleting(true);
    const isSuccess = await deleteAddress({ id });
    if (isSuccess) {
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== id)
      );
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col px-10 mb-12">
      <p className="font-bold text-2xl my-8 text-center">My Account</p>

      <div className="flex flex-col mt-5   w-full">
        {isLoading ? (
          <div className="flex space-x-2  items-center  pb-5 pt-5">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="flex flex-col items-start  ">
            <p className="font-medium text-lg">Order History</p>
            <div className=" overflow-x-auto">
              <table className="table-fixed text-lg text-left text-gray-500 mb-5 w-full">
                <thead className="text-lg text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="w-1/3">Order Number</th>
                    <th className="w-1/3 px-6 py-3 ">Price</th>
                    <th className="w-1/3 px-6 py-3 ">Quantity</th>
                  </tr>
                </thead>
                <tbody className="">
                  {orders.map((order) => (
                    <tr key={order._id} className="bg-white border-b">
                      <th className="font-medium text-gray-900 whitespace-normal break-words">
                        {order.number}{" "}
                      </th>
                      <td className="px-6 py-3 whitespace-normal break-words">
                        {order.totalAmount}
                        {" LE"}
                      </td>
                      <td className="px-6 py-3 whitespace-normal break-words">
                        {order.products.length}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>You havent ordered yet</p>
        )}

        <div>
          <p className="font-medium text-lg">Address</p>

          {isLoading ? (
            <div className="flex space-x-2  items-center  pb-5 pt-5">
              <span className="sr-only">Loading...</span>
              <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
            </div>
          ) : addresses.length > 0 ? (
            <div>
              <ul className="md:flex ">
                {addresses.map((address, index) => (
                  <div key={address._id} className="md:flex">
                    <li>
                      <div className="flex ">
                        Address {index + 1} :
                        <HiPencil
                          onClick={() => handleEditAddress(address)}
                          className=" ml-5 cursor-pointer hover:bg-black hover:text-white text-lg  rounded-lg "
                        />
                      </div>
                      <p>Address Line: {address.addressLine}</p>
                      <p>Country: {address.country}</p>
                      <p>City: {address.city}</p>
                      <p>State: {address.state}</p>
                      <p>Postal Code: {address.postalCode}</p>
                      <p>Phone: {address.phone}</p>
                      <p>id: {address._id}</p>
                      {isDeleting ? (
                        <div className="flex justify-center space-x-2 px-2 py-2 bg-red-500 rounded-md w-24">
                          <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteAddress(address._id)}
                          className="bg-red-500 w-24 hover:bg-red-800
                          transition duration-300
                          text-white px-2 rounded-md"
                        >
                          Delete
                        </button>
                      )}
                      <hr className="my-4" />
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p className="my-2 text-lg">You currently have no address here</p>
          )}
          <div>
            {addAddress && (
              <button
                type="button"
                className=" bg-gray-800 text-white rounded-full px-2 my-2
               hover:bg-gray-700 focus:outline-none focus:ring-2
                focus:ring-gray-600 focus:ring-opacity-50"
                onClick={() => setAddAddress((open) => !open)}
              >
                &#10005;
              </button>
            )}
            {addAddress && (
              <form
                className="font-thin flex flex-col w-[50%]"
                onSubmit={handleSubmit}
              >
                <div className="">
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
                    type="number"
                    placeholder="Enter your phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError && <p className="text-red-500">{phoneError}</p>}
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
                  disabled={isPending}
                  className={`cursor-pointer  bg-gray-800 text-white rounded-full
                 px-4 py-2 transition duration-300 
               hover:bg-gray-700  ${
                 isPending ? "opacity-50 cursor-not-allowed" : ""
               }`}
                >
                  {isPending
                    ? "Loading"
                    : editAddressId
                    ? "Update Address"
                    : "Add Address"}{" "}
                </button>
              </form>
            )}{" "}
            {!addAddress && (
              <p
                className="bg-gray-800 text-white rounded-full w-[40%] px-4 py-2
                md:cursor-pointer md:w-[20%] md:transition md:duration-300 
            md:hover:bg-gray-700"
                onClick={() => setAddAddress((open) => !open)}
              >
                Add Address
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
