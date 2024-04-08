import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/unauthenticated/components/Home";
import { UserAuthContextProvider } from "./components/utils/context/UserAuthContext";
import ProtectedRoute from "./components/utils/Routes/ProtectedRoute";
import Profile from "./components/authenticated/Profile/components/Profile";
import Main from "./components/authenticated/Home/components/Home";
import Register from "./components/auth/Register";
import Forgetpassword from "./components/auth/ForgetPassword";
import Login from "./components/auth/Login";
import MetaDetails from "./components/utils/context/MetaDetails";
import Structure from "./components/authenticated/Home/components/Structure";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <MetaDetails>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<Forgetpassword />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Structure />
                </ProtectedRoute>
              }
            >
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route path="" element={<Navigate to="home" />} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Navigate to="home" />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            </Route>
          </Routes>
        </MetaDetails>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;