import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signUp(formData);
  };

  return (
    <>
      <div className="w-screen h-screen flex bg-[#E5E5E5]">
        <div className="flex w-full h-screen mx-auto items-center justify-center">
          <div className="w-[553px] h-[650px] bg-[#FFFFFF] justify-center items-center flex rounded">
            <div className="w-[444px] h-[550px] ">
              <div>
                <h1 className="text-3xl font-bold">Create An Account</h1>
                <p className="py-[5px]">Already Have An Account? <span><Link to={"/login  "}>Login</Link></span></p>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="my-[20px]">
                  <div className="py-[10px]">
                    <label>
                      <p>Username</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="bg-white w-[420px] p-[8px] rounded-xl border border-black"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="py-[10px]">
                    <label>
                      <p>Email</p>
                    </label>
                    <input
                      type="email"
                      placeholder="you@gmail.com"
                      className="bg-white w-[420px] p-[8px] rounded-xl border border-black"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="py-[10px]">
                    <label>
                      <p>Password</p>
                    </label>
                    <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-white w-[440px] p-[8px] rounded-xl border border-black"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
              <div className="flex">
                <div className="px-[5px]">
                  <input type="checkbox" className="cursor-pointer"></input>
                </div>
                <div>
                  <p className="text-sm">
                    I want to receive emails about the product,feature,events
                    and marketing promotions.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm py-[25px]">
                  By creating account, you agree to the Terms of use and Privacy
                  Policy.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button className="p-[10px] bg-gray-300 rounded-3xl font-bold text-white hover:bg-black cursor-pointer transition">
                  Create an account
                </button>
              </div>
              <div className="flex items-center justify-center my-[10px]">
                <p className="text-xs">
                  Already have an account?{" "}
                  <span>
                    <Link to={"/login"}>Login</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-[450px] h-[650px] justify-center items-center flex">
            <img
              className="w-full h-full rounded"
              src="LoginImage.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
