import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../Actions/authAction";
import { clearError, clearLocalUser } from "../../Slice/authSlice";
import { toast } from "react-toastify";
import { sendLocalDoDO } from "../../Actions/DoDoActions";
import { clearlocalDoDoSend } from "../../Slice/DoDoSlice";
const UserLogin = () => {
  const l_item = localStorage.getItem("dodo-app-babu")
    ? JSON.parse(localStorage.getItem("dodo-app-babu"))
    : [];
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const {
   
    loading = false,
    isAuthenticatedUser = null,
    isLocalUser = null,
    error = null,
  } = useSelector((State) => State.authState);
  const {
   
    isLocalDodoSend=false
  } = useSelector((State) => State.DoDoState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [continueWithLoacal, setContinueWithLoacal] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const FormInfo = {
      email,
      password,
    };
    disaptch(getUser(FormInfo));
  };

  useEffect(() => {
    if (email&&isAuthenticatedUser&&(!isLocalUser||!l_item.length)) {
      toast("login success", { type: "success" });
console.log('jksukf');
      navigate('/')

      return
    }
    if (isAuthenticatedUser&&!isLocalUser) {
      navigate('/')
      return
    }
    if (error) {
      toast(error, { type: "error" ,onOpen:()=>{
        disaptch(clearError())
      }});
    }
    if (isLocalDodoSend) {
      console.log('isLocalDodoSend');
      toast(' Data Merged success', { type: "success" ,onOpen:()=>{
        disaptch(clearlocalDoDoSend())
      disaptch(clearLocalUser())
      }});
      navigate('/')
    }
  }, [isAuthenticatedUser, error,disaptch,email,navigate,continueWithLoacal,isLocalDodoSend]);
  const handleBtn=(i)=>{
    console.log('iiiiiiiii',i);
      setContinueWithLoacal(i)
      console.log(l_item.length&&i&&isLocalUser);
// console.log('continue with local ',continueWithLoacal);
      if(l_item.length&&i&&isLocalUser){
        console.log(l_item);
        disaptch(sendLocalDoDO(l_item))
        localStorage.removeItem('dodo-app-babu')
       
      }else{

        navigate('/')
      }
    
  }
  return (
    <Fragment>
      <MetaData title={"Login "} />
      { (!isAuthenticatedUser) && <div className="row d-flex mt-5 shadow p-3 mb-5 bg-body rounded" >
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
        
      </div>}
       {(l_item.length&&isLocalUser &&isAuthenticatedUser)&&<Fragment>
                <div className="w-100 col-md-6 row p-5 shadow  justify-content-between mt-5">
                        <div className=" row col-md-6 d-flex justify-content-center align-items-center"><p>Do You Want To Continue with your Old Data .... <br/>
                        
                        </p>
                        <div  className="d-flex justify-content-center align-items-center gap-2" >
                        <button onClick={e=>handleBtn(true)} className="btn btn-primary mt-2" type="button"> Continue</button>
                        <button onClick={e=>handleBtn(false)} className="btn btn-primary mt-2" type="button"> DON`T </button>
                        </div>
                        </div>
                        
                        
                </div>
        </Fragment>}
    </Fragment>
  );
};

export default UserLogin;
