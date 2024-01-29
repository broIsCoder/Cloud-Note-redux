import { notificationActions } from "./notificationSlice";
import { noteActions } from "./noteSlice";
import { host } from "./userSlice";

//Fetch all of the notes
export const fetchAllNotes = (authToken) => {
  return async (dispatch) => {
    const fetchAllNotesAsync = async () => {
      dispatch(
        notificationActions.makeNotification({
          message: "Fetching notes",
          type: "info",
          loading:true,
          open: true,
        })
      ); 
      try {
        let response = await fetch(`${host}/api/notes/fetchnotes/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const data = await response.json();
        if (response.ok) {
          dispatch(noteActions.setAllNotes(data.notes));
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "success",
              loading:false,
              open: true,
            })
          );
        } else {
          dispatch(
            notificationActions.makeNotification({
              message: "Note was not fetched",
              type: "warning",
              loading:false,
              open: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          notificationActions.makeNotification({
            message: error.message || 'Error Fetching Notes',
            type: "error",
            loading:false,
            open: true,
          })
        );
      }
    };

    fetchAllNotesAsync();
  };
};

// Add a note
export const addNote = (newNote, authToken) => {
  return async (dispatch) => {
    const addNoteAsync = async () => {
      dispatch(
        notificationActions.makeNotification({
          message: "Adding note",
          type: "info",
          loading:true,
          open: true,
        })
      ); 
      try {
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify(newNote),
        });

        const data = await response.json();
        if (response.ok) {
          // add note in noteList
          dispatch(noteActions.addNote(data.note));
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "success",
              loading:false,
              open: true,
            })
          );
        } else {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "warning",
              loading:false,
              open: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          notificationActions.makeNotification({
            message: error.message,
            type: "error",
            loading:false,
            open: true,
          })
        );
      }
    };
    addNoteAsync();
  };
};

//Delete a note
export const deleteNote = (noteId, authToken) => {
  return async (dispatch) => {
    const deleteNoteAsync = async () => {
      dispatch(
        notificationActions.makeNotification({
          message: "Deleting note",
          type: "info",
          loading:true,
          open: true,
        })
      ); 

      try {
        const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // delete note from noteList
          dispatch(noteActions.deleteNote(noteId));
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "success",
              loading:false,
              open: true,
            })
          );
        } else {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "warning",
              loading:false,
              open: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          notificationActions.makeNotification({
            message: error.message,
            type: "error",
            loading:false,
            open: true,
          })
        );
      }
    };
    deleteNoteAsync();
  };
};

//Update a note
export const updateNote = (noteId, note, authToken) => {
  return async (dispatch) => {
    const updateNoteAsync = async () => {
      dispatch(
        notificationActions.makeNotification({
          message: "Updating note",
          type: "info",
          loading:true,
          open: true,
        })
      ); 
      try {
        const response = await fetch(
          `${host}/api/notes/updatenote/${noteId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
            body: JSON.stringify(note),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // update note
          dispatch(noteActions.updateNote({id:data.note._id, ...data.note}));
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "success",
              loading:false,
              open: true,
            })
          );
        } else {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "warning",
              loading:false,
              open: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          notificationActions.makeNotification({
            message: error.message,
            type: "error",
            loading:false,
            open: true,
          })
        );
      }
    };
    updateNoteAsync();
  };
};