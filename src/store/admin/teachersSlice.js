import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadTeachers = createAsyncThunk('teachers/loadTeachers', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const { data } = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/load.php');
    return data;
});

export const loadTeacher = createAsyncThunk('teachers/loadTeacher', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/load.php', form);
    return data;

});

export const fetchEditTeacher = createAsyncThunk('teachers/editTeacher', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/teachers/edit.php', form);
    return data.data;

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
            state.teacher = action.payload.params;
        },
        [loadTeacher.rejected]: (state) => {
            state.status = 'error';
            state.teacher = null;
        },
        // EDIT
        [fetchEditTeacher.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchEditTeacher.fulfilled]: (state, action) => {

            console.log(action.payload);

            if(action.payload.error === 1){
                state.status = 'sendingError';
                state.statusError = action.payload.error_text;
            }

            if(action.payload.error === 0){
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

//export const {} = teachersSlice.actions;
export default teachersSlice.reducer;