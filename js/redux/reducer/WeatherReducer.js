/**
 * Created by LiuZongRui on 16/10/26.
 */
'use strict';
import * as types from '../action/ActionTypes';

const initialState = {
    data: null,
    desc: '',
    isLoading: true
};

export const WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_WEATHER_DATA:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isRefresh: action.isRefresh
            });
        case types.RECEIVE_WEATHER_DATA:
            return Object.assign({}, state, {
                data: action.data,
                desc: action.desc,
                isLoading: false,
                isRefresh: false
            });
        default:
            return state;
    }
};