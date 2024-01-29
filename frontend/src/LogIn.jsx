import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeAnimation from './HomeAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store/userAction';
import { notificationActions } from './store/notificationSlice';
import { userActions } from './store/userSlice';
import { getLoggedUserInfo } from './store/getInfo';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (isLoggedIn) {
            console.log("You are Logged In");
            dispatch(
                notificationActions.makeNotification({
                    message: "You are Logged In",
                    type: "info",
                    loading:false,
                    open: true,
                })
            );
            
            navigate("/home");
        } else {
            dispatch(
                notificationActions.makeNotification({
                    message: "You are Logged Out",
                    type: "warning",
                    loading:false,
                    open: true,
                })
            );
            console.log("You are Logged Out");

        }
    }, [isLoggedIn])

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credential));
        setCredential({
            email: "",
            password: ""
        });
    };

    //on first render , check for authtoken, login if authtoken founded
    useEffect(() => {
        const authToken = JSON.parse(localStorage.getItem('AuthToken'));
        if (authToken) {
          dispatch(userActions.setUserInfo({authToken:authToken}));
          dispatch(userActions.logIn());
          getLoggedUserInfo(authToken,dispatch);       //calling a thunk directly with dispatch
        }
      }, [])
    

    return (
        <div className="text-white p-2 w-100 h-100 d-flex justify-content-center align-items-center" style={{ borderRadius: "10px", position: "relative" }}>
            <div className='backgroundAnimation h-100 w-100' style={{overflow:"hidden", position: "absolute", background: "linear-gradient(to bottom, #ff7e5f, #8e54e9)" }}>
                <HomeAnimation />
            </div>
            <form onSubmit={handleLoginSubmit} className='bg-dark p-2' style={{ zIndex: "3", borderRadius: "10px", width: "400px" }}>
                <div className="">
                    <label htmlFor="email1" className="form-label">Email address</label>
                    <input type="email" onChange={(e) => { setCredential({ ...credential, email: e.target.value }) }} placeholder='Enter Email' required className="form-control w-100 p-1 bg-dark text-white" id="email1" aria-describedby="emailHelp" value={credential.email} />
                    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-2">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="text" onChange={(e) => { setCredential({ ...credential, password: e.target.value }) }} placeholder='Enter Password' required className="form-control w-100 p-1 bg-dark text-white" id="password1" value={credential.password} />
                </div>
                <div className="btnContainer d-flex gap-2 justify-content-center">
                    <button type="submit" className="btn btn-info text-white">Log In</button>
                    <Link to="../signup" className={`btn text-white text-decoration-none btn-primary p-2 rounded`}>Create a New Account</Link>
                </div>
            </form>
        </div>
    )
}

export default Login; 