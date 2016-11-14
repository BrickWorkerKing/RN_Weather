/**
 * Created by LiuZongRui on 16/11/1.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import {getThemeColor} from '../../util/Config';

export default class StatusView extends Component {

    static propTypes = {
        hintText: PropTypes.string.isRequired,
        image: PropTypes.number
    };

    static get defaultProps() {
        return {
            image: require('../../../image/fail.png')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image}/>
                <Text style={styles.text}>{this.props.hintText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        tintColor: getThemeColor
    },
    text: {
        fontSize: 16,
        color: getThemeColor,
        marginTop: 10
    }
});