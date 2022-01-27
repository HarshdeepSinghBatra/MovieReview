import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileList from "./ProfileList";

const Navbar = ( { IsLogin, setIsLogin }) => {

  const location = useLocation();

  const [IsProfileList, toggleIsProfileList] = React.useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <div className="logo">Movie Review</div>
      </Link>

      {IsLogin ? (
        <div className="profile">
          <span className="profile-icon" onClick = {() => toggleIsProfileList(!IsProfileList)}>{JSON.parse(localStorage.getItem('authUser')).name[0]}</span>
          {IsProfileList && <ProfileList setIsLogin={setIsLogin} toggleIsProfileList={toggleIsProfileList} />}
        </div>
      ) : (
        location.pathname === '/' && <Link to="/login" className="signin-btn">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
