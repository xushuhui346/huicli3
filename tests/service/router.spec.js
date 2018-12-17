const superagent = require("supertest");
const app = require("../../build/app.js");

function request() {
    return superagent(app.listen());
}
describe("NodeUII自动化测试脚本", function () {
    describe("API接口测试", function () {
        it('获取测试的数据', function (done) {
            request().
                get('/index/test').
                set('Accept', 'application/json').
                expect('Content-Type', /json/).
                expect(200).
                end(function (err, response) {
                    if (response.body.data == 'hello test') {
                        done();
                    } else {
                        done(new Error('测试接口与期望数据不符合'));
                    }
                })
        })
    });
    describe("NodeUII容错测试", function () {
        it('测试404脚本容错http code', function (done) {
            request()
                .get("/message/notfound")
                .expect(404, done);
        })
    });
})