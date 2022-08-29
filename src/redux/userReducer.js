import { createAction, createReducer } from "@reduxjs/toolkit";

const userLogin = "user";

export const login = createAction(userLogin);

const initialState = {
  isLogIn: false,
}

export const userReducer = createReducer(initialState, {
  [login]: (state, action) => {
    state.isLogIn = action.payload;
  },
});