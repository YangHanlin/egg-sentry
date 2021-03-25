## egg-sentry

Sentry Plugin for Egg.js

### About

This module is to help developers setup Sentry with least work. This repository is a fork based on the original package [`freebyon/egg-sentry`](https://github.com/freebyron/egg-sentry) which seems not under maintenance now.

### Getting Started

Install egg-sentry as an npm module and save it to your package.json file as a development dependency:

```
npm install --save @yanghanlin/egg-sentry
```

Add Sentry configuration:

```js
// config/config.default.js

exports.sentry = {
  dsn: 'https://replace@this.with.your.own/dsn',
};

// config/plugin.js

exports.sentry = {
  enable: true,
  package: '@yanghanlin/egg-sentry',
};
```

Replace the `dsn` with your own one, get details at [Sentry](https://docs.sentry.io/clients/node/).

From now on, exceptions are able to submit to Sentry. What if we wanna more custom information, such as logined user?

To get a rich [context](https://docs.sentry.io/learn/context/), implemet [Egg Service](https://eggjs.org/zh-cn/basics/service.html#container) in `app/service/sentry.js` file and there are four member properties or methods are supported.

```js
// app/service/sentry.js

'use strict';

const Service = require('egg').Service;

class SentryService extends Service {
  /**
   * filter errors need to be submitted to Sentry
   *
   * @param {any} err error
   * @return {boolean} true for submit, default true
   * @memberof SentryService
   */
  judgeError(err) {
    // ignore HTTP Error
    return !(err.status && err.status > 500);
  }
  
  // user information
  get user() {
    return this.ctx.session.user;
  }

  get extra() {
    return {
      ip: this.ctx.ip,
      payload: this.ctx.request.body,
    };
  }

  get tags() {
    return {
      url: this.ctx.request.url,
    };
  }
}

module.exports = SentryService;
```

These information would be automaticlly injected into error context.

## Bootstrap

Replace the `dsn` in `test/fixtures/apps/sentry-test/config/config.unittest.js` and then run `npm start` to see what would happen.
