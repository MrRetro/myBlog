const Koa  = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router();
const OSS = require('ali-oss');
const GlobalConfig = require('./src/config')

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const ArticleApi = require( './db/Article')

const config = {
  bucket: 'img-o-wu',
  region: 'oss-cn-hangzhou',// 我的是 hangzhou
  accessKeyId: 'LTAIgGlU31JWT9dZ',
  accessKeySecret: 'n5HWu2lXbjqY3qtQSTymPSZyx5MaGn',
  expAfter: 300000, // 签名失效时间，毫秒
  maxSize: 1048576000 // 文件最大的 size
}
const client = new OSS(config);

// 处理跨域请求
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', GlobalConfig.config.whileUrl);
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
 });

//子路由ali-oss
let auth = new Router();
auth.get('/ali',async(ctx)=>{
  console.log('请求ali-oss服务',ctx);
  const url = `https://${config.bucket}.${config.region}.aliyuncs.com`
  const expireTime = new Date().getTime() + config.expAfter
  const expiration = new Date(expireTime).toISOString()
  const policyString = JSON.stringify({
    expiration,
    conditions: [
      ['content-length-range', 0, config.maxSize]
    ]
  })
  const policy = Buffer.from(policyString).toString('base64')
  const signature = client.signature(policy)
  ctx.body={
    signature,
    policy,
    url,
    'OSSAccessKeyId': config.accessKeyId,
    'key': expireTime,
    'success_action_status': 201,
    'imgUrl': client.signatureUrl(expireTime.toString())
  };
});
// 二级路由
router.use('/auth',auth.routes(),auth.allowedMethods());

// 操作表
app.use(require('./routers/article.js').routes())


app.use(router.routes()).use(router.allowedMethods());

app.listen(3008, () => {
    console.log('myBlog is run')
})
