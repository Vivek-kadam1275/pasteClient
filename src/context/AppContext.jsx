import { createContext ,useState,useEffect} from "react";

 

 export const AppContext=createContext();

 export default function AppProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
       false
    );
  
    // useEffect(() => {
    //   localStorage.setItem("isAuthenticated", isAuthenticated);
    // }, [isAuthenticated]);

    const value={isAuthenticated,setIsAuthenticated}
  
    return (
      <AppContext.Provider value={ value}>
        {children}
      </AppContext.Provider>
    );
  };