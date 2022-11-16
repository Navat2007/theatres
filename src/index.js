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

    window.global.makeid = (length) => {

        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;

    }

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

    if (process.env.DEBUG)
        console.log("App in debug mode!");

}

baseConfig();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
