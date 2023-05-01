import React, {FC} from "react";
import {
    Route,
    NavLink,
    Routes
} from "react-router-dom";
import Approved from "./approved/Approved";
import Rejected from "./rejected/Rejected";
import Pending from "./pending/Pending";
import styles from './UsersEstablishments.module.css'


const UsersEstablishments: FC = () => {

    return (
        <div>
         <nav className={styles.NavList}>
             <NavLink style={({ isActive, isPending }) => {
                 return {
                     fontWeight: isActive ? "bold" : "",
                     color: isPending ? "red" : "black",
                 };
             }} to={''} end><li>Approved</li></NavLink>
             <NavLink style={({ isActive, isPending }) => {
                 return {
                     fontWeight: isActive ? "bold" : "",
                     color: isPending ? "red" : "black",
                 };
             }} to={'pending'}><li>Pending</li></NavLink>
             <NavLink style={({ isActive, isPending }) => {
                 return {
                     fontWeight: isActive ? "bold" : "",
                     color: isPending ? "red" : "black",
                 };
             }} to={'rejected'}><li>Rejected</li></NavLink>
         </nav>
            <Routes>
                <Route path={''} element={<Approved/>}/>
                <Route path={'pending'} element={<Pending/>}/>
                <Route path={'rejected'} element={<Rejected/>}/>
            </Routes>
        </div>
    );
}

export default UsersEstablishments;