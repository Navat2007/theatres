import {configureStore} from "@reduxjs/toolkit";

import adminReducer from './admin/adminsSlice';
import userReducer from './admin/usersSlice';
import schoolsReducer from "./admin/schoolsSlice";
import theatresReducer from "./admin/theatresSlice";
import theatreRequestsReducer from "./admin/theatreRequestsSlice";
import teachersReducer from "./admin/teachersSlice";

import schoolReducer from "./user/schoolSlice";

export default configureStore({
    reducer: {
        admins: adminReducer,
        users: userReducer,
        schools: schoolsReducer,
        theatres: theatresReducer,
        theatreRequests: theatreRequestsReducer,
        teachers: teachersReducer,
        school: schoolReducer,
    }
});