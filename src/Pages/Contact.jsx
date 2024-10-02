/* eslint-disable no-unused-vars */
import { useState } from "react";
import FormRow from "../ui/FormRow";
import { contactUs } from "../services/contact";
import { HiCheckCircle } from "react-icons/hi2"; // Importing mail and check mark icons

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to handle success

  const [isValidName, setIsValidName] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPhone, setIsValidPhone] = useState(null);
  const [isValidMessage, setIsValidMessage] = useState(null);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValid = name.trim() !== "";
    const emailValid = validateEmail(email);
    const phoneValid = phone.trim().length >= 10;
    const messageValid = message.trim() !== "";

    setIsValidName(nameValid);
    setIsValidEmail(emailValid);
    setIsValidPhone(phoneValid);
    setIsValidMessage(messageValid);
    if (!emailValid || !nameValid || !phoneValid || !messageValid) return;
    setIsLoading(true);

    try {
      await contactUs({ email, name, phone, message });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      setIsLoading(false);
      setEmail("");
      setMessage("");
      setPhone("");
      setName("");
    }
  };

  return (
    <div className=" mx-14">
      <div className="flex flex-col md:justify-start  ">
        <p className="text-lg text-center my-5 font-bold">Contact Us</p>
        <form
          className="font-thin  flex flex-col md:w-[40%]"
          onSubmit={handleSubmit}
        >
          <FormRow
            value={name}
            label="Name"
            id="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            isValid={isValidName}
            validationMessage="Name is required"
          />
          <FormRow
            value={email}
            label="Email"
            id="email"
            type="text"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            isValid={isValidEmail}
            validationMessage="Invalid email address"
          />
          <FormRow
            value={phone}
            label="Phone"
            id="phone"
            type="number"
            placeholder="Enter your phone"
            onChange={(e) => setPhone(e.target.value)}
            isValid={isValidPhone}
            validationMessage="Phone number must be at least 10 digits"
          />
          <FormRow
            value={message}
            label="Message"
            id="message"
            type="text"
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            isValid={isValidMessage}
            validationMessage="Message is required"
          />

          <button
            type="submit"
            className={`bg-black text-white px-9 hover:bg-gray-700 
              transition duration-300 
               py-2 mb-5 font-thin rounded-sm"opacity-50 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              "Loading..."
            ) : isSubmitted ? (
              <div className="flex justify-center items-center">
                <HiCheckCircle size={20} /> {/* Success Icon */}
                <p className="items-center ml-1">Success</p>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
