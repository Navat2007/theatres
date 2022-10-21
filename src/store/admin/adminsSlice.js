import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadAdmins = createAsyncThunk('admins/loadAdmins', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/load_admins.php', form);
    return data.data.params;

});

export const loadAdmin = createAsyncThunk('admins/loadAdmin', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/load_admin.php', form);
    return data.data.params;

});

export const fetchAddAdmin = createAsyncThunk('admins/addAdmin', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/add_admin.php', form);
    return data.data;

});

export const fetchEditAdmin = createAsyncThunk('admins/editAdmin', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/edit_admin.php', form);
    return data.data;

});

export const fetchRemoveAdmin = createAsyncThunk('admins/removeAdmin', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/remove_admin.php', form);
    return data.data;

});

const adminsSlice = createSlice({

    name: 'admins',
    initialState: {
        admin: null,
        data: [],
        status: '',
        statusError: '',
    },
    reducers: {},
    extraReducers: {
        [loadAdmins.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [loadAdmins.fulfilled]: (state, action) => {
            state.status = 'done';
            state.data = action.payload;
        },
        [loadAdmins.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        },

        [loadAdmin.pending]: (state) => {
            state.status = 'loading';
            state.admin = null;
        },
        [loadAdmin.fulfilled]: (state, action) => {
            state.status = 'done';
            state.admin = action.payload;
        },
        [loadAdmin.rejected]: (state) => {
            state.status = 'error';
            state.admin = null;
        },
        // ADD
        [fetchAddAdmin.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchAddAdmin.fulfilled]: (state, action) => {

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
        [fetchAddAdmin.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
        // EDIT
        [fetchEditAdmin.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchEditAdmin.fulfilled]: (state, action) => {

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
        [fetchEditAdmin.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
        // REMOVE
        [fetchRemoveAdmin.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchRemoveAdmin.fulfilled]: (state, action) => {

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
        [fetchRemoveAdmin.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
    }

});

//export const {addAdmin, editAdmin, removeAdmin} = adminsSlice.actions;
export default adminsSlice.reducer;