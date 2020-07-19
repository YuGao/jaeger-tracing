const initTracer = require('jaeger-client').initTracer;

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

const tracer = initTracer(config);
// console.log('tracer', tracer);

// 创建 SPAN 实例对象

const span = tracer.startSpan('say-hello');
console.log('start trace');

span.setTag('service', 'flow');
span.log({
  event: 'timestamp',
  value: Date.now(),
  data: [1, 2, 3, 4, 5]
});

span.finish();

console.log('done');
process.exit(0);
