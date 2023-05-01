import React, { RefObject } from "react";

import { IEstablishment } from "../interfaces/";
import {favoriteService} from "../services/";

const addToFavorite = async (e: React.MouseEvent<HTMLElement, MouseEvent>, favoriteIcon: React.RefObject<any>, user_id: number, item: IEstablishment) => {
    const color = favoriteIcon?.current?.style?.color === 'red';

    if (color && favoriteIcon && e.target) {
        favoriteIcon.current.style.setProperty('color', 'black');
        await favoriteService.deleteFavorite(user_id, item?.establishment_id);

    } else if (!color && favoriteIcon.current && e.target) {
        favoriteIcon.current.style.setProperty('color', 'red');
        await favoriteService.addUsersFavorite(user_id, item?.establishment_id);
    }
}

async function changeFavorite(item: IEstablishment, favoriteIcon: RefObject<any>, user_id: number) {
    const {data:favorite} = await favoriteService.fetchFavorite();


    if (favoriteIcon.current && favorite?.length && user_id) {
        favorite?.forEach(value => {

            if (value?.establishment_id === item?.establishment_id && value?.user_id === user_id && favoriteIcon?.current) {
                favoriteIcon.current.style.color = 'red';
            }
        })
    }
}

export {addToFavorite, changeFavorite}