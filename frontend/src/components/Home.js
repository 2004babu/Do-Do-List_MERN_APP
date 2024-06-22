import React from 'react'
import MetaData from './layouts/MetaData'
import DoDoList from './Do-Do/DoDoList'

const Home = () => {
  return (
    <div>
      <MetaData title={'Home'}/>
      <DoDoList/>
    </div>
  )
}

export default Home
