import mongoose from 'mongoose'

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const initialState = {
    GetNotes: '',
    Notes: '',
    DeleteNotes: '',
    UpdateNotes: '',

}

export const GetNotesAsyncThunk = createAsyncThunk(
    'GetNotes',
    async () => {
        try {
            const res = await fetch('http://192.168.0.105:4000/notes/getNotes');
            const result = await res.json();
            console.log('GetNotes', result);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
)


export const NotesAyncThunk = createAsyncThunk(
    'Notes',
    async ({ titleValue, notesValue, image }) => {
        try {
            const createNote = await fetch('http://192.168.0.105:4000/notes/addNotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Title: titleValue,
                    Note: notesValue,
                    Image: image
                })
            })
            const result = await createNote.json();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }
)


export const UpdateNotesAsync = createAsyncThunk(
    'UpdateNotes',
    async ({ titleValue, notesValue, Id }) => {
        const id = mongoose.Types.ObjectId(Id);
        try {
            const createNote = await fetch(`http://192.168.0.105:4000/notes/updateNotes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        Title: titleValue,
                        Note: notesValue
                    }
                ),

            })
            const result = await createNote.json();
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
            const deleteNote = await fetch(`http://192.168.0.105:4000/notes/deleteNotes/${id}`, {
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

const NotesSlice = createSlice({
    name: 'Notes',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(NotesAyncThunk.fulfilled, (state, action) => {
            state.Notes = action.payload
        })
        builder.addCase(GetNotesAsyncThunk.fulfilled, (state, action) => {
            state.GetNotes = action.payload
        })
        builder.addCase(UpdateNotesAsync.fulfilled, (state, action) => {
            state.UpdateNotes = action.payload
        })
        builder.addCase(DeleteNotesAsync.fulfilled, (state, action) => {
            state.DeleteNotes = action.payload
        })
    }
})

export default NotesSlice.reducer