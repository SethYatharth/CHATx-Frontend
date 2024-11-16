import React from "react";

const ChatCard = ({ isChat, userImg, name, handleClick, message }) => {
  return (
    <div
      className="flex relative bg-[#3b3b3b] p-3 rounded-md py-2 group cursor-pointer mb-2 hover:bg-gray-800"
      onClick={handleClick}
    >
      <div className="w-[15%]">
        <img
          className="h-14 w-14 rounded-full"
          src={
            userImg ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt=""
        />
      </div>
      <div className="w-[80%] pl-2">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold mt-3 text-[#D5BCAC]">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
