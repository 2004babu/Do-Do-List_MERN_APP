import React, { useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

    const dispatch=useDispatch()
    const {user={},loading=null}=useSelector(state=>state.authState)
    useEffect(()=>{
        // dispatch(load)
    },[dispatch])
  return (
    <div>
      home
      <MetaData title={'Home'}/>
    </div>
  )
}

export default Home
