const Koa  = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const {findUserData} = require( './src/db/sql')
 


const cors = require('koa2-cors');

// 具体参数我们在后面进行解释
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  await next();
 });
//  app.use(bodyParser())
 
app.use(async(ctx) => {
//   if (ctx.url === '/' && ctx.method === 'GET') {
//     let html = `
//     <h2>This is demo2</h2>
//     <form method="POST" action="/">
//         <p>username:</p>
//         <input name="username">
//         <p>age:</p>
//         <input name="age">
//         <p>website</p>
//         <input name="website">
//         <button type="submit">submit</button>                 
//     </form>
//     `
//     ctx.body = html
// } else if (ctx.url === '/' && ctx.method === 'POST') {
//     let postData = ctx.request.body
//     console.log('----------1--------')
//     console.log(ctx.request.body)
//     console.log('----------1--------')
//     ctx.body = postData
// } else {
//     ctx.body = '<h2>404</h2>'
// }
  // console.log('-----1------');
    if (ctx.url === '/' && ctx.method === 'GET') {
        let html = await findUserData();
        console.log(html);
        console.log('-----2------');
        ctx.body= html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = ctx.request.body
        ctx.body = postData
        console.log('-----3------');
    } else {
        ctx.body = '<h2>404</h2>'
    }
})

 
 
app.listen(3003, () => {
    console.log('demo2 is run')
})