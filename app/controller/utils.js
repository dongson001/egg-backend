'use strict'; // eslint-disable-line

const svgCaptcha = require('svg-captcha');
const BaseController = require('./base');
const path = require('path');
const fse = require('fs-extra');

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

  async mergeFile() {
    const { ctx } = this;
    const { hash, ext, size } = ctx.request.body;
    const filePath = path.join(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    await ctx.service.tools.mergeFile(filePath, hash, size);
    this.message({
      url: `public/${hash}.${ext}`,
    });
  }

  async uploadFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const { name, hash } = ctx.request.body;
    const chunkPath = path.join(this.config.UPLOAD_DIR, hash);
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath);
    }

    // const filePath = path.join(this.config.UPLOAD_DIR, name);

    // console.log('name:', name, file);
    await fse.move(file.filepath, `${chunkPath}/${name}`);
    this.message('切片上传成功');
  }
}

module.exports = UtilsController;
