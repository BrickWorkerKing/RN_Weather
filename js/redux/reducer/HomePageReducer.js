/**
 * Created by LiuZongRui on 16/10/27.
 */
'use strict';
import * as types from '../action/ActionTypes';

const initialState = {
    tabSelectedIndex: 0,
    showTitleBar: true
};

export const HomePagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SWITCH_TAB:
            return Object.assign({}, state, {
                tabSelectedIndex: action.tabSelectedIndex
            });
        case types.ShOW_TITLE_BAR:
            return Object.assign({}, state, {
                showTitleBar: action.showTitleBar
            });
        default:
            return state;
    }
};