import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./Reducers/NotesReducer";

const store = configureStore({
    reducer: {
        Notes: NotesReducer,
    },
})

export default store