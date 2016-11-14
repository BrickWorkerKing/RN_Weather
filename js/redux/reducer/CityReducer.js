/**
 * Created by LiuZongRui on 16/11/1.
 */
'use strict';
import * as types from '../action/ActionTypes';

const initialState = {
    city: '北京',
    searchCity: null
};

export function CityReducer(state = initialState, action) {
    switch (action.type) {
        case types.CITY:
            return Object.assign({}, state, {
                city: action.city
            });
        case types.SEARCH_CITY:
            return Object.assign({}, state, {
                searchCity: action.searchCity
            });
        default:
            return state;
    }
}
