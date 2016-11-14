/**
 * Created by LiuZongRui on 16/10/26.
 * 整合所有的reducer
 */
import {combineReducers} from 'redux'
import {WeatherReducer} from './WeatherReducer';
import {HomePagerReducer} from './HomePageReducer';
import {CityReducer} from './CityReducer';
import {StarCityReducer} from './StarCityReducer';

export const rootReducer = combineReducers({
    WeatherReducer,
    HomePagerReducer,
    CityReducer,
    StarCityReducer
});
