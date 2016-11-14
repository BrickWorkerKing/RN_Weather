/**
 * Created by LiuZongRui on 16/11/7.
 */
'use strict';
import * as types from './ActionTypes';
import StarCityUtil from '../../util/StarCityUtil';

export function getStarCity(loading, refreshing) {
    return (dispatch) => {
        dispatch(fetchCityData(loading, refreshing));
        StarCityUtil.getStarCity()
            .then((result)=> {
                dispatch(loadResult(result));
            })
            .catch((e)=> {
                dispatch(loadResult([]));
            });
    }
}

let loadResult = (data) => {
    return {
        type: types.RECEIVE_STAR_CITY,
        data: data
    }
};

function fetchCityData(loading, refreshing) {
    return {
        type: types.FETCH_STAR_CITY,
        isLoading: loading,
        isRefresh: refreshing
    }
}

export function deleteCity(city) {
    return (dispatch) => {
        StarCityUtil.delete(city)
            .then((result)=> {
                dispatch(getStarCity(false, true));
            })
            .catch(e=> {

            })
    }
}