"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IndexModel = require("../models/IndexModel");

var _IndexModel2 = _interopRequireDefault(_IndexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = {
  indexAction() {
    return async (ctx, next) => {
      const indexModelIns = new _IndexModel2.default();
      const result = await indexModelIns.getData(); //把result结果直接打印到页面上

      ctx.body = await ctx.render('index', {
        data: result
      });
    };
  },

  testAction() {
    return (ctx, next) => {
      ctx.body = {
        data: 'hello test'
      };
    };
  }

};
exports.default = indexController;