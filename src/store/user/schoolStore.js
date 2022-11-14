import axios from "axios";

import create from 'zustand'
import {persist} from "zustand/middleware";

const urlLoadSchool = process.env.REACT_APP_BASE_URL + 'php/models/user/school/load_by_id.php';
const urlEditSchool = process.env.REACT_APP_BASE_URL + 'php/models/user/school/edit_school.php';
const urlEditPhoto = process.env.REACT_APP_BASE_URL + 'php/models/user/school/change_photo.php';

const schoolAuthStore = create(
    persist(
        (set, get) => ({
            school: {},
            loading: false,
            error: false,
            errorText: "",
            loadSchool: async (params) => {

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const data = await axios.post(window.global.baseUrl + 'php/models/user/school/load_by_id.php', form);

            },
            editSchool: async (params) => {},
            editSchoolPhoto: async (params) => {

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
        }),
        {
            name: "school",
            getStorage: () => sessionStorage,
        }
    )
);

export default schoolAuthStore;