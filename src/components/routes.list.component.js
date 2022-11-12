import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import AdminLayout from "./layout/admin.layout.component";
import UserLayout from "./layout/user.layout.component";

import Page404 from "../pages/404.page";
import LoginPage from "../pages/login/login.page";
import UsersPage from "../pages/admin/users/users.page";
import AdminUsersPage from "../pages/admin/users/admin.users.page";
import UserUsersPage from "../pages/admin/users/user.users.page";
import MySchoolPage from "../pages/user/my.school.page";
import TheatresPage from "../pages/admin/theatres/theatres.page";
import TheatrePage from "../pages/admin/theatres/theatre.page";
import ProfilePage from "../pages/profile.page";
import SchoolsPage from "../pages/admin/schools/schools.page";
import SchoolPage from "../pages/admin/schools/school.page";
import TheatreRequestsPage from "../pages/admin/theatreRequests/theatreRequests.page";
import TheatreRequestPage from "../pages/admin/theatreRequests/theatreRequest.page";
import AdminTeachersPage from "../pages/admin/teachers/teachers.page";
import AdminTeacherPage from "../pages/admin/teachers/teacher.page";

import MyTheatresPage from "../pages/user/theatres/my.theatres.page";
import MyTheatrePage from "../pages/user/theatres/my.theatre.page";
import MyTheatreRequestsPage from "../pages/user/theatreRequests/my.theatreRequests.page";
import MyTheatreRequestPage from "../pages/user/theatreRequests/my.theatreRequest.page";
import UserTeachersPage from "../pages/user/teachers/teachers.page";
import UserTeacherPage from "../pages/user/teachers/teacher.page";

const RoutesList = () => {

    const {user} = useSelector(state => state.auth);

    if (user && (user.role === "admin" || user.role === "superadmin")) {

        return (
            <Routes>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="users">
                        <Route index element={<UsersPage/>}/>
                        <Route path="admin/:id" element={<AdminUsersPage/>}/>
                        <Route path="admin/new" element={<AdminUsersPage/>}/>
                        <Route path="user/:id" element={<UserUsersPage/>}/>
                        <Route path="user/new" element={<UserUsersPage/>}/>
                    </Route>
                    <Route path="schools">
                        <Route index element={<SchoolsPage/>}/>
                        <Route path=":id" element={<SchoolPage/>}/>
                        <Route path="new" element={<SchoolPage/>}/>
                    </Route>
                    <Route path="theatres">
                        <Route index element={<TheatresPage/>}/>
                        <Route path=":id" element={<TheatrePage/>}/>
                        <Route path="new" element={<TheatrePage/>}/>
                    </Route>
                    <Route path="theatreRequests">
                        <Route index element={<TheatreRequestsPage/>}/>
                        <Route path=":id" element={<TheatreRequestPage/>}/>
                        <Route path="new" element={<TheatreRequestPage/>}/>
                    </Route>
                    <Route path="teachers">
                        <Route index element={<AdminTeachersPage/>}/>
                        <Route path=":id" element={<AdminTeacherPage/>}/>
                        <Route path="new" element={<AdminTeacherPage/>}/>
                    </Route>
                </Route>
                <Route path="/profile" exact={true} element={<AdminLayout/>}>
                    <Route index element={<ProfilePage/>}/>
                </Route>
                <Route path="/login" exact={true} element={<Navigate to="/admin/users"/>}/>
                <Route path="/" exact={true} element={<Navigate to="/admin/users"/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        );

    }

    if (user && user.role === "user") {

        return (
            <Routes>
                <Route path="/user" element={<UserLayout/>}>
                    <Route path="my_school" index element={<MySchoolPage/>}/>
                    <Route path="theatres">
                        <Route index element={<MyTheatresPage/>}/>
                        <Route path=":id" element={<MyTheatrePage/>}/>
                        <Route path="new" element={<MyTheatrePage/>}/>
                    </Route>
                    <Route path="theatreRequests">
                        <Route index element={<MyTheatreRequestsPage/>}/>
                        <Route path=":id" element={<MyTheatreRequestPage/>}/>
                        <Route path="new" element={<MyTheatreRequestPage/>}/>
                    </Route>
                    <Route path="teachers">
                        <Route index element={<UserTeachersPage/>}/>
                        <Route path=":id" element={<UserTeacherPage/>}/>
                        <Route path="new" element={<UserTeacherPage/>}/>
                    </Route>
                </Route>
                <Route path="/profile" exact={true} element={<UserLayout/>}>
                    <Route index element={<ProfilePage/>}/>
                </Route>

                <Route path="/login" exact={true} element={<Navigate to="/user/my_school"/>}/>
                <Route path="/" exact={true} element={<Navigate to="/user/my_school"/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        );

    }

    return (
        <Routes>
            <Route path="/login" exact={true} element={<LoginPage/>}/>
            <Route path="/" exact={true} element={<Navigate to="/login"/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    );

};

export default RoutesList;