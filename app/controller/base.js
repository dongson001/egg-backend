'use strict'; // eslint-disable-line
// 规范

const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    };
  }

  error(message, code = -1, error = {}) {
    this.ctx.body = {
      code,
      message,
      error,
    };
  }
}

module.exports = BaseController;
