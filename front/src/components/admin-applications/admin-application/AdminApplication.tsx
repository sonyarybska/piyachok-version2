import React, {FC} from 'react';
import {IEstablishment} from "../../../interfaces/";
import styles from'./AdminApplication.module.css';

interface IProp {
    establishment: IEstablishment;
    updateState: Function
}

const AdminApplication: FC<IProp> = ({establishment, updateState}) => {
    return (
        <div className={styles.ApplicationItem}>
            <div className={styles.ApplicationAvatar}>
                {establishment?.avatar?<div style={{
                    background: `url(${'http://localhost:3001/' + establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                    width: 200,
                    height: 150
                }}></div>:<div style={{
                    background: `url("/no_img.png") center center / cover no-repeat`,
                    width: 200,
                    height: 150
                }}></div>}
                <h4>{establishment?.title}</h4>
            </div>
            <div>
                <button onClick={() => updateState('approve',establishment.establishment_id)}>Approve
                </button>

                <button onClick={() => updateState('reject',establishment.establishment_id)}>Reject
                </button>
            </div>
        </div>
    );
};

export default AdminApplication;