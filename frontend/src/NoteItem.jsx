import React, { useState, useEffect } from "react";
import style from './noteitem.module.css';
import { useDispatch, useSelector } from "react-redux";
import { noteActions } from "./store/noteSlice";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "./store/noteAction";

export const NoteItem = (props) => {
  const { note } = props;
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.user.authToken);
  const currentNoteId = useSelector((state) => state.note.currentNoteId);
  const navigate = useNavigate();
  const [showEditBtns, setShowEditBtns] = useState(false);

  useEffect(() => {
    setShowEditBtns(false);
  }, [currentNoteId]);

  const toggleEditBtns = () => {
    if (currentNoteId === note._id) {
      setShowEditBtns(!showEditBtns);
    }
    console.log(showEditBtns)
  }

  const clickHandler = (e) => {
    if (!e.target.closest(`.${style.editTriggerBtn}`)) {
      setShowEditBtns(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    // cleanUp function to remove eventlistener
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  const handleDeleteNote = (e) => {
    e.preventDefault();
    dispatch(deleteNote(currentNoteId, authToken));
    dispatch(noteActions.removeCurrentNoteId());
  };

  function formatDate(inputDate) {
    try {
      // Parse the input date string
      const parsedDate = new Date(inputDate);

      // Format the date without including the time zone
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(parsedDate);

      return formattedDate;

    } catch (error) {
      // Handle invalid date format
      console.error(`Error: ${error}`);
      return null;
    }
  }

  return (
    <div className={`${style.noteitem} p-1 rounded justify-content-between ${currentNoteId === note._id ? `${style.active}` : ''}`} style={{ position: 'relative' }}>
      <div className="noteInfo" style={{ overflow: "hidden", display: "block" }}>
        <div className="noteTitle text-white p-1">{note.title}</div>
        <div className={`${style.noteTag}`} style={{ borderRadius: "25px", padding: "0 7px", overflowX: "hidden", width: "100%", whiteSpace: "nowrap", color: "#888888" }}>{note.tag}</div>
        <div className="text-warning p-1">{formatDate(note.date)}</div>
      </div>
      {currentNoteId === note._id &&
        <>
          <div className="h-100 position-absolute rounded" style={{ width: "100px", zIndex: "4", right: "0", top: "0", background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 30%, rgb(2, 185, 185) 50%)' }}></div>
          <button className={`${style.editTriggerBtn} position-absolute d-flex align-items-center justify-content-center`} style={{ height: "40px", width: "40px", display: "flex", alignItems: "center", justifyContent: "center", right: "7px", top: "7px", borderRadius: "50%", zIndex: "5" }} onClick={(e) => { toggleEditBtns() }}><i className="fa-solid fa-ellipsis"></i></button>
        </>
      }
      {showEditBtns && <div className={`${style.editBtnContainer}`} style={{ position: "absolute", right: "60px", top: "25px", zIndex: "7" }}>
        <div className={`${style.editBtn} updateBtn btn`} onClick={() => { navigate('/editor') }}>
          <i className="fa-solid fa-edit"></i>
        </div>
        <div className={`${style.editBtn} deleteBtn btn`} onClick={handleDeleteNote}>
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>}
    </div>
  );
};
