import React, { useEffect, useState, useRef } from "react";
import { Notes } from './Notes';
import style from './editor.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { noteActions } from "./store/noteSlice";
import { addNote } from "./store/noteAction";
import { deleteNote } from "./store/noteAction";
import { updateNote } from "./store/noteAction";

const Editor = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const authToken = useSelector((state) => state.user.authToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentNoteId = useSelector((state) => state.note.currentNoteId);
  const noteList = useSelector((state) => state.note.noteList);

  const textAreaRef = useRef(true);

  useEffect(() => {
    textAreaRef.current.focus();
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn]);

  const [noteProp, setnoteProp] = useState({
    title: "",
    description: "",
    tag: ""
  })

  useEffect(() => {
    noteList.forEach(note => {
      if (note._id === currentNoteId) {
        setnoteProp({
          title: note.title,
          description: note.description,
          tag: note.tag
        })
      }
    });
  }, [currentNoteId])

  const handleChange = (e) => {
    setnoteProp({
      ...noteProp,
      [e.target.name]: e.target.value
    })
  };

  const handleAddNote = (e) => {
    dispatch(addNote(noteProp, authToken));
    setnoteProp({
      title: "",
      description: "",
      tag: ""
    });
    dispatch(noteActions.removeCurrentNoteId())
  };

  const handleUpdateNote = (e) => {
    dispatch(updateNote(currentNoteId, noteProp, authToken));
  };

  const handleDeleteNote = (e) => {
    dispatch(deleteNote(currentNoteId, authToken));
    dispatch(noteActions.removeCurrentNoteId())
  };

  return (
    <div className={`${style.editorContainer} h-100 w-100`} style={{ display: "flex" }}>
      <div className={`p-2 bg-dark rounded ${style.editor}`}>
        <form className="form bg-dark d-flex flex-column w-100 h-100" style={{ gap: `10px` }}>
          <div className="">
            <input
              className=" w-100 text-white bg-dark rounded p-2"
              minLength={3}
              placeholder="Enter title here ( Atleast 3 characters )"
              name="title"
              required
              value={noteProp.title}
              onChange={handleChange}
              style={{ border: "2px solid gray" }}
            />
          </div>
          <textarea
            ref={textAreaRef}
            cols="30"
            rows="10"
            className="w-100 text-white bg-dark rounded p-2 thinScrollBar"
            minLength={5}
            placeholder="Enter Description here ( Atleast 5 characters )"
            name="description"
            required
            value={noteProp.description}
            onChange={handleChange}
            style={{ border: "2px solid gray", resize: 'none' }}
          ></textarea>
          <div className="">
            <input
              type="text"
              className="tags currentNote  w-100 text-white bg-dark rounded p-2"
              placeholder="Tag1 , Tag2 "
              name="tag"
              value={noteProp.tag}
              onChange={handleChange}
              style={{ border: "2px solid gray" }}
            />
          </div>
          <div className="w-100 d-flex justify-content-center" style={{ gap: "10px" }}>
            <button
              type="button"
              className=" btn btn-outline-danger btn-sm"
              onClick={handleDeleteNote}
            >
              Delete
            </button>
            <button
              type="button"
              className=" btn btn-outline-info btn-sm"
              onClick={handleUpdateNote}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={handleAddNote}
            >
              Save as New
            </button>
          </div>
        </form>
      </div>
      <div className={`bg-dark rounded p-2 ${style.editorNoteContainer}`}>
        <Notes />
      </div>
    </div>
  );
};

export default Editor;