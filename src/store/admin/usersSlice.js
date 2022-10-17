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

const usersSlice = createSlice({

    name: 'users',
    initialState: {
        data: [],
        status: 'loading'
    },
    reducers: {
        addUser(state, action) {},
        editUser(state, action) {},
        removeUser(state, action) {}
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
        }
    }

});

export const {addUser, editUser, removeUser} = usersSlice.actions;
export default usersSlice.reducer;