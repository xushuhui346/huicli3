import Koa from 'koa';
import config from './config';
import router from 'koa-simple-router';
import render from 'koa-swig';
import serve from 'koa-static';
import co from "co";
import controllerInit from './controllers/controllerinit';
import log4js from 'log4js';
import errorHandler from "./middlewares/errorHandler";
const app = new Koa();

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

//初始化所有路由
controllerInit.getAllrouters(app, router);

app.listen(config.port, () => {
  console.log(`huicli2 listening on ${config.port}`);
});
module.exports = app;