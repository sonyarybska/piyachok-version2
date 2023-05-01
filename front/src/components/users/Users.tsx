import React, {FC, useEffect, useState} from 'react';
import styles from './Users.module.css'

import {usersService} from "../../services";
import {IUser} from "../../interfaces/";
import User from "./user/User";

const Users: FC = () => {
    const [users, setUser] = useState<IUser[]>([]);

    useEffect(() => {
        usersService.getAll().then(({data}) => setUser(data))
    }, [])

    return (
        <div className={styles.UsersContainer}>
            {
                users.map(user => <User key={user.user_id} user={user}/>)
            }
        </div>
    );
};

export default Users;