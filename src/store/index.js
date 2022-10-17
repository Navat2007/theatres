import {configureStore} from "@reduxjs/toolkit";

import authSlice from "./authSlice";

import adminReducer from './admin/adminsSlice';
import userReducer from './admin/usersSlice';
import schoolsSlice from "./admin/schoolsSlice";
import eventsSlice from "./admin/theatresSlice";
import requestsSlice from "./admin/requestsSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        admins: adminReducer,
        users: userReducer,
        schools: schoolsSlice,
        events: eventsSlice,
        requests: requestsSlice,
    }
});