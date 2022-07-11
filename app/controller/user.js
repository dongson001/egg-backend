'use strict'; // eslint-disable-line

const BaseController = require('./base');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
};
const HashSalt = 'dongsonkkb';
class UserController extends BaseController {
  async register() {
    const { ctx } = this;
    try {
      // 验证传的参数
      ctx.validate(createRule);
    } catch (e) {
      console.log('e:', e);
      this.error('参数效验失败', e.error);
    }
    const {
      email, nickname, passwd, captcha,
    } = ctx.request.body;
    console.log('email, nickname, passwd, captcha:', email, nickname, passwd, captcha);

    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误');
    }
    if (await this.checkEmail(email)) {
      this.error('邮箱重复了');
    } else {
      const ret = await ctx.model.User.create({
        nickname,
        email,
        passwd: md5(passwd + HashSalt),
      });
      if (ret._id) {
        this.message('注册成功');
      } else {
        console.log('ret:', ret);
      }
    }
  }

  async login() {
    const { ctx, app } = this;
    const { email, passwd, captcha } = ctx.request.body;
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误');
    }

    const user = await ctx.model.User.findOne({
      email,
      passwd: md5(passwd + HashSalt),
    });
    if (!user) {
      return this.error('用户名或密码错误');
    }

    // 用户信息token返回
    const token = jwt.sign({
      _id: user._id,
      email,
    }, app.config.jwt.secret, {
      expiresIn: '1h',
    });
    this.success({ email, nickname: user.nickname, token });
  }

  async checkEmail(email) {
    console.log('this.ctx.model', this.ctx.model);
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }

  async info() {
    const { ctx } = this;
    const { email } = ctx.state;
    const user = await this.checkEmail(email);
    this.success(user);
  }

  async index() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    if (user) {
      ctx.body = {
        code: 0,
        data: user[0],
      };
    }
  }

  async add() {
    const { ctx } = this;
    const data = ctx.request.body;
    console.log('userAdd params  ', data);
    const user = await ctx.service.user.findUserByName(data.name);
    console.log('user', user);
    if (user.user) {
      ctx.body = {
        message: '添加失败,用户名已被占用',
        code: 500,
      };
      return;
    }
    const result = await ctx.service.user.addUser(data);
    console.log('userAdd result:', result);
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) {
      ctx.body = {
        message: '添加成功',
        code: 0,
      };
    } else {
      ctx.body = {
        message: '添加失败',
        code: 500,
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
    const data = ctx.request.body;
    console.log('list params  ', data);
    const user = await ctx.service.user.list(data);
    const userCount = await ctx.service.user.listCount();
    console.log('userCount:', userCount);
    console.log('user:', user);
    ctx.body = {
      code: 0,
      data: {
        list: user.results,
        totalCount: userCount[0]['count(*)'],
      },
    };
  }

  async nav() {
    const { ctx } = this;    
    ctx.body = {
      code: 0,
      data: [
        {
          name: '首页',
          id: 1,
          url: 'home',
        },
        {
          name: '用户管理',
          id: 100,
          url: 'userList',
          children: [
            {
              name: '用户列表',
              id: 101,
              url: 'userList',
            },
            {
              name: '用户中心',
              id: 102,
              url: 'uc',
            },
          ],
        },
        {
          name: 'xxxx',
          id: 200,
          url: 'home1',
        },
      ],
    };
  }
}

module.exports = UserController;
