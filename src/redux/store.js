import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userReducer";

const mainReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
})

export const store = configureStore({
  reducer: mainReducer
});