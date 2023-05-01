import React, {FC} from 'react';
import {IEstablishment} from "../../../interfaces/";
import {useNavigate} from "react-router-dom";
import styles from './UserInfoEstablishments.module.css';

interface IProp {
    establishment: IEstablishment;
    deleteItem: Function;
}

const UserInfoEstablishments: FC<IProp> = ({establishment, deleteItem}) => {
    const navigate = useNavigate();

    const redirectToEdit = () => {
        navigate('/my-establishments/update', {state: establishment});
    }

    return (
        <div>
            <div className={styles.EstablishmentItem}>
                {establishment?.avatar ?
                    <div className={styles.EstablishmentImage}
                         onClick={() => navigate(`/adv/${establishment.title}`, {state: {establishment_id: establishment.establishment_id}})}
                         style={{
                             background: `url(${'http://localhost:3001/' + establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                    }}></div> :
                    <div className={styles.EstablishmentImage}
                         onClick={() => navigate(`/adv/${establishment.title}`, {state: {establishment_id: establishment.establishment_id}})}
                         style={{
                             background: `url("/no_img.png") center center / cover no-repeat`,
                         }}></div>
                }


                <div className={styles.EstablishmentDetails}>
                    <h4>{establishment.title}</h4>
                    <p>{establishment.type}</p>
                    <p>{establishment.location}</p>
                    <p>{establishment.start_work}-{establishment.end_work}</p>
                </div>
                <div>
                    <button onClick={() => deleteItem(establishment.establishment_id)}>Delete</button>
                    <button onClick={() => redirectToEdit()}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoEstablishments;