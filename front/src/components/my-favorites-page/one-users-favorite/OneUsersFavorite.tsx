import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styles from './OneUserFavorite.module.css'

import {IFavorite} from "../../../interfaces/";

interface IProp {
    item: IFavorite;
}

const OneUsersFavorite: FC<IProp> = ({item}) => {

    return (
        <div>
            <Link to={`/adv/${item.establishment?.title}/`} state={{establishment_id:item.establishment_id}}>
            <div key={item?.establishment?.establishment_id} className={styles.FavoriteItem}>
                {item?.establishment?.avatar?<div className={styles.Avatar} style={{
                    background: `url(${'http://localhost:3001/' + item.establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                }}></div>:
                    <div className={styles.Avatar} style={{
                        background: `url("/no_img.png") center center / cover no-repeat`,
                    }}></div>
                }
                <p>{item?.establishment?.title}</p>
            </div>
            </Link>
        </div>
    );
};

export default OneUsersFavorite;