/**
 * Created by LiuZongRui on 16/10/28.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    RefreshControl,
    StyleSheet,
    InteractionManager
} from 'react-native';
import {getContainerStyle, getRefreshControlColors, getBoxViewStyle} from '../../util/Config';
import {getWeatherData} from '../../redux/action/WeatherAction';
import LoadingView  from '../component/LoadingView';
import StatusView from '../component/StatusView';
import TimeUtil from '../../util/TimeUtil';

export default class WeekWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }

    render() {
        if (this.props.weather.isLoading) {
            return <LoadingView/>
        } else if (this.props.weather.desc === 'ok') {
            let data = this.props.weather.data;
            if (data) {
                let list = data.daily_forecast;

                return (
                    <ListView style={getContainerStyle}
                              dataSource={ list ? this.state.dataSource.cloneWithRows(this.props.weather.data.daily_forecast) : this.state.dataSource}
                              renderRow={(rowData, sectionID, rowID)=> this._renderRow(rowData, rowID)}
                              refreshControl={
                                  <RefreshControl
                                      refreshing={this.props.weather.isRefresh}
                                      title='刷新数据...'
                                      colors={getRefreshControlColors}
                                      onRefresh={()=> this._onRefresh()}/>
                              }
                    />
                );
            } else {
                return (<StatusView hintText='数据请求失败'/>);
            }
        } else {
            return (<StatusView hintText={this.props.weather.desc}/>);
        }
    }

    _renderRow(data, rowID) {
        return (
            <View style={[styles.rowView, getBoxViewStyle]}>
                <Text style={styles.condText}>{data.cond.txt_d}</Text>
                <View style={{flex: 1}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={styles.tmpText}>{this._trasTime(rowID, data.date)}</Text>
                        <Text style={styles.tmpText}>{data.tmp.min}℃ ~ {data.tmp.max}℃</Text>
                    </View>
                    <Text style={styles.infoText}>降水概率: {data.pop}%。{data.wind.dir},风力{data.wind.sc}级。</Text>
                </View>
            </View>
        );
    }

    _trasTime(rowID, date) {
        if (!date) return '';
        if (rowID == 0) {
            return '今日';
        } else if (rowID == 1) {
            return '明日'
        } else {
            return TimeUtil.dateToWeek(date);
        }
    }

    _onRefresh() {
        InteractionManager.runAfterInteractions(()=> {
            this.props.dispatch(getWeatherData(this.props.city.searchCity ? this.props.city.searchCity : this.props.city.city, false, true));
        });
    }

}

const styles = StyleSheet.create({
    rowView: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 18,
        height: 70
    },
    condText: {
        width: 80,
        fontSize: 16,
        textAlign: 'center',
        color: '#333333',
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 12,
        color: '#888888',
        marginTop: 10
    },
    tmpText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666'
    }
});

