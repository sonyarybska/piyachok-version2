import React, {FC} from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import styles from './MyEstablishmentsPage.module.css'

import UsersEstablishments from "../users-establishments/UsersEstablishments";
import CreateEstablishmentPage from "../create-establishment-page/CreateEstablishmentPage";

const MyEstablishmentsPage: FC = () => {

    return (
        <div>
            <nav className={styles.NavList}>
                <NavLink style={({ isActive, isPending }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                    };
                }} to={''}>My Establishments</NavLink>
                <NavLink style={({ isActive, isPending }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                    };
                }} to={'create'}>Create establishment</NavLink>
            </nav>
            <Routes>
                <Route path={'create'} element={<CreateEstablishmentPage/>}/>
                <Route path={'update'} element={<CreateEstablishmentPage/>}/>
                <Route path={'/*'} element={<UsersEstablishments/>}/>
            </Routes>
        </div>
    );
}

export default MyEstablishmentsPage;