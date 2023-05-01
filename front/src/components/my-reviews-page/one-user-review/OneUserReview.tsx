import React, {FC, ReactNode} from "react";
import ReactStars from 'react-stars';
import {
  Link
} from "react-router-dom";

import {IReview} from "../../../interfaces/";
import styles from './OneUserReview.module.css'

interface IProp{
    value:IReview,
    deleteItem:Function,
    children?: ReactNode
}

const OneUserReview: FC<IProp> = ({value, deleteItem}) => {

    return (
        <div className={styles.ReviewItem}>
            <Link to={`/adv/${value.establishment?.title}/`} state={{establishment_id:value.establishment_id}}>
            <div className={styles.EstablishmentItemReview}>
                {
                    value?.establishment?.avatar ? <div className={styles.EstablishmentItemReviewAvatar} style={{
                        background: `url(${'http://localhost:3001/' + value?.establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                    }}></div>:
                        <div className={styles.EstablishmentItemReviewAvatar} style={{
                            background:  `url("/no_img.png") center center / cover no-repeat`,
                        }}></div>
                }
                <p>{value?.establishment?.title}</p>
            </div>
        </Link>
            <div className={styles.ReviewText}>
                <p>{value?.text}</p>
                <ReactStars edit={false} count={5} value={value?.rating}/>
            </div>

            <button onClick={()=>deleteItem(value.review_id)}>Delete</button>
        </div>
    );
}

export default OneUserReview;