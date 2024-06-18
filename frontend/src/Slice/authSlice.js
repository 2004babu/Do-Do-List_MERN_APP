import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticatedUser: false,
    error: null,
    isUserUpdated: false,
  },
  reducers: {
    userRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: true,
        user: action.payload.user,
      };
    },
    userFail(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: false,
        error: action.payload,
      };
    },
    userUpdateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userUpdateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserUpdated: true,
        user: action.payload.user,
        isAuthenticatedUser: true,
      };
    },
    userUpdateFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    LogoutUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    LogoutUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticatedUser: false,
      };
    },
    LogoutUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user:action.payload.user,
        isAuthenticatedUser: true,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
       
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearUserUpdate(state, action) {
      return {
        ...state,
        isUserUpdated: false,
      };
    },
  },
});

export const { reducer, actions } = userSlice;

export const {
  userRequest,
  userFail,
  userSuccess,
  userUpdateFail,
  userUpdateRequest,
  userUpdateSuccess,
  clearError,
  clearUserUpdate,
  LogoutUserFail,
  LogoutUserRequest,
  LogoutUserSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
} = actions;
export default reducer;
