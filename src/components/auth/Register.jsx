import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../utils/context/UserAuthContext";
import { AppLogoUrl, AppName, availableCategories, random_register_img } from "../common/links";
import { toast } from "react-toastify";
import { db } from "../common/config/firebase"; 
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const {user} = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useUserAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupPageView, setSignupPageView] = useState(true);
  const [categoryPageView, setCategoryPageView] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const isStrongPassword = (pw) => {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /\d/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      setErr(
        "Password should be at least 8 characters long and include uppercase, lowercase, numbers, and special characters."
      );
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      setSignupPageView(false);
      setCategoryPageView(true);
    } catch (error) {
      setErr(error.message.replace("Firebase:", "").replace(".", ""));
      setIsLoading(false);
    } 
  };

  const signUpWithCategory = async () => {
    try {
      const uid = user.uid;
      if (!uid) {
        throw new Error("User UID is undefined");
      }
  
      const userDocRef = doc(db, "users", uid);  
  
      if (!selectedTags || !Array.isArray(selectedTags)) {
        throw new Error("Selected tags array is invalid");
      }
  
      await setDoc(userDocRef, {
        uid: uid,
        category: selectedTags
      });
  
      toast.info("Please verify your account Already Email Sent before login", {
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
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const toggleSelected = (item) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(item)
        ? prevTags.filter((tag) => tag !== item)
        : [...prevTags, item]
    );
  };

  return (
    <div className="flex h-screen w-full flex-row-reverse">
      <Link
        to="/home"
        className="fixed px-3 active:scale-95 transition-all py-2 top-5 right-5 rounded-full shadow-lg bg-emerald-500 w-fit h-fit"
      >
        <i className="text-xl text-white fas fa-arrow-right font-bold"></i>
      </Link>
      {signupPageView && <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={AppLogoUrl} alt={AppName} />
          <h2 className="text-gray-600 text-center text-2xl font-semibold leading-9 tracking-tight">
            {AppName}
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
                  required
                  placeholder="Your Email Id"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-600 text-sm leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  required
                  placeholder="Enter Password Here"
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 text-sm leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="Type it Again"
                  type="text"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 text-sm leading-6"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-52 justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <span className={isLoading ? "hidden" : "flex"}>
                  Create New Account
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
            Already have an account? {" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>}
      {categoryPageView && <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        
        {err && <p className="mt-5 text-center text-red-500">{err}</p>}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
           <h1 className="text-3xl font-bold text-gray-800">What are you Intrested in ?</h1>
           <p className="text-lg text-gray-600 mt-2 font-semibold">Follow tag to customize your feed</p>
           <p className="text-lg text-gray-500 mt-3 ">{selectedTags && selectedTags.length} tags selected</p>
            <span className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCategories.map((item,index)=>(
            <button key={index} onClick={()=>toggleSelected(item)} className={`${selectedTags.includes(item) ? 'bg-gray-500 text-white' : 'bg-gray-200'} py-3   rounded-md`}>{item}</button>
           ))}
            </span>
            <span className="flex items-center justify-center mt-10">
            <button onClick={()=>signUpWithCategory()} className="bg-emerald-500 text-white px-3 py-2 rounded-md shadow-md">
              Continue
            </button>
            </span>
        </div>
      </div>}
      <div className="hidden overflow-y-hidden bg-gray-300 lg:block w-1/2 h-full">
        <img
          src={random_register_img}
          alt="banner"
          className="brightness-75  w-100 h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Register;
