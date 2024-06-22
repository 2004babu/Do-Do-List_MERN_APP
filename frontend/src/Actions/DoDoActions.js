

import axios from 'axios'
import { DoDoCreateFail, DoDoCreateRequest, DoDoCreateSuccess, DoDoFail, DoDoRequest, DoDoSuccess, DoDoUpdateFail, DoDoUpdateRequest, DoDoUpdateSuccess, deleteDoDoFail, deleteDoDoRequest, deleteDoDoSuccess } from '../Slice/DoDoSlice'

//create Dodo  process 
export const createDoDo=DoDoData=>async(dispatch)=>{
    try {
        dispatch(DoDoCreateRequest())
        const {data}=await axios.post('/api/server/dodo',{Data:DoDoData})
        dispatch(DoDoCreateSuccess(data))
    } catch (error) {
        dispatch(DoDoCreateFail(error.response.data.message))
    }
}

// updateDoDo 
export const updateDoDo=DoDoData=>async(dispatch)=>{
    try {
        dispatch(DoDoUpdateRequest())
        const {data}=await axios.put('/api/server/dodo',DoDoData)
        dispatch(DoDoUpdateSuccess(data))
    } catch (error) {
        dispatch(DoDoUpdateFail(error.response.data.error))
    }
}
// updateDoDo 
export const deleteDoDO=DoDoId=>async(dispatch)=>{
   
    try {
       
        dispatch(deleteDoDoRequest())
        await axios.delete(`/api/server/dodo/${DoDoId}`)
        dispatch(deleteDoDoSuccess())
    } catch (error) {
        dispatch(deleteDoDoFail(error.response.data.message))
    }
}
// getsingl dodod
export const getSingleDoDo=id=>async(dispatch)=>{
    try {
        dispatch(DoDoRequest())
        const {data}=await axios.get(`/api/server/dodo/${id}`)
        dispatch(DoDoSuccess(data))
    } catch (error) {
        dispatch(DoDoFail(error.response.data.message))
    }
}

// getallDoDo
export const getallDoDo=async(dispatch)=>{
    try {
        dispatch(DoDoRequest())
        const {data}=await axios.get(`/api/server/getalldodo`)
        dispatch(DoDoSuccess(data))
    } catch (error) {
        dispatch(DoDoFail(error.response.data.message))
    }
}





