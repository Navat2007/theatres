import React, {lazy, Suspense} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import AdminLayout from "./layout/admin.layout.component";
import UserLayout from "./layout/user.layout.component";
import Preloader from "./preloader/preloader.component";

const Page404 = lazy(() => import("../pages/404.page"));
const LoginPage = lazy(() => import("../pages/login/login.page"));

const UsersPage = lazy(() => import("../pages/admin/users/users.page"));
const AdminUsersPage = lazy(() => import("../pages/admin/users/admin.users.page"));
const UserUsersPage = lazy(() => import("../pages/admin/users/user.users.page"));
const MySchoolPage = lazy(() => import("../pages/user/my.school.page"));
const TheatresPage = lazy(() => import("../pages/admin/theatres/theatres.page"));
const TheatrePage = lazy(() => import("../pages/admin/theatres/theatre.page"));
const ProfilePage = lazy(() => import("../pages/profile.page"));
const SchoolsPage = lazy(() => import("../pages/admin/schools/schools.page"));
const SchoolPage = lazy(() => import("../pages/admin/schools/school.page"));
const TheatreRequestsPage = lazy(() => import("../pages/admin/theatreRequests/theatreRequests.page"));
const TheatreRequestPage = lazy(() => import("../pages/admin/theatreRequests/theatreRequest.page"));
const AdminTeachersPage = lazy(() => import("../pages/admin/teachers/teachers.page"));
const AdminTeacherPage = lazy(() => import("../pages/admin/teachers/teacher.page"));

const MyTheatresPage = lazy(() => import("../pages/user/theatres/my.theatres.page"));
const MyTheatrePage = lazy(() => import("../pages/user/theatres/my.theatre.page"));
const MyTheatreRequestsPage = lazy(() => import("../pages/user/theatreRequests/my.theatreRequests.page"));
const MyTheatreRequestPage = lazy(() => import("../pages/user/theatreRequests/my.theatreRequest.page"));
const UserTeachersPage = lazy(() => import("../pages/user/teachers/teachers.page"));
const UserTeacherPage = lazy(() => import("../pages/user/teachers/teacher.page"));

const RoutesList = () => {

    const {user} = useSelector(state => state.auth);

    if (user && (user.role === "admin" || user.role === "superadmin")) {

        return (
            <Suspense>
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
            </Suspense>
        );

    }

    if (user && user.role === "user") {

        return (
            <Suspense fallback={<Preloader/>}>
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
            </Suspense>
        );

    }

    return (
        <Suspense>
            <Routes>
                <Route path="/login" exact={true} element={<LoginPage/>}/>
                <Route path="/" exact={true} element={<Navigate to="/login"/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </Suspense>
    );

};

export default RoutesList;