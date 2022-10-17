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

const RoutesList = () => {

    const {user} = useSelector(state => state.auth);

    if (user && (user.role === "admin" || user.role === "superadmin")) {

        return (
            <Routes>
                <Route path="/admin" element={<AdminLayout/>}>
                    {

                    }
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