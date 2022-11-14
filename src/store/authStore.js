import axios from "axios";
import moment from "moment";
import {Navigate, Route, Routes} from "react-router-dom";

import create from 'zustand'
import {persist} from "zustand/middleware";

const urlCheck = process.env.REACT_APP_BASE_URL + 'php/models/login/check.php';
const urlEditPhoto = process.env.REACT_APP_BASE_URL + 'php/models/profile/change_photo.php';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: {},
            loading: false,
            error: false,
            errorText: "",
            fetchEditPhoto: async (params) => {

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const response = await axios.post(urlEditPhoto, form);
                console.log(response.data);
            },
            login: async (params) => {

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const response = await axios.post(urlCheck, form);
                console.log(response.data);

                if (response.data.params && 'token' in response.data.params) {

                    window.localStorage.removeItem('login');
                    window.localStorage.removeItem('pwd');
                    window.localStorage.removeItem('remember');

                    if (params.remember) {

                        window.localStorage.setItem('login', params.login);
                        window.localStorage.setItem('pwd', params.password);
                        window.localStorage.setItem('remember', 1);

                    }

                    let tmpObject = {...response.data.params};
                    tmpObject['tokenDate'] = moment(Date.now()).format('DD.MM.YYYY');
                    window.localStorage.setItem('user', JSON.stringify(tmpObject));
                    axios.defaults.headers.post['Authorization'] = `${tmpObject.token}&${tmpObject.ID}`;

                    set({user: tmpObject, loading: false, error: false, errorText: ""});

                } else {
                    set({user: null, loading: false, error: true, errorText: response.data.error_text});
                }

            },
            logout: () => {

                window.localStorage.removeItem('user');
                axios.defaults.headers.post['Authorization'] = '';

                set({user: null});
                return <Navigate to="/" />

            }
        }),
        {
            name: "auth",
            getStorage: () => sessionStorage,
        }
    )
);

export default useAuthStore;