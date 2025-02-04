import React from "react"
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="bg-[#1f2937] py-3 flex justify-center gap-8 ">
      <NavLink to="/" className=" text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">Home</NavLink>
      <NavLink to="/pastes" className="  text-white font-medium text-xl hover:text-[#3b82f6] hover:font-semibold">Pastes</NavLink>
    </div>
  )
};

export default Navbar;
 