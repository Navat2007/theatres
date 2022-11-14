import axios from "axios";

import create from 'zustand'
import {persist} from "zustand/middleware";

const urlLoadSchool = process.env.REACT_APP_BASE_URL + 'php/models/user/school/load_by_id.php';
const urlEditSchool = process.env.REACT_APP_BASE_URL + 'php/models/user/school/edit_school.php';
const urlEditPhoto = process.env.REACT_APP_BASE_URL + 'php/models/user/school/change_photo.php';

const schoolStore = create(
    persist(
        (set, get) => ({
            school: {},
            loading: false,
            sending: false,
            error: false,
            errorText: "",
            setErrorText: (text) => {
                set({error: true, errorText: text});
            },
            clearErrorText: () => {
                set({error: false, errorText: ""});
            },
            loadSchool: async (params) => {

                set({loading: true});

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const response = await axios.post(urlLoadSchool, form);
                console.log(response.data);

                if(response.data.params){

                    set((state) => ({school: response.data.params}));

                }

                set({loading: false});

            },
            editSchool: async (params) => {

                set({sending: true});

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const response = await axios.post(urlEditSchool, form);
                console.log(response.data);

                set({sending: false});

            },
            editSchoolPhoto: async (params) => {

                set({sending: true});

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

                set((state) => ({school: {...state.school, photo: response.data.params}}));

                set({sending: false});

            },
        }),
        {
            name: "school",
            getStorage: () => sessionStorage,
        }
    )
);

export default schoolStore;