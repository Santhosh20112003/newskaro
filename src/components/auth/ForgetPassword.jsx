import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../utils/context/UserAuthContext";
import { AppLogoUrl, AppName, random_forget_img } from "../common/links";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const { forgetpassword } = useUserAuth();
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);
    try {
      await forgetpassword(email);
      setIsLoading(false);
      setEmailSent(true);
      toast.success("Email has been Sent Successfully.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setErr(error.message.replace("Firebase:", "").replace(".", ""));
      setIsLoading(false);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const openEmail = () => {
	const width = window.screen.availWidth;
	const height = window.screen.availHeight;
	const left = window.screen.availLeft;
	const top = window.screen.availTop;
	const features = `width=${width},height=${height},left=${left},top=${top},fullscreen=yes`;
  
	window.open('https://gmail.com', 'popup', features);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-full bg-gray-200 lg:w-1/2">
        <img
          src={random_forget_img}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-24 w-auto"
            src={AppLogoUrl}
            alt={AppName}
          />
          <h2 className="text-gray-600 text-center text-2xl font-semibold leading-9 tracking-tight">
            {AppName}
          </h2>
        </div>
        {err && <p className="mt-5 text-center text-red-500">{err}</p>}
        <div>
          <h2 className="mt-2 text-center text-md font-normal text-gray-500">
            If the account exists, we'll email you instructions to reset the password.
          </h2>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <div className="mt-2">
                  <input
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Your Email address..."
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 text-sm leading-6"
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-52 justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold  leading-6 text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-600 active:scale-95 transition-all "
                >
                  <span className={isLoading ? "hidden" : "flex"}>
                    Send Recovery Email
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
          ) : (
            <div className="flex w-full items-center justify-center">
              <button
                onClick={openEmail}
                className="flex w-52 justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:scale-95 transition-all hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-600"
              >
                Open Email
              </button>
            </div>
          )}
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Remembered your password? {' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
          >
            Login
          </Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Forgetpassword;