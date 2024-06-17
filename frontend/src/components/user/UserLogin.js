import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  }, [isAuthenticatedUser, error, clearError,disaptch]);
  return (
    <Fragment>
      <MetaData title={"Login "} />
      <div className="login-page">
        <form action="#" onSubmit={handleSubmit}>
          <h1 className="mb-3">login</h1>
          <div className="data-group">
            <label htmlFor="email-feild">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="data-group">
            <label htmlFor="password-feild">password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default UserLogin;
