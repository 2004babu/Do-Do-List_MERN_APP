import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Actions/authAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation()

  const {  isAuthenticatedUser = null } = useSelector(
    (state) => state.authState
  );

  const handleLogout = () => {
    dispatch(logoutUser);
   
  };

  return (
    <header className="row container-fluid">
      <div className="col-4 ">
        <Link to={'/'} className=" d-flex text-small text-wrap justify-content-center" >Do-Do-List _Babu</Link>
      </div>
      <nav className="navbar col-8 d-flex  justify-content-end    ">
          <ul className=" nav-item d-flex align-items-center justify-content-center colum list-inline gap-1 ">
            <li  className="nav-item col p-sm-1 p-md-2 ">
              {location.pathname==='/'?
              (
                <Fragment>
                  {isAuthenticatedUser ? (
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout 
                </button>
              ) : (
                <button
                  className="btn-sm btn-warning "
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
                </Fragment>
              ):null}
            </li>
            {isAuthenticatedUser &&<li className="nav-item p-sm-1 p-md-2">
              <Link to={'profile'}  > Profile</Link>
            </li>}
            <li className="nav-item p-sm-1 p-md-2">
              <Link to={'about'}> About</Link>
            </li>
            {/* Additional nav items can be added here */}
          </ul>
      </nav>
   
    </header>
  );
};

export default Header;
