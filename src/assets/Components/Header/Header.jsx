import React, { useContext, useEffect, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import { AppContext } from "../../context/AppContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Profile from '../Profile/profiles'

function Header() {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);

  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const handleUserInOut = () => {
    if (!state.username) {
      navigate("/login");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setState({ token: null, username: null });
      navigate("/login");
    }
  };

  const menuHandler = () =>{
    setShowMenu((prev) => !prev);
  }
  

  const BACKEND_URL = import.meta.env.VITE_API_URL;
  return (
    <>
      <header className={style.header}>
        <div className={style.header_container}>
          <div className={style.logo}>
            {/* src={ev_logo} */}
            <img src="/img/Evangadi-logo.png" alt="Evangadi_logo" />
          </div>
        
           {/* Hamburger Icon */}
        <div className={style.menuIcon} onClick={menuHandler}>
          {showMenu ? <CloseIcon /> : <MenuIcon />}
        </div>
          <nav className={`${style.nav} ${showMenu ? style.nav_open : ""}`} >
            <Link to="/home" >Home</Link>
            <Link to="/bot">Ask Evangadi</Link>
            <Link to="/how-it-work">How it Works</Link>
            <button className={style.btn_signin} onClick={handleUserInOut}>
              {!state.username ? "SIGN IN" : "LogOut"}
            </button>
            {
                state.username && 
            <div className={style.userProfileWrapper}>
              {/* Avatar trigger */}
              <span
                className={style.userProfile}
                onClick={() => setShowProfile(!showProfile)}
              >
                <img
                  width={38}
                  height={38}
                  src={
                    state?.avatar
                      ? `${BACKEND_URL}${state.avatar}`
                      : "/img/avator.png"
                  }
                  alt="User Avatar"
                />
              </span>
              <span className={style.showOnline}></span>

              {/* Dropdown */}
              {showProfile && (
                <div
                  className={style.profileDropdown}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Profile onClose={() => setShowProfile(false)} />
                </div>
              )}
            </div>
            }
          </nav>
        </div>
      </header>
    </>
  );
}

export default memo(Header);
