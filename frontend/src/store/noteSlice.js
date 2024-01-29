import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    currentNoteId: null,
    noteList: [
      {
        _id: "null1",
        user: "null",
        title: "null1",
        description: "null1",
        tag: "null1",
        date: "2024-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null2",
        user: "null",
        title: "null2",
        description: "null2",
        tag: "null2",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null3",
        user: "null",
        title: "null3",
        description: "null3",
        tag: "null3",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null4",
        user: "null",
        title: "null444444444444444444444444444444444444444444",
        description: "null4",
        tag: "null44444444444444444444444444444444444444444444444444444",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null5",
        user: "null",
        title: "null5",
        description: "null5",
        tag: "null5",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null6",
        user: "null",
        title: "null6",
        description: "null6",
        tag: "null6",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null7",
        user: "null",
        title: "null7",
        description: "null7",
        tag: "null7",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null8",
        user: "null",
        title: "null8",
        description: "null8",
        tag: "null8",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null9",
        user: "null",
        title: "null8",
        description: "null8",
        tag: "null8",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
      {
        _id: "null10",
        user: "null",
        title: "null8",
        description: "null8",
        tag: "null8",
        date: "2023-01-19T06:27:07.761+00:00",
        __v: 0,
      },
    ],
  },
  reducers: {
    setCurrentNoteId(state, action) {
      state.currentNoteId = action.payload;
    },
    removeCurrentNoteId(state) {
      state.currentNoteId = null;
    },
    setAllNotes(state, action) {
      state.noteList = action.payload;
    },
    addNote(state, action) {
      state.noteList = [...state.noteList, action.payload];
    },
    deleteNote(state, action) {
      state.noteList = state.noteList.filter((note) => {
        return note._id !== action.payload;
      });
    },
    updateNote(state, action) {
      // update note in notes array
      for (let index = 0; index < state.noteList.length; index++) {
        if (state.noteList[index]._id === action.payload.id) {
          state.noteList[index].title = action.payload.title;
          state.noteList[index].description = action.payload.description;
          state.noteList[index].tag = action.payload.tag;
          break;
        }
      }
    },
  },
});

export const noteActions = noteSlice.actions;
export default noteSlice;
