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
      name,
    });
    return { user };
  }
  async addUser(data) {
    const user = await this.app.mysql.insert('user_info', {
      name: data.name,
      pass: data.pass,
      update_time: new Date(),
      create_time: new Date(),
    });
    return user;
  }
  async list(data) {
    const results = await this.app.mysql.select('user_info', {
      // 搜索 user_info 表
      // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
      // columns: ['author', 'title'], // 要查询的表字段
      // orders: [
      //   ['created_at', 'desc'],
      //   ['id', 'desc'],
      // ], // 排序方式
      limit: data.pageInfo?.pageSize || 10, // 返回数据量
      offset: data.pageInfo?.pageNum - 1 || 0, // 数据偏移量
    });
    return { results };
  }
  async listCount() {
    const user = await this.app.mysql.query('select count(*) from user_info', '');
    return user;
  }
  
}

module.exports = UserService;
