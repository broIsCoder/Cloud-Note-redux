import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './sidebar.module.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from './store/userSlice'
import { notificationActions } from './store/notificationSlice'

const Sidebar = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user);

  const [showInfo, setShowInfo] = useState(true)

  const triggerInfoContainer = () => {
    setShowInfo(!showInfo);
  }

  const handleClick = (e) => {
    if (!e.target.closest(`.${style.infoBtns}`)) {
      setShowInfo(false);
    }
  };

  const handleLogOut = () => {
    dispatch(userActions.logOut());
    dispatch(userActions.setUserInfo({
      name: null,
      email: null,
      authToken: null
    }));
    localStorage.removeItem("AuthToken");
    dispatch(notificationActions.firstRender(true));
  };

  useEffect(() => {
    console.log('\nname :', name, '\nemail :', email);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, []);

  return (
    <div className={`${style.sidebar} bg-dark text-white w-100 h-100`}>
      <Link to={"home"} className={`${style.logo} p-2 text-black bg-info`} style={{ fontFamily: "cursive", overflow: 'hidden', textWrap: 'nowrap' }}>
        <i className="fa-solid fa-cloud fa-xl"></i><br />
        <h1>CloudNote</h1>
      </Link>
      <div className={`${style.navList} text-center`}>
        <Link to={"home"} className={` ${style.navLink} p-2 m-0 ${path === '/' ? `${style.active}` : ''}`} >
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>
        <Link to={"user"} className={` ${style.navLink} p-2 m-0 ${path === '/user' ? `${style.active}` : ''}`}>
          <i className="fa-solid fa-user"></i>
          <span>User</span>
        </Link>
        <Link to={"editor"} className={` ${style.navLink} p-2 m-0 ${path === '/editor' ? `${style.active}` : ''}`}>
          <i className="fa-solid fa-sticky-note"></i>
          <span>Editor</span>
        </Link>
        <Link to={"aboutUs"} className={` ${style.navLink} p-2 m-0 ${path === '/aboutUs' ? `${style.active}` : ''}`}>
          <i className="fa-solid fa-cloud"></i>
          <span>About Us</span>
        </Link>
      </div>

      <div className={`${style.infoBtns} p-1 flex-column`} style={{ position: 'absolute', bottom: "0" }}>
        <div className={`${style.infoTriggerBtn} d-flex bg-info rounded p-1 justify-content-center mb-2`} onClick={triggerInfoContainer}><i className="fa-solid fa-bars"></i></div>
        {showInfo &&
          <div className={`${style.infoContainer} align-items-end`} style={{ gap: "5px", position: 'relative', top: "0", left: "0" }}>
            <div className={`${style.userInfo} userName thinScrollBar2 bg-dark rounded p-1 overflow-x-auto w-100`}>{name}</div>
            <div className={`${style.userInfo} userEmail thinScrollBar2  bg-dark rounded p-1 overflow-x-auto w-100`}>{email}</div>
            <button onClick={handleLogOut} className="logBtn btn-dark btn rounded p-2 text-danger logOut">Log Out</button>
          </div>}
      </div>
    </div>
  )
}

export default Sidebar