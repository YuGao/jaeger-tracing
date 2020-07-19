const initTracer = require('jaeger-client').initTracer;
const { FORMAT_HTTP_HEADERS } = require('opentracing');

const config = {
  serviceName: 'mongodb-tracer',
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    collectorEndpoint: 'http://127.0.0.1:14268/api/traces'
  }
};

const getSpanTraceId = span => {
  const context = span._spanContext || {};
  return context.toTraceId();
};

const tracer = initTracer(config);
tracer.extract(FORMAT_HTTP_HEADERS, {});

const spanTracing = (root) => {
  const span = tracer.startSpan('say-hello', { childOf: root });
  span.log({
    event: 'timestamp',
    value: Date.now(),
    data: [1, 2, 3, 4, 5]
  });
  console.log('traceId', getSpanTraceId(span));
  span.finish();

  const spanHello = tracer.startSpan('hello-world', { childOf: root });
  spanHello.log({
    event: 'timestamp',
    value: Date.now(),
    data: ['hello', 'world']
  });
  console.log('traceId', getSpanTraceId(spanHello));
  spanHello.finish();
};

// 创建 SPAN 实例对象
const spanRoot = tracer.startSpan('root-span');
spanRoot.log({
  event: 'timestamp',
  value: Date.now()
});
console.log('traceId', getSpanTraceId(spanRoot));

spanTracing(spanRoot);

spanRoot.finish();

tracer.close(function () {
  process.exit(0);
});
