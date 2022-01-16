// app/service/user.js

'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find() {
  // "users" 为test数据库数据表名
    const user = await this.app.mysql.query('select * from user_info', '');
    return { user };
  }
}

module.exports = UserService;
