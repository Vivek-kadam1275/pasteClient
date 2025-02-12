import React from "react"
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const baseUrl = import.meta.env.VITE_PASTE_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ name, email, password }),
            })
            const data = await response.json();
            console.log(data)
            if (data.success) {
                toast.success("Registered Successfully...");
                toast.success("Do login...");
                navigate("/login");

            } else {
                toast.error(data.message);
                navigate("/login")
            }
        } catch (error) {
            console.log("error in registraion....", error);
            toast.error(error);
            navigate("/signup");
        }
    }


    return (
        
        <form onSubmit={handleSubmit} className="text-white flex flex-col gap-0 h-[350px] w-[450px] justify-around signup-width-res">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-pretty">Join the millions learning to Code with StudyNotion for free</h2>
                <p className="opacity-70">Build skills for today, tomorrow and beyond</p>
                <p className="italic text-blue-300 opacity-70">Education to future-proof your career</p>
            </div>
            <fieldset className="flex flex-col gap-3">
                <fieldset className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-white px-1">Enter name</label>
                    <input id="name" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required  className="bg-[#161d26] px-2"  />
                </fieldset>
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

export default SignupForm;
