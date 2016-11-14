/**
 * Created by LiuZongRui on 16/10/28.
 * 城市列表
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    TouchableOpacity,
    StyleSheet,
    BackAndroid,
    Platform,
    InteractionManager,
} from 'react-native';
import ViewUtil from '../../util/ViewUtil';
import {getContainerStyle} from '../../util/Config';
import CityWeather from './CityWeather';
import {setSearchCity} from '../../redux/action/CityAction';

let citys = require('../../../data/city.json');

export default class CityList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (sh1, sh2)=> sh1 !== sh2
        });

        this.state = {
            dataSource: ds,
            loading: true
        };
    }


    render() {
        return (
            <View style={getContainerStyle}>
                {ViewUtil.getTitleBarWithStatusBar('选择城市', this._renderLeftBtn(), null)}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    pageSize={1}
                    renderSectionHeader={this._renderSectionHeader}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    _renderRow = (rowData)=> {
        return (
            <TouchableOpacity onPress={()=>this._itemOnPress(rowData)}>
                <View style={styles.listItem}>
                    <Text style={styles.itemText}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderSectionHeader = (sectionData, sectionID)=> {
        // sectionData,是指这个组里面全部的数据
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{sectionID}</Text>
            </View>
        );
    };

    _renderSeparator = (sectionID, rowID) => {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.separatorLine}/>);
    };

    _renderLeftBtn() {
        return (
            <TouchableOpacity onPress={this._leftBtnOnPress}>
                {ViewUtil.getTitleImageBtn(require('../../../image/back.png'))}
            </TouchableOpacity>
        );
    }

    _itemOnPress(rowData) {
        InteractionManager.runAfterInteractions(()=> {
            let {navigator} = this.props;
            navigator.push({
                name: 'CityWeather',
                component: CityWeather,
                params: {
                    searchCity: rowData
                }
            });
        });
    };

    _leftBtnOnPress = () => {
        let {navigator} = this.props;
        navigator.pop();
    };

    _onBackPress = () => {
        let {navigator} = this.props;
        if (navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('onBackPress', this._onBackPress);
        }


        InteractionManager.runAfterInteractions(() => {


            let listWithSection = [];
            let sectionData = [];
            // for (let i = 0; i < 26; i++) {
            //     sectionData.push(String.fromCharCode(65 + i));//输出A-Z  26个大写字母
            // }

            for (let i = 0; i < citys.length; i++) {
                sectionData[i] = citys[i].letter;
                listWithSection[sectionData[i]] = citys[i].data;
            }

            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(listWithSection, sectionData),
                loading: false
            });
        });
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('onBackPress', this._onBackPress);
        }
        InteractionManager.runAfterInteractions(()=> {
            this.props.dispatch(setSearchCity(null));
        });
    }

}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        height: 40,
        paddingLeft: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 16,
        color: '#333333'
    },
    sectionHeader: {
        flex: 1,
        height: 30,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        paddingLeft: 20
    },
    sectionText: {
        fontSize: 16,
        color: '#ffffff'
    },
    separatorLine: {
        backgroundColor: '#f0f0f0',
        height: 0.8,
        flex: 1
    }
});