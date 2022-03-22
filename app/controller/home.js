'use strict'; // eslint-disable-line

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('123');
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
