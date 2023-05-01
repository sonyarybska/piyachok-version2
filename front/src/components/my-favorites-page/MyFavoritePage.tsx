import React, {FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from './MyFavoritePage.module.css';

import {useAppSelector} from "../../hooks/redux.hook";
import {IFavorite} from "../../interfaces/";
import {favoriteService} from "../../services";
import OneUsersFavorite from "./one-users-favorite/OneUsersFavorite";

const MyFavoritePage: FC = () => {
    const {user} = useAppSelector(reducer => reducer.users);

    const location = useLocation();
    const navigate = useNavigate();

    const [favorite, setFavorite] = useState<IFavorite[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchingPage, setFetchingPage] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        if (user) {
            if(fetchingPage){
                favoriteService.fetchFavoriteByUserId(user.user_id, currentPage, 9).then(({data}) => {
                    setFavorite([...favorite,...data.favorites])
                    setTotalCount(data.count)
                })
                    .finally(()=>setFetchingPage(false))
                setCurrentPage(prevState => prevState+1)
            }
        }
        else {
            navigate('/auth-request', {state:{pathname:location.pathname}})
        }
    }, [user, fetchingPage]);

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 &&
            favorite.length < totalCount
        ) {
            setFetchingPage(true);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function cleanup() {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [totalCount]);


    return (<div className={styles.FavoriteBox}>
        {
            favorite && favorite.map((value, index) => <OneUsersFavorite key={index} item={value}/>)
        }
    </div>)
}

export default MyFavoritePage;