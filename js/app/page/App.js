/**
 * Created by LiuZongRui on 16/10/26.
 */
'use strict';
import React, {Component} from 'react';
import {
    Navigator,
} from 'react-native';
import Welcome from './Welcome';

export default class App extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{
                    name: 'welcome',
                    component: Welcome,
                    params: {}
                }}
                renderScene={this._renderScene}/>
        );
    }

    _renderScene = (route, navigator)=> {
        let ComponentView = route.component;
        return <ComponentView {...route.params} navigator={navigator}/>;
    };
}