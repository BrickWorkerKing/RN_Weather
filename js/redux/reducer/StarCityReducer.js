/**
 * Created by LiuZongRui on 16/11/7.
 */
'use strict';
import * as types from '../action/ActionTypes';

const initialState = {
    isLoading: true,
    data: []
};

export const StarCityReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.FETCH_STAR_CITY:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isRefresh: action.isRefresh
            });
        case types.RECEIVE_STAR_CITY:
            return Object.assign({}, state, {
                data: action.data,
                isLoading: false,
                isRefresh: false
            });
        default:
            return state;
    }
};