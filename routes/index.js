
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname)
    .filter( file => file !== path.basename(__filename))
    .map( file => {
        const sub = require('./' + file);
        router.use(sub.routes(), sub.allowedMethods());
    })

module.exports = router;

