import axios from "axios";
import { isArray } from "lodash";

import create from 'zustand'
import { persist } from "zustand/middleware";

const urlLoadTheatres = process.env.REACT_APP_BASE_URL + 'php/models/public/theatres/load.php';
const urlLoadTheatre = process.env.REACT_APP_BASE_URL + 'php/models/public/theatres/load_by_id.php';

const useTheatresStore = create(
    persist(
        (set, get) => ({
            theatres: [],
            theatre: null,

            loading: false,
            sending: false,
            error: false,
            errorText: "",

            setErrorText: (text) => {
                set({ error: true, errorText: text });
            },
            clearErrorText: () => {
                set({ error: false, errorText: "" });
            },

            loadTheatres: async (params) => {

                set({ loading: true });

                let form = new FormData();
                window.global.buildFormData(form, params);

                const response = await axios.postForm(urlLoadTheatres, form).catch(error => {
                    set({ loading: false, sending: false, error: true, errorText: error });
                    return { error: true };
                });

                set({ loading: false });

                if (response?.data?.params) {

                    set((state) => ({ theatres: response.data.params }));

                }

            },
            loadTheatre: async (params) => {

                set({ loading: true, theatre: null });

                let form = new FormData();
                window.global.buildFormData(form, params);

                const response = await axios.postForm(urlLoadTheatre, form).catch(error => {
                    set({ loading: false, sending: false, error: true, errorText: error });
                    return { error: true };
                });

                set({ loading: false });

                if (response?.data?.params) {

                    set((state) => ({ theatre: response.data.params }));
                    return response.data.params;

                }

            },
        }),
        {
            name: "theatres-public",
            getStorage: () => sessionStorage,
        }
    )
);

export default useTheatresStore;