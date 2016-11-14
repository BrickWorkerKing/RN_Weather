/**
 * Created by LiuZongRui on 16/10/31.
 * Http请求工具包
 */
'use strict';
export function fetchData(url, successCallBack, failCallBack) {
    fetch(url)
        .then(response => response.json())
        .then(responseJson=> {
            let data = responseJson['HeWeather5'][0];

            switch (data['status']) {
                case 'ok':
                    successCallBack(data);
                    break;
                case 'invalid key':
                    failCallBack('错误的用户key');
                    break;
                case 'unknown city':
                    failCallBack('未知城市');
                    break;
                case 'no more requests':
                    failCallBack('超过访问次数');
                    break;
                case 'anr':
                    failCallBack('服务无响应或超时');
                    break;
                case 'permission denied':
                    failCallBack('没有访问权限');
                    break;
            }
        })
        .catch(error => {
            failCallBack('请求失败');
            console.error(error);
        }).done();
}

const key = '01b3910035ba4d35b28265df7797c669';
export function getWeatherDataApi(city) {
    return 'https://free-api.heweather.com/v5/weather?city=' + city + '&key=' + key;
}