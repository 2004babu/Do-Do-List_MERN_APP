import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createLocalUser } from "../../Slice/authSlice";

const  LocalUserIntro =()=>{
const dispatch=useDispatch()
const handleLocalContinue=()=>{
    console.log('creating local user');
    dispatch(createLocalUser())
}
    return(
        <Fragment>
                 <div className="w-100 p-5 shadow d-flex flex-column justify-content-between justify-content-md-center">
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <p style={{ fontSize: "12px" }}>
                    Do You Want To Continue using LocalStorage <br />
                </p>
                <p style={{ fontSize: "12px" }}>
                    if You Login Your Data Stored In Server... <br />
                </p>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-evenly gap-3 align-items-center mt-3">
                <button onClick={handleLocalContinue} className="btn btn-primary" type="button" style={{ fontSize: "14px" }}>
                    Continue
                </button>
                <Link to={'/login'} className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary" type="button" style={{ fontSize: "14px" }}>
                        Login
                    </button>
                </Link>
            </div>
        </div>
        </Fragment>
    )
}

export default LocalUserIntro