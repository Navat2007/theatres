import React from "react";
import { Outlet } from 'react-router-dom';

import Header from "../header/header.component";

const PublicLayout = () => {

    return (
        <>
            <Header>
                <p>Публичный layout</p>
            </Header>
            <Outlet />
        </>
    );

}

export default PublicLayout;