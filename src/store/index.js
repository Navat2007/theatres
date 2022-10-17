import {configureStore} from "@reduxjs/toolkit";

import authSlice from "./authSlice";

import adminReducer from './admin/adminsSlice';
import userReducer from './admin/usersSlice';
import schoolsSlice from "./admin/schoolsSlice";
import theatresSlice from "./admin/theatresSlice";
import theatreRequestsSlice from "./admin/theatreRequestsSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        admins: adminReducer,
        users: userReducer,
        schools: schoolsSlice,
        theatres: theatresSlice,
        theatreRequestsSlice: theatreRequestsSlice,
    }
});