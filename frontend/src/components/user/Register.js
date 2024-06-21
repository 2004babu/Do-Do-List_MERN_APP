import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, registerUser } from "../../Actions/authAction";
import { clearError } from "../../Slice/authSlice";
import { toast } from "react-toastify";
const Register = () => {
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const {
    user = {},
    loading = false,
    isAuthenticatedUser = null,
    error = null,
  } = useSelector((State) => State.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [AvatarPreview, setAvatarPreview] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const FormInfo=new FormData()
console.log(Avatar);
    FormInfo.append('name',name)
    FormInfo.append('email',email)
    FormInfo.append('password',password)
    
    if (Avatar) {
      FormInfo.append('avatar', Avatar)
    }
    
    // console.log(FormInfo);
    disaptch(registerUser(FormInfo));
  };

  useEffect(() => {
    if (isAuthenticatedUser) {
      toast("register success", { type: "success" });
      navigate("/");
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          disaptch(clearError());
        },
      });
    }
  }, [isAuthenticatedUser, error, clearError, disaptch]);
  const handleAvatar = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatar(e.target.files[0]);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Login "} />
      <div className="row shadow p-3 mb-5 bg-body-tertiary rounded">
        <form
          action="#"
          className="d-flex align-items-center row"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-3">login</h1>
          <div className="form-group mb-2">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email-feild">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password-feild">password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-2 ">
            <label htmlFor="password-feild">Avatar</label>
            <input
              type="file"
              className="form-control"
              onChange={handleAvatar}
              style={{ width: "80%" }}
            />
            {AvatarPreview && (
              <figure className="img-register">
                <img
                  className="form-control"
                  height={"40px"}
                  width={"40px"}
                  src={AvatarPreview}
                />
              </figure>
            )}
          </div>
          <button className="btn btn-primary w-60" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
