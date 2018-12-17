import indexController from "./indexcontroller";
//路由注册中心
const controllerInit = {
    getAllrouters(app, router) {
        app.use(router(_ => {
            _.get('/index', indexController.indexAction())
            _.get('/index/test', indexController.testAction())

        }));
    }
}
export default controllerInit;