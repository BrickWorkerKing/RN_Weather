/**
 * Created by LiuZongRui on 16/10/28.
 * 组件工具类
 */
'use strict';
import React  from 'react';
import {View, Image, StatusBar, StyleSheet} from 'react-native';
import {getAppTitle, getTitleBarTextColor, getThemeColor} from './Config';
import TitleBar from '../app/component/TitleBar';


export default class ViewUtil {

    static getTitleBarWithStatusBar(title, renderLeftButton, renderRightButton, showTitleBar) {
        if (title === null) {
            title = getAppTitle;
        }
        return (
            <View>
                <StatusBar
                    backgroundColor={getThemeColor}
                    barStyle='light-content'/>
                <TitleBar renderRightButton={renderRightButton} title={title}
                          renderLeftButton={renderLeftButton}
                          show={showTitleBar}/>
            </View>
        );
    }

    static getTitleBar(title, renderLeftButton, renderRightButton, needPaddingTop) {
        if (title === null) {
            title = getAppTitle;
        }
        return (
            <TitleBar renderRightButton={renderRightButton} title={title}
                      renderLeftButton={renderLeftButton}
                      needPaddingTop={needPaddingTop}/>
        );
    }

    static getTitleImageBtn(image) {
        return (<Image style={styles.imageStyle} source={image}/>);
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: getTitleBarTextColor
    }
});




