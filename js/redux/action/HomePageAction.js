/**
 * Created by LiuZongRui on 16/10/27.
 */
'use strict';
import * as types from './ActionTypes';

export function switchTab(index) {
    return {
        type: types.SWITCH_TAB,
        tabSelectedIndex: index
    }
}
export function showTitleBar(bool) {
    return {
        type: types.ShOW_TITLE_BAR,
        showTitleBar: bool
    }
}
