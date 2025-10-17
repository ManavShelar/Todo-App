import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { EyeOff, Eye, Loader2 } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-[#E5E5E5] p-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-sm mb-6">
            Don't Have An Account?{" "}
            <Link className="text-blue-500" to="/signup">
              SignUp
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="you@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="mb-1 text-sm">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black pr-10"
              />
              <button
                type="button"
                className="absolute right-3 bottom-2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="cursor-pointer mt-1" />
              <p>
                I want to receive emails about product updates, features,
                events, and promotions.
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-black text-white rounded-3xl py-3 font-bold hover:bg-gray-700 transition flex items-center justify-center gap-2"
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
            <p className="text-xs text-center mt-2">
              Don't have an account?{" "}
              <Link className="text-blue-500" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src="LoginImage.png"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
