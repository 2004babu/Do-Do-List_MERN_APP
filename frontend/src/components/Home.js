import React, { useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DoDoList from './Do-Do/DoDoList'

const Home = () => {

    const dispatch=useDispatch()
    const {user={},loading=null}=useSelector(state=>state.authState)
    useEffect(()=>{
        // dispatch(load)
    },[dispatch])
  return (
    <div>
      <MetaData title={'Home'}/>
      <DoDoList/>
    </div>
  )
}

export default Home
