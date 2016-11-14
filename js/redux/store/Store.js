/**
 * Created by LiuZongRui on 16/10/26.
 * store
 */
'use strict';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducer/RootReducer';

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

export const store = applyMiddleware(thunk, logger)(createStore)(rootReducer);
// 等同于:
// let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
// let store = createStoreWithMiddleware(rootReducer);

