/**
 * Created by LiuZongRui on 16/10/27.
 * 今天天气
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    StyleSheet,
    Image,
    InteractionManager
} from 'react-native';
import {getWeatherData} from '../../redux/action/WeatherAction';
import {getRefreshControlColors, getBoxViewStyle, getContainerStyle} from '../../util/Config';
import StatusView from '../component/StatusView';
import LoadingView  from '../component/LoadingView';

export default class NowWeather extends Component {
    render() {
        if (this.props.weather.isLoading) {
            return (<LoadingView/>);
        } else if (this.props.weather.desc === 'ok') {
            let data = this.props.weather.data;
            if (data) {
                let suggestion = data.suggestion; // 生活指数
                return (
                    <ScrollView
                        style={getContainerStyle}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.weather.isRefresh}
                                title='刷新数据...'
                                colors={getRefreshControlColors}
                                onRefresh={()=> this._onRefresh()}/>
                        }>
                        {this._renderLocationView()}
                        {this._renderNowWeather(data)}
                        {this._renderWeatherIndex(suggestion)}
                    </ScrollView> );
            } else {
                return (<StatusView hintText='数据请求失败'/>);
            }
        } else {
            return (<StatusView hintText={this.props.weather.desc}/>);
        }
    }

    // 定位
    _renderLocationView() {
        if (!this.props.city.searchCity) {
            return (
                <View style={[styles.weather, getBoxViewStyle]}>
                    <View style={styles.locationLayout}>
                        <Image source={require('../../../image/loaction.png')} style={styles.locationImage}/>
                        <Text>{this.props.city.city}</Text>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    // 当前天气信息
    _renderNowWeather(data) {
        if (!data) return null;
        let now = data.now;
        let aqi = '';
        if (data.aqi) {
            aqi = data.aqi.city;
        }
        let daily_forecast = data.daily_forecast[0];
        let tmpDir;
        if (daily_forecast) {
            tmpDir = daily_forecast.tmp;
        }

        return (
            <View style={[styles.nowWeatherLayout, getBoxViewStyle]}>


                <View style={{paddingLeft: 18, paddingRight: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={styles.nowTemp}>{now.tmp ? now.tmp : '未知'}</Text>
                        <Text>℃</Text>
                    </View>

                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.tempDirText}>{tmpDir ? tmpDir.min : '未知'}℃
                            ~ {tmpDir ? tmpDir.max : '未知'}℃</Text>
                    </View>
                </View>


                <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>
                    <Text style={{
                        fontSize: 22,
                        color: '#333333',
                        width: 25,
                    }}>{now.cond && now.cond.txt ? now.cond.txt : '未知'}</Text>
                </View>


                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.baseWeatherText}>体感温度: {now.fl ? now.fl : '未知'}℃</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.baseWeatherText}>空气质量: {aqi && aqi.qlty ? aqi.qlty : '未知'}</Text>
                        <Text style={styles.baseWeatherText}>pm2.5: {aqi && aqi.pm25 ? aqi.pm25 : '未知'}ug/m³</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.baseWeatherText}>风向:
                            {now.wind && now.wind.dir ? now.wind.dir : '未知'}</Text>
                        <Text style={styles.baseWeatherText}>风力等级:
                            {now.wind && now.wind.sc ? now.wind.sc : '未知'}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.baseWeatherText}>能见度:
                            {now.vis ? now.vis : '未知'}km</Text>
                        <Text style={styles.baseWeatherText}>降水量:
                            {now.pcpn ? now.pcpn : '未知'}mm</Text>
                    </View>
                </View>
            </View>
        );
    }

    // 天气指数
    _renderWeatherIndex(suggestion) {
        if (suggestion) {

            let drsg = suggestion.drsg;
            let drsgItem = drsg ? this._renderWeatherIndexItem(require('../../../image/drsg.png'), '穿衣指数-' + drsg.brf, drsg.txt) : null;
            let trav = suggestion.trav;
            let travItem = trav ? this._renderWeatherIndexItem(require('../../../image/trav.png'), '旅游指数-' + trav.brf, trav.txt) : null;
            let sport = suggestion.sport;
            let sportItem = sport ? this._renderWeatherIndexItem(require('../../../image/sport.png'), '运动指数-' + sport.brf, sport.txt) : null;
            let flu = suggestion.flu;
            let fluItem = flu ? this._renderWeatherIndexItem(require('../../../image/flu.png'), '感冒指数-' + flu.brf, flu.txt) : null;
            let uv = suggestion.uv;
            let uvItem = uv ? this._renderWeatherIndexItem(require('../../../image/uv.png'), '紫外线指数-' + uv.brf, uv.txt) : null;
            let cw = suggestion.cw;
            let cwItem = cw ? this._renderWeatherIndexItem(require('../../../image/cw.png'), '洗车指数-' + cw.brf, cw.txt) : null;

            return (
                <View style={getBoxViewStyle}>
                    {drsgItem}
                    {sportItem}
                    {travItem}
                    {fluItem}
                    {uvItem}
                    {cwItem}
                </View>
            );
        } else {
            return null;
        }
    }

    _renderWeatherIndexItem(image, title, desc) {
        return (
            <View style={styles.weatherIndex}>
                <Image source={image} style={styles.weatherIndexImage}/>
                <View style={styles.weatherIndexRight}>
                    <Text style={styles.weatherIndexTitle}>{title}</Text>
                    <Text style={styles.weatherIndexDesc}>{desc}</Text>
                </View>
            </View>
        );
    }

    _onRefresh() {
        InteractionManager.runAfterInteractions(()=> {
            this.props.dispatch(getWeatherData(this.props.city.searchCity ? this.props.city.searchCity : this.props.city.city, false, true));
        });
    }
}

const styles = StyleSheet.create({
    locationLayout: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationImage: {
        width: 14,
        height: 14,
        marginRight: 8
    },
    locationText: {
        fontSize: 18,
    },
    weather: {
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 8
    },
    weatherIndex: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10
    },
    weatherIndexImage: {
        width: 30,
        height: 30,
        tintColor: '#FC3344'
    },
    weatherIndexRight: {
        flexDirection: 'column',
        paddingLeft: 30,
        flex: 1
    },
    weatherIndexTitle: {
        fontSize: 16,
        color: '#333333',
    },
    weatherIndexDesc: {
        fontSize: 14,
        color: '#888888',
        marginTop: 4,
        lineHeight: 18,
    },
    nowWeatherLayout: {
        flexDirection: 'row',
        paddingVertical: 16
    },
    nowTemp: {
        fontSize: 60,
        color: '#333333'
    },
    baseWeatherText: {
        fontSize: 11,
        color: '#666666',
        padding: 4,
        width: 106
    },
    tempImageStyle: {
        width: 10,
        height: 12,
        tintColor: '#FC3344'
    },
    tempDirText: {
        fontSize: 12,
        color: '#666666'
    }
});
