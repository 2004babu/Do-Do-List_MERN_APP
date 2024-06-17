import {combineReducers,configureStore}from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from './Slice/authSlice'
const reducer=combineReducers({
    authState:userReducer
})

const store=configureStore({
    reducer,
    middleware:(middleware)=>middleware(thunk)
})

export default store;