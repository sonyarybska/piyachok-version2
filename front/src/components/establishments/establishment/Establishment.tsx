import React, {createRef, FC, ReactNode, useEffect, useState} from 'react';
import ReactStars from "react-stars";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {IEstablishment} from "../../../interfaces/";
import styles from './Establishment.module.css';
import {useAppSelector} from "../../../hooks/redux.hook";
import {addToFavorite, changeFavorite} from "../../../helpers/favorite.helper";
import {reviewsService} from "../../../services/";

interface IProps {
    item: IEstablishment,
    sortFunction:Function
    children?: ReactNode
}

const Establishment: FC<IProps> = ({item,sortFunction}) => {
    const {user} = useAppSelector(reducer => reducer.users);

    const location = useLocation();

    const navigate = useNavigate()

    const [favorite, setFavorite] = useState<boolean>(false);
    const [rating, setRating] = useState<number|null>(null);

    useEffect(() => {
        if (item.establishment_id) {
            reviewsService.getAvgRating(item.establishment_id).then(({data}) => setRating(data.avgRating));
        }
    }, [sortFunction])

    const favoriteIcon = createRef<any>();

    const addToFavoriteList = async (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
        if(user){
            await addToFavorite(e, favoriteIcon, user.user_id, item);
        }
        else {
            navigate('/auth-request', {state:{pathname:location.pathname}})
        }
        setFavorite(true);
    }


    useEffect(() => {
        if (user) {
            changeFavorite(item, favoriteIcon, user.user_id).then(r => r);
            setFavorite(false);
        } else if (favoriteIcon.current) {
            favoriteIcon.current.style = 'black';
        }
    }, [favoriteIcon, user, item, favorite, user?.user_id]);

    return (
        <div>
            <div className={styles.EstablishmentItem}>
                <div>
                    <Link to={`adv/${item?.title}`}
                          state={{establishment_id: item?.establishment_id}}>
                        {item.avatar ? <div className={styles.Avatar} style={{
                            background: `url(${'http://localhost:3001/' + item?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                        }}></div> : <div className={styles.Avatar} style={{
                            background:`url("/no_img.png") center center / cover no-repeat`,
                        }}></div>}

                    </Link>
                    <Link to={`adv/${item?.title}`}
                          state={{establishment_id: item?.establishment_id}}>
                        <p>{item?.title}</p>
                        <p>{item?.type}</p>
                    </Link>
                    <ReactStars edit={false} count={5} value={rating!}/>
                    <i ref={favoriteIcon} onClick={(e)=>addToFavoriteList(e)} className="fa fa-heart"
                       style={{fontSize: "34"}}></i>
                </div>
            </div>
        </div>
    );
};

export default Establishment;