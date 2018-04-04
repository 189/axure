

const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const util = require('util');
const path = require('path');
const unZip = require('unzip-stream');

const zipDir = path.resolve(__dirname, '../uploads');

router.prefix('/upload');

router.get('/', async function(ctx, next){
    await ctx.render('upload');
})

router.post('/', async function(ctx, next){
    const body = ctx.request.body;
    const files = body['uploadFile'];
    const promises = [];
    
    let filename;
    if(!files || files.length === 0){
        ctx.body = '上传文件不能为空';
        return;
    }
    files.forEach(file => {
        promises.push(
            new Promise((resolve, reject)=>{
                let reader = fs.createReadStream(file.path);
                filename = file.name.split('.')[0];
                reader.pipe(unZip.Extract({ path: zipDir }));
                reader.on('error', function (err) {
                    reject(err);
                });
                reader.on('end', function () {
                    resolve();
                })
            })
        )
    })
    const result = await Promise.all(promises);
    const url = 'http://axure.pptv.com/' + filename;
    ctx.body = `上传成功, URL地址：${url}`;
});

module.exports = router;



