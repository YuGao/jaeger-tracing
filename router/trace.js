const router = require('koa-router')();
const { FORMAT_HTTP_HEADERS } = require('opentracing');

const util = require('../utils/index');

const lib = {
  getToken: async () => {
    return 'token.message';
  }
};

router.get(['/'], async ctx => {
  const { response } = ctx;

  const headers = {};
  if (ctx.tracer && ctx.span) {
    console.log('inject span');
    ctx.tracer.inject(ctx.span, FORMAT_HTTP_HEADERS, headers);
  }
  console.log('headers', headers);
  const message = await util.request('https://3000.preview.lowcode.com/jaeger', 'GET', {}, headers);

  response.body = {
    msg: message
  };
  return response;
});

router.get(['/jaeger'], async ctx => {
  const { response } = ctx;

  const headers = {};
  if (ctx.tracer && ctx.span) {
    ctx.tracer.inject(ctx.span, FORMAT_HTTP_HEADERS, headers);
  }
  console.log('headers', headers);
  const user = await util.request('https://3000.preview.lowcode.com/service/user', 'POST', {}, headers);
  console.log('user', user);

  const message = 'Hello Jaeger';
  response.body = { message };
  return response;
});

router.post(['/service/user'], async (ctx) => {
  const token = await lib.getToken();
  // console.log('token', token);
  ctx.traceLog({ type: 'flow', index: 1, value: token });

  ctx.response.body = {
    name: 'jaeger',
    pwd: 'excellent'
  };
  return ctx;
});

module.exports = router.routes();

// docker run --name caddy-dev -d -p 5000:80 caddy
