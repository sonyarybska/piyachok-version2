import React, { FC, FormEvent, ReactNode, RefObject, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from './Reviews.module.css';

import {reviewsService} from "../../services/";
import {useAppSelector} from "../../hooks/redux.hook";
import ReactStars from 'react-stars';
import {IReview} from "../../interfaces/";
import Review from "./review/Review";


interface IProp {
    establishment_id: number | undefined,
    children?: ReactNode
}

const Reviews: FC<IProp> = ({establishment_id}) => {
    const {user} = useAppSelector(reducer => reducer.users);

    const navigate= useNavigate();
    const location = useLocation();

    const [review, setReview] = useState<Partial<IReview>>({text: '', check: '', rating: 0});
    const [reviews, setReviews] = useState<IReview[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);

    const [fetchAdding, setFetchAdding] = useState<boolean>(true);
    const [fetchDelete, setFetchDelete] = useState<boolean | string>(false);

    useEffect(() => {
        if (establishment_id) {
            if (fetchAdding || currentPage) {
                reviewsService.getAllByEstId(establishment_id, {page: currentPage, limit: 5, sort: 'created_at-DESC'})
                    .then(({data}) => {
                        setReviews(data.reviews)
                        setTotalCount(data.count);
                        setLimit(data?.limit!)
                    })
                    .finally(() => setFetchAdding(false));
            }
        }
    }, [establishment_id, fetchAdding, currentPage]);


    useEffect(() => {
        if (establishment_id) {
            if (fetchDelete) {
                reviewsService.getAllByEstId(establishment_id, {page: currentPage, limit: 5, sort: 'created_at-DESC'})
                    .then(({data}) => {
                        setReviews(data.reviews)
                        setTotalCount(data.count);
                        setLimit(data?.limit!);
                    })
                    .finally(() => setFetchDelete(false));
            }
        }
    }, [fetchDelete])

    const createReview = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user && establishment_id) {
            const {user_id} = user;
            reviewsService.postOne({...review, check: +review?.check!, user_id, establishment_id})
                .finally(() => {
                    setCurrentPage(1);
                    setFetchAdding(true);
                })
        }
        else {
            navigate('/auth-request', {state: {pathname:location.pathname, establishment_id:establishment_id}})
        }
    }

    const deleteItem = async (id: number) => {
        await reviewsService.deleteOne(id)
            .finally(() => setFetchDelete(true));
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReview({...review, [e.target.name]: e.target.value});
    }

    const onChangeRating = (rating: number) => {
        setReview({...review, rating})
    }


    const countPages = Math.ceil(totalCount / +limit);

    const changePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCurrentPage(+e.currentTarget.value);
    }

    const ref = useRef() as RefObject<HTMLDivElement>;

    useEffect(() => {
        const btnArray = ref.current?.children as HTMLCollectionOf<HTMLButtonElement>
        const target = ref?.current?.children?.[+currentPage - 1] as HTMLButtonElement;
        if (target) {
            target.style.color = 'red';
            Array.from(btnArray).map((value, index) => {
                if (index <= 10) {
                    if (index + 1 === currentPage) {
                        value.style.color = 'white'
                        value.style.backgroundColor = 'black'
                    } else {
                        value.style.color = 'black';
                        value.style.backgroundColor = 'white'
                    }
                } else {
                    value.style.color = 'black';
                    value.style.backgroundColor = 'white'
                }
                return ''
            })
        }
    }, [currentPage])

    const showMore = () => {
        setCurrentPage(prevState => prevState < countPages ? prevState + 1 : prevState)
    }

    return (
        <div className={styles.ReviewsBox}>
            <div className={styles.Title}>
                Reviews about establishments
            </div>
            <ReactStars count={5} value={review?.rating}
                        onChange={onChangeRating}/>
            <form className={'input-form'} onSubmit={(e) => createReview(e)} action="">
                <input placeholder={'Text your review'} onChange={onChange} name={'text'}
                       value={review.text} type="text"/>
                <input placeholder={'Enter average check'} onChange={onChange} name={'check'}
                       value={review.check} type="number"/>

                <input type="submit" value={'Send'}/>
            </form>

            <div className={styles.Container}>
                {
                    reviews.length ? reviews.map(review => <Review deleteItem={deleteItem} key={review.review_id}
                                                                   review={review}/>) : "No review yet"
                }
            </div>


            <div className={styles.ButtonBox} ref={ref}>
                {
                    Array.from({length: countPages}, (_, i) => {
                        if (i > 10 && i < 12) {
                            return <button key={i} className={styles.ShowMore} onClick={() => showMore()}>Show more</button>
                        } else if (i < 10) {
                            return <button className={styles.OneBtn} value={i + 1} onClick={(e) => changePage(e)} key={i}>
                                {i + 1}
                            </button>
                        }
                        return ''
                    })
                }
            </div>

        </div>
    );
};

export default Reviews;