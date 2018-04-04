
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const uploadPath = path.resolve(__dirname, '../uploads');

router.get('/', async (ctx, next)=>{
    let fileList = await readdir(uploadPath);
    fileList = fileList.map( dir => {
        return {
            name: path.basename(dir),
            href: 'http://axure.pptv.com/' + path.basename(dir)
        };
    });
    
    ctx.render('list', {
        data : fileList
    });
})

module.exports = router;

