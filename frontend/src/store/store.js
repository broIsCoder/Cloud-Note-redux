import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlice";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
    reducer:{
        note:noteSlice.reducer,
        user:userSlice.reducer,
        notification:notificationSlice.reducer,
    }
})

export default store;