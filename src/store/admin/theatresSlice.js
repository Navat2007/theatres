import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadTheatres = createAsyncThunk('theatres/loadTheatres', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const { data } = await axios.post(window.global.baseUrl + 'php/models/admin/theatres/load.php');
    return data.params;
});

const theatresSlice = createSlice({

    name: 'theatres',
    initialState: {
        data: [],
        status: 'loading'
    },
    reducers: {
    },
    extraReducers: {
        [loadTheatres.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [loadTheatres.fulfilled]: (state, action) => {
            state.status = 'done';
            state.data = action.payload;
        },
        [loadTheatres.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        }
    }

});

//export const {} = theatresSlice.actions;
export default theatresSlice.reducer;