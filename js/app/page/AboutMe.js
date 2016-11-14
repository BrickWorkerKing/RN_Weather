/**
 * Created by LiuZongRui on 16/10/27.
 * 关于我
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    WebView
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    getThemeColor,
    getDefaultBackgroundColor,
    getWinWidth,
    getTitleBarHeight,
    getWinHeight
} from '../../util/Config';
import ViewUtil from '../../util/ViewUtil';

export default class AboutMe extends Component {
    render() {
        return (
            <ParallaxScrollView
                backgroundColor={getThemeColor}
                contentBackgroundColor='#ffffff'
                parallaxHeaderHeight={270}
                renderForeground={() => (
                    <Image source={require('../../../image/about_me.png')}
                           style={{width: getWinWidth, height: 270}}/>
                )}
                stickyHeaderHeight={getTitleBarHeight}
                renderStickyHeader={()=>ViewUtil.getTitleBar(null, null, this._renderRightBtn(), false)}>
                <Text style={styles.text}>
                    项目综述:{'\n\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;使用免费的和风天气API{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;通过高德地图实现Android端的定位功能{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;通过在fetch jsbundle的时候显示欢迎页解决了白屏的问题
                </Text>
            </ParallaxScrollView>
        );
    }

    _renderRightBtn() {
        return (
            <TouchableOpacity onPress={this._onSharePress}>
                {ViewUtil.getTitleImageBtn(require('../../../image/share.png'))}
            </TouchableOpacity>
        );
    }

    // 分享
    _onSharePress = () => {
        ToastAndroid.show('分享', ToastAndroid.SHORT);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    text: {
        margin: 10,
        fontSize: 14,
        color: '#333',
        lineHeight: 22
    }
});