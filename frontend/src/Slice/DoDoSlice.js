import { createSlice } from "@reduxjs/toolkit";

const DoDoSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    DoDo: [],
    isDoDoDeleted: null,
    error: null,
    isDoDoUpdated: false,
    isDoDoCreated: false,
  },
  reducers: {
    DoDoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    DoDoSuccess(state, action) {
      return {
        ...state,
        loading: false,

        DoDo: action.payload.DoDo,
      };
    },
    DoDoFail(state, action) {
      return {
        ...state,
        loading: false,

        error: action.payload,
      };
    },
    DoDoUpdateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    DoDoUpdateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isDoDoUpdated: true,
        DoDo: action.payload.DoDo,
      };
    },
    DoDoUpdateFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DoDoCreateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    DoDoCreateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isDoDoCreated: true,
        DoDo: action.payload.DoDo,
      };
    },
    DoDoCreateFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteDoDoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteDoDoSuccess(state, action) {
      return {
        ...state,
        loading: false,

        isDoDoDeleted: true,
      };
    },
    deleteDoDoFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearDoDoUpdate(state, action) {
      return {
        ...state,
        isDoDoUpdated: false,
      };
    },
    clearDoDoDeleted(state, action) {
      return {
        ...state,
        isDoDoUpdated: false,
      };
    },
    clearDoDoCreated(state, action) {
      return {
        ...state,
        isDoDoCreated: false,
      };
    },
  },
});

export const { reducer, actions } = DoDoSlice;

export const {
  DoDoRequest,
  DoDoFail,
  DoDoSuccess,
  DoDoUpdateFail,
  DoDoUpdateRequest,
  DoDoUpdateSuccess,
  clearError,
  clearDoDoUpdate,
  deleteDoDoFail,
  deleteDoDoRequest,
  deleteDoDoSuccess,
  clearDoDoDeleted,
  DoDoCreateSuccess,
  DoDoCreateRequest,
  DoDoCreateFail,
  clearDoDoCreated
} = actions;
export default reducer;
