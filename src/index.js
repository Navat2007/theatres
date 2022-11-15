import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";

import App from './App';

const baseConfig = () => {

    window.global = {
        debug: true,
        debugArea: {
            login: true,
        },
        baseUrl: "https://theatres.patriot-sport.ru/",
    }

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

    if(process.env.DEBUG)
        console.log("App in debug mode!");

}

baseConfig();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);
