/* eslint-disable no-unused-vars */
/* import { Input } from "postcss";
import FormRow from "../ui/FormRow";
 */

import { useState } from "react";
import FormRow from "../ui/FormRow";
import Title from "../ui/Title";
import { registerUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../features/authentication/useAuth";

function Register() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidName, setIsValidName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setisRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return passwordRegex.test(password);
  };

  const { register, isLoading } = useRegister();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const nameValid = name.trim().length >= 3;

    setIsValidName(nameValid);
    setIsValidEmail(emailValid);
    setIsValidPassword(passwordValid);
    setisRegistering(true);
    if (!email || !password || !name) return;

    try {
      await registerUser({ name, email, password });
      navigate("/home");
    } catch (error) {
      if (error.message.includes("Email address already exists")) {
        setErrorMessage("Email address already exists"); // Set without "Error: "
      } else {
        setErrorMessage("Registration failed. Please try again."); // Generic message for other errors
      }
    } finally {
      setisRegistering(false);
    }
  };

  return (
    <div className="flex flex-col mx-14 w-[60%] md:w-[40%]">
      <Title type="thin">Welcome</Title>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div>
          <FormRow
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setFullName(e.target.value)}
            isValid={isValidName}
            validationMessage="Name must be at least 3 characters long"
          />
          <FormRow
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isValidEmail}
            validationMessage="Invalid email address"
          />
          <FormRow
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your Password"
            value={password}
            showPassword={showPassword} // Pass showPassword state
            togglePasswordVisibility={togglePasswordVisibility}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValidPassword}
            validationMessage="Your password must be atleast 8 characters long
             (1 Uppercase Letter, 1 Lowercase Letter, 1 Number)"
          />
        </div>{" "}
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p> // Display error message
        )}
        <button
          type="submit"
          disabled={isRegistering}
          className={`bg-black text-white px-9 py-2 mb-5 font-thin rounded-sm ${
            isRegistering && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isRegistering ? "Registering..." : "Create Account"}
        </button>
      </form>
      <div className="flex flex-col">
        <hr className="border-t border-gray-200 my-5" />
        ALREADY HAVE AN ACCOUNT?
        <span
          className="underline cursor-pointer hover:text-gray-600 my-4"
          onClick={() => navigate("/login")}
        >
          {" "}
          LOG IN
        </span>
      </div>
    </div>
  );
}

export default Register;
