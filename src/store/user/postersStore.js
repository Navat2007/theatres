import axios from "axios";

import create from 'zustand'

const urlLoadPosters = process.env.REACT_APP_BASE_URL + 'php/models/user/posters/load.php';
const urlLoadPoster = process.env.REACT_APP_BASE_URL + 'php/models/user/posters/load_by_id.php';
const urlAddPoster = process.env.REACT_APP_BASE_URL + 'php/models/user/posters/add.php';
const urlEditPoster = process.env.REACT_APP_BASE_URL + 'php/models/user/posters/edit.php';
const urlRemovePoster = process.env.REACT_APP_BASE_URL + 'php/models/user/posters/remove.php';

const usePostersStore = create(
    (set, get) => ({
        posters: [],
        poster: {},
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
        loadPosters: async (params) => {

            set({loading: true});

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.postForm(urlLoadPosters, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({posters: response.data.params}));

            }

        },
        loadPoster: async (params) => {

            set({loading: true});

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.postForm(urlLoadPoster, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({poster: response.data.params}));

            }

        },
        addPoster: async (params) => {

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

            const response = await axios.postForm(urlAddPoster, form);

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
        editPoster: async (params) => {

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

            const response = await axios.postForm(urlEditPoster, form);

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
        removePoster: async (params) => {

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

            const response = await axios.postForm(urlRemovePoster, form);

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

export default usePostersStore;