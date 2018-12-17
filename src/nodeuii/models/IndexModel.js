/** 
 * @fileOverview   实现Index 数据模型
 * @author xushuhui
 *
 */


import { resolve } from "url";
//model 必须是类  因为复用和数据
/**
 * IndexModel类，生成一段异步的数据
 * @class
 */
export default class IndexModel {
    /**
     * @constructor
     * @param{string} app koa2的上下文
     */
    constructor() { }
    /**
     * 获取具体的api接口数据
     * @returns{Promise} 返回的异步处理结果
     * @example
     * return new Promise
     * getData
     */
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("hello indexAction")
            }, 1000);
            // throw new Error("500错误");
            //reject("错误")
        })
    }
}