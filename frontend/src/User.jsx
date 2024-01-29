import React, { useEffect } from "react";
import HomeAnimation from "./HomeAnimation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import { notificationActions } from "./store/notificationSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const noteNumber = useSelector((state)=>state.note.noteList).length ;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn]);

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

  return (
    <div className='h-100 w-100 d-flex align-items-center justify-content-end rounded' style={{ display: "flex", gap: "10px", position: "relative",minHeight:"500px"}}>
      <div className="p-2 bg-dark h-100 w-100 d-flex userInfo" style={{ zIndex: "3",opacity:"0.8" }}>
        <div className="infoContainerUser text-white rounded p-2 w-100 h-100">
          <p className="p-1 bg-primary text-white" style={{ borderRadius: "5px" }}>{name}</p>
          <p className="p-1 bg-primary text-white" style={{ borderRadius: "5px" }}>{email}</p>
          <p>Total Note : {noteNumber} </p>
          <button onClick={handleLogOut} className="text-white position-absolute p-2 bg-danger rounded" style={{ bottom: "20px",}}>Log Out</button>
        </div>
        <div>
        </div>
      </div>
      <div className='w-100 h-100 backgroundAnimation' style={{ position: "absolute",overflow:"hidden", background: "linear-gradient(to bottom, #444444, #111119)" }}>
        <HomeAnimation />
      </div>
    </div>
  );
};

export default User;