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
        loadTeachers: async () => {

            set({loading: true});

            const response = await axios.post(urlLoadSchools);

            set({loading: false});

            if(response.data.params){

                set((state) => ({schools: response.data.params}));

            }

        },
        loadTeacher: async (params) => {

            set({loading: true});

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.post(urlLoadSchool, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({school: response.data.params}));

            }

        },
        editTeacher: async (params) => {

            set({sending: true});

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.post(urlEditSchool, form);

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
    })
);

export default useTeachersStore;