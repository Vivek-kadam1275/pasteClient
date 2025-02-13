import React, { useState, useEffect, useContext } from "react"
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";


const Navbar = (props) => {

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_PASTE_URL;
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  // console.log(isAuthenticated)

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/logout`, {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success("logged out successfully...");
        setIsAuthenticated(false);
        setTimeout(() => {
          navigate("/login");
          window.location.reload(); // Ensure fresh auth check
        }, 500);
         

      }

    } catch (error) {
      console.log("error in logout step....", error);
      toast.error(error);
      navigate("/login");
    }

  }



  return (
    <div className="bg-[#010811] border-b-[#010811] ">
      <div className=" py-5 flex justify-center gap-8 max-w-[1160px] mx-auto ">
        <NavLink to="/" className=" text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">Home</NavLink>
        <NavLink to="/pastes" className="  text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">Pastes</NavLink>

        {isAuthenticated ? <button onClick={handleLogout} className=" text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">logout</button> : <div className="flex justify-center gap-8">
          <NavLink to="/login" className=" text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">login</NavLink>
          <NavLink to="/signup" className="  text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">signup</NavLink>
        </div>

        }




      </div>
    </div>
  )
};

export default Navbar;
