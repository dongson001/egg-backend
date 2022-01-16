'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    console.log('login params  ', data);
    const user = await ctx.service.user.findUserByName(data.name);
    if (user?.user.pass === data.pass) {
      const token = app.jwt.sign(
        {
          nickname: data.name,
        },
        app.config.jwt.secret
      );
      console.log('token:', token);
      ctx.body = {
        code: 0,
        data: {
          name: data.name,
          token,
        },
      };
    } else {
      ctx.body = {
        code: 500,
        message: '用户名或者密码错误'
      };
    }
  }
  async index() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    ctx.body = {
      code: 0,
      data: user
    }
  }
  async add() {
    const { ctx } = this;
    const data = ctx.request.body;
    console.log('userAdd params  ', data);
    const result = await ctx.service.user.addUser(data);
    console.log('userAdd result:', result)
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      ctx.body = {
        message: '添加成功',
        code: 0
      };
    }else {
      ctx.body = {
        message: '添加失败',
        code: 500
      };
    }
  }
  async update() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    ctx.body = user;
  }
  async delete() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    ctx.body = user;
  }
  async list() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    ctx.body = user;
  }
}

module.exports = UserController;
