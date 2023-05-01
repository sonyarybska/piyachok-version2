import React, {FC, useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import styles from "../UsersEstablishments.module.css";

import {establishmentActions} from "../../../redux";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.hook";
import {IEstablishment} from "../../../interfaces/";
import {establishmentService} from "../../../services";

const Pending: FC = () => {
    const {user} = useAppSelector(state => state.users);
    const {dataByUser} = useAppSelector(state => state.establishments);

    const [totalCount, setTotalCount] = useState<number>(0);

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const [prevData, setPrevData] = useState<IEstablishment[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [fetchPage, setFetchPage] = useState<boolean>(true);
    const [fetchDelete, setFetchDelete] = useState<boolean|string>(false);


    useEffect(() => {
        if(user?.user_id){
            if (fetchPage) {
                dispatch(establishmentActions.getAllEstablishmentsByUserID({
                    pending: true,
                    page: currentPage,
                    limit: 5,
                    id: user?.user_id!,
                    prevData: prevData
                }))
                    .then((value) =>{
                        setTotalCount(value?.payload?.count)
                        return value
                    })
                    .then((value: any) => setPrevData(value?.payload?.establishments))
                    .finally(() => setFetchPage(false))
                setCurrentPage(prevState => prevState + 1);
            }
        }
        else{
            navigate('/auth-request')
        }

    }, [fetchPage, user?.user_id]);

    useEffect(() => {
        if (fetchDelete) {
            dispatch(establishmentActions.getAllEstablishmentsByUserID({
                approved: true,
                page: 1,
                limit: 5,
                id: user?.user_id!,
            }))
                .then((value) =>{
                    setTotalCount(value?.payload?.count)
                })
                .finally(() => {
                    setFetchDelete('false')
                })
        }
    }, [fetchDelete]);


    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) <
            100 &&
            dataByUser.establishments.length < totalCount
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


    const deleteOneEstablishment = async (id: number) => {
        await establishmentService.deleteOne(id)
            .then(() => setPrevData(dataByUser.establishments.filter(value=>value.establishment_id!==id)))
            .finally(()=>setFetchDelete(true))
    }


    const redirectToEdit = (index: number) => {
        navigate('/my-establishments/update', {state: dataByUser.establishments[index]});
    }

    return (
        <div>
            { dataByUser.establishments.length?<div>{
                dataByUser.establishments.map((value, index) => {
                    return <div key={value.establishment_id} className={styles.DivEst}>
                        {value.avatar? <div
                            onClick={() => navigate(`/adv/${value.title}`, {state: {establishment_id: value.establishment_id}})}
                            className={styles.Img} style={{
                            background: `url(${'http://localhost:3001/' + value?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                        }}></div>: <div
                            onClick={() => navigate(`/adv/${value.title}`, {state: {establishment_id: value.establishment_id}})}
                            className={styles.Img} style={{
                            background:`url("/no_img.png") center center / cover no-repeat`,
                        }}></div>}
                        <div>
                            <h4>{value.title}</h4>
                            <p>{value.type}</p>
                            <p>{value.location}</p>
                            <p>{value.start_work}-{value.end_work}</p>
                        </div>
                        <button onClick={() => deleteOneEstablishment(value.establishment_id)}>Delete</button>
                        <button onClick={() => redirectToEdit(index)}>Edit</button>
                    </div>
                })}</div>:<p>No establishments yet</p>

            }
        </div>
    );
}

export default Pending;