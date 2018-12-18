import Koa from 'koa';
import config from './config';
import router from 'koa-simple-router';
import render from 'koa-swig';
import serve from 'koa-static';
import co from "co";
import log4js from 'log4js';
import errorHandler from "./middlewares/errorHandler";
const  {asClass,asValue,createContainer,Lifetime} =require('awilix')
const {loadControllers,scopePerRequest} = require('awilix-koa')

const app = new Koa();
// 创建IOC容器
const container = createContainer()  
// 保证每一次的请求都是一个new model
app.use(scopePerRequest(container))
// 装载所有的models  并将services代码注入到controllers
container.loadModules(['services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})

app.context.render = co.wrap(render({
  //config.viewDir在config/index.js中
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html',
  writeBody: false
}));
app.use(serve(config.staticDir));
//app.js 不能随便往里面写业务逻辑，这是核心！！！启动所有项目。
// log4js配置
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/huicli.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

errorHandler.error(app, logger);

app.listen(config.port, () => {
  console.log(`huicli2 listening on ${config.port}`);
});
module.exports = app;