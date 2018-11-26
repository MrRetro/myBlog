const Koa  = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router();

const {queryAllData} = require( './db/users')

// 处理跨域请求
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  await next();
 });

//子路由1
let users = new Router();
users.get('/users', async(ctx)=>{
  ctx.body="Hello /users/users/";
});
users.get('/todo',async(ctx)=>{
  ctx.body="Hello /users/todo/";
});
//子路由2
let page = new Router();
page.get('/users', async(ctx)=>{
  ctx.body="Hello /page/users/";
});
page.get('/todo',async(ctx)=>{
  ctx.body="Hello /page/todo/";
});
//父级路由
let router = new Router();
router.use('/users',users.routes(),users.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3003, () => {
    console.log('demo2 is run')
})
