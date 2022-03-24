'use strict'; // eslint-disable-line

const svgCaptcha = require('svg-captcha');
const { Controller } = require('egg');

class UtilsController extends Controller {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 6,
    });
    ctx.session.captcha = captcha.text;
    console.log('captcha:', captcha.text);
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = UtilsController;
