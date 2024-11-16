import React, { useEffect, useState } from "react";

import { IoMdSearch } from "react-icons/io";
import { BsSendArrowUpFill, BsThreeDotsVertical } from "react-icons/bs";

import SockJS from "sockjs-client";
import { over } from "stompjs";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ImAttachment } from "react-icons/im";
import { BsEmojiSmile } from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";
import IMAGES from "./CHATxResources/image.js";
import MessageCard from "./MessageCard/MessageCard.jsx";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile.jsx";
import { Button } from "@mui/material";
import CreateGroup from "./Group/CreateGroup.jsx";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action.js";
import { createChat, getUsersChat } from "../Redux/Chat/Action.js";
import { createMessage, getAllMessage } from "../Redux/Message/Action.js";
import CloseIcon from "@mui/icons-material/Close";
import ManageGroup from "./Group/ManageGroup.jsx";
const HomePage = () => {
  const [querys, setQuerys] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  const { auth, chat, message } = useSelector((store) => store);
  const navigate = useNavigate();
  const [manageGroup, setManageGroup] = useState(false);
  const [stompClient, setStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleManageGroup = () => {
    setManageGroup(!manageGroup); // Toggle the state
  };

  const handleCloseCurrentChatAfterLeave = () => {
    setManageGroup(false);
    setCurrentChat(null);
  };

  if (!token) {
    navigate("/register");
  }
  const connect = () => {
    const sock = new SockJS("http://localhost:5454/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    };
    temp.connect(headers, onConnect, onError);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onError = (error) => {
    console.log("On WS error ", error);
  };

  const onConnect = () => {
    setIsConnect(true);
  };

  useEffect(() => {
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage]);
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage]);

  const onMessageReceive = (payload) => {
    console.log("recive message ", JSON.parse(payload.body));
    const recivedMessage = JSON.parse(payload.body);
    setMessages([...messages, recivedMessage]);
  };

  useEffect(() => {
    if (isConnect && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group/" + currentChat.id.toString(),
        onMessageReceive
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  });

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };
  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(item);
    dispatch(createChat({ data: { userId }, token }));
    setQuerys("");
  };
  const handleNavigate = () => {
    setIsProfile(true);
  };
  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
  };

  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createdChat, chat.createGroup]);

  useEffect(() => {
    if (currentChat?.id)
      dispatch(getAllMessage({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage]);

  const handleCloseOpenProfile = () => {
    setIsProfile(false);
    handleClose();
  };
  const handleCloseCreateGroup = () => {
    setIsGroup(false);
    handleClose();
  };

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);

  const handleLogout = () => {
    console.log("redirection due to this function");
    dispatch(logoutAction());
    navigate("/register");
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  };
  const handleCurrentChat = (item) => {
    setCurrentChat(item);
    setManageGroup(false);
  };

  const handleCloseCurrentChat = () => {
    setCurrentChat(null);
  };

  const handleDummy = () => {};

  return (
    <div className="relative bg-black h-screen">
      <div className="py-1"></div>
      <div className=" relative flex h-[98vh] ">
        <div className=" left flex flex-col w-[35%] ml-2 mr-0.5 bg-[#202020]  rounded-md">
          {isGroup && (
            <div>
              <CreateGroup
                handleCloseCreateGroup={handleCloseCreateGroup}
                setIsGroup={setIsGroup}
                setAnchorEl={setAnchorEl}
              />
            </div>
          )}

          {isProfile && (
            <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
          )}
          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* left side form the top  */}
              <div className="bg-[#545D60] rounded-md mb-1  ">
                <div className=" flex items-center  space-x-3 ml-3 pt-2 pb-2">
                  <img
                    className="rounded-full w-[4vw] h-[8vh] cursor-pointer"
                    src={
                      auth.reqUser?.profile_picture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt=""
                  />

                  <div>
                    <p className="text-4xl w-[24vw]  font-semibold text-[#FFDFAF]">
                      {auth.reqUser?.full_name}
                    </p>
                  </div>

                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <BsThreeDotsVertical className="    text-4xl text-white mr-10" />
                    </Button>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleNavigate}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              {/* <hr className="border-t border-white" /> */}
              <div className="text-2xl pb-2 relative font-bold text-[#FFECCF]  ml-4">
                Message's
              </div>

              <div className="flex justify-center relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <IoMdSearch className="text-2xl ml-2 text-gray-400" />
                </div>
                <input
                  className="border-none outline-none text-lg bg-[#495D6A] text-white rounded-full w-[95%] pl-10 px-4 py-2"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys}
                />
              </div>

              <div className=" mt-2 pl-2 pr-2 overflow-y-auto max-h-[77.7vh] ">
                {querys &&
                  auth.searchUser?.map((item, index, array) => (
                    <React.Fragment key={index}>
                      <div onClick={() => handleClickOnChatCard(item.id)}>
                        <ChatCard
                          name={item.full_name}
                          userImg={
                            item.profile_picture ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                          }
                        />
                      </div>
                      {index !== array.length - 1 && <div className="mb-2" />}
                    </React.Fragment>
                  ))}
                {!chat.chats?.error &&
                  !querys &&
                  chat?.chats?.map((item, index) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      {item.is_group ? (
                        <ChatCard
                          name={item.chat_name}
                          userImg={
                            item.chat_image ||
                            "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].full_name
                              : item.users[1].full_name
                          }
                          userImg={
                            auth.reqUser.id !== item.users[0].id
                              ? item.users[0].profile_picture ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                              : item.users[1].profile_picture ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* default chatx logo showcasing */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center  pb-12 h-full">
            <div className="max-w-[70%]  text-center">
              <img src={IMAGES.right} alt="" />
            </div>
          </div>
        )}

        {/* after click user messaing part  */}

        {currentChat && (
          <div className="w-[70vw] relative bg-black  mr-2">
            <div className=" header absolute w-[66vw] h-[9.8vh]  rounded-md bg-[#495D6A]">
              <div className="flex justify-between">
                <div
                  className="py-3 space-x-4 flex items-center px-3"
                  onClick={() => {
                    currentChat.is_group ? handleManageGroup() : handleDummy();
                  }}
                >
                  <img
                    className="w-[4vw] h-[8vh] rounded-full"
                    src={
                      currentChat.is_group
                        ? currentChat.chat_image ||
                          "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                        : auth.reqUser.id !== currentChat.users[0].id
                        ? currentChat.users[0].profile_picture ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        : currentChat.users[1].profile_picture ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt=""
                  />
                  {currentChat.is_group && manageGroup && (
                    <div className="message-group-overlay">
                      <ManageGroup
                        chatId={currentChat.id}
                        handleCloseCurrentChatAfterLeave={
                          handleCloseCurrentChatAfterLeave
                        }
                      />
                    </div>
                  )}
                  <div>
                    {/* <p className="text-4xl text-[#EDD9B9] font-semibold">
                      {currentChat.is_group
                        ? currentChat.chat_name
                        : auth.reqUser?.id === currentChat.users[0].id
                        ? currentChat.users[1].full_name
                        : currentChat.users[0].full_name}
                    </p> */}
                    <p className="text-4xl text-[#EDD9B9] font-semibold">
                      {currentChat.is_group
                        ? currentChat.chat_name
                        : currentChat.users.find(
                            (user) => user.id !== auth.reqUser.id
                          )?.full_name}
                    </p>

                    <div className="flex justify-between ">
                      <p className="text-[black] text-0xl">
                        {currentChat.is_group ? (
                          currentChat.users.map((item, index) => (
                            <React.Fragment key={index}>
                              <span>{item.full_name}</span>
                              {index < currentChat.users.length - 1 && (
                                <span> , </span>
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          // Render something else if it's not a group chat
                          <span> </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-2 pr-4 pb-1 flex justify-center items-center ">
                  <div
                    className=" ml-5 text-4xl"
                    onClick={handleCloseCurrentChat}
                  >
                    <CloseIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* message section */}

            <div className="px-10  h-[82.9vh]  mt-20 pt-7 mb-0.5   bg-[#222831] rounded-md  overflow-y-auto ">
              <div className="space-y-1  flex flex-col pt-0   justify-center mt-0 py-2">
                {messages.length > 0 &&
                  messages?.map((item, i) => (
                    <MessageCard
                      isReqUserMessage={item.user?.id !== auth.reqUser.id}
                      content={item.content}
                      messageId={item.id}
                      sender={item.user?.full_name}
                      isGroup={item.chat?.is_group}
                    />
                  ))}
              </div>
            </div>

            {/* sending box and incons of it */}
            <div className="footer bg-[#8A9EA0] absolute rounded-md pt-2 w-[66vw] h-[6.6vh] ml-0 mr-0  py-1 ">
              <div className="flex justify-between items-center w-[65vw]   font-semibold text-3xl px-5 relative">
                <BsEmojiSmile className="cursor-pointer pr-1" />
                <ImAttachment />

                <input
                  onChange={(e) => setContent(e.target.value)}
                  className="py-1 outline-none border-none bg-[#DFDBD0]  pl-4  text-black placeholder-[#4C5D70] rounded-full w-[85%]"
                  placeholder="Message"
                  type="text"
                  value={content}
                  style={{ color: "black" }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsSendArrowUpFill
                  onClick={() => {
                    handleCreateNewMessage();
                    setContent("");
                  }}
                  className="ml-2"
                />
              </div>
            </div>
            {manageGroup && (
              <div className="message-group-overlay">
                <ManageGroup />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
