import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Login = ({ handleLoginToSignup,handleHomeRegister }) => {
    const [inputData, setInputData] = useState({
      email: "",
      password: "",
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputData));
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
      <div className="w-[30vw] p-2  shadow-full  rounded-md bg-[#615959] bg-black ">
        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={"Login"}
              readOnly
            />
          </div>
        </form>
        <div className="flex justify-between mt-5">
          <div className="flex space-x-3">
            <p className="text-white">Create New Account</p>
            <p
              onClick={handleLoginToSignup}
              className="text-blue-500 hover:text-blue-800 cursor-pointer text-[#ffbd59]"
            >
              signup
            </p>
          </div>
          <HomeIcon onClick={handleHomeRegister}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
