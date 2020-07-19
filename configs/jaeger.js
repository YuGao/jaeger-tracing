const config = {
  serviceName: 'mongodb-tracer',
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    // collectorEndpoint: 'https://14268.preview.lowcode.com/api/traces'
    collectorEndpoint: 'http://127.0.0.1:14268/api/traces'
  }
};

module.exports = exports = config;
