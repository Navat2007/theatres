import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadAdmins = createAsyncThunk('admins/loadAdmins', async (params) => {

    let form = new FormData();

    for (let key in params) {
        form.append(key, params[key]);
    }

    const data = await axios.post(window.global.baseUrl + 'php/models/admin/users/load_admins.php');
    return data.data.params;
});

const adminsSlice = createSlice({

    name: 'admins',
    initialState: {
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
        editAdmin(state, action) {},
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
        }
    }

});

export const {addAdmin, editAdmin, removeAdmin} = adminsSlice.actions;
export default adminsSlice.reducer;