import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import styles from './Header.module.css';
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";

import {userActions} from "../../redux";
import {RootState} from '../../redux';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";

import UserMenu from "../user-menu/UserMenu";


const Header: FC = () => {

    const {user} = useAppSelector((state: RootState) => state.users);
    const navigate = useNavigate();


    type FormValues = {
        value: string
    };

    const dispatch = useAppDispatch();

    const {register, handleSubmit, reset} = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> | null = (data) => {
        if(data.value.length>=1){
            navigate('/', { state: { title: data.value } });
        }
        else{
            navigate('/');
        }
        reset();
    };

    const onSuccess = (credentialResponse: CredentialResponse): void => {
        dispatch(userActions.getLoginUser({clientId: credentialResponse?.credential}));
    }

    const logoutUser = (): void => {
        dispatch(userActions.logoutUser())
    }

    return (
        <div className={styles.Header}>
            <Link to={'/'}>
                <div className={styles.LogoTitle}>
                    <p className={styles.Title}>Piyachok</p>
                    <img className={styles.Logo} src='/wine.png' alt=""/>
                </div>
            </Link>

            <form className={styles.SearchForm} onSubmit={handleSubmit(onSubmit)} action="">
                <input  {...register("value")} type="text"/>
                <input type="submit" value={"Search"}/>
            </form>
            {user ? <div className={styles.LogoutBlock}>
                    <UserMenu/>
                    <button onClick={() => logoutUser()}>Logout</button>
                </div>
                : <GoogleLogin
                    onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
                    onError={() => {
                        console.log('Login Failed');
                    }}/>
            }
        </div>
    );
};

export {Header};