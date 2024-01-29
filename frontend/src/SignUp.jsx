import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import HomeAnimation from "./HomeAnimation";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "./store/notificationSlice";
import { signUpUser } from "./store/userAction";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [cpassword, setcpassword] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      console.log("New User Signed In")
      navigate("/home");
    };
  }, [isLoggedIn])

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (credential.password === cpassword) {
      dispatch(signUpUser(credential));
      if (!isLoggedIn) {
        setCredential({
          ...credential,
          email: "",
        });
      } else {
        setCredential({
          name: "",
          email: "",
          password: ""
        });
        setcpassword("");
      };
      console.log("sign utext")

    } else {
      dispatch(
        notificationActions.makeNotification({
            message: "Enter the same password !",
            type: "warning",
            loading:false,
            open: true,
        })
    );
    };

  };

  return (
    <div className="text-white p-2 h-100 w-100 d-flex align-items-center justify-content-center" style={{ borderRadius: "10px", position: "relative" }}>
      <div className='w-100 h-100 ' style={{ position: "absolute",overflow:"hidden", background: "linear-gradient(to bottom, #87CEEB, #1E90FF)" }}>
        <HomeAnimation />
      </div>
      <form onSubmit={handleSignUpSubmit} className="bg-dark p-2" style={{ zIndex: "3", borderRadius: "10px", width: "400px" }}>
        <div className="my-2">
          <label htmlFor="userName" className="form-label">
            User Name
          </label>
          <input
            minLength={3}
            type="text"
            required
            className="form-control bg-dark text-white"
            onChange={(e) => { setCredential({ ...credential, name: e.target.value }) }}
            value={credential.name}
          />
        </div>
        <div className="my-2">
          <label htmlFor="email1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            required
            className="form-control bg-dark text-white"
            id="email1"
            aria-describedby="emailHelp"
            onChange={(e) => { setCredential({ ...credential, email: e.target.value }) }}
            value={credential.email}
          />
          <div id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="password1" className="form-label">
            Password
          </label>
          <input
            minLength={3}
            type="text"
            required
            className="form-control bg-dark text-white"
            id="password1"
            onChange={(e) => { setCredential({ ...credential, password: e.target.value }) }}
            value={credential.password}
          />
        </div>
        <div className="my-2">
          <label htmlFor="password2" className="form-label">
            Confirm Password : {/*warning*/}
          </label>
          <input
            minLength={3}
            type="text"
            required
            className="form-control bg-dark text-white"
            id="password2"
            onChange={(e) => { setcpassword(e.target.value) }}
            value={cpassword}
          />
        </div>
        <div className="btnContainer d-flex gap-2 justify-content-center">
          <button type="submit" className="btn btn-info text-white">
            Create New Account
          </button>
          <Link
            className={`text-white text-decoration-none btn btn-primary p-2 rounded}`}
            to="/login"
            style={{ borderRadius: "10px" }}
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;