import React from 'react';
import {BrowserRouter, HashRouter} from "react-router-dom";
import moment from "moment";
import axios from "axios";

import RoutesList from "./components/routes.list.component";
import Preloader from "./components/preloader/preloader.component";

import useAuthStore from "./store/authStore";

import './styles/App.scss';

const App = () => {

    const {setUser, logout} = useAuthStore();

    const [timer, setTimer] = React.useState(1500);
    const [app, setApp] = React.useState(<></>);

    React.useEffect(() => {

        setTimeout(() => {

            setTimer(0);

        }, timer);

    }, []);

    React.useEffect(() => {

        const user = window.localStorage.getItem('user');

        axios.interceptors.response.use((response) => {

            if (response?.data?.error === 3) {
                logout();
            }
            return response;
        }, (error) => {
            return Promise.reject(error.message);
        });

        if (user) {
            let expireDate = moment(JSON.parse(user).tokenDate, 'DD.MM.YYYY').add(1, 'months');

            if (expireDate.isAfter(moment())) {
                setUser(JSON.parse(user));
                axios.defaults.headers.post['Authorization'] = `${JSON.parse(user).token}&${JSON.parse(user).ID}`;
            } else
                logout();
        }

        setApp(<HashRouter hashType="noslash"><RoutesList/></HashRouter>);

    }, []);

    React.useEffect(() => {



    }, [app]);

    return (
        <Preloader loading={timer > 0}>
            {app}
        </Preloader>
    )
}

export default App;