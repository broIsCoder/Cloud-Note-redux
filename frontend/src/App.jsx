import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home'
import User from './User'
import Editor from './Editor'
import AboutUs from './AboutUs';
import Login from './LogIn';
import Signup from './SignUp';
import { Notification } from './Notification';
import { useSelector } from 'react-redux';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      setSidebarVisible(true)
    } else {
      setSidebarVisible(false)
    }
  }, [isLoggedIn])

  const toggleSidebar = () => {
    setSidebarVisible((prevVisible) => !prevVisible);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='app-container position-relative w-100 h-100' style={{ display: "flex" }}>
            {sidebarVisible && <div className={`sidebarContainer w-5`}>
              <Sidebar />
            </div>}
            {isLoggedIn && <div className={`toggleSidebar bg-white m-2`} onClick={toggleSidebar} style={{ position: 'absolute', height: "50px", width: "50px", alignItems: "center", justifyContent: "center", bottom: "10px", right: "10px", zIndex: 10, cursor: "pointer", borderRadius: "50%" }}>{sidebarVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</div>}
            <div className={`outletContainer w-${sidebarVisible ? '95' : '100'} rounded h-${sidebarVisible ? '95' : '100'} p-1 rounded}`}>
              <Outlet />
            </div>
            <div className="notificationContainer" style={{ position: "absolute", right: "10px", zIndex: "12" }}>
              <Notification />
            </div>
          </div>
        }>
          <>
            <Route index element={<Home />} />
            <Route path="index.html" element={<Home />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="user" element={<User />} />
            <Route path="editor" element={<Editor />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<div className='container text-white d-flex justify-content-center align-items-center'>
              Page Not Found
            </div>} />
          </>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}


export default App;
