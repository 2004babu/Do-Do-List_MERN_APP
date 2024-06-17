import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Actions/authAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user = {}, isAuthenticatedUser = null } = useSelector(
    (state = state.authState)
  );
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    
    dispatch(logoutUser())
    navigate("/logout");
  };
  return (
    <header>
      <h5>Do-Do-List _Babu</h5>
      {isAuthenticatedUser ? (
        <button onClick={handleLogout}> logout </button>
      ) : (
        <button onClick={handleLogin}> Login </button>
      )}
    </header>
  );
};

export default Header;
