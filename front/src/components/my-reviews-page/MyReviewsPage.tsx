import React, {FC, useEffect, useState} from "react";
import styles from './MyReviewPage.module.css'

import OneUserReview from "./one-user-review/OneUserReview";
import {reviewsService} from "../../services/";
import {useAppSelector} from "../../hooks/redux.hook";
import {IReview} from "../../interfaces/";

const MyReviewsPage: FC = () => {
    const {user} = useAppSelector(reducer => reducer.users);


    const [usersReviews, setUsersReviews] = useState<IReview[]>([]);

    const [totalCount,setTotalCount] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [fetchDelete, setFetchDelete] = useState<boolean>(false);
    const [fetchPage, setFetchPage] = useState<boolean>(true);

    useEffect(() => {
            if(fetchDelete){
                reviewsService.getAllByUserId(user?.user_id!, 1,5).then( ({data})=>{
                    setUsersReviews(data.reviews)
                    setTotalCount(data.count)
                })
                    .finally(()=>setFetchDelete(false));
                setCurrentPage(2);
            }
            else if(fetchPage){
                reviewsService.getAllByUserId(user?.user_id!, currentPage,5).then( ({data})=>{
                    setUsersReviews([...usersReviews,...data.reviews])
                    setTotalCount(data.count)
                })
                    .finally(()=>setFetchPage(false));
                setCurrentPage(prevState => +prevState + 1);
            }
    }, [user, fetchDelete, fetchPage]);

    const deleteItem = async (id: number) => {
        await reviewsService.deleteOne(id).finally(()=>setFetchDelete(true));
    }

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) <
            100 &&
            usersReviews.length < totalCount
        ) {
            setFetchPage(true);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function cleanup() {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [totalCount]);

    return (
        <div className={styles.MyReviewsPage}>
            {usersReviews.length ?
                usersReviews.map(value => <OneUserReview key={value.review_id} deleteItem={deleteItem}
                                                         value={value}/>) : 'No reviews yet'}
        </div>
    );
}

export default MyReviewsPage;