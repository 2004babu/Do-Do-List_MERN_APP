import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticatedUser: false,
    error: null,
    isUserUpdated: false,
    isProfileUpdated: false,
    isSendToken: false,
    isPasswordChange:false
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
      if (action.payload.user.name) {
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          isAuthenticatedUser: true,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
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

    profileUpdateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    profileUpdateSuccess(state, action) {
      return {
        ...state,
        loading: false,

        user: action.payload.user,
        isProfileUpdated: true,
      };
    },
    profileUpdateFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProfileUpdated(state, action) {
      return {
        ...state,
        isProfileUpdated: false,
      };
    },
    sendResetTokenRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    sendResetTokenSucces(state, action) {
      return {
        ...state,
        loading: false,
        isSendToken: true,
        
      };
    },
    sendResetTokenFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    ClearSendResetToken(state, action) {
      return {
        ...state,
        isSendToken: false,
      };
    },
    changePasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    changePasswordSucces(state, action) {
      return {
        ...state,
        loading: false,
        isPasswordChange: true,
        user:action.payload.user
      };
    },
    changePasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    ClearChangePassword(state, action) {
      return {
        ...state,
        isPasswordChange: false,
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
  clearProfileUpdated,
  profileUpdateSuccess,
  profileUpdateRequest,
  profileUpdateFail,
  sendResetTokenFail,
  sendResetTokenRequest,
  sendResetTokenSucces,
  ClearSendResetToken,
  ClearChangePassword,
  changePasswordFail,
  changePasswordRequest,
  changePasswordSucces,
} = actions;
export default reducer;
