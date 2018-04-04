
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next)=>{
    ctx.body = '这是首页'
})

module.exports = router;

