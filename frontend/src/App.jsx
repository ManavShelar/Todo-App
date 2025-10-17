import './App.css'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Homepage from './pages/Homepage.jsx';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore';

const App = () => {
   const { authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

    if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return(
    <>
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}


export default App
