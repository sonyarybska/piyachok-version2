import React, {FC} from 'react';
import ReactStars from 'react-stars';

import {IReview} from "../../../interfaces/";
import {useAppSelector} from "../../../hooks/redux.hook";

interface IProp {
    review: IReview,
    deleteItem: Function
}

const Review: FC<IProp> = ({review, deleteItem}) => {
    const {user} = useAppSelector(reducer => reducer.users);
    return (
        <div className={'item-review'}>
            <div className={'text-review'}>
                <ReactStars edit={false} count={5} value={review?.rating}/>
                <h5>{review?.user?.name}</h5>
                {review?.text}
            </div>

            {user?.user_id === review.user_id && <div>
                <button onClick={() => deleteItem(review.review_id)}>Delete</button>
            </div>}

        </div>
    );
};

export default Review;