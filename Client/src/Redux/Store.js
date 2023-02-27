import { configureStore } from "@reduxjs/toolkit";
import ArchiveReducer from "./Reducers/ArchiveReducer";
import NotesReducer from "./Reducers/NotesReducer";

const store = configureStore({
    reducer: {
        Notes: NotesReducer,
        Archive:ArchiveReducer
    },
})

export default store