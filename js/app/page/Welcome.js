/**
 * Created by LiuZongRui on 16/10/27.
 * 欢迎页
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    InteractionManager
} from 'react-native';
import SplashScreen from '../modules/SplashScreen';
import Home from './Home';

export default class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}/>
        );
    }

    componentDidMount() {
        this.timer = setTimeout(()=> {
            InteractionManager.runAfterInteractions(()=> {
                SplashScreen.hide();
                this.props.navigator.resetTo({
                    name: 'Home',
                    component: Home
                });
            });
        }, 500);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});