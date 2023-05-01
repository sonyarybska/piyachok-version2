import React, {FC, useEffect, useState} from 'react';
import styles from './EstablishmentInfo.module.css'
import {useLocation} from "react-router-dom";
import moment from 'moment';
import {
    Routes,
    Route,
} from "react-router-dom";

import {establishmentService} from "../../services/";
import {IEstablishment} from "../../interfaces/";
import Reviews from "../reviews/Reviews";

interface IId {
    establishment_id: number
}

const EstablishmentInfo: FC = () => {
    const [establishment, setEstablishment] = useState<IEstablishment>()
    let [image, setImage] = useState(0);
    const location = useLocation();
    const {establishment_id} = location.state as IId


    useEffect(() => {
        if(establishment_id){
            establishmentService.getOne(establishment_id).then(({data}) => setEstablishment(data));
        }

    }, [establishment_id])

    const imagesLength = establishment?.photos?.length;

    const prevImage = () => {
        if (image > 0) {
            setImage(--image)
        } else {
            setImage(imagesLength! - 1)
        }
    }

    const nextImage = () => {
        if (image < imagesLength! - 1) {
            setImage(++image);
        } else {
            setImage(0)
        }
    }

    const date = new Date(establishment?.user?.createdAt as string);

    return (
        <div className={styles.InfoContainer}>
            {establishment?.title &&
                <div className={styles.LeftSide}>
                    {
                        <div className={styles.Slider}>
                            <button onClick={prevImage}>{'<'}</button>

                            <div className={styles.Slide}>
                                {establishment?.photos[0] ? <div className={styles.Image} style={{
                                    background: `url(${'http://localhost:3001/' + establishment?.photos?.[image]?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                                }}>
                                    <div className={styles.SwiperContainer}>
                                        {
                                            establishment?.photos?.map((item, index) => {
                                                return (
                                                    <div key={index}
                                                         className={index === image ? styles.Active : styles.SwiperPagination}></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div> : <div className={styles.Image} style={{
                                    background: `url("/no_img.png") center center / cover no-repeat`,
                                }}>
                                    <div className={styles.SwiperContainer}>
                                        {
                                            [1].map((item, index) => {
                                                return (
                                                    <div key={index}
                                                         className={index === image ? styles.Active : styles.SwiperPagination}></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>}
                            </div>
                            <button onClick={nextImage}>{'>'}</button>
                        </div>
                    }
                    <div className={styles.EstablishmentInfo}>
                        <div>
                            <h5>{establishment.type}</h5>
                            <p className={styles.Title}>{establishment.title}</p>
                        </div>
                      <div>
                          <h5>Average check</h5>
                          <p className={styles.AverageCheck}>{establishment.average_check} UAH</p>
                      </div>
                      <div>
                          <h5>Opening hours</h5>
                          <p className={styles.OpenHours}>{establishment.start_work} - {establishment.end_work}</p>
                      </div>
                       <div>
                           <h5>Phone number</h5>
                           <p className={styles.Phone}>{establishment.phone}</p>
                       </div>
                      <div>
                          <h5>Tags</h5>
                          {Array.isArray(establishment.tags)? establishment.tags.map((value,index)=><span key={index}>{`#${value}`}</span>):establishment.tags.split(',').map(value => <span>{`#${value}`}</span>)}
                      </div>

                    </div>
                </div>}

            <div className={styles.RightSide}>

                <div className={styles.UserInfo}>
                    <p className={styles.PUser}>User</p>
                    <div className={styles.UserTitle}>
                        <img className={styles.UserAvatar} src={establishment?.user?.picture} alt=""/>
                        <div>
                            <h3>{establishment?.user?.name}</h3>
                            <h4>{establishment?.user?.email}</h4>
                            <p className={styles.ActiveInfo}>Has been on the site
                                since {moment(date).format('DD MMMM YYYY')}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.Location}>
                    <h3>Location</h3>
                    <div className={styles.LocationImg}>
                        <img src="/icons8-location.gif" alt=""/>
                        <p>{establishment?.location}</p>
                    </div>
                </div>
                <Routes>
                    <Route path={'/'} element={<Reviews establishment_id={establishment?.establishment_id}/>}/>
                </Routes>

            </div>

        </div>
    );
};

export default EstablishmentInfo;