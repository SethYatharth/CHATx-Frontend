import { BASE_API_URL } from "../../Config/Api"
import { CREATE_CHAT, CREATE_GROUP, CURRENT_GROUP, GET_USERS_CHAT, UPDATE_GROUP } from "./ActionType";

export const createChat=(chatData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/single`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${chatData.token}`
            },
            body:JSON.stringify(chatData.data)
        })
        const data = await res.json();
        console.log("Create Chat ",data);
        dispatch({type:CREATE_CHAT,payload:data})
    } catch (error) {
        console.log("Create Chaterror ",error);
    }
}

export const createGroupChat=(chatData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/group`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${chatData.token}`
            },
            body:JSON.stringify(chatData.group)
        })
        const data = await res.json();
        console.log("Create Group ",data);
        dispatch({type:CREATE_GROUP,payload:data})
    } catch (error) {
        console.log("Create Group error ",error);
    }
} 

export const getUsersChat=(chatData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/user`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${chatData.token}`
            },
        })
        const data = await res.json();
        console.log("Get Users Chat ",data);
        dispatch({type:GET_USERS_CHAT,payload:data})
    } catch (error) {
        console.log("Get Users Chat error ",error);
    }
} 

export const getchatByChatId=(chatData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/${chatData.chatId}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${chatData.token}`
            },
        })
        const data = await res.json();
        console.log("chatByCHatId ",data);
        dispatch({type:CURRENT_GROUP,payload:data})
    } catch (error) {
        console.log("Get Users Chat error ",error);
    }
} 
export const removeUserFromGroup=(removeUserData)=>async(dispatch)=>{
    console.log("----------------------",removeUserData)
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/${removeUserData.chatId}/remove/${removeUserData.userId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${removeUserData.token}`
            },
        })
        const data = await res.json();
        console.log("Remove User from Group Chat ",data);
        dispatch({type:UPDATE_GROUP,payload:data})
    } catch (error) {
        console.log("Remove User from Group Chat error ",error);
    }
} 

export const renameGroup=(renameGroupData)=>async(dispatch)=>{
    console.log("--------------------------",renameGroupData)
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/${renameGroupData.chatId}/rename`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${renameGroupData.token}`
            },
            body:JSON.stringify(renameGroupData.data)
        })
        const data = await res.json();
        console.log("Rename Group Chat ",data);
        dispatch({type:UPDATE_GROUP,payload:data})
    } catch (error) {
        console.log("Rename Group Chat error ",error);
    }
} 

export const addUserToGroup=(addUserToGroupData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/chats/${addUserToGroupData.chatId}/add/${addUserToGroupData.userId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${addUserToGroupData.token}`
            },
        })
        const data = await res.json();
        console.log("Add User from Group Chat ",data);
        dispatch({type:UPDATE_GROUP,payload:data})
    } catch (error) {
        console.log("Add User from Group Chat error ",error);
    }
}