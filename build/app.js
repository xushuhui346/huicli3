"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _controllerinit = require("./controllers/controllerinit");

var _controllerinit2 = _interopRequireDefault(_controllerinit);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  //config.viewDir在config/index.js中
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // disable, set to false 
  ext: 'html',
  writeBody: false
}));
app.use((0, _koaStatic2.default)(_config2.default.staticDir)); //app.js 不能随便往里面写业务逻辑，这是核心！！！启动所有项目。
// log4js配置

_log4js2.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: './logs/huicli.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

const logger = _log4js2.default.getLogger('cheese');

_errorHandler2.default.error(app, logger); //初始化所有路由


_controllerinit2.default.getAllrouters(app, _koaSimpleRouter2.default);

app.listen(_config2.default.port, () => {
  console.log(`huicli2 listening on ${_config2.default.port}`);
});
module.exports = app;