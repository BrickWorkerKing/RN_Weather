package com.rn_weather.location;

import android.support.annotation.Nullable;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * @author LiuZongRui  16/11/2
 *         高德地图定位
 */

public class AMapLocationModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactApplicationContext;
    private AMapLocationClient mLocationClient = null;
    // 声明定位回调监听器
    private AMapLocationListener mAMapLocationListener = new AMapLocationListener() {
        @Override
        public void onLocationChanged(AMapLocation aMapLocation) {
            WritableMap params = Arguments.createMap();
            if (aMapLocation != null) {
                if (aMapLocation.getErrorCode() == 0) {
                    // 定位成功
                    // 发送给RN端
                    params.putString("city", aMapLocation.getCity().replace("市", ""));
                    params.putBoolean("result", true);

                } else {
                    // 定位失败
                    params.putBoolean("result", false);
                }
            }
            sendEvent("onLocationChanged", params);
        }
    };

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        if (mReactApplicationContext != null) {
            mReactApplicationContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

    public AMapLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactApplicationContext = reactContext;
        mLocationClient = new AMapLocationClient(reactContext);
        mLocationClient.setLocationListener(mAMapLocationListener);
        AMapLocationClientOption clientOption = new AMapLocationClientOption();
        clientOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Battery_Saving); // 低功耗模式, 只使用wifi
        clientOption.setOnceLocation(true);
        mLocationClient.setLocationOption(clientOption);
    }

    @Override
    public String getName() {
        return "AMapLocation";
    }

    @ReactMethod
    public void destory() {
        if (mLocationClient != null) {
            mLocationClient.stopLocation(); // 停止定位
            mLocationClient.onDestroy(); // 销毁定位
        }
    }

    @ReactMethod
    public void startLocation() {
        if (mLocationClient != null) {
            mLocationClient.startLocation();
        }
    }

}
