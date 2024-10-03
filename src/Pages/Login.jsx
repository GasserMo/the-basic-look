/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import FormRow from "../ui/FormRow";
import Title from "../ui/Title";
import { useLogin } from "../features/authentication/useAuth";
import { loginUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { gState } from "../Pages/Context";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

function Login({ setUserData }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const { setData } = useContext(gState);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await loginUser({ email, password });
      await setData((prevState) => {
        return {
          ...prevState,
          userContext: data,
        };
      });
      navigate("/home");
    } catch (error) {
      setErrorMessage("User or Password is Incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[70%] md:w-[40%] mx-14">
      <div className="flex flex-col justify-start items-start ">
        <Title type="thin">Welcome Back!</Title>
        <form
          className="font-thin flex flex-col w-full"
          onSubmit={handleSubmit}
        >
          <div className="">
            <FormRow
              value={email}
              label="Email"
              id="email"
              type="text"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              /*  isValid={isValidEmail}
              validationMessage="Invalid email address" */
            />
            <FormRow
              value={password}
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword} // Pass showPassword state
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p> // Display error message
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-black text-white px-9 py-2 mb-5 font-thin rounded-sm ${
              isLoading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>

        <div className="flex flex-col justify-between items-start w-full ">
          <div className="flex flex-col">
            {" "}
            <hr className="border-t border-gray-200 my-5" />
            DONT HAVE AN ACCOUNT YET?
            <span
              className="underline cursor-pointer hover:text-gray-600 my-4"
              onClick={() => navigate("/register")}
            >
              {" "}
              Create An Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
