import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loaduser } from "../../Actions/authAction";
import MetaData from "../layouts/MetaData";

const Profile = () => {
  const { user = {} } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loaduser);
  }, [dispatch]);

  return (
    <div
      unselectable="none"
      className=" mt-5 colum  p-2 row d-flex justify-content-center align-items-center "
    >
      <MetaData title={'Profile'}/>
      <div className="card d-flex justify-content-center align-items-center  shadow p-3  bg-body-tertiary rounded   ">
        <figure className="figure card-img-top  row ">
          <img
            src={user.avatar ? user.avatar : "./images/Unknown_person.jpg "}
            className="image-fluid rounded-circle object-fit-cover"
            height={"200px"}
            width={"200px"}
            
            alt="bootstrap class"
          />
          <figcaption className="figure-caption text-center mt-2">
            My Profile Picture
          </figcaption>
        </figure>
        <div className="card-body">
          <span className="colum d-flex justify-content-evenly">
            <h6>Name :</h6> <p>{user.name}</p>
          </span>
          <span className=" colum d-flex justify-content-evenly">
            <h6>Email : </h6> <p>{user.email}</p>
          </span>
          <Link
            to={`/editProfile/${user._id}`}
            type="button"
            className="text-decoration-none btn btn-info w-100"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
