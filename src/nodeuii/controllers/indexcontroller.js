class IndexController  {
    constructor(){
        
    }
    indexAction() {
        return async (ctx, next) => {
            const indexModelIns = new IndexModel();
            const result = await indexModelIns.getData();
            //把result结果直接打印到页面上
            ctx.body = await ctx.render('index', { data: result });
        }
    }
    testAction() {
        return (ctx, next) => {
            ctx.body = {
                data: 'hello test'
            };
        }
    }
}
export default IndexController;