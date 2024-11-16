import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "@mui/material";
import Typewriter from "typewriter-effect";
import IMAGES from "../CHATxResources/image";


const Register = () => {
  const [mode, setMode] = useState(null); // null for initial mode
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleHomeRegister = () => {
    setMode(null); // Reset mode to null
  };

  return (
    <div className="bg-[#08042c]">
      <div className="flex min-h-full w-screen flex-col  sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
        <div className="relative hidden flex-1 flex-col justify-center   px-5 pt-8 text-[#FE7600] dark:text-[#cd1a72] md:flex md:px-6 md:py-[22px] lg:px-8">
          <nav className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
            <h1>
             
              <div className="flex cursor-pointer items-center text-[20px] font-bold leading-none lg:text-[22px]"  >
              ● CHATx
              </div>
            </h1>
          </nav>
          <div className="flex justify-center items-center">
            {/* Image tag for logo */}
          </div>
          <div className="text-4xl font-bold ">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 50,
                cursor:"●",
                strings: [
                  "Hello World",
                  "This is Chatx a messaging platform!",
                  "Here you can connect with other user for some chit-chat ",
                  "or",
                  "for some serious office Group talk shhhhh!"
                ],
              }}
            />
           
          </div>
        
          

        </div>
      
        <div className="relative flex grow flex-col items-center justify-between  px-5 py-8 text-black dark:bg-[black] dark:text-white sm:rounded-t-[30px] md:rounded-none md:px-6">
          <div className="max-w-[70%] max-h-[0%]   text-center">
            <img src={IMAGES.register} alt="" />
          </div>
          {mode === "login" && (
            <Login
              handleLoginToSignup={() => handleModeChange("signup")}
              handleHomeRegister={handleHomeRegister}
            />
          )}
          {mode === "signup" && (
            <Signup
              handleSignupToLogin={() => handleModeChange("login")}
              handleHomeRegister={handleHomeRegister}
            />
          )}
          {!mode && (
            <div className="relative flex w-full grow flex-col  items-center justify-center">
              <div className="rounded-full relative flex p-3">
                <h2 className="text-center text-[20px] leading-[1.2]  text-[#cd1a72] font-bold md:text-[40px] md:leading-8 shadow-glow">
                  Get started
                </h2>
              </div>
              <div className="mt-5 w-full max-w-[440px]">
                <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
                  <div className="bg-[#ffdfaf] flex itens-center   justify-center rounded-md w-[10vw]">
                    <Button
                      className="relative flex h-12 items-center w-[20vw]    justify-center rounded-full  text-center text-base font-medium  text-[white] "
                      onClick={() => handleModeChange("login")}
                    >
                      <p className="text-[#08042c] text-semibold">Log in</p>
                    </Button>
                  </div>
                  <div className="bg-[#ffdfaf] flex itens-center   justify-center rounded-md w-[10vw]">
                    <Button
                      className="relative flex h-12 items-center w-[20vw]  justify-center rounded-full  text-center text-base font-medium  text-[white]"
                      onClick={() => handleModeChange("signup")}
                    >
                      <p className="text-[#08042c] text-semibold ">Sign up</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className=" text-[#cd1a72] text-1xl    ">PS: Get ready for the jouney  :-)</p>
        </div>
      
      </div>
    </div>
  );
};

export default Register;