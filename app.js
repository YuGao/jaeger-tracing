global.SERVICE_NAME = 'hello-jaeger';

const resolve = require('path').resolve;
const Koa = require('koa');
const app = new Koa();
const port = 3000;

const router = require('./router');

// middlewares
const koaJaeger = require(resolve(__dirname, 'middlewares/koa-jaeger'));

app.use(async (ctx, next) => {
  // const start = Date.now();
  await next();
  // const ms = Date.now() - start;
  // console.log(`${ctx.method} ${ctx.url} - ${ctx.status} ${ms}ms`);
});

// jaeger client
const configJaeger = require(resolve(__dirname, 'configs/jaeger'));
if (configJaeger) {
  console.log('加载 jaeger 中间件');
  app.use(koaJaeger(configJaeger));
}

// load router
app.use(router);

app.listen(port, function () {
  console.log(`Listen on https://${port}.preview.lowcode.com`);
});
