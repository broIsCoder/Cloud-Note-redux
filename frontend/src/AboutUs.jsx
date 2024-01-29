import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  const navigate = useNavigate();

   useEffect(() => {
    if(!isLoggedIn){
      navigate("/login")
    }
   }, [isLoggedIn]);

   useEffect(() => {
    if(!isLoggedIn){
      navigate("/login")
    }
   }, [])
   
  return (
    <div className="w-100 h-100 p-2 rounded bg-dark text-white thinScrollBar" style={{overflowY:"scroll"}}>
      <h1 style={{fontSize:"2rem",marginBottom:"1rem"}}>About the Note App</h1>
      <p className="lead">
        Welcome to CloudNote , a simple application for managing your notes.
        This app provides the following features:
      </p>

      <div className="card my-4 bg-dark text-white">
        <div className="card-body">
          <h2 className="card-title text-info">User Authentication</h2>
          <p className="card-text">
            To enhance privacy and security, the Note App requires users to log
            in or sign up. Users can create an account with a unique username
            and password.
          </p>
        </div>
      </div>

      <div className="card my-4 bg-dark text-white">
        <div className="card-body">
          <h2 className="card-title text-info">CRUD Operations</h2>
          <p className="card-text">
            The app supports the basic CRUD operations for managing notes:
          </p>
          <ul>
            <li>
              <strong>Create:</strong> Users can create new notes with a title
              and content.
            </li>
            <li>
              <strong>Read:</strong> View a list of all existing notes and click
              on a note to see its details.
            </li>
            <li>
              <strong>Update:</strong> Edit the title or content of an existing
              note.
            </li>
            <li>
              <strong>Delete:</strong> Remove a note from the list.
            </li>
          </ul>
        </div>
      </div>

      <div className="card my-4 bg-dark text-white">
        <div className="card-body">
          <h2 className="card-title text-info">Getting Started</h2>
          <p className="card-text">
            To get started, please log in or sign up using the provided options.
            Once logged in, you can start creating and managing your notes.
          </p>
        </div>
      </div>

      <p className="text-white">
        This app is built with React and Redux for state management . It uses backend services to store and
        retrieve user data securely. The app's user interface is designed to be
        simple and intuitive, allowing users to focus on their notes without
        distractions.
      </p>

      <p className="text-white">
        We hope you enjoy using the Note App for organizing your thoughts and
        ideas!
      </p>
    </div>
  );
};

export default AboutUs