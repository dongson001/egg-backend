'use strict'; // eslint-disable-line

const { Service } = require('egg');
const nodemailer = require('nodemailer');
const path = require('path');
const fse = require('fs-extra');

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

  async mergeFile(filepath, hash, size) {
    const chunkDir = path.resolve(this.config.UPLOAD_DIR, hash);
    let chunks = await fse.readdir(chunkDir);
    chunks = chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1]);
    chunks = chunks.map(cp => path.resolve(chunkDir, cp));
    await this.mergeChunks(chunks, filepath, size);
  }

  async mergeChunks(files, dest, size) {
    const pipStream = (filepath, writeStream) => new Promise(resolve => {
      const readStream = fse.createReadStream(filepath);
      readStream.on('end', () => {
        fse.unlink(filepath);
        resolve();
      });
      readStream.pipe(writeStream);
    });

    await Promise.all(
      files.map((file, index) => {
        console.log('file, index:', size ,file, index);
        pipStream(file, fse.createWriteStream(dest, {
          start: index * size,
          end: (index + 1) * size,
        }));
      })
    );
  }
}

module.exports = ToolService;
