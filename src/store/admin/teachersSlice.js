import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadTeachers = createAsyncThunk('teachers/loadTeachers', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/load.php', form);
    return data;
});

export const loadTeacher = createAsyncThunk('teachers/loadTeacher', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/load_by_id.php', form);
    return data;

});

export const fetchAddTeacher = createAsyncThunk('teachers/addTeacher', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/add.php', form);
    return data;

});

export const fetchEditTeacher = createAsyncThunk('teachers/editTeacher', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/edit.php', form);
    return data;

});

const teachersSlice = createSlice({

    name: 'teachers',
    initialState: {
        teacher: null,
        data: [],
        status: '',
        statusError: '',
    },
    reducers: {
        clear(state) {
            state.statusText = '';
            state.status = '';
            state.teacher = null;
        },
    },
    extraReducers: {
        [loadTeachers.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [loadTeachers.fulfilled]: (state, action) => {

            console.log(action);

            state.status = 'done';
            state.data = action.payload.params;
        },
        [loadTeachers.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        },

        [loadTeacher.pending]: (state) => {
            state.status = 'loading';
            state.teacher = null;
        },
        [loadTeacher.fulfilled]: (state, action) => {
            state.status = 'done';

            if(action.payload.params.length > 0)
                state.teacher = action.payload.params[0];
        },
        [loadTeacher.rejected]: (state) => {
            state.status = 'error';
            state.teacher = null;
        },
        // ADD
        [fetchAddTeacher.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchAddTeacher.fulfilled]: (state, action) => {

            console.log(action.payload);

            if(action.payload.error === 1){
                state.status = 'sendingError';
                state.statusError = action.payload.params.error_text;
            }

            if(action.payload.error === 0){
                state.status = 'sendingDone';
                state.statusError = "";
                state.teacher = null;
            }

        },
        [fetchAddTeacher.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
        // EDIT
        [fetchEditTeacher.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchEditTeacher.fulfilled]: (state, action) => {

            console.log(action.payload);

            if (action.payload.error === 1) {
                state.status = 'sendingError';
                state.statusError = action.payload.error_text;
            }

            if (action.payload.error === 0) {
                state.status = 'sendingDone';
                state.statusError = "";
                state.teacher = null;
            }

        },
        [fetchEditTeacher.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
    }

});

export const {clear} = teachersSlice.actions;
export default teachersSlice.reducer;