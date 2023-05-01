import axios from "axios";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../services/axios.service";

export function ResponseInterceptor() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const interceptorId = useRef(null);

    useEffect(() => {
        axiosInstance.interceptors.response.use((config) => {
            return config;
        }, async (error) => {
            const originalRequest = error.config;

            if (error?.response?.status === 401) {
                try {
                    const response = await axios.get('http://localhost:3001/auth/refresh', {withCredentials: true});

                    localStorage.setItem('access_token', response.data.tokens.access_token);
                    return axiosInstance.request(originalRequest);

                } catch (e) {
                   navigate('/auth-request');
                }
            } else if (error?.response?.status === 403) {
                navigate('/auth-request');
                return true;
            }
            throw error;
        })
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            axiosInstance.interceptors.response.eject(interceptorId.current!);
        };
    }, [dispatch]);

    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        }
        return config;
    });


    return null;
}
