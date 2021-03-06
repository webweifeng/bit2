const Koa = require('koa')
const consola = require('consola')
const koaJwt = require('koa-jwt')
const bodyParser = require('koa-bodyparser')
const { secret, host, port } = require('./config/base')
const { init: loggerInit } = require('./utils/logger')
const { resFormat } = require('./middleware/resformat')
const appCatch = require('./middleware/catch')
const api = require('./routes/api-index')
const cors = require('koa2-cors')
// const router = require('./routes/index')
// const mime = require('mime-types')
const app = new Koa()
const DB = require('./config/db')
const jwtUnless = [/^\/api\/auth\/login/, /^\/api\/auth\/logout/, /^\/api\/photo\/discover/, /^\/api\/photo\/detail/, /^((?!\/api\/).)*$/]
app.use(appCatch)
app.use(
  cors({
    origin: function(ctx) {
      // if (ctx.url.indexOf('/api/') > -1) {
      //   return '*'
      // }
      // return 'http://172.16.10.174:8081'
      return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)
app.use(bodyParser({ extendTypes: ['json', 'text', 'form'] }))
/**
 * 授权异常校验，捕获
 */
app.use(koaJwt({ secret }).unless({ path: jwtUnless }))
/**
 * 连接数据库
 */
DB.connect()
/**
 * 注册API
 */
app.use(resFormat('^/api/'))
app.use(api.routes())
app.use(api.allowedMethods())
/**
 * 开发环境设置静态地址，生产环境使用nginx配置,参考:nginx.conf
 */
if (process.env.NODE_ENV === 'development') {
  app.use(require('koa-static')(require('path').join(__dirname, '../')))
}

loggerInit()
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

/**
 * 启动程序
 */
app.listen(port, host)
consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true
})
