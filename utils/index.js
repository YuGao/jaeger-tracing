const rp = require('request-promise');

const request = async (url, method, params, headers = {}) => {
  const options = {
    url,
    method,
    headers,
    rejectUnauthorized: false, // https
    strictSSL: false,
    json: true
  };
  switch (method) {
    case 'POST':
    case 'PUT':
      options.body = params;
      break;
    case 'GET':
    case 'DELETE':
      options.qs = params;
      break;
    default:
      break;
  }
  const result = await rp(options);
  return result;
};

module.exports = {
  request
};
