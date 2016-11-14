package com.rn_weather.splashscreen;

import android.app.Activity;
import android.app.Dialog;

import com.rn_weather.R;

import java.lang.ref.WeakReference;

/**
 * SplashScreen
 * 出自：http://www.cboy.me
 * GitHub:https://github.com/crazycodeboy
 * Eamil:crazycodeboy@gmail.com
 * 通过显示一个splashDialog来掩盖启动时显示的白屏
 */
public class SplashScreen {

    private static Dialog mSplashScreen;
    private static WeakReference<Activity> mActivity;

    /**
     * 打开启动屏
     *
     * @param activity
     */
    public static void show(Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Activity act = mActivity.get();
                if (!act.isFinishing()) {
                    mSplashScreen = new Dialog(act, R.style.SplashScreen_Fullscreen);
                    mSplashScreen.setContentView(R.layout.launch_screen);
                    mSplashScreen.setCancelable(false);
                    if (!mSplashScreen.isShowing()) {
                        mSplashScreen.show();
                    }
                }
            }
        });
    }

    /**
     * 关闭启动屏
     */
    public static void hide() {
        Activity activity = mActivity.get();
        if (activity == null) return;
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashScreen != null && mSplashScreen.isShowing()) {
                    mSplashScreen.dismiss();
                }
            }
        });
    }

}
