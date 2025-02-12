import React, { useState, useEffect, useContext } from "react"
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const LoginForm = ({ }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const baseUrl = import.meta.env.VITE_PASTE_URL;
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json();
            console.log(data)
            if (data.success) {
                // console.log(isAuthenticated);

                setIsAuthenticated(true);
                navigate("/");

                toast.success(data.message);

            } else {
                toast.error(data.message);
                if (!data.exist) {

                    navigate("/signup");
                } else {
                    navigate("/login")
                }

            }
        } catch (error) {
            console.log("error in login step....", error);
            toast.error(error);
            navigate("/login");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="text-white flex flex-col gap-0 h-[350px] w-[350px] justify-around">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold">Welcome Back</h2>
                <p className="opacity-70">Build Skills for today,tomorrow and beyond</p>
                <p className="italic text-blue-300 opacity-70">Education to future-proof your career</p>
            </div>
            <fieldset className="flex flex-col gap-3">
                <fieldset className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-white px-1">Email Address</label>
                    <input id="email" type="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} required className="bg-[#161d26] px-2" />
                </fieldset>

                <fieldset className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-white px-1">Password</label>
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required className="bg-[#161d26] px-2" />
                </fieldset>

                <button type="submit" className="bg-[#fce011] w-full text-black py-1">Login</button>
            </fieldset>
        </form>
    )
};

export default LoginForm;
