/**
 * Created by LiuZongRui on 16/10/26.
 */
'use strict';
import React, {Component} from 'react';
import App from './app/page/App';
import {Provider} from 'react-redux';
import {store} from './redux/store/Store';

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}