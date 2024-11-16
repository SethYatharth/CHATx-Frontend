import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const initialState = {
    signup:null,
    signin:null,
    reqUser:null,
}
export const authReducer = (store = initialState, { type, payload }) => {
 if (type === REGISTER) {
  return {...store, signup:payload}
 }
 else if (type === LOGIN) {
  return {...store, signin:payload}
 }
 else if (type === REQ_USER) {
  return {...store, reqUser:payload}
 }
 else if (type === SEARCH_USER) {
  return {...store, searchUser:payload}
 }
 else if (type === UPDATE_USER) {
  return {...store, updatedUser:payload}
 }
 return store
}