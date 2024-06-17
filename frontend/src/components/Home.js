import React, { useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <Link to={'/login'}> <h1>Login</h1></Link>
    </div>
  )
}

export default Home
