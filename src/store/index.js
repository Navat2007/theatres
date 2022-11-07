import {configureStore} from "@reduxjs/toolkit";

import authSlice from "./authSlice";

import adminReducer from './admin/adminsSlice';
import userReducer from './admin/usersSlice';
import schoolsReducer from "./admin/schoolsSlice";
import theatresReducer from "./admin/theatresSlice";
import theatreRequestsReducer from "./admin/theatreRequestsSlice";
import teachersReducer from "./admin/teachersSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        admins: adminReducer,
        users: userReducer,
        schools: schoolsReducer,
        theatres: theatresReducer,
        theatreRequests: theatreRequestsReducer,
        teachers: teachersReducer,
    }
});