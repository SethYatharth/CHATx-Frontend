import React, { useEffect, useState } from "react";
import { BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "../ChatCard/ChatCard";
import {
  addUserToGroup,
  createChat,
  getchatByChatId,
  removeUserFromGroup,
  renameGroup,
} from "../../Redux/Chat/Action";
import PersonIcon from "@mui/icons-material/Person";
import { IoMdSearch } from "react-icons/io";
import { searchUser } from "../../Redux/Auth/Action";
import { Chat } from "@mui/icons-material";

const ManageGroup = ({ chatId,handleCloseCurrentChatAfterLeave }) => {
  const [overview, setOverview] = useState(true);
  const [memberView, setMemberView] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [flag, setFlag] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [querys, setQuerys] = useState(null);
  const { auth,chat } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  
  console.log(chat.currentGroup);

  useEffect(() => {
    // e.preventDefault();
    if (chatId) {
      dispatch(getchatByChatId({ chatId: chatId, token: token }));
    }
  }, [chatId, dispatch, token]);

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };


  const handleCheckClickForGroupName = () => {
    if (groupName) {
      setFlag(false);
      const renameGroupData = {
        token: token,
        chatId: chat.currentGroup.id,
        data: {
          groupName: groupName,
        },
      };
      // You might want to include some data here
      console.log(renameGroupData);
      dispatch(renameGroup(renameGroupData));
      chat.currentGroup.chat_name = groupName;
      setGroupName(null);
    }
  };

  const handleFlagGroup = () => {
    setFlag(true);
  };

  const handleUpdateGroupName = (e) => {
    const renameGroupData = {
      token: token,
      chatId: chat.currentGroup.id,
      data: {
        groupName: groupName,
      },
    };
    if (e.key === "Enter") {
      setFlag(false);
      dispatch(renameGroup(renameGroupData));
      chat.currentGroup.chat_name = groupName;
      setGroupName(null);
    }
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };

  const handleLeave = () => {
    // Handle leave functionality
    const removeUserData =  {
      chatId: chat.currentGroup.id,
      userId:auth.reqUser.id,
      token:token
    }
    dispatch(removeUserFromGroup(removeUserData))
  };

  

  const handleShowMember = () => {
    setMemberView(true);
    setOverview(false);
  };

  const handleShowOverview = () => {
    setOverview(true);
    setMemberView(false);
  };

  const handleAddMember = () => {
    setAddMember(true);
  };

  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(item);
    const addUserToGroupData = {
      chatId: chat.currentGroup.id,
      userId:userId,
      token:token
    }
    dispatch(addUserToGroup(addUserToGroupData));
    setQuerys("");
  };

  return (
    <div className="absolute rounded-md top-20 left-10 w-[40vw] bg-opacity- h-[65vh] bg-gray-900 flex mt-5 items-start">
      {/* Left section */}
      <div className="flex-shrink-0 mr-1 ">
        <div
          className="rounded-md flex p-2 ml-1 mb-1 w-[10vw] text-[#D40068] text-1xl hover:bg-slate-700"
          onClick={handleShowOverview}
        >
          <p className="ml-2"> Overview</p>
        </div>
        <div
          className="flex rounded-md p-2 ml-1 w-[10vw] text-[#D40068] text-1xl hover:bg-slate-700"
          onClick={handleShowMember}
        >
          <p className="ml-2"> Member's</p>
        </div>
      </div>
      <div className="h-full w-[0.01vw] bg-[#545454]"></div>
      {overview && (
        <div>
          {/* This all the div below are only for overview */}
          <div className="py-3 flex items-center ml-5 px-20">
            <label htmlFor="">
              {/* <img
                className="w-[12vw] h-[24vh] rounded-full"
                src={chat.currentGroup.chat_image || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"}
                alt=""
              /> */}
              <img
                className="w-[12vw] h-[24vh] rounded-full"
                src={
                  chat.currentGroup
                    ? chat.currentGroup.chat_image ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                    : "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                }
                alt=""
              />
            </label>
          </div>
          <div className="rounded-full bg-[#97A8AB] m-2 ml-10 mb-2 px-3">
            {!flag && (
              <div className="w-full flex rounded-full px-3 justify-between items-center">
                <p className="py-3 ">
                  {chat.currentGroup?.chat_name || "GroupName"}
                </p>
                <BsPencil
                  onClick={handleFlagGroup}
                  className="cursor-pointer"
                />
              </div>
            )}
            {flag && (
              <div className="w-full flex justify-between text-white items-center py-2">
                <input
                  onChange={handleChange}
                  onKeyPress={(e) => handleUpdateGroupName(e)}
                  className="w-[80%] pl-5 rounded-full bg-slate-800 outline-none border-b-2 border-blue-900 p-2"
                  type="text"
                  placeholder="Enter Group Name"
                />
                <BsCheck2
                  onClick={() => handleCheckClickForGroupName()}
                  className="cursor-pointer text-black text-3xl"
                />
              </div>
            )}
          </div>

          <div>
            <div className=" " onClick={handleCloseCurrentChatAfterLeave}>
              <button
                className="mt-[44%] ml-[93%] item-end rounded-md w-[4.4vw] p-2 bg-[#00BF63]"
                onClick={handleLeave}
              >
                Leave{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      {memberView && (
        <div>
          <div>
            <p className="text-[#FFBD59] text-2xl ml-8">List of Member's</p>
          </div>

          <div>
            <div
              className="bg-[#38B6FF] flex items-center justify-center rounded-md text-black  ml-1 h-[5vh] text-1xl pt-1 w-[25vw]"
              onClick={() => handleAddMember()}
            >
              <div>
                <div className="flex justify-center relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <PersonIcon className="text-2xl ml-2 text-gray-400" />
                  </div>
                  <input
                    className="border-none outline-none text-lg bg-[#495D6A] text-white rounded-full w-[95%] pl-10 px-4 py-2"
                    type="text"
                    placeholder="Add Participants"
                    onChange={(e) => {
                      setQuerys(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    value={querys}
                  />
                </div>
              </div>
            </div>

            {!querys && (
              <div className="p-2 overflow-y-auto max-h-[56vh] w-[25.3vw] rounded-md ">
                {chat.currentGroup?.users.map((item, index) => (
                  <div key={index} >
                    <ChatCard
                      isChat={true}
                      name={item.full_name}
                      userImg={
                        item.profile_picture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {querys &&
              auth.searchUser?.map((item, index, array) => (
                <React.Fragment key={index}>
                  <div onClick={() => handleClickOnChatCard(item.id)} >
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGroup;
