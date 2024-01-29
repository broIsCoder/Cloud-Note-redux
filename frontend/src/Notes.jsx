import React, { useEffect, useState } from 'react';
import { NoteItem } from './NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { noteActions } from './store/noteSlice';

export const Notes = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.user.isLoggedIn);
    const currentNoteId = useSelector((state) => state.note.currentNoteId);
    const notes = useSelector((state) => state.note.noteList)
    const authToken = useSelector((state) => state.user.authToken);

    const setCurrentNote = (e, _id) => {
        if (e.target.closest('.note')) {
            console.log(e.target)
            dispatch(noteActions.setCurrentNoteId(_id));
        }
    };

    useEffect(() => {
        console.log('currentNoteId :', currentNoteId);
    }, [currentNoteId]);

    return (
        <div className="notesContainer w-100 thinScrollBar" style={{ paddingBottom: "50px", maxHeight: "90vh", display: "flex", flexDirection: "column", gap: "15px", overflowY: "auto" }}>
            <h1 className='text-white text-align-center p-2 pb-0'>Your Note</h1>
            {notes.length === 0 && <big className='m-5 text-white'>No notes to display</big>}
            {notes.map((note) => {
                return (
                    <div className="note pointer" key={note._id} onClick={(e) => { setCurrentNote(e, note._id) }}>
                        <NoteItem note={note} />
                    </div>
                );
            })}
        </div>
    );
};
