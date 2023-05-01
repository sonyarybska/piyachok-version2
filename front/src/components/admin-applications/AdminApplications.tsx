import React, {FC, useEffect, useState} from "react";
import styles from './AdminApplications.module.css';

import {IEstablishment} from "../../interfaces/";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import AdminApplication from "./admin-application/AdminApplication";
import {establishmentService} from "../../services/";
import {establishmentActions} from "../../redux";


const AdminApplications: FC = () => {
    const {data} = useAppSelector(state => state.establishments);
    const {user} = useAppSelector(state => state.users);

    const [fetching, setFetching] = useState<boolean>(true);
    const [fetchingDelete, setFetchingDelete] = useState<boolean | string>(false);

    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [prevData, setPrevData] = useState<IEstablishment[]>([])

    const dispatch = useAppDispatch();

    useEffect(() => {
                if (fetching) {
                    dispatch(establishmentActions.getAllEstablishments({
                        pending: true,
                        page: currentPage,
                        prevData,
                        limit: 5
                    }))
                        .then((value: any) => {
                            setTotalCount(value?.payload?.count);
                            setPrevData(value?.payload?.establishments);

                        })
                        .finally(() => {
                            setFetching(false);
                        })
                    setCurrentPage(prevState => prevState + 1);
                } else if (fetchingDelete) {
                    dispatch(establishmentActions.getAllEstablishments({
                        pending: true,
                        page: 1,
                        limit: 5
                    })).then((value: any) => {
                        setTotalCount(value?.payload?.count);
                        setPrevData(value?.payload?.establishments);
                    })
                        .finally(() => setFetchingDelete(false));
                    setCurrentPage(2);
                }
    }, [fetching, fetchingDelete, user?.user_id]);

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

    const updateState = (state: string, id: number) => {
        if (state === 'approve') {
            establishmentService.patchOne(id, {
                approved: true, pending: false, rejected: false
            }).finally(() => setFetchingDelete(true));
        } else if (state === 'reject') {
            establishmentService.patchOne(id, {
                rejected: true, approved: false, pending: false
            }).finally(() => setFetchingDelete(true));
        }
    }

    return (
        <div className={styles.ApplicationsBox}>
            {data.establishments.length ?
                data.establishments.map((value, index) =>
                    <AdminApplication key={index} updateState={updateState} establishment={value}/>) : 'No results'
            }
        </div>
    );
}

export default AdminApplications;