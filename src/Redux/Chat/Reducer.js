import { CREATE_CHAT, CREATE_GROUP, CURRENT_GROUP, GET_USERS_CHAT, UPDATE_GROUP } from "./ActionType"

const initialValue={
    chats:[],
    createGroup:null,
    createdChat:null,
    currentGroup:null,
}
export const chatReducer=(store=initialValue,{type,payload})=>{
    if(type===CREATE_CHAT){
        return{...store,createdChat:payload}
    }else if(type===CREATE_GROUP){
        return{...store,createGroup:payload}
    }else if(type===GET_USERS_CHAT){
        return{...store,chats:payload}
    }else if(type===UPDATE_GROUP){
        return{...store,createGroup:payload}
    }else if(type===CURRENT_GROUP){
        return{...store,currentGroup:payload}
    }
    else{
        return store;
    }
}