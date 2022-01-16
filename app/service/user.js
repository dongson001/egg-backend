// app/service/user.js

'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find() {
    const user = await this.app.mysql.query('select * from user_info', '');
    return { user };
  }
  async findUserByName(name) {
    const user = await this.app.mysql.get('user_info', {
      name 
    });
    return { user };
  }
  async addUser(data) {
    const user = await this.app.mysql.insert('user_info', {
      name: data.name,
      pass: data.pass 
    });
    return user;
  }
}

module.exports = UserService;
