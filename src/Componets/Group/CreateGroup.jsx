import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { SelectedMember } from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";

const CreateGroup = ({ handleCloseCreateGroup, setIsGroup , setAnchorEl }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const {auth} = useSelector(store=>store)
  const [querys, setQuerys] = useState("");
  const handleRemoveMember = (item) => {
    const updatedMembers = new Set(groupMember);
    updatedMembers.delete(item);
    setGroupMember(updatedMembers);
  };

  const handleBack = () => {
    setNewGroup(false);
  };
  const handleSearch = () => {
    dispatch(searchUser({ keyword:querys, token }));
  };

  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex  space-x-1 bg-[#595E60] rounded-md   pt-10 px-10  h-[12.5vh] ">
            <BsArrowLeft
              className="cursor-pointer text-4xl  text-white flex rounded-md  mr-6  mt-1  mb-1  font-bold"
              onClick={handleCloseCreateGroup}
            />
            <p className="text-4xl  pr-20 text-white   font-semibold">
              Add Participats
            </p>
            <div
              onClick={() => {
                setNewGroup(true);
              }}
              className="bg-[#AFC1D0]     rounded-md mb-8  p-2 "
            >
              <p className="text-black font-semibold text-2xl "> Create</p>
            </div>
          </div>

          <div className="relative   py-4 px-3">
            <div className="flex space-x-2 flex-wrap space-y-1">
              {groupMember.size > 0 &&

                Array.from(groupMember).map((item) => (
                  <SelectedMember
                    handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}
                    />
                ))}
            </div>

            <input
              onChange={(e) => {
                setQuerys(e.target.value);
                handleSearch(e.target.value);
                
              }}
              className="outline-none  text-white bg-[#202020]  border-b border-[#888888] px-2  py-2 w-[93%]"
              type="text"
              placeholder="Search or start new Chat"
              value={querys}
            />
          </div>

          <div className="bg-[#202020]  p-3 rounded-md overflow-y-scroll h-[77vh]">
            {querys &&
              auth.searchUser?.map((item) => (
                <div
                  onClick={() => {
                    if (!groupMember.has(item)) {
                      const updatedMembers = new Set(groupMember);
                      updatedMembers.add(item);
                      setGroupMember(updatedMembers);
                      setQuerys("");
                    }
                  }}
                  key={item?.id}
                >
                  
                  <ChatCard userImg={item.profile_picture} name={item.full_name} />
                </div>
              ))}
          </div>
        </div>
      )}
      {newGroup && <NewGroup  handleBack={handleBack} groupMember={groupMember} setIsGroup={setIsGroup} setAnchorEl={setAnchorEl} />}
    </div>
  );
};

export default CreateGroup;
