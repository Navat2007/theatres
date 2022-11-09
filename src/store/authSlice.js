import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const loadUserData = createAsyncThunk('auth/loadUserData', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/login/check.php', form);
    console.log(data);
    return data;
});

export const editProfilePhoto = createAsyncThunk('profile/editPhoto', async (params) => {

    let form = new FormData();

    for (let key in params) {

        if(key === "photo"){
            form.append("files[]", params[key]);
        }
        else {
            form.append(key, params[key]);
        }

    }

    const {data} = await axios.post(window.global.baseUrl + 'php/models/profile/change_photo.php', form);
    return data;

});

const authSlice = createSlice({

    name: 'auth',
    initialState: {
        user: null,
        status: 'loading',
        statusText: ''
    },
    reducers: {
        init(state) {
            state.statusText = '';
            state.status = 'idle';
            state.user = null;
        },
        login(state, action) {
            state.statusText = '';
            state.status = 'done';
            state.user = action.payload;
        },
        logout(state) {
            window.localStorage.removeItem('user');
            axios.defaults.headers.post['Authorization'] = '';

            state.statusText = '';
            state.status = 'idle';
            state.user = null;
        },
    },
    extraReducers: {
        [loadUserData.pending]: (state) => {
            state.statusText = '';
            state.status = 'loading';
            state.user = null;
        },
        [loadUserData.fulfilled]: (state, action) => {
            if (action.payload.error === 0) {
                state.status = 'done';
                state.user = action.payload.params;
            } else {
                state.status = 'error';
                state.statusText = action.payload.error_text;
                state.user = null;
            }
        },
        [loadUserData.rejected]: (state) => {
            state.statusText = 'Произошла ошибка при запросе к серверу.';
            state.status = 'error';
            state.user = null;
        },

        [editProfilePhoto.pending]: (state) => {
            state.statusText = '';
            state.status = 'sending';
        },
        [editProfilePhoto.fulfilled]: (state, action) => {
            console.log(action);
            if (action.payload.error === 0) {
                state.status = 'done';
                state.user.photo = action.payload.params;

                const tmpUser = JSON.parse(window.localStorage.getItem('user'));
                tmpUser.photo = action.payload.params;
                window.localStorage.setItem('user', JSON.stringify(tmpUser));

            } else {
                state.status = 'error';
                state.statusText = action.payload.error_text;
            }
        },
        [editProfilePhoto.rejected]: (state) => {
            state.statusText = 'Произошла ошибка при запросе к серверу.';
            state.status = 'error';
        }
    }

});

export const {init, login, logout} = authSlice.actions;
export default authSlice.reducer;