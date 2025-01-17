import React from 'react'
import { AiOutlineClose,  } from "react-icons/ai";
export const SelectedMember = ({member, handleRemoveMember}) => {
  return (
    <div className='flex items-center bg-slate-600 rounded-full'>
        <img className='w-7 h-7 rounded-full ' src={member.profile_picture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" />
        <p className='px-2'>{member.full_name}</p>
        <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer'/>
    </div>
  )
}
