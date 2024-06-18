import {combineReducers,configureStore}from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from './Slice/authSlice'
import DoDoReducer from './Slice/DoDoSlice'

const reducer=combineReducers({
    authState:userReducer,
    DoDoState:DoDoReducer,
})

const store=configureStore({
    reducer,
    middleware:(middleware)=>middleware(thunk)
})

export default store;