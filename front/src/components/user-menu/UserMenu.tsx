import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/redux.hook";
import {RootState} from "../../redux";
import styles from './UserMenu.module.css';
import {NavLink} from "react-router-dom";

const UserMenu: FC = () => {
    const {user} = useAppSelector((state: RootState) => state.users);
    return (
        <div>
            <div className={styles.Icon}>
                <nav  className={styles.NavMenu}>
                    <li className={styles.Profile}>
                        <span>My profile</span>
                        <ul className={styles.List}>
                            <li>
                                <div className={styles.ProfileInfo}>
                                    <img alt={'avatar'} src={user?.picture}/>
                                    <div>
                                        <div className={styles.Name}>{user?.name}</div>
                                        <div className={styles.Email}>{user?.email}</div>
                                    </div>
                                </div>
                            </li>
                            <div className={styles.ListLinks}>
                                <p style={{color:'464444',margin:0, fontWeight:700}}>My profile:</p>

                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })} to={'my-establishments'}>
                                    <li>My establishments</li>
                                </NavLink>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })}  to={'admin-page'}>
                                    {user?.admin && <li>Admin page</li>}
                                </NavLink>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })}  to={'my-reviews'} state={{user_id: user?.user_id}}>
                                    {<li>My reviews</li>}
                                </NavLink>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })}  to={'my-favorite'}>
                                    {<li>My favorites</li>}
                                </NavLink>
                            </div>
                        </ul>
                    </li>
                </nav>
            </div>
        </div>
    );
}

export default UserMenu;