import axios from "axios";

import create from 'zustand'

const urlLoadTeachers = process.env.REACT_APP_BASE_URL + 'php/models/admin/teachers/load.php';
const urlLoadTeacher = process.env.REACT_APP_BASE_URL + 'php/models/admin/teachers/load_by_id.php';
const urlAddTeacher = process.env.REACT_APP_BASE_URL + 'php/models/admin/teachers/add.php';
const urlEditTeacher = process.env.REACT_APP_BASE_URL + 'php/models/admin/teachers/edit.php';
const urlRemoveTeacher = process.env.REACT_APP_BASE_URL + 'php/models/admin/teachers/remove.php';

const useTeachersStore = create(
    (set, get) => ({
        teachers: [],
        teacher: {},
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
        loadTeachers: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTeachers, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({teachers: response.data.params}));

            }

        },
        loadTeacher: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTeacher, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({teacher: response.data.params[0]}));

            }

        },
        addTeacher: async (params) => {

            set({sending: true});

            let form = new FormData();

            for (let key in params) {

                if(key === "photo"){
                    form.append("files[]", params[key][0]);
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.postForm(urlAddTeacher, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        editTeacher: async (params) => {

            set({sending: true});

            let form = new FormData();

            for (let key in params) {

                if(key === "photo"){
                    form.append("files[]", params[key][0]);
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.postForm(urlEditTeacher, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        removeTeacher: async (params) => {

            set({sending: true});

            let form = new FormData();

            for (let key in params) {

                if(key === "photo"){
                    form.append("files[]", params[key][0]);
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.postForm(urlRemoveTeacher, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set({
                        error: true,
                        errorText: response.data.error_text
                    });

                    return {error: true};

                }

            }

            return {error: false};

        },
    })
);

export default useTeachersStore;