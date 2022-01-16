"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    console.log(data);
    const token = app.jwt.sign(
      {
        nickname: data.name,
      },
      app.config.jwt.secret
    );
    console.log("token:", token);
    ctx.body = {
      data: {
        name: data.name,
        token
      },
    };
  }
  async index() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    ctx.body = user;
  }
}

module.exports = UserController;
