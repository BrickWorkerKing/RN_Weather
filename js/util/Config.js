/**
 * Created by LiuZongRui on 16/10/28.
 * 主题
 */
'use strict';
import {Platform} from 'react-native';

export const getThemeColor = '#3F51B5';

export const getDefaultBackgroundColor = '#f3f3f4';

export const getTitleBarTextColor = '#ffffff';

export const getAppTitle = '看天气';

let Dimensions = require('Dimensions');
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
export const getTitleBarHeight = height * 0.08;
export const getWinWidth = width;
export const getWinHeight = height;

export const getBoxViewStyle = {
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
};

export const getRefreshControlColors = [
    '#3F51B5',
    '#8BC34A',
    '#F44336',
    '#FFEB3B'
];

export const getContainerStyle = {
    flex: 1,
    backgroundColor: getDefaultBackgroundColor,
};


