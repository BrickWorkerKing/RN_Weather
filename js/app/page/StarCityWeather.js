/**
 * Created by LiuZongRui on 16/10/27.
 * 关注城市的天气
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    RefreshControl,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import StatusView from '../component/StatusView';
import LoadingView from '../component/LoadingView';
import {getContainerStyle, getBoxViewStyle, getRefreshControlColors} from '../../util/Config';
import {connect} from 'react-redux';
import {getStarCity} from '../../redux/action/StarCityAction';
import {getThemeColor} from '../../util/Config';
import CityWeather from './CityWeather';
import CityList from './CityList';

class StarCityWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        }
    }

    render() {
        if (this.props.starCity.isLoading) {
            return (<LoadingView/>);
        } else {
            let list = this.props.starCity.data;
            if (list && list.length > 0) {
                return (
                    <ListView
                        style={getContainerStyle}
                        renderRow={(rowData)=>this._renderRow(rowData)}
                        dataSource={this.state.dataSource.cloneWithRows(list)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.starCity.isRefresh}
                                title='刷新数据...'
                                colors={getRefreshControlColors}
                                onRefresh={()=> this._onRefresh()}/>
                        }
                    />
                );
            } else {
                if (this.props.starCity.isRefresh) return null;
                return (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=>this._toStarCity()}>
                            <StatusView hintText='去关注城市' image={require('../../../image/no_data.png')}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getStarCity(true, false));
    }

    _renderRow(rowData) {
        return (
            <TouchableOpacity onPress={()=>this._onItemClick(rowData)}>
                <View style={[getBoxViewStyle, styles.row]}>
                    <Image source={require('../../../image/city.png')}
                           style={styles.cityImage}/>
                    <Text style={styles.cityText}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onRefresh() {
        this.props.dispatch(getStarCity(false, true));
    }

    _onItemClick(rowData) {
        InteractionManager.runAfterInteractions(() => {
            let {navigator} = this.props;
            navigator.push({
                name: 'CityWeather',
                component: CityWeather,
                params: {
                    searchCity: rowData,
                },
            });
        });
    }

    _toStarCity() {
        InteractionManager.runAfterInteractions(() => {
            let {navigator} = this.props;
            navigator.push({
                name: 'CityList',
                component: CityList,
                params: {
                    dispatch: this.props.dispatch
                }
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        height: 76
    },
    cityImage: {
        width: 46,
        height: 46,
        tintColor: getThemeColor
    },
    cityText: {
        fontSize: 18,
        color: '#333',
        marginLeft: 20
    }
});

const mapStateToProps = (store) => {
    return {
        starCity: store.StarCityReducer
    }
};

export default connect(mapStateToProps)(StarCityWeather);
