import React from "react"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {

    const baseUrl = import.meta.env.VITE_PASTE_URL;

    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

    // Introduce a loading state
    const [loading, setLoading] = useState(true);
    const verifyUser = async () => {
        try {
            const response = await fetch(`${baseUrl}/verify`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            console.log(data);
            if (data.success) {
                // console.log(data.success);

                setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false);
            }
            setLoading(false); // Mark verification as complete
        } catch (error) {
            console.log("error while verifying", error);
            setIsAuthenticated(false);  // ✅ Ensure auth state updates on erro
        }
    }
    useEffect(() => {

        verifyUser();
        // console.log(isAuthenticated);
    }, [ ]);

    if (loading) {
        return <div className="flex w-full h-[100vh] justify-center  items-center bg-[#010811]">
            <div className="dots "></div>
        </div>; // You can replace this with a spinner
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
