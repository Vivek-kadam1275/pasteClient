import React from "react"
import { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {

    const baseUrl = import.meta.env.VITE_PASTE_URL;

    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
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
            if(data.success){
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }

        } catch (error) {
            console.log("error while verifying", error);
        }
    }
    useEffect(() => {
         
        verifyUser(); 
     }, []);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
