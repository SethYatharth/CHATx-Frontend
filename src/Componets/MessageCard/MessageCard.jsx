import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../Redux/Message/Action";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const MessageCard = ({
  isReqUserMessage,
  content,
  messageId,
  sender,
  isGroup,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // const {message} = useSelector((store)=>store)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDummy = (e) => {};

  const handleDelete = () => {
    dispatch(deleteMessage({ token: token, messageId: messageId }));
  };
  return (
    <div
      className={`py-2 px-2 rounded-md max-w-[50%] ${
        isReqUserMessage
          ? "self-start rounded-md text-black-300 bg-[#EDD9B9]"
          : "self-end rounded-md text-[#EDD9B9] bg-[#706B67]"
      }`}
    >
      <div
        onClick={(e) => {
          !isReqUserMessage ? handleClick(e) : handleDummy(e);
        }}
      >
        {isGroup && <p className="font-bold">{sender}</p>}
        <p>{content}</p>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: 'black' } }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleDelete}
          style={{ color: "#FFF", fontSize: "0.4rem" }}
        >
          <DeleteForeverIcon />
        </MenuItem>{" "}
        {/* Adding style to the MenuItem */}
      </Menu>
    </div>
  );
};

export default MessageCard;

// import React, { useState } from "react";

// const MessageCard = ({ isReqUserMessage, content, sender, isGroup }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   const handleToggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <div
//       onClick={handleToggleMenu}
//       className={`py-2 px-2 rounded-md max-w-[50%] ${
//         isReqUserMessage
//           ? "self-start rounded-md text-black-300 bg-[#EDD9B9]"
//           : "self-end rounded-md text-[#EDD9B9] bg-[#706B67]"
//       }`}
//     >
//       {isGroup && <p className="font-bold">{sender}</p>}
//       <p>{content}</p>
//       {showMenu && (
//         <div className="menu-bar">
//           {/* Your menu items go here */}
//           <button onClick={() => console.log("Delete clicked")}>Delete</button>
//           <button onClick={() => console.log("Edit clicked")}>Edit</button>
//           {/* Add more menu items as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageCard;
