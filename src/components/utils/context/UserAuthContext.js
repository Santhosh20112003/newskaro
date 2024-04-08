import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../common/config/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [News, setNews] = useState([]);

  function logIn(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          if (response.user.emailVerified) {
            resolve(response);
          } else {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                reject({
                  message:
                    "Please verify your account via the email sent to you! (Check Spam Folder)",
                });
              })
              .catch((error) => {
                reject({
                  message:
                    "Unable to send verification email. Please try again.",
                });
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function signUp(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          sendEmailVerification(result.user)
            .then(() => {
              console.log(result);
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function forgetpassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const values = {
    user,
    logIn,
    signUp,
    logOut,
    News,
    setNews,
    forgetpassword
  };

  return (
    <UserAuthContext.Provider value={values}>
      {children}
      <ToastContainer/>
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}

export default UserAuthContextProvider;
