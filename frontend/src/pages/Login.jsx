import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { EyeOff, Eye, Loader2 } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login, isLoggingIn} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      <div className="w-screen h-screen flex bg-[#E5E5E5]">
        <div className="flex w-full h-screen mx-auto items-center justify-center">
          <div className="w-[553px] h-[650px] bg-[#FFFFFF] justify-center items-center flex rounded">
            <div className="w-[444px] h-[400px] ">
              <div>
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="py-[5px] text-sm">Don't Have An Account? <span><Link to={"/signup"}>SignUp</Link></span></p>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="py-[10px]">
                    <label><p>Email</p></label>
                    <input
                      type="email"
                      placeholder="you@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white w-[420px] p-[8px] rounded-xl border border-black"
                    />
                  </div>

                  <div className="py-[10px]">
                    <label><p>Password</p></label>
                    <div className='flex'>
                    <input
                       type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white w-[440px] p-[8px] rounded-xl border border-black"
                    />
                    <button
                  type="button"
                  className="mx-0.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
                </div>
                  </div>
                </form>
              </div>
              <div className="flex my-[10px]">
                <div className="px-[5px]">
                <input type="checkbox" className="cursor-pointer"></input>
                </div>
                <div>
                <p className="text-sm">I want to receive emails about the product,feature,events and marketing promotions.</p>
                </div>
              </div>
              <div className="flex items-center justify-center my-[15px]">
                <button
                type="submit"
                disabled={isLoggingIn} 
                className="p-[10px] w-[150px] bg-gray-300 rounded-3xl font-bold text-white hover:bg-black cursor-pointer transition"
                >
                  {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}       
                </button>
                
              </div>
              <div className="flex items-center justify-center my-[10px]">
                <p className="text-xs">
                  Don't have an account? <span><Link to={"/signup"}>SignUp</Link></span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-[450px] h-[650px] justify-center items-center flex">
            <img className="w-full h-full rounded" src="LoginImage.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login