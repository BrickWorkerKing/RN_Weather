/**
 * Created by LiuZongRui on 16/10/27.
 * 天气
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    InteractionManager
} from 'react-native';
import {getWeatherData} from '../../redux/action/WeatherAction';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NowWeather from './NowWeather';
import WeekWeather from './WeekWeather';
import {getThemeColor, getTitleBarTextColor} from '../../util/Config';
import {connect} from 'react-redux';
import AMapLocation from '../modules/AMapLocation';
import {setLocationCity, setSearchCity} from '../../redux/action/CityAction';

class Weather extends Component {

    render() {
        return (
            <ScrollableTabView style={styles.container}
                               renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                                     tabStyle={{height: 39}}
                                                                     underlineStyle={{
                                                                         height: 2,
                                                                         backgroundColor: '#e7e7e7'
                                                                     }}/>}
                               scrollWithoutAnimation={true}
                               tabBarBackgroundColor={getThemeColor}
                               tabBarActiveTextColor={getTitleBarTextColor}
                               tabBarInactiveTextColor={getTitleBarTextColor}>
                <NowWeather {...this.props} tabLabel="实况天气"/>
                <WeekWeather {...this.props} tabLabel="未来一周"/>
            </ScrollableTabView>
        );
    }

    componentDidMount() {
        if (this.props.searchCity && this.props.searchCity !== null) {
            InteractionManager.runAfterInteractions(()=> {
                this.props.dispatch(getWeatherData(this.props.searchCity, true, false));
                this.props.dispatch(setSearchCity(this.props.searchCity));
            });
        } else {
            this.props.dispatch(setSearchCity(null));
            if (Platform.OS === 'android') {
                this.listener = AMapLocation.addEventListener(this._onLocationChanged);
                AMapLocation.startLocation();
            } else {
                InteractionManager.runAfterInteractions(()=> {
                    this.props.dispatch(getWeatherData(this.props.city.city, true, false));
                });
            }
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android' && this.listener) {
            AMapLocation.destory();
            this.listener.clear();
        }
    }

    _onLocationChanged = (data)=> {
        if (data && data.result) {
            InteractionManager.runAfterInteractions(()=> {
                this.props.dispatch(setLocationCity(data.city));
                this.props.dispatch(getWeatherData(data.city, false, true));
            });
        }
    };

    // ios定位
    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             var initialPosition = JSON.stringify(position);
    //             console.log(initialPosition);
    //         },
    //         (error) => alert(error.message),
    //         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    //     );
    //     this.watchID = navigator.geolocation.watchPosition((position) => {
    //         var lastPosition = JSON.stringify(position);
    //         console.log(lastPosition);
    //     });
    // }
    //
    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});

const mapStateToProps = (store) => {
    return {
        weather: store.WeatherReducer,
        city: store.CityReducer
    }
};

export default connect(mapStateToProps)(Weather);