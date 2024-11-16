import React, { useState } from "react"; 

const GroupList = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const handleCurrentChat = (item) => {
        setCurrentChat(item);
      };
   
  return (
    <div>
      <div className="flex justify-between ">
        <p className="text-white">
          {currentChat.is_group ? (
            currentChat.users.map((item, index) => (
              <span key={index}>{item.full_name} </span>
            ))
          ) : (
            // Render something else if it's not a group chat
            <span> </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default GroupList;
