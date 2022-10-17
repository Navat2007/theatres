import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadTheatreRequests = createAsyncThunk('theatreRequests/loadTheatreRequests', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const { data } = await axios.post(window.global.baseUrl + 'php/models/admin/theatreRequests/load.php');
    return data.params;
});

const theatreRequestsSlice = createSlice({

    name: 'theatreRequests',
    initialState: {
        data: [],
        status: 'loading'
    },
    reducers: {
    },
    extraReducers: {
        [loadTheatreRequests.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [loadTheatreRequests.fulfilled]: (state, action) => {
            state.status = 'done';
            state.data = action.payload;
        },
        [loadTheatreRequests.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        }
    }

});

//export const {} = theatreRequestsSlice.actions;
export default theatreRequestsSlice.reducer;