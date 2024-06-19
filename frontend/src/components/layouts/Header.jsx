import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Actions/authAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user = {}, isAuthenticatedUser = null } = useSelector(
    (state) => state.authState
  );

  const handleLogout = () => {
    dispatch(logoutUser);
    navigate("/logout");
  };

  return (
    <header className="row container-fluid">
      <div className="col-4 ">
        <Link to={'/'} className=" d-flex text-small text-wrap justify-content-center" >Do-Do-List _Babu</Link>
      </div>
      <nav className="navbar col-8 d-flex  justify-content-end    ">
          <ul className=" nav-item d-flex align-items-center colum list-inline gap-1 ">
            <li className="nav-item col p-sm-1 p-md-2 ">
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
                  className="btn btn-warning"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </li>
            <li className="nav-item p-sm-1 p-md-2">
              <Link to={'profile'}  > Profile</Link>
            </li>
            <li className="nav-item p-sm-1 p-md-2">
              <Link to={'profile'}> About</Link>
            </li>
            {/* Additional nav items can be added here */}
          </ul>
      </nav>
   
    </header>
  );
};

export default Header;
