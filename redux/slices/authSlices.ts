/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

import { RootState } from "@/redux/store";
import { STATUS } from "@/redux/status";
import { API, LoginUserTypes } from "@/api-config/API";
import { AxiosError } from "axios";

export interface InitialStateType {
  isAuth?: boolean;
  token?: string | null;
  user?: LoginUserTypes | null;
  status?: STATUS;
  error?: null | string;
}
export interface LoginDataTypes {
  email: string;
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
      ? JSON.parse(localStorage.getItem(login_info)!)
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
    setLogin(state, action: PayloadAction<LoginUserTypes>) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = action.payload;
    },
    // TODO: logout
    setLogout(state) {
      state.isAuth = false;
      state.token = null;
      state.user = null;
      typeof window !== "undefined" && localStorage.removeItem(login_info);
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
    const { data: responseData } = await API.post<LoginUserTypes>(
      "/api/v1/users/login",
      data
    );
    dispatch(setLogin(responseData));
    if (typeof window !== "undefined") {
      localStorage.setItem(login_info, JSON.stringify(responseData));
    }
    notifications.show({
      title: "🚀 Authentication Alert 🔥",
      message: "Login succeed!",
      color: "green",
    });
  } catch (error: any) {
    let err_message;
    if (error instanceof AxiosError) {
      err_message = error.response?.data.message;
    } else {
      err_message = error.message;
    }
    notifications.show({
      title: "🚀 Authentication Alert 🔥",
      message: err_message,
      color: "yellow",
    });
    dispatch(setError(err_message));
  } finally {
    dispatch(setStatus(STATUS.IDLE));
  }
};

// TODO: logout
export const logout = () => (dispatch: Dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  dispatch(setLogout());
  dispatch(setStatus(STATUS.IDLE));
  notifications.show({
    title: "🚀 Authentication Alert 🔥",
    message: "Logout succeed!",
    color: "yellow",
  });
};

// TODO: register

// TODO:
export const selectLogin = (state: RootState) => state.authentication;
export const { setLogin, setError, setLogout, setStatus } = authSlice.actions;
export default authSlice.reducer;
