import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Auth/Action";

const Profile = ({ handleCloseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const [tempPicture, setTempPicture] = useState(null);
  const [username, setUserName] = useState(null);

  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserName(e.target.value);
    console.log(username);
  };
  const handleCheckClickForUsername = (e) => {
    if (!username) {
      setFlag(false);
      const data = {
        id: auth.reqUser?.id,
        token: localStorage.getItem("token"),
        data: { full_name: username },
      };
      dispatch(updateUser(data));
      auth.reqUser.full_name = username;
      setUserName(null);
    }
  };
  const handleFlagUsername = () => {
    setFlag(true);
  };
  const uploadToCloudinary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "zyjsy26o");
    data.append("cloud_name", "dknz6aorr");
    fetch("https://api.cloudinary.com/v1_1/dknz6aorr/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setTempPicture(data.url.toString());
        // setMessage("profile image updated successfully")
        // setOpen(true);
        // console.log("imgurl", data.url.toString());
        const dataa = {
          id: auth.reqUser.id,
          token: localStorage.getItem("token"),
          data: {
            full_name: auth.reqUser.full_name,
            profile_picture: data.url.toString(),
          },
        };
        console.log("Dataa----", dataa);
        // userUpdate(id, )
        dispatch(updateUser(dataa));
      });
  };
  const handleUpdateUsername = (e) => {
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: {
        full_name: username,
        profile_picture: auth.reqUser.profile_picture,
      },
    };
    if (e.key === "Enter") {
      setFlag(false);
      dispatch(updateUser(data));
      auth.reqUser.full_name = username;
      setUserName(null);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-6 bg-[#black] text-white px-3 pt-2 ">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold  hover:bg-gray-800"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>
      {/* update profile pic section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full border border-gray-100  w-[15vw] h-[15vw] cursor-pointer"
            src={
              auth.reqUser?.profile_picture ||
              tempPicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            alt=""
          />
        </label>
        <input
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
          type="file"
          id="imgInput"
          className="hidden"
        />
      </div>

      {/* username edit section */}
      <div className="  rounded-full bg-[#2F7977] m-2  mb-2 px-3">
        {!flag && (
          <div className="w-full flex   rounded-full px-3 bg-[#2F7977] justify-between items-center">
            <p className="py-3 ">{auth.reqUser.full_name || "Username"}</p>
            <BsPencil onClick={handleFlagUsername} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className="w-full flex justify-between text-white items-center py-2">
            <input
              onChange={handleChange}
              onKeyPress={handleUpdateUsername}
              className="w-[80%]  pl-5 rounded-full  bg-slate-800 outline-none border-b-2 border-blue-900 p-2"
              type="text"
              placeholder="Enter your Username"
            />
            <BsCheck2
              onClick={handleCheckClickForUsername}
              className="cursor-pointer  text-black  mr-9 text-3xl"
            />
          </div>
        )}
      </div>

      <div className="px-3 my-0">
        {/* <p className=" text-white py-10">
          Choose name visible to other users don't confuse with your username
        </p> */}
      </div>
    </div>
  );
};

export default Profile;
