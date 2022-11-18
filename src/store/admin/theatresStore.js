import axios from "axios";

import create from 'zustand'

const urlLoadTheatres = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/load.php';
const urlLoadTheatre = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/load_by_id.php';
const urlLoadTheatreRequests = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/load_requests.php';
const urlLoadTheatreRequest = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/load_request_by_id.php';
const urlAddTheatre = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/add.php';
const urlEditTheatre = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/edit.php';
const urlRemoveTheatre = process.env.REACT_APP_BASE_URL + 'php/models/admin/theatres/remove.php';

const useTheatresStore = create(
    (set, get) => ({
        theatres: [],
        theatre: {},
        theatreRequests: [],
        theatreRequest: null,

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

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.post(urlLoadTheatres, form);

            set({ loading: false });

            if (response.data.params) {

                set((state) => ({ theatres: response.data.params }));

            }

        },
        loadTheatre: async (params) => {

            set({ loading: true });

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.post(urlLoadTheatre, form);

            set({ loading: false });

            if (response.data.params) {

                set((state) => ({ theatre: response.data.params }));

            }

        },
        addTheatre: async (params) => {

            set({ sending: true });

            let form = new FormData();

            for (let key in params) {

                if (key === "photo") {
                    form.append("files[]", params[key][0]);
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.post(urlAddTheatre, form);

            set({ sending: false });

            if (response.data) {

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
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.post(urlEditTheatre, form);

            set({ sending: false });

            if (response.data) {

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
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.post(urlRemoveTheatre, form);

            set({ sending: false });

            if (response.data) {

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

        loadTheatreRequests: async (params) => {

            set({ loading: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.post(urlLoadTheatreRequests, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ theatreRequests: response.data.params }));

            }

        },
        loadTheatreRequest: async (params) => {

            set({ loading: true, theatreRequest: null });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.post(urlLoadTheatreRequest, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set({ theatreRequest: response.data.params });
                return response.data.params;

            }

        },
    })
);

export default useTheatresStore;