/**
 * Created by LiuZongRui on 16/11/7.
 */
'use strict';
import {AsyncStorage} from 'react-native';

let KEY = 'city';

export default class StarCityUtil {

    static save(city) {
        return new Promise((resolve, reject)=> {
            this.getStarCity()
                .then((citys)=> {
                    citys.push(city);
                    AsyncStorage.setItem(KEY, JSON.stringify(citys))
                        .then(()=>{
                            resolve('添加成功');
                        });
                })
                .catch((e)=> {
                    console.log(e);
                    reject('添加失败');
                });
        });
    }

    static getStarCity() {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(KEY)
                .then((r)=> {
                    if (r) {
                        resolve(JSON.parse(r));
                    } else {
                        resolve([]);
                    }
                })
                .catch((e)=> {
                    console.log(e);
                    resolve([]);
                })
        });
    }

    static delete(city) {
        return new Promise((resolve, reject) => {
            this.getStarCity()
                .then((citys)=> {
                    let index = citys.indexOf(city);
                    if (index > -1) {
                        citys.splice(index, 1);
                        AsyncStorage.setItem(KEY, JSON.stringify(citys))
                            .then(()=> {
                                resolve('删除成功');
                            });
                    }

                })
                .catch((e)=> {
                    console.log(e);
                    reject('删除失败');
                });
        });
    }
}