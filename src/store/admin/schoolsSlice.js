import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadSchools = createAsyncThunk('schools/loadSchools', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const { data } = await axios.post(window.global.baseUrl + 'admin/new_models/admin/schools/load.php');
    return data.params;
});

const schoolsSlice = createSlice({

    name: 'schools',
    initialState: {
        data: [],
        status: 'loading'
    },
    reducers: {
    },
    extraReducers: {
        [loadSchools.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [loadSchools.fulfilled]: (state, action) => {
            state.status = 'done';
            state.data = action.payload;
        },
        [loadSchools.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        }
    }

});

//export const {} = schoolsSlice.actions;
export default schoolsSlice.reducer;