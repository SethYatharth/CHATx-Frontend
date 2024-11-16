import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, register } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Signup = ({ handleSignupToLogin, handleHomeRegister }) => {
  const token = localStorage.getItem("token");
  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    if(inputData.full_name!=="" && inputData.email!=="" && inputData.email.length>12 && inputData.password!=="" && inputData.password.length>=8 ){
      event.preventDefault();
      console.log("handle submit", inputData);
      dispatch(register(inputData));
    }
    else{
      console.log("Invalid username password or email");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };
  //dispatch current user if user already signup
  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  //redirect to main page if register success
  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser]);

  return (
    <div className="pt-5">
      <div className="w-[30vw] p-2 mt-10  shadow-md bg-black">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-2  rounded-full bg-black  text-2xl text-semibold text-[#cd1a72] ">User Name</p>
            <input
              className="py-2 px-3 border-2 border-[#D1C4B0] bg-[#3b3b3b] text-white w-full rounded-md border-1"
              type="text"
              placeholder="Enter username"
              name="full_name"
              onChange={(e) => handleChange(e)}
              value={inputData.full_name}
            />
          </div>
          <div>
            <p className="mb-2  rounded-full bg-black  text-2xl text-semibold text-[#cd1a72] ">Email</p>
            <input
              className="py-2 px-3 border-2 border-[#D1C4B0] bg-[#3b3b3b] text-white w-full rounded-md border-1"
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => handleChange(e)}
              value={inputData.email}
            />
          </div>
          <div>
            <p className="mb-2  rounded-full bg-black  text-2xl text-semibold text-[#cd1a72] ">Password</p>
            <input
              className="py-2 px-2 border-2 border-[#D1C4B0] bg-[#3b3b3b] text-white w-full rounded-md border-1"
              type="password"
              placeholder="Enter your Password"
              name="password"
              onChange={(e) => handleChange(e)}
              value={inputData.password}
            />
          </div>
          <div>
            <input
              className="py-[0.7rem] px-3 w-full rounded-md bg-[#004aad] text-white mt-3"
              type="Submit"
              value={"Signup"}
              readOnly
            />
          </div>
        </form>
        <div className="flex justify-between mt-5">
          <div className="items-center flex space-x-3">
            <p className="text-white">Already Have Account?</p>
            <p
              onClick={handleSignupToLogin}
              className="text-blue-500 hover:text-blue-800 cursor-pointer text-[#ffbd59]"
            >
              Login
            </p>
          </div>
          <HomeIcon onClick={handleHomeRegister} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
