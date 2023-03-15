import mongoose from 'mongoose'

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const initialState = {
    GetArchive: '',
    // CreateArchive: '',
    DeleteNotes: '',
    UpdateArchive: '',

}

export const GetArchiveAsyncThunk = createAsyncThunk(
    'GetArchive',
    async () => {
        try {
            const res = await fetch('https://scribbdo.netlify.app/archive/getArchive');
            const result = await res.json();
            console.log('GetArchive', result[0].Archive);
            return result[0].Archive;
        } catch (error) {
            console.log(error)
        }
    }
)


// export const NotesAyncThunk = createAsyncThunk(
//     'CreateArchive',
//     async ({ titleValue, notesValue }) => {
//         try {
//             const createNote = await fetch('https://scribbdo.netlify.app/notes/addNotes', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     Title: titleValue,
//                     Note: notesValue
//                 })
//             })
//             const result = await createNote.json();
//             console.log(result);
//             return result;
//         } catch (error) {
//             console.log(error);
//         }
// 
// }
// )


export const UpdateArchiveAsync = createAsyncThunk(
    'UpdateArchive',
    async (notesID) => {
        const id = mongoose.Types.ObjectId(notesID);
        try {
            const UpdateArchive = await fetch(`https://scribbdo.netlify.app/archive/addToArchive/63f10ab825bad8c0ec0607c0`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Archive: id }),
            })
            const result = await UpdateArchive.json();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
)

export const DeleteNotesAsync = createAsyncThunk(
    'DeleteNotes',
    async (notesID) => {
        const id = mongoose.Types.ObjectId(notesID);
        try {
            const deleteNote = await fetch(`https://scribbdo.netlify.app/notes/deleteNotes/${id}`, {
                method: 'DELETE'
            })
            const result = await deleteNote.json();
            console.log('DeletedNote', result)
            return result;
        } catch (error) {
            console.log(error);
        }
    }
)

const ArchiveSlice = createSlice({
    name: 'CreateArchive',
    initialState,
    extraReducers: (builder) => {
        // builder.addCase(NotesAyncThunk.fulfilled, (state, action) => {
        // state.CreateArchive = action.payload
        // })
        builder.addCase(GetArchiveAsyncThunk.fulfilled, (state, action) => {
            state.GetArchive = action.payload
        })
        builder.addCase(UpdateArchiveAsync.fulfilled, (state, action) => {
            state.UpdateArchive = action.payload
        })
        builder.addCase(DeleteNotesAsync.fulfilled, (state, action) => {
            state.DeleteNotes = action.payload
        })
    }
})

export default ArchiveSlice.reducer