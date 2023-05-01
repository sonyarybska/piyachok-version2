import React, {FC} from 'react';
import styles from './AuthRequest.module.css';
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";

import {useAppDispatch} from "../../hooks/redux.hook";
import {useNavigate} from "react-router-dom";
import {userActions} from "../../redux";

const AuthRequest: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSuccess = (credentialResponse: CredentialResponse): void => {
        dispatch(userActions.getLoginUser({clientId: credentialResponse?.credential}));
        return navigate('/', {replace: true});
    }


    return (
        <div className={styles.Container}>
            <div className={styles.AuthBox}>
                <p>You are not authorized, please log in to your account</p>
                <GoogleLogin
                    onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
                    onError={() => {
                        console.log('Login Failed');
                    }}/>
            </div>
        </div>
    );
};

export default AuthRequest;