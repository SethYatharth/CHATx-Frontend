import { BASE_API_URL } from "../../Config/Api"
import { CREATE_NEW_MESSAGE, DELETE_MESSAGES, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage=(messageData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/messages/create`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${messageData.token}`
            },
            body:JSON.stringify(messageData.data)
        })
        const data = await res.json();
        console.log("Create Message ",data);
        dispatch({type:CREATE_NEW_MESSAGE,payload:data})
    } catch (error) {
        console.log("Create Message error",error);
    }
}

export const deleteMessage=(deleteMessageData)=>async(dispatch)=>{
    console.log("sdgnsdlk========",deleteMessageData)
    try {
        const res = await fetch(`${BASE_API_URL}/api/messages/${deleteMessageData.messageId}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${deleteMessageData.token}`
            },
        })
        const data = await res.json();
        console.log("Create Message ",data);
        dispatch({type:CREATE_NEW_MESSAGE,payload:data})
    } catch (error) {
        console.log("Create Message error",error);
    }
}

export const getAllMessage=(reqData)=>async(dispatch)=>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${reqData.token}`
            },
        })
        const data = await res.json();
        console.log("GEt all Message ",data);
        dispatch({type:DELETE_MESSAGES,payload:data})
    } catch (error) {
        console.log("GEt all error",error);
    }
}