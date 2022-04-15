'use strict'; // eslint-disable-line

const svgCaptcha = require('svg-captcha');
const BaseController = require('./base');

class UtilsController extends BaseController {
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

  async sendEmail() {
    const { ctx } = this;
    const { email } = ctx.query;
    console.log('email:', email);
    const code = Math.random().toString().slice(2, 6);
    console.log('code:', code);
    ctx.session.emailCode = code;
    const subject = '验证码';
    const text = '';
    const html = `<h2>小东社区</h2>你的验证码是<br>${code}`;
    const hasSend = await this.service.tools.sendMail(email, subject, text, html);
    if (hasSend) {
      this.message('发送成功');
    } else {
      this.error('发送失败');
    }
  }
}

module.exports = UtilsController;
