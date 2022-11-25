import axios from "axios";
import moment from "moment";

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
            setErrorText: (text) => {
                set({error: true, errorText: text});
            },
            clearErrorText: () => {
                set({error: false, errorText: ""});
            },
            setUser: (user) => {
                set({user: user, loading: false, error: false, errorText: ""});
            },
            fetchEditPhoto: async (params) => {

                let form = new FormData();

                for (let key in params) {

                    if(key === "photo"){
                        form.append("files[]", params[key]);
                    }
                    else {
                        form.append(key, params[key]);
                    }

                }

                const response = await axios.post(urlEditPhoto, form);

                if(response.data.params){
                    set((state) => ({user: {...state.user, photo: response.data.params}, loading: false, error: true, errorText: response.data.error_text}));

                    const tmpUser = JSON.parse(window.localStorage.getItem('user'));
                    tmpUser.photo = response.data.params;
                    window.localStorage.setItem('user', JSON.stringify(tmpUser));
                }

            },
            login: async (params) => {

                set({ loading: true });

                let form = new FormData();
                window.global.buildFormData(form, params);

                const response = await axios.postForm(urlCheck, form);

                console.log(params);
                console.log(response);

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

                    get().setUser(tmpObject);

                } else {
                    set({user: null, loading: false, error: true, errorText: response.data.error_text});
                }

                set({ loading: false });

            },
            logout: () => {

                window.localStorage.removeItem('user');
                axios.defaults.headers.post['Authorization'] = '';

                set({user: null});

            }
        }),
        {
            name: "auth",
            getStorage: () => sessionStorage,
        }
    )
);

export default useAuthStore;