"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require("url");

/** 
 * @fileOverview   实现Index 数据模型
 * @author xushuhui
 *
 */
//model 必须是类  因为复用和数据

/**
 * IndexModel类，生成一段异步的数据
 * @class
 */
class IndexModel {
  /**
   * @constructor
   * @param{string} app koa2的上下文
   */
  constructor() {}
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
        resolve("hello indexAction");
      }, 1000); // throw new Error("500错误");
      //reject("错误")
    });
  }

}

exports.default = IndexModel;