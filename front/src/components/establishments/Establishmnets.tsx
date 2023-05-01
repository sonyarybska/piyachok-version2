import React, {FC, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import styles from './Establishments.module.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {establishmentActions} from "../../redux";
import Establishment from "./establishment/Establishment";
import {establishmentService} from "../../services/";
import {IEstablishment} from "../../interfaces/";

const Establishments: FC = () => {
    const {data} = useAppSelector(state => state.establishments)

    const dispatch = useAppDispatch();

    const {state} = useLocation();

    const [types, setTypes] = useState<string[]>([]);
    const [currentType, setCurrentType] = useState<string | null>(null);

    const [currenPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [maxCheck, setMaxCheck] = useState<number>(0);

    const [sortType, setSortType] = useState<string | null>(null);
    const [filterByRating, setFilterByRating] = useState<string | null>(null);
    const [filterByCheck, setFilterByCheck] = useState<string | null>(null);

    const [fetching, setFetching] = useState<boolean>(true);

    const [prevData, setPrevData] = useState<IEstablishment[]>([]);

    useEffect(() => {
        let cancel = false;

        if (fetching || sortType || filterByRating || filterByCheck || currentType) {
            dispatch(establishmentActions.getAllEstablishments({
                page: currenPage,
                limit: 8,
                sort: sortType,
                type: currentType,
                approved: true,
                filterByRating,
                filterByCheck,
                prevData: prevData,
                title:state?.title
            })).then((value: any) => {
                setPrevData([...value?.payload?.establishments])
                setTotalCount(value?.payload?.count);
                setMaxCheck(value?.payload?.maxCheck);
            }).finally(() => setFetching(false));
            setCurrentPage(prevState => prevState + 1);
        }
        return () => {
            cancel = true;
        }
    }, [fetching, sortType, filterByRating, filterByCheck, currentType]);

    useEffect(() => {
        if (state?.title) {
            dispatch(establishmentActions.getAllEstablishments({page:1, limit:8, title:state?.title, approved:true}))
                .then((value:any)=>setPrevData([]));
            setCurrentPage(2);
        }
        else {
            dispatch(establishmentActions.getAllEstablishments({page:1, limit:8, approved:true}))
                .then((value:any)=>setPrevData(value?.payload?.establishments));
            setCurrentPage(2);
        }
    }, [state?.title]);


    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 &&
            data.establishments.length < totalCount
        ) {
            setFetching(true);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function cleanup() {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [totalCount]);

    useEffect(() => {
        establishmentService.getType().then((value: { data: any; }) => setTypes([...value.data]));
    }, []);


    const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(1);
        setPrevData([]);

        if (e?.target?.value?.length) {
            setCurrentType(e.target.value)

        } else {
            setCurrentType(null)
            setFetching(true)
        }
    }

    const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(1);
        setPrevData([]);
        if (e?.target?.value?.length) {
            setSortType(e.target.value)
        } else {
            setSortType(null);
            setFetching(true);
        }
    }

    const onSubmitFilterRating = (e: any) => {
        e.preventDefault();
        let filterParams;
        setCurrentPage(1);
        setPrevData([])

        if (+e.target[0].value === 0 && +e.target[1].value === 0) {

            setFilterByRating(null);
            setFetching(true);
        } else if (+e.target[1].value === 0 && !+e.target[0].value) {
            filterParams = `rating-${+e.target[0].value},${5}`;

            setFilterByRating(filterParams);
        } else {
            filterParams = `rating-${+e.target[0].value},${+e.target[1].value}`;

            setFilterByRating(filterParams);

        }
    }


    const onSubmitFilterCheck = (e: any) => {
        e.preventDefault();

        let filterParams;

        setCurrentPage(1);
        setPrevData([])

        if (+e.target[0].value === 0 && +e.target[1].value === 0) {
            filterParams = `averageCheck-${0},${maxCheck}`;

            setFilterByCheck(filterParams);
        } else if (+e.target[1].value === 0 && !+e.target[0].value) {
            filterParams = `averageCheck-${+e.target[0].value},${maxCheck}`;

            setFilterByCheck(filterParams);
        } else {
            filterParams = `averageCheck-${+e.target[0].value},${+e.target[1].value}`;

            setFilterByCheck(filterParams);
        }
    }

    return (
        <div>

            <div className={styles.FilterBox}>
                <div className={'filter-item'}>
                    <p>Sort by</p>
                    <select onChange={(e) => onChangeSort(e)}>
                        <option value={''}>Without sort</option>
                        <option value="average_check-DESC">Sort by average check (descending)</option>
                        <option value="average_check-ASC">Sort by average check (ascending)</option>
                        <option value="avgRating-DESC">Sort by rating (descending)</option>
                        <option value="avgRating-ASC">Sort by rating (ascending)</option>
                        <option value="created_at-DESC">Sort by date of publication (descending)</option>
                        <option value="created_at-ASC">Sort by date of publication (ascending)</option>
                        <option value="title-DESC">Sort by alphabetic (descending)</option>
                        <option value="title-ASC">Sort by alphabetic (ascending)</option>
                    </select>
                </div>

                <div className={'filter-item'}>
                    <p>Type of establishment</p>
                    <select onChange={(e) => onChangeType(e)} name="" id="">
                        <option value={''}>Any type</option>
                        {types.map((value: any, index: number) => <option key={index}
                                                                          value={value.title}>{value.title}</option>)}
                    </select>
                </div>

                <div className={'filter-item'}>
                    <p>Rating</p>
                    <form className={'between-form'} onSubmit={(e) => onSubmitFilterRating(e)} name={'rating'}
                          action="">
                        <input type="number"/>
                        <input type="number"/>
                        <button> filter</button>
                    </form>
                </div>

                <div className={'filter-item'}>
                    <p>Average check</p>
                    <form className={'between-form'} onSubmit={(e) => onSubmitFilterCheck(e)} name={'average_check'}
                          action="">
                        <input type="number"/>
                        <input type="number"/>
                        <button>filter</button>
                    </form>
                </div>
            </div>
            <div className={styles.EstablishmentBox}>{data.establishments.map(value => <Establishment
                key={value.establishment_id} sortFunction={onChangeSort} item={value}/>)}</div>
        </div>);
}

export default Establishments;