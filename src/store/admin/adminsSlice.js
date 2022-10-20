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
    console.log(data);
    return data.data.params;
});

const adminsSlice = createSlice({

    name: 'admins',
    initialState: {
        admin: null,
        data: [],
        status: 'loading'
    },
    reducers: {
        addAdmin(state, action) {

            console.log("addAdmin reducer state: ", state);
            console.log("addAdmin reducer action: ", action);

            state.admins.push({
                id: action.payload.id,
                email: action.payload.email,
            });
        },
        editAdmin(state, action) {

            console.log("edit admin reducer state: ", state);
            console.log("edit admin reducer action: ", action.payload);

        },
        removeAdmin(state, action) {}
    },
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
        }
    }

});

export const {addAdmin, editAdmin, removeAdmin} = adminsSlice.actions;
export default adminsSlice.reducer;