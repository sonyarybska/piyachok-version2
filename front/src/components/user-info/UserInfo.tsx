import React, { FC, RefObject, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {establishmentService, usersService} from "../../services";
import {establishmentActions} from "../../redux";
import {IEstablishment} from "../../interfaces/";
import UserInfoEstablishments from "./user-info-establishments/UserInfoEstablishments";
import {IUser} from "../../interfaces/";

import styles from './UserInfo.module.css';

const UserInfo: FC = () => {
    const {dataByUser} = useAppSelector(state => state.establishments);
    const {user} = useAppSelector(state => state.users)

    const {state} = useLocation();

    const userId: number | undefined = state?.user_id;

    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    const [currentUser, setCurrentUser] = useState<IUser|null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [prevData, setPrevData] = useState<IEstablishment[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const [fetching, setFetching] = useState<boolean>(true);
    const [fetchUser, setFetchUser] = useState<boolean>(true);

    const changeNameInput: RefObject<HTMLInputElement> = useRef(null);

    useEffect(() => {
        if(user){
            if(user.admin){
                if (fetching) {
                    if (userId) {
                        dispatch(establishmentActions.getAllEstablishmentsByUserID({
                            page: currentPage,
                            approved: true,
                            limit:5,
                            id: userId,
                            prevData
                        }))
                            .then((value) => {
                                setPrevData(value.payload.establishments)
                                setTotalCount(value.payload.count);
                                setFetching(false);
                            })
                    }
                    setCurrentPage(prevState => prevState + 1);
                }
            }
            else {
                navigate('/auth-request')
            }
        }
        else {
            navigate('/auth-request')
        }

    }, [fetching]);

    useEffect(()=>{
        if(user){
            if(fetchUser){
                usersService.getOne(userId).then(({data})=> setCurrentUser(data))
                    .finally(()=>setFetchUser(false))
            }
        }
    },[userId, fetchUser])

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 &&
            dataByUser.establishments.length < totalCount
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

    const deleteItem = (id:number) => {
        establishmentService.deleteOne(id).finally(()=>setPrevData(prevData.filter(value => value.establishment_id!==id)))
            .finally(()=>setFetching(true))
    }

    const changeName = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(user){
            const target = e.target as HTMLInputElement;

            await usersService.putOne(userId, {name:target.value})
                .finally(()=>setFetchUser(true));
            target.hidden = true;
        }
    }

    return (
        <div>
            <div className={styles.UserTitle}>
                <div className={styles.UserNameAvatarBox}>

                    <div className={styles.UserAvatar}>
                        <img src={currentUser?.picture} alt=""/>
                    </div>

                    <div>
                        <h4>{currentUser?.name}</h4>
                        <h6>{currentUser?.email}</h6>
                    </div>
                </div>

                <div>
                    <button onClick={() => {
                        if (changeNameInput.current) {
                            changeNameInput.current.hidden = false;
                        }
                    }}>Edit name</button>

                    <button onClick={async () => {
                        await usersService.deleteOne(userId);
                        navigate('/admin-page/users')
                    }}>Delete user
                    </button>

                </div>

                <input onKeyDown={e => e.key === 'Enter' && changeName(e)} ref={changeNameInput} hidden type="text"/>
            </div>
            <div className={styles.UserEstablishments}>
                {dataByUser?.establishments?.length ? dataByUser?.establishments.map((establishment, index) =>
                    <UserInfoEstablishments key={index} deleteItem={deleteItem} establishment={establishment}/>) : 'no result'
                }
            </div>
        </div>
    );
};

export default UserInfo;