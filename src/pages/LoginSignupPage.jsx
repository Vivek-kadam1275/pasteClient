import React from "react"
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import login from "../assets/login.png";
import signup from "../assets/signup.png";
import frame from "../assets/frame.png";


const LoginSignupPage = ({ type }) => {
  // console.log(isAuthenticated);

  return (
    <div className="bg-[#010811] h-[93vh] registration-height-res ">

      {type === "register" ? <div className="flex max-w-[1160px] mx-auto justify-around h-[80vh] items-center registration-res">
        <div className="relative">
          <img src={frame} alt={frame} loading="lazy" className="absolute top-2 left-2 w-[350px] h-[350px] rounded " />
          <img src={signup} alt={signup} loading="lazy" className=" relative w-[350px] h-[350px] rounded" />

        </div>
        <SignupForm />

      </div> :
        <div className="flex max-w-[1160px] mx-auto justify-around h-[80vh] items-center registration-res ">

          <div className="relative">
            <img src={frame} alt={frame} loading="lazy" className="absolute top-2 left-2 w-[350px] h-[350px] rounded " />
            <img src={login} alt={login} loading="lazy" className=" relative w-[350px] h-[350px] rounded" />

          </div>
          <LoginForm />

        </div>
      }

    </div >
  )
};

export default LoginSignupPage;
