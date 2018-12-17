const Mocha = require("mocha");
const mocha = new Mocha({
    //mocha报告
    reporter: 'mochawesome',
    //mocha报告  配置
    reporterOptions: {
        reportDir: './docs/service-reporter',
        reportFilename: 'nodeuii'
    }
})
mocha.addFile('./tests/service/router.spec.js');
mocha.run(function () {
    console.log("all done");
    process.exit();
})