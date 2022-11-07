import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadSchools = createAsyncThunk('schools/loadSchools', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const { data } = await axios.post(window.global.baseUrl + 'php/models/admin/schools/load.php');
    return data.params;
});

export const loadSchool = createAsyncThunk('schools/loadSchool', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/schools/load_school.php', form);
    return data.data.params;

});

export const fetchEditSchool = createAsyncThunk('schools/editSchool', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/schools/edit_school.php', form);
    return data.data;

});

const schoolsSlice = createSlice({

    name: 'schools',
    initialState: {
        school: null,
        data: [],
        status: '',
        statusError: '',
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
        },

        [loadSchool.pending]: (state) => {
            state.status = 'loading';
            state.school = null;
        },
        [loadSchool.fulfilled]: (state, action) => {
            state.status = 'done';
            state.school = action.payload;
        },
        [loadSchool.rejected]: (state) => {
            state.status = 'error';
            state.school = null;
        },
        // EDIT
        [fetchEditSchool.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchEditSchool.fulfilled]: (state, action) => {

            console.log(action.payload);

            if(action.payload.error === 1){
                state.status = 'sendingError';
                state.statusError = action.payload.error_text;
            }

            if(action.payload.error === 0){
                state.status = 'sendingDone';
                state.statusError = "";
                state.admin = null;
            }

        },
        [fetchEditSchool.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
    }

});

//export const {} = schoolsSlice.actions;
export default schoolsSlice.reducer;