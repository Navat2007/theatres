import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import axios from "axios";

import App from './App';
import store from "./store";

const baseConfig = () => {

    window.global = {
        debug: true,
        debugArea: {
            login: true,
        },
        baseUrl: "https://theatres.patriot-sport.ru/",
    }

    axios.defaults.baseURL = window.global.baseUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

    if(window.global.debug)
        console.log("App in debug mode!");

}

baseConfig();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
