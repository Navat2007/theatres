import axios from "axios";
import create from 'zustand'

const urlLoadTheatres = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/load.php';
const urlLoadTheatreRequests = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/load_requests.php';
const urlLoadTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/load_by_id.php';
const urlLoadTheatreRequest = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/load_request_by_id.php';
const urlAddTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/add_request.php';
const urlEditTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/edit_request.php';
const urlRemoveTheatre = process.env.REACT_APP_BASE_URL + 'php/models/user/theatres/remove_request.php';

const useTheatresStore = create(
    (set, get) => ({
        theatres: [],
        theatre: null,
        tempTheatre: null,
        theatreRequests: [],
        theatreRequest: null,

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

            set({ loading: true,  theatre: null });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTheatre, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set({ theatre: response.data.params });

            }

        },
        addTheatre: async (params) => {

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAddTheatre, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ sending: false });

            if (response?.data) {

                console.log("Add theatre request: ", response.data);

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return { error: true };

                }

            }

            set({ tempTheatre: {} });

            return { error: false };

        },
        editTheatre: async (params) => {

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditTheatre, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ sending: false });

            if (response?.data) {

                console.log(urlEditTheatre);
                console.log("Edit user request: ", response.data);

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
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveTheatre, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
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

        loadTheatreRequests: async (params) => {

            set({ loading: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTheatreRequests, form).catch(error => {
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

            const response = await axios.postForm(urlLoadTheatreRequest, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ theatreRequest: response.data.params }));

            }

        },
    })
);

export default useTheatresStore;