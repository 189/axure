
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const ejs = require('ejs');
const body = require('koa-better-body');

const routes = require('./routes');
const M = 1024 * 1024;

app.use(body({
    //  Default true. If you pass false it won't accept/parse multipart bodies.
    multipart : true,
    textLimit : 20 * M,
    formLimit : 20 * M,
    bufferLimit : 20,
    buffer : true,
    onerror : (err) => {
        throw new Error('上传出错' + err);
    },
    fields: 'body'
}));

app.use(views(__dirname + '/views', {
    map : {
        html: 'ejs'
    }
}));

app.use(routes.routes(), routes.allowedMethods());

app.use(async function(ctx, next){
    ctx.body = '当前页面不存在';
});

app.listen(5001);


