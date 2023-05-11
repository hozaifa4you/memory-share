/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";
import { STATUS } from "@/redux/status";
import { API, LoginUserTypes } from "@/api-config/API";
import { AxiosError } from "axios";

export interface InitialStateType {
  isAuth?: boolean;
  token?: string | null;
  user?: object | null;
  status?: STATUS;
  error?: null | object;
}
export interface LoginDataTypes {
  username: string;
  password: string;
}

const login_info = "login-info";

const initialState: InitialStateType = {
  isAuth:
    typeof window !== "undefined" && localStorage.getItem(login_info)
      ? true
      : false,
  user:
    typeof window !== "undefined" && localStorage.getItem(login_info)
      ? JSON.parse(localStorage.getItem(login_info)!).user
      : null,
  token:
    typeof window !== "undefined" && localStorage.getItem(login_info)
      ? JSON.parse(localStorage.getItem(login_info)!).token
      : null,
  status: STATUS.IDLE,
  error: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    // TODO: login
    setLogin(state, action: PayloadAction<InitialStateType>) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // TODO: logout
    setLogout(state) {
      state.isAuth = false;
      state.token = null;
      state.user = null;
    },
    // TODO: status
    setStatus(state, action) {
      state.status = action.payload;
    },
    // TODO: error
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// TODO: login reducer
export const login = (data: LoginDataTypes) => async (dispatch: Dispatch) => {
  dispatch(setStatus(STATUS.LOADING));

  try {
    const { data } = await API.post<LoginUserTypes>("/api/v1/users/login");
    dispatch(setLogin(data));
    if (typeof window !== "undefined") {
      localStorage.setItem(login_info, JSON.stringify(data));
    }
    dispatch(setStatus(STATUS.IDLE));
    console.log(data); // FIXME: remove in future
  } catch (error: any) {
    dispatch(setStatus(STATUS.ERROR));
    let err_message;
    if (error instanceof AxiosError) {
      err_message = error.response?.data.message;
    }
    err_message = error.message;
    dispatch(setError(err_message));
  }
};

// TODO:
export const selectLogin = (state: RootState) => state.authentication;
export const { setLogin, setError, setLogout, setStatus } = authSlice.actions;
export default authSlice.reducer;
