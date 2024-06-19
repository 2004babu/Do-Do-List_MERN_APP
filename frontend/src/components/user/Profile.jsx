import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='colum  p-2  ' >
              <div className="card w-100 shadow p-3 mb-5 bg-body-tertiary rounded  ">
                    <figure className='figure card-img-top  row' >
                        <img src="https://picsum.photos/200/200"  className='image-fluid rounded-circle '  alt="bootstrap class" /> 
                        <figcaption className='figure-caption text-center mt-2'> My Profile Picture </figcaption>
                    </figure>
                    <div className="card-body">
                        <span className='colum d-flex justify-content-evenly'>  <h6>Name :</h6> <p>{'  babu'}</p></span>
                        <span className=' colum d-flex justify-content-evenly'>  <h6>Email  : </h6> <p>{'  babu'}</p></span>
                        <Link to={'/editProfile'} type='button' className='text-decoration-none btn btn-info w-100'> Edit Profile</Link>
                    </div>
              </div>
              

    </div>
  )
}

export default Profile
