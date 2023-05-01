import {NavLink, Routes, Route} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import styles from './AdminPage.module.css'

import {useAppSelector} from "../../hooks/redux.hook";import Users from "../users/Users";
import AdminApplications from "../admin-applications/AdminApplications";
import AuthRequest from "../auth-request/AuthRequest";
import UserInfo from "../user-info/UserInfo";

const AdminPage: FC = () => {
    const {user} = useAppSelector(state => state.users);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);


    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                user && (
                    <div className={styles.MainPage}>
                        <div className={styles.AdminNavigator}>
                            <nav className={styles.NavList}>
                                <NavLink style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "black",
                                    };
                                }} to={''} end>Applications</NavLink>
                                <NavLink  style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "black",
                                    };
                                }} to={'users'}>Users</NavLink>
                            </nav>
                        </div>
                        <div className={styles.ChosenPage}>
                            <Routes>
                                <Route path={''} element={<AdminApplications />} />
                                <Route path={'users'} element={<Users />} />
                                <Route path={'users/:id'} element={<UserInfo />} />
                            </Routes>
                        </div>
                    </div>
                )
            )}
            {!isLoading && !user && <AuthRequest/>}
        </>
    );
};


export default AdminPage;