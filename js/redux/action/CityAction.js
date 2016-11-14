/**
 * Created by LiuZongRui on 16/11/1.
 */
'use strict';
import * as types from './ActionTypes';

export function setLocationCity(city) {
    return {
        type: types.CITY,
        city: city
    }
}


export function setSearchCity(city) {
    return {
        type: types.SEARCH_CITY,
        searchCity: city
    }
}