/**
 * Created by LiuZongRui on 16/10/27.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    BackAndroid,
    Platform,
    ToastAndroid,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';
import Weather from './Weather';
import StarCityWeather from './StarCityWeather';
import AboutMe from './AboutMe';
import CityList from './CityList';
import {switchTab, showTitleBar} from '../../redux/action/HomePageAction';
import {getThemeColor} from '../../util/Config';
import ViewUtil from '../../util/ViewUtil';

class Home extends Component {

    render() {
        let selectedIndex = this.props.home.tabSelectedIndex;
        let showTitleBar = this.props.home.showTitleBar;

        return (
            <View style={styles.container}>
                {ViewUtil.getTitleBarWithStatusBar(null, null, selectedIndex == 0 ? this._renderRightBtn() : null, showTitleBar)}
                <TabNavigator
                    tabBarStyle={{opacity: 0.9,}}
                    sceneStyle={{paddingBottom: 0}}>
                    {this._renderTabItem(0, '天气', require('../../../image/pointer.png'), Weather)}
                    {this._renderTabItem(1, '关注', require('../../../image/star.png'), StarCityWeather)}
                    {this._renderTabItem(2, '我', require('../../../image/user.png'), AboutMe)}
                </TabNavigator>
            </View>
        );
    }

    _renderTabItem(index, title, image, Component) {
        return (
            <TabNavigator.Item
                title={title}
                selected={index === this.props.home.tabSelectedIndex}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.tabSelectText}
                renderIcon={() =>this._renderTabImage(false, image)}
                renderSelectedIcon={() =>this._renderTabImage(true, image)}
                onPress={()=> {
                    this.props.dispatch(switchTab(index));
                    this.props.dispatch(showTitleBar(index != 2));
                }}>
                <View style={{flex: 1, marginBottom: 50}}>
                    <Component {...this.props}/>
                </View>
            </TabNavigator.Item>
        );
    }

    _renderTabImage(selected, image) {
        return <Image style={[styles.tabImage, selected ? {tintColor: getThemeColor} : {tintColor: 'gray'}]}
                      source={image}/>;
    }

    // 显示右边的搜索按钮
    _renderRightBtn() {
        return (
            <TouchableOpacity onPress={this._rightBtnOnPress}>
                {ViewUtil.getTitleImageBtn(require('../../../image/search.png'))}
            </TouchableOpacity>
        );
    }

    // 进入城市列表界面
    _rightBtnOnPress = () => {
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
    };

    _onBackPress = () => {
        // 决定了是否要调用默认行为：true为不调用，false为调用
        if (this.lastPressTime && this.lastPressTime + 2000 >= Date.now()) {
            // 推出程序
            return false;
        }
        this.lastPressTime = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('backPress', this._onBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('backPress', this._onBackPress);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    tabImage: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    tabSelectText: {
        fontSize: 10,
        color: getThemeColor
    },
    tabText: {
        fontSize: 10,
        color: 'gray'
    }
});

// 配置映射表
const mapStateToProps = (store) => {
    return {
        home: store.HomePagerReducer,
    }
};

export default connect(mapStateToProps)(Home);