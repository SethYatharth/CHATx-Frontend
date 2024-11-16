import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createGroupChat } from "../../Redux/Chat/Action";
import { updateUser } from "../../Redux/Auth/Action";

const NewGroup = ({ handleBack, groupMember, setIsGroup , setAnchorEl}) => {
  // const { auth } = useSelector((store) => store);
  // const dispatch = useDispatch();
  // const token = localStorage.getItem( " token");
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleEnterKeyForGroupName = (e) => {
    if (e.key === "Enter") {
      setGroupName(e.target.value);
    }
  };

  const uploadToCloudinary=(pics)=>{
    setIsImageUploading(true);
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
        
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      });

    
  }

  const handleCreateGroup = () => {
    let userIds = [];
    console.log(groupMember)
    for (let user of groupMember) {
      userIds.push(user.id);
    }
    const group = {
      userIds,
      chat_name: groupName,
      chat_image: groupImage,
    };
    const data = {
      group,
      token,
    };

    dispatch(createGroupChat(data));
    setIsGroup(false);
    setAnchorEl(null);
  };
  return (
    <div className=" w-full h-full">
      <div className=" flex items-center space-x-10 bg-[#595E60] rounded-md text-white pt-10 px-10 pb-5">
        <BsArrowLeft
          onClick={handleBack}
          className="cursor-pointer text-4xl mb-3 font-bold"
        />
        <p className="text-4xl pl-8  pb-5 font-semibold">New Group</p>
      </div>

      <div className="flex flex-col justify-center items-center my-12">
        <label className="relative " htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src={
              groupImage ||
              "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
            }
            alt=""
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[6rem]" />
          )}
        </label>

        <input
          type="file"
          id="imgInput"
          className="hidden border-b border-[#888888]"
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
        />
      </div>

      <div className="w-full flex justify-between items-center py-2 px-5">
        <input
          type="text"
          // onChange={() => console.log("onchange")}
          className="w-full outline-none border-b-2 border-slate-300 text-black placeholder-lg h-[6vh] px-2 py-2 bg-[#2F7977] rounded-md"
          placeholder="Group Name"
          value={groupName}
          style={{ fontSize: "1.5rem" }}
          onKeyDown={handleEnterKeyForGroupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      {groupName && (
        <div className=" py-10  flex items-center justify-center">
          <Button onClick={handleCreateGroup} variant="text">
            <div className="bg-[#AFC1D0] rounded-full  p-4 ">
              <BsCheck2 className="text-black  font-bold text-3xl" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};
export default NewGroup;
