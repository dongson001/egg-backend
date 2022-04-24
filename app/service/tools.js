'use strict'; // eslint-disable-line

const { Service } = require('egg');
const nodemailer = require('nodemailer');

const useremail = 'ldong2022@qq.com';
const transporter = nodemailer.createTransport({
  service: '126',
  // host: 'smtp.126.com',
  // port: 465,
  secureConnection: true,
  // secure: true,
  auth: {
    user: useremail,
    // pass: 'liudong1@',
    pass: '111111',
  },
});


class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailoptions = {
      form: useremail,
      cc: useremail,
      to: email,
      subject,
      text,
      html,
    };
    try {
      await transporter.sendMail(mailoptions);
      return true;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  }
}

module.exports = ToolService;
