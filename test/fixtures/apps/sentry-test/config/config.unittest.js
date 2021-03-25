'use strict';

require('dotenv').config({
  path: __dirname + '/../.env',
});

exports.keys = '123456';

exports.sentry = {
  dsn: process.env.TEST_SENTRY_DSN,
};
