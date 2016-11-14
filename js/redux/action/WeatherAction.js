/**
 * Created by LiuZongRui on 16/10/31.
 */
'use strict';
import {getWeatherDataApi, fetchData} from '../../util/HttpUtil';
import * as types from './ActionTypes';

// 获取天气信息
export function getWeatherData(city, loading, refreshing) {
    return (dispatch)=> {
        dispatch(fetchWeatherData(loading, refreshing));
        fetchData(getWeatherDataApi(city), (data) => {
            dispatch(loadSuccess(data));
        }, (error)=> {
            dispatch(loadFail(error));
        });
    }
}

let loadSuccess = (data)=> {
    return {
        type: types.RECEIVE_WEATHER_DATA,
        data: data,
        desc: 'ok',
    };
};

let loadFail = (error) => {
    return {
        type: types.RECEIVE_WEATHER_DATA,
        desc: error,
    };
};

function fetchWeatherData(loading, refreshing) {
    return {
        type: types.FETCH_WEATHER_DATA,
        isLoading: loading,
        isRefresh: refreshing
    }
}