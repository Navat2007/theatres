import axios from "axios";

import create from 'zustand'
import { persist } from "zustand/middleware";

const urlLoadTheatres = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/load.php';
const urlLoadTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/load_by_id.php';
const urlAddTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/add.php';
const urlEditTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/edit.php';
const urlRemoveTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/remove.php';

const useTheatresStore = create(
    persist(
        (set, get) => ({
            theatres: [],
            theatre: {},
            tempTheatre: {},

            loading: false,
            sending: false,
            error: false,
            errorText: "",

            formActivity: [
                "Объединение дополнительного образования",
                "Внеурочная деятельность",
                "Иное"
            ],
            ageMembers: [
                "1-4 класс",
                "5-9 класс",
                "10-11 класс",
                "Студенты колледжа",
            ],
            theatreLevel: [
                "Дебютант",
                "Практик",
                "Классик",
            ],

            setTempTheatre: (object) => {
                set({ tempTheatre: object });
            },
            setErrorText: (text) => {
                set({ error: true, errorText: text });
            },
            clearErrorText: () => {
                set({ error: false, errorText: "" });
            },

            loadTheatres: async (params) => {

                set({ loading: true });

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const response = await axios.post(urlLoadTheatres, form).catch(error => {
                    console.log(error);
                });

                set({ loading: false });

                if (response?.data?.params) {

                    set((state) => ({ theatres: response.data.params }));

                }

            },
            loadTheatre: async (params) => {

                set({ loading: true });

                let form = new FormData();

                for (let key in params) {
                    form.append(key, params[key]);
                }

                const response = await axios.post(urlLoadTheatre, form).catch(error => {
                    console.log(error);
                });

                set({ loading: false });

                if (response?.data?.params) {

                    set((state) => ({ theatre: response.data.params }));

                }

            },
            addTheatre: async (params) => {

                set({ sending: true });

                let form = new FormData();

                for (let key in params) {

                    if (key === "photo") {
                        form.append("files[]", params[key][0]);
                    } else {
                        form.append(key, params[key]);
                    }

                }

                const response = await axios.post(urlAddTheatre, form).catch(error => {
                    console.log(error);
                });

                set({ sending: false });

                if (response?.data) {

                    if (response.data.error === 1) {

                        set((state) => ({
                            error: true,
                            errorText: response.data.error_text
                        }));

                        return { error: true };

                    }

                }

                return { error: false };

            },
            editTheatre: async (params) => {

                set({ sending: true });

                let form = new FormData();

                for (let key in params) {

                    if (key === "photo") {
                        form.append("files[]", params[key][0]);
                    } else {
                        form.append(key, params[key]);
                    }

                }

                const response = await axios.post(urlEditTheatre, form).catch(error => {
                    console.log(error);
                });

                set({ sending: false });

                if (response?.data) {

                    if (response.data.error === 1) {

                        set((state) => ({
                            error: true,
                            errorText: response.data.error_text
                        }));

                        return { error: true };

                    }

                }

                return { error: false };

            },
            removeTheatre: async (params) => {

                set({ sending: true });

                let form = new FormData();

                for (let key in params) {

                    if (key === "photo") {
                        form.append("files[]", params[key][0]);
                    } else {
                        form.append(key, params[key]);
                    }

                }

                const response = await axios.post(urlRemoveTheatre, form).catch(error => {
                    console.log(error);
                });

                set({ sending: false });

                if (response?.data) {

                    if (response.data.error === 1) {

                        set({
                            error: true,
                            errorText: response.data.error_text
                        });

                        return { error: true };

                    }

                }

                return { error: false };

            },
        }),
        {
            name: "theatres-users",
            getStorage: () => sessionStorage,
        }
    )
);

export default useTheatresStore;