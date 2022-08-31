'use strict'; // eslint-disable-line
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  // eslint-disable-next-line
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642143345277_5877';

  config.multipart = {
    mode: 'file',
    whitelist: () => true,
  };

  config.UPLOAD_DIR = path.resolve(__dirname, '..', 'app/public');

  // add your middleware config here
  config.middleware = [];

  config.jwt = {
    secret: '123456',
  };

  config.mysql = {
    client: {
      // host
      host: '119.3.110.210',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'test_user',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.cors = {
    origin: '*',
    allowMethods: 'get,post',
    credentials: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
      },
    },
    mongoose: {
      client: {
        url: 'mongodb://119.3.110.210:27017/kkbhub',
        options: {},
      },
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
