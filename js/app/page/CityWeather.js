/**
 * Created by LiuZongRui on 16/11/4.
 * 城市天气
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {getContainerStyle} from '../../util/Config';
import Weather from './Weather';
import ViewUtil from '../../util/ViewUtil';
import StarCityUtil from '../../util/StarCityUtil';
import {connect} from 'react-redux';
import {getStarCity} from '../../redux/action/StarCityAction';

class CityWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stared: false,
            starImage: require('../../../image/star.png')
        };
    }

    render() {
        return (
            <View style={getContainerStyle}>
                {ViewUtil.getTitleBarWithStatusBar(this.props.searchCity, this._renderLeftBtn(), this._renderRightBtn())}
                <Weather searchCity={this.props.searchCity}/>
            </View>
        );
    }

    _renderLeftBtn() {
        return (
            <TouchableOpacity onPress={this._leftBtnOnPress}>
                {ViewUtil.getTitleImageBtn(require('../../../image/back.png'))}
            </TouchableOpacity>
        );
    }

    componentDidMount() {
        StarCityUtil.getStarCity()
            .then((citys)=> {
                if (citys.indexOf(this.props.searchCity) > -1) {
                    this.setState({
                        stared: true,
                        starImage: require('../../../image/stared.png')
                    });
                }
            });
    }

    _renderRightBtn() {
        return (
            <TouchableOpacity onPress={this._rightBtnOnPress}>
                {/*<Image style={{width: 30, height: 30, tintColor: '#ffffff'}} source={this.state.starImage}/>*/}
                {ViewUtil.getTitleImageBtn(this.state.starImage)}
            </TouchableOpacity>
        );
    }

    _leftBtnOnPress = () => {
        let {navigator} = this.props;
        navigator.pop();
    };

    _rightBtnOnPress = () => {
        if (this.state.stared) {
            // 移除
            StarCityUtil.delete(this.props.searchCity)
                .then(()=> {
                    this.setState({
                        starImage: require('../../../image/star.png'),
                        stared: false
                    });
                    this.props.dispatch(getStarCity(false, false));
                });

        } else {
            StarCityUtil.save(this.props.searchCity)
                .then(()=> {
                    this.setState({
                        starImage: require('../../../image/stared.png'),
                        stared: true
                    });
                    this.props.dispatch(getStarCity(false, false));
                });
        }
    };
}

const styles = StyleSheet.create({});

const mapStateToProps = (store) => {
    return {
        starCity: store.StarCityReducer
    }
};

export default connect(mapStateToProps)(CityWeather);