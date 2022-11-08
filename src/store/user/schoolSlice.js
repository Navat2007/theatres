import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadSchool = createAsyncThunk('school/loadSchool', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/user/school/load_by_id.php', form);
    return data.data.params;

});

export const fetchEditSchool = createAsyncThunk('school/editSchool', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/user/school/edit_school.php', form);
    return data.data;

});

export const editSchoolPhoto = createAsyncThunk('school/editPhoto', async (params) => {

    let form = new FormData();

    for (let key in params) {

        if(key === "photo"){
            form.append("files[]", params[key]);
        }
        else {
            form.append(key, params[key]);
        }

    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/user/school/change_photo.php', form);
    return data;

});

const schoolsSlice = createSlice({

    name: 'school',
    initialState: {
        school: null,
        status: 'loading',
        statusError: '',
    },
    reducers: {
    },
    extraReducers: {
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
            }

        },
        [fetchEditSchool.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
        [editSchoolPhoto.pending]: (state) => {
            state.statusText = '';
            state.status = 'sending';
        },
        [editSchoolPhoto.fulfilled]: (state, action) => {
            console.log(action);
            if (action.payload.error === 0) {
                state.status = 'done';
                state.school.photo = action.payload.params;

            } else {
                state.status = 'error';
                state.statusText = action.payload.error_text;
            }
        },
        [editSchoolPhoto.rejected]: (state) => {
            state.statusText = 'Произошла ошибка при запросе к серверу.';
            state.status = 'error';
        },
    }

});

//export const {} = schoolsSlice.actions;
export default schoolsSlice.reducer;