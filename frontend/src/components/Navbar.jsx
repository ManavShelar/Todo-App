import React from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <div className="flex justify-between w-full h-[60px] items-center px-[10px] bg-black hover:text-black transition-colors duration-200 fixed top-0">
        <h1 className="text-white font-bold text-3xl">Todo-App</h1>
        <button
          className="flex gap-1 items-center cursor-pointer border-2 border-white px-5 py-2 rounded-2xl bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 group"
          onClick={logout}
        >
          <LogOut
            size={20}
            className="text-white group-hover:text-black transition-colors duration-300"
          />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
