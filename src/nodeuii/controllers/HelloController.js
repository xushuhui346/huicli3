import {route,GET,POST,before} from 'awilix-koa'

@route('/hello')
export default class HelloAPI {
    //引入的testService.js  (services目录下的model)
    constructor({testService}){
        this.testService = testService
    }
    @GET()
    async getUser (ctx){
        const result = this.testService.find()
        ctx.body = await ctx.render('index',{data:result})
    }
}