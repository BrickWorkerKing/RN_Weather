/**
 * Created by LiuZongRui on 16/11/2.
 */
'use strict';
export default class TimeUtil {

    static dateToWeek(date) {
        let weekDay = new Date(date).getDay();
        switch (weekDay) {
            case 0:
                return '星期天';
            case 1:
                return '星期一';
            case 2:
                return '星期二';
            case 3:
                return '星期三';
            case 4:
                return '星期四';
            case 5:
                return '星期五';
            case 6:
                return '星期六';
        }
    }

}