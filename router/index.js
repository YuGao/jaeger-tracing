'use strict';
const router = require('koa-router')();

try { router.use(require('./trace')); } catch (e) { console.log(e); }

module.exports = router.routes();
