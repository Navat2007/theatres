import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";

import { SocialIcons } from './components/svgs';

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

    window.global.buildFormData = (formData, data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                window.global.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            formData.append(parentKey, value);
        }
    }

    window.global.getSocialIcon = (text) => {

        if (text.includes("t.me/"))
            return SocialIcons.t;
        else if (text.includes("vk.com/"))
            return SocialIcons.vk;
        else if (text.includes("ok.ru/"))
            return SocialIcons.ok;
        else if (text.includes("facebook.com/") || text.includes("fb.com/"))
            return SocialIcons.facebook;
        else if (text.includes("plus.google.com/"))
            return SocialIcons.google;
        else if (text.includes("linkedin."))
            return SocialIcons.linkedin;
        else if (text.includes("twitter.com/"))
            return SocialIcons.twitter;
        else if (text.includes("instagram.com/"))
            return SocialIcons.instagram;
        else
            return null;

    };

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
