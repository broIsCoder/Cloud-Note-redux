import React, { useEffect } from 'react';
import style from './home.module.css';
import { Notes } from './Notes';
import HomeAnimation from './HomeAnimation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotes } from './store/noteAction';
import { notificationActions } from './store/notificationSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector((state)=>state.user.authToken);
  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  const firstHomeRender = useSelector((state)=>state.notification.firstHomeRender)

  useEffect(() => {
    const fetchData = () => {
      if (isLoggedIn && firstHomeRender) {
        dispatch(fetchAllNotes(authToken));
        dispatch(notificationActions.firstRender(false));
        console.log('\nrequested \n');
      } else {
        console.log('\nnot-requested \n');
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn]);

  return (
    <div className={`w-100 h-100 ${style.homeContainer}`} style={{ position: "relative" }}>
      <div className={`${style.backgroundHome} h-100`} style={{overflow:"hidden", background: "linear-gradient(to bottom, #506d93, #172238)" }}>
        <HomeAnimation />
      </div>
      <div className={`bg-dark rounded p-2 ${style.homeNoteContainer}`}>
        
        <Notes />
      </div>

    </div>
  );
};

export default Home;
