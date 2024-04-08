import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../utils/context/UserAuthContext";
import { AppLogoUrl, AppName, random_login_img } from "../common/links";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);
    try {
      await logIn(email, password);
      toast.success("Authentication Success", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      setErr(error.message.replace("Firebase:", "").replace(".", ""));
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <div className="flex h-screen w-full">
      <Link
        to="/home"
        className="fixed active:scale-95 transition-all px-3 py-2 top-5 left-5 rounded-full shadow-lg bg-emerald-500 w-fit h-fit"
      >
        <i className="text-xl text-white fas fa-arrow-left font-bold"></i>
      </Link>
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={AppLogoUrl} alt={AppName} />
          <h2 className="text-gray-600 text-center text-2xl font-semibold leading-9 tracking-tight">
            {AppName}
          </h2>
          <h2 className="mt-2 text-center text-md font-normal text-gray-500">
          As a new user, please remember to verify your account via email.
          </h2>
        </div>
        {err && <p className="mt-5 text-center text-red-500">{err}</p>}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="Your Email address..."
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 text-sm leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forget-password"
                    className="font-semibold text-emerald-700 hover:text-emerald-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  required
                  placeholder="Your Password..."
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full focus:outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 text-sm leading-6"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer `}
                  type="button"
                >
                  <i
                    className={`${
                      isPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-52 active:scale-95 transition-all justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-600"
              >
                <span className={isLoading ? "hidden" : "flex"}>
                  Get Into Your Account
                </span>
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      className="opacity-25"
                    ></circle>
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      className="opacity-75"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account? {" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
               Signup
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden overflow-y-hidden bg-gray-200 lg:block w-1/2 h-full">
        <img
          src={random_login_img}
          alt="banner"
          className="brightness-75 w-full h-full object-cover"
        />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;
