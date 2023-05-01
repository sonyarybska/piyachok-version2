import React, {FC, useEffect} from 'react';
import './App.css';

import {GoogleOAuthProvider} from '@react-oauth/google';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Header} from "./components/header/Header";
import Establishments from "./components/establishments/Establishmnets";

import AdminPage from "./components/admin-page/AdminPage";
import MyReviewsPage from "./components/my-reviews-page/MyReviewsPage";
import MyFavoritePage from "./components/my-favorites-page/MyFavoritePage";
import {useAppDispatch} from "./hooks/redux.hook";
import {userActions} from "./redux";
import MyEstablishmentsPage from "./components/my-establishments-page/MyEstablishmentsPage";
import EstablishmentInfo from "./components/establishment-info/EstablishmentInfo";
import AuthRequest from "./components/auth-request/AuthRequest";
import {ResponseInterceptor} from "./components/response-interceptor";

const App: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(userActions.refreshUser())
        }
    }, [dispatch])


    return (
        <Router>
            <div className={'App'}>
                <GoogleOAuthProvider
                    clientId="940956205344-jq5i1r0avmeajjv9enjo46luepi52o1t.apps.googleusercontent.com">
                    <ResponseInterceptor/>
                    <Header/>
                    <Routes>
                        <Route path={'/auth-request'} element={<AuthRequest/>}/>
                        <Route path={'/'} element={<Establishments/>}/>
                        <Route path={'/my-establishments/*'} element={<MyEstablishmentsPage/>}/>
                        <Route path={'/admin-page/*'} element={<AdminPage/>}/>
                        <Route path={'/my-reviews'} element={<MyReviewsPage/>}/>
                        <Route path={'/my-favorite'} element={<MyFavoritePage/>}/>
                        <Route path={'/adv/:title/*'} element={<EstablishmentInfo/>}/>
                    </Routes>
                </GoogleOAuthProvider>
            </div>
        </Router>
    );
};

export {App};