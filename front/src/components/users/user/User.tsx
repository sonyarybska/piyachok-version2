import React, {FC} from 'react';
import {IUser} from "../../../interfaces";
import {
  Link
} from "react-router-dom";
import styles from './User.module.css'

interface IProp{
    user:IUser,
}

const User:FC<IProp> = ({user}) => {

    return (
        <div>
            {
             !user.admin && <div>
                    <Link className={styles.UserItem} to={`${user.user_id}`} state={{user_id:user.user_id}}>
                        <img src={user.picture} alt=""/>
                        <p>{user.name}</p>
                    </Link>
                </div>
            }
        </div>

    );
};

export default User;