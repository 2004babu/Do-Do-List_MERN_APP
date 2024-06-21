import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../Actions/authAction";
import { clearError } from "../../Slice/authSlice";
import { toast } from "react-toastify";
const UserLogin = () => {
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const {
    user = {},
    loading = false,
    isAuthenticatedUser = null,
    error = null,
  } = useSelector((State) => State.authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const FormInfo = {
      email,
      password,
    };
    disaptch(getUser(FormInfo));
  };

  useEffect(() => {
    if (isAuthenticatedUser) {
      toast("login success", { type: "success" });
      navigate('/')
    }
    if (error) {
      toast(error, { type: "error" ,onOpen:()=>{
        disaptch(clearError())
      }});
    }
  }, [isAuthenticatedUser, error,disaptch]);
  return (
    <Fragment>
      <MetaData title={"Login "} />
      <div className="row d-flex mt-5 shadow p-3 mb-5 bg-body rounded" >
        <form action="#"  className='p-4' onSubmit={handleSubmit}>
          <h1 className="mb-3 text-center text-uppercase">login</h1>
          <div className="form-group">
            <label htmlFor="email-feild">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-feild">password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success mt-2 w-100 align-center" type="submit" disabled={loading}>Submit</button>
              
          <div className="d-flex colum justify-content-around">
              <Link to={'/register'} className="text-muted " style={{fontSize:'12px'}}> New User ?</Link>
              <Link to={'/forgotpassword'} className="text-muted " style={{fontSize:'12px'}}> forgotPassword ?</Link>

          </div>
        </form>
        
      </div>
    </Fragment>
  );
};

export default UserLogin;
