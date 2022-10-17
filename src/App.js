import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HashRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import moment from "moment";
import axios from "axios";

import RoutesList from "./components/routes.list.component";
import Preloader from "./components/preloader/preloader.component";

import {init, login, logout} from "./store/authSlice";

import './styles/App.scss';

const App = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {

        const user = window.localStorage.getItem('user');

        axios.interceptors.response.use((response) => {

            if (response?.data?.error === 3) {
                dispatch(logout());
            }
            return response;
        }, (error) => {
            return Promise.reject(error.message);
        });

        if(user){
            let expireDate = moment(JSON.parse(user).tokenDate, 'DD.MM.YYYY').add(1, 'months');

            if(expireDate.isAfter(moment())) {
                dispatch(login(JSON.parse(user)));
                axios.defaults.headers.post['Authorization'] = `${JSON.parse(user).token}&${JSON.parse(user).ID}`;
            }
            else
                dispatch(logout());
        }
        else {
            dispatch(init());
        }

    }, [dispatch]);

    if(auth.status === "")
        return <Preloader loaded={false} />;

    return (
        <>
            <Helmet
                defaultTitle="Театры Патриот Спорт"
                titleTemplate="%s - Театры Патриот Спорт"
            />
            <HashRouter>
                <div className="content">
                    <RoutesList />
                </div>
            </HashRouter>
        </>
    )
}

export default App;