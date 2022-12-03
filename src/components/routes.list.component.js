import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import useAuthStore from "../store/authStore";

import AdminLayout from "./layout/admin.layout.component";
import UserLayout from "./layout/user.layout.component";
import PublicLayout from "./layout/public.layout.component";

import Page404 from "../pages/404.page";
import LoginPage from "../pages/login/login.page";
import ProfilePage from "../pages/profile.page";

// ADMIN PAGES
import UsersPage from "../pages/admin/users/users.page";
import AdminUsersPage from "../pages/admin/users/admin.users.page";
import UserUsersPage from "../pages/admin/users/user.users.page";
import MySchoolPage from "../pages/user/my.school.page";
import TheatresPage from "../pages/admin/theatres/theatres.page";
import TheatrePage from "../pages/admin/theatres/theatre.page";
import SchoolsPage from "../pages/admin/schools/schools.page";
import SchoolPage from "../pages/admin/schools/school.page";
import TheatreRequestsPage from "../pages/admin/theatreRequests/theatreRequests.page";
import TheatreRequestPage from "../pages/admin/theatreRequests/theatreRequest.page";
import AdminTeachersPage from "../pages/admin/teachers/teachers.page";
import AdminTeacherPage from "../pages/admin/teachers/teacher.page";

import TestPage from "../pages/test.page";

// USER PAGES
import MyTheatresPage from "../pages/user/theatres/my.theatres.page";
import MyTheatreEditPage from "../pages/user/theatres/my.theatre.page";
import MyTheatrePage from "../pages/user/theatres/theatre.page";
import MyTheatreRequestsPage from "../pages/user/theatreRequests/my.theatreRequests.page";
import MyTheatreRequestPage from "../pages/user/theatreRequests/my.theatreRequest.page";
import UserTeachersPage from "../pages/user/teachers/teachers.page";
import UserTeacherPage from "../pages/user/teachers/teacher.page";
import MyPostersPage from "../pages/user/posters/my.posters.page";
import MyPosterPage from "../pages/user/posters/my.poster.page";

// PUBLIC PAGES
import PublicTheatrePage from "../pages/public/theatres/theatre.page";
import PublicTheatresPage from "../pages/public/theatres/theatres.page";
import MainPage from "../pages/public/main.page";
import ConcordPage from "../pages/public/concord.page";


const RoutesList = () => {
    const {user} = useAuthStore();

    if (user && (user.role === "admin" || user.role === "superadmin")) {
        return (
            <Routes>
                <Route
                    path="/admin"
                    element={<AdminLayout/>}
                >
                    <Route path="users">
                        <Route
                            index
                            element={<UsersPage/>}
                        />
                        <Route
                            path="admin/:id"
                            element={<AdminUsersPage/>}
                        />
                        <Route
                            path="admin/new"
                            element={<AdminUsersPage/>}
                        />
                        <Route
                            path="user/:id"
                            element={<UserUsersPage/>}
                        />
                        <Route
                            path="user/new"
                            element={<UserUsersPage/>}
                        />
                    </Route>
                    <Route path="schools">
                        <Route
                            index
                            element={<SchoolsPage/>}
                        />
                        <Route
                            path=":id"
                            element={<SchoolPage/>}
                        />
                        <Route
                            path="new"
                            element={<SchoolPage/>}
                        />
                    </Route>
                    <Route path="theatres">
                        <Route
                            index
                            element={<TheatresPage/>}
                        />
                        <Route
                            path=":id"
                            element={<TheatrePage/>}
                        />
                        <Route
                            path="new"
                            element={<TheatrePage/>}
                        />
                    </Route>
                    <Route path="theatreRequests">
                        <Route
                            index
                            element={<TheatreRequestsPage/>}
                        />
                        <Route
                            path=":id"
                            element={<TheatreRequestPage/>}
                        />
                        <Route
                            path="new"
                            element={<TheatreRequestPage/>}
                        />
                    </Route>
                    <Route path="teachers">
                        <Route
                            index
                            element={<AdminTeachersPage/>}
                        />
                        <Route
                            path=":id"
                            element={<AdminTeacherPage/>}
                        />
                        <Route
                            path="new"
                            element={<AdminTeacherPage/>}
                        />
                    </Route>
                </Route>
                <Route
                    path="/profile"
                    exact={true}
                    element={<AdminLayout/>}
                >
                    <Route
                        index
                        element={<ProfilePage/>}
                    />
                </Route>
                <Route
                    path="/test"
                    exact={true}
                    element={<TestPage/>}
                />
                <Route
                    path="/login"
                    exact={true}
                    element={<Navigate to="/admin/users"/>}
                />
                <Route
                    path="/"
                    element={<PublicLayout/>}
                >
                    <Route
                        index
                        element={<MainPage/>}
                    />
                    <Route
                        path="/concord"
                        exact={true}
                        element={<ConcordPage/>}
                    />
                    <Route
                        path="/theatre"
                        exact={true}
                        element={<PublicTheatresPage/>}
                    />
                    <Route
                        path="/theatre/:id"
                        exact={true}
                        element={<PublicTheatrePage/>}
                    />
                </Route>
                <Route
                    path="*"
                    element={<Page404/>}
                />
            </Routes>
        );
    }

    if (user && user.role === "user") {
        return (
            <Routes>
                <Route
                    path="/user"
                    element={<UserLayout/>}
                >
                    <Route
                        path="my_school"
                        index
                        element={<MySchoolPage/>}
                    />
                    <Route path="theatres">
                        <Route
                            index
                            element={<MyTheatresPage/>}
                        />
                        <Route
                            path=":id"
                            element={<MyTheatrePage/>}
                        />
                        <Route
                            path="edit/:id"
                            element={<MyTheatreEditPage/>}
                        />
                        <Route
                            path="new"
                            element={<MyTheatreEditPage/>}
                        />
                    </Route>
                    <Route path="theatreRequests">
                        <Route
                            index
                            element={<MyTheatreRequestsPage/>}
                        />
                        <Route
                            path=":id"
                            element={<MyTheatreRequestPage/>}
                        />
                        <Route
                            path="new"
                            element={<MyTheatreRequestPage/>}
                        />
                    </Route>
                    <Route path="teachers">
                        <Route
                            index
                            element={<UserTeachersPage/>}
                        />
                        <Route
                            path=":id"
                            element={<UserTeacherPage/>}
                        />
                        <Route
                            path="new"
                            element={<UserTeacherPage/>}
                        />
                    </Route>
                    <Route path="posters">
                        <Route
                            index
                            element={<MyPostersPage/>}
                        />
                        <Route
                            path=":id"
                            element={<MyPosterPage/>}
                        />
                        <Route
                            path="new"
                            element={<MyPosterPage/>}
                        />
                    </Route>
                </Route>
                <Route
                    path="/profile"
                    exact={true}
                    element={<UserLayout/>}
                >
                    <Route
                        index
                        element={<ProfilePage/>}
                    />
                </Route>
                <Route
                    path="/login"
                    exact={true}
                    element={<Navigate to="/user/my_school"/>}
                />
                <Route
                    path="/"
                    element={<PublicLayout/>}
                >
                    <Route
                        index
                        element={<MainPage/>}
                    />
                    <Route
                        path="/concord"
                        exact={true}
                        element={<ConcordPage/>}
                    />
                    <Route
                        path="/theatre"
                        exact={true}
                        element={<PublicTheatresPage/>}
                    />
                    <Route
                        path="/theatre/:id"
                        exact={true}
                        element={<PublicTheatrePage/>}
                    />
                </Route>
                <Route
                    path="*"
                    element={<Page404/>}
                />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route
                path="/"
                element={<PublicLayout/>}
            >
                <Route
                    index
                    element={<MainPage/>}
                />
                <Route
                    path="/concord"
                    exact={true}
                    element={<ConcordPage/>}
                />
                <Route
                    path="/theatre"
                    exact={true}
                    element={<PublicTheatresPage/>}
                />
                <Route
                    path="/theatre/:id"
                    exact={true}
                    element={<PublicTheatrePage/>}
                />
            </Route>
            <Route
                path="/login"
                exact={true}
                element={<LoginPage/>}
            />
            <Route
                path="*"
                element={<Navigate to="/login"/>}
            />
        </Routes>
    );
};

export default RoutesList;
