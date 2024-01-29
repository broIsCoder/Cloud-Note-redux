import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: "success", message: "", open: true , firstHomeRender:true , loading:false },
  reducers: {
    makeNotification: (state, action) => { 
      return { ...state,...action.payload};
    },
    firstRender : (state,action)=>{
      state.firstHomeRender = action.payload ;
    }
  }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
