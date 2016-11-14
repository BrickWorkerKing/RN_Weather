/**
 * Created by LiuZongRui on 16/10/28.
 * titleBar
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';
import {getThemeColor, getAppTitle, getTitleBarTextColor, getTitleBarHeight, getWinWidth} from '../../util/Config';

let titleBarHeight = getTitleBarHeight;

export default class TitleBar extends Component {

    static propTypes = {
        // 设置属性类型
        title: PropTypes.string,
        renderLeftButton: PropTypes.element,
        renderRightButton: PropTypes.element,
        show: PropTypes.bool, // 是否显示titleBar
        needPaddingTop: PropTypes.bool
    };

    static get defaultProps() {
        // 设置默认值
        return {
            title: getAppTitle,
            show: true,
            needPaddingTop: true
        }
    }

    render() {
        return (
            <View style={[styles.container, this._setPaddingTop()]}>
                <View style={styles.leftBtn}>{this.props.renderLeftButton}</View>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <View style={styles.rightBtn}>{this.props.renderRightButton}</View>
            </View>
        );
    }

    _setPaddingTop() {
        titleBarHeight = this.props.show ? getTitleBarHeight : 0;
        if (Platform.OS === 'android') {
            return {
                paddingTop: 0,
                height: titleBarHeight,
            }
        } else {
            return {
                paddingTop: this.props.needPaddingTop ? 18 : 0,
                height: this.props.needPaddingTop ? titleBarHeight + 18 : titleBarHeight,
            }
        }
    }

}

const styles = StyleSheet.create({
    container: {
        width: getWinWidth,
        backgroundColor: getThemeColor,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 16,
        color: getTitleBarTextColor
    },
    leftBtn: {
        position: 'absolute',
        left: 14,
        height: titleBarHeight,
        justifyContent: 'center'
    },
    rightBtn: {
        position: 'absolute',
        right: 14,
        height: titleBarHeight,
        justifyContent: 'center'
    }
});