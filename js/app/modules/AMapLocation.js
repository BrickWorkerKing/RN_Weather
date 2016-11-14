/**
 * Created by LiuZongRui on 16/11/2.
 */
'use strict';
import {NativeModules, DeviceEventEmitter} from 'react-native';
const location = NativeModules.AMapLocation;

export default class AMapLocation {

    static startLocation() {
        location.startLocation();
    }

    static destory() {
        location.destory();
    }

    static addEventListener(handler) {

        const listener = DeviceEventEmitter.addListener(
            'onLocationChanged',
            handler,
        );
        return listener;
    }

}