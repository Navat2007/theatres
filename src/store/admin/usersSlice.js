import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadUsers = createAsyncThunk('users/loadUsers', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const { data } = await axios.post(window.global.baseUrl + 'php/models/admin/users/load_users.php');
    return data.params;
});

export const loadUser = createAsyncThunk('users/loadUser', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/load_user.php', form);
    return data.data.params;

});

export const fetchAddUser = createAsyncThunk('users/addUser', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/add_user.php', form);
    console.log("fetchAddUser", data);
    return data.data;

});

export const fetchEditUser = createAsyncThunk('users/editUser', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/edit_user.php', form);
    return data.data;

});

export const fetchRemoveUser = createAsyncThunk('users/removeUser', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/remove_user.php', form);
    return data.data;

});

const usersSlice = createSlice({

    name: 'users',
    initialState: {
        user: null,
        data: [],
        status: '',
        statusError: '',
    },
    reducers: {
    },
    extraReducers: {
        [loadUsers.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [loadUsers.fulfilled]: (state, action) => {
            state.status = 'done';
            state.data = action.payload;
        },
        [loadUsers.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        },

        [loadUser.pending]: (state) => {
            state.status = 'loading';
            state.user = null;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.status = 'done';
            state.user = action.payload;
        },
        [loadUser.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
        // ADD
        [fetchAddUser.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchAddUser.fulfilled]: (state, action) => {

            if(action.payload.error === 1){
                state.status = 'sendingError';
                state.statusError = action.payload.error_text;
            }

            if(action.payload.error === 0){
                state.status = 'sendingDone';
                state.statusError = "";
                state.user = null;
            }

        },
        [fetchAddUser.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
        // EDIT
        [fetchEditUser.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchEditUser.fulfilled]: (state, action) => {

            if(action.payload.error === 1){
                state.status = 'sendingError';
                state.statusError = action.payload.error_text;
            }

            if(action.payload.error === 0){
                state.status = 'sendingDone';
                state.statusError = "";
                state.user = null;
            }

        },
        [fetchEditUser.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
        // REMOVE
        [fetchRemoveUser.pending]: (state) => {
            state.status = 'sending';
        },
        [fetchRemoveUser.fulfilled]: (state, action) => {

            if(action.payload.error === 1){
                state.status = 'sendingError';
                state.statusError = action.payload.error_text;
            }

            if(action.payload.error === 0){
                state.status = 'sendingDone';
                state.statusError = "";
                state.user = null;
            }

        },
        [fetchRemoveUser.rejected]: (state) => {
            state.status = 'sendingError';
            state.statusError = 'Ошибка при отправке на сервер.';
        },
    }

});

//export const {addUser, editUser, removeUser} = usersSlice.actions;
export default usersSlice.reducer;