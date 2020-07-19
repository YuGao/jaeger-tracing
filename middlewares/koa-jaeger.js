const initTracer = require('jaeger-client').initTracer;
const { FORMAT_HTTP_HEADERS } = require('opentracing');

const options = {
  baggagePrefix: 'lowcode-'
};

const getSpanTraceId = span => {
  const context = span._spanContext || {};
  console.log('getSpanTraceId context toTraceId', context.toTraceId());
  return context.toTraceId();
};

module.exports = (config) => {
  if (global.SERVICE_NAME) {
    config.serviceName = global.SERVICE_NAME;
  }

  const tracer = initTracer(config, options);

  return async (ctx, next) => {
    // const { request } = ctx;
    const parent = tracer.extract(FORMAT_HTTP_HEADERS, ctx.headers);
    if (parent) {
      // console.log(ctx.path, 'parent', parent);
    }
    const spanConfig = parent ? { childOf: parent } : {};
    const span = tracer.startSpan(`${ctx.host}`, spanConfig);
    span.setTag('route', ctx.path);
    ctx.tracer = tracer;
    ctx.span = span;

    ctx.traceLog = info => {
      if (ctx.tracer && ctx.span) {
        ctx.span.log(info);
      }
    };

    await next();

    span.log({
      event: 'timestamp',
      value: Date.now(),
      body: ctx.response.body
    });
    // console.log('ctx.response', ctx.response.body);
    span.finish();

    if (ctx.span) {
      const traceId = getSpanTraceId(ctx.span);
      console.log('traceId', traceId);
      ctx.response.set('trace-id', traceId);
      console.log('ctx.response.headers.trace', ctx.response.get('trace-id'));
    }

    // tracer.close(function () { console.log('close trace'); });
  };
};
