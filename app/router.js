'use strict'; // eslint-disable-line

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });

  // 验证码
  router.get('/captcha', controller.utils.captcha);

  // 邮箱验证码
  router.get('/sendEmail', controller.utils.sendEmail);

  // 文件上传
  router.post('/uploadFile', controller.utils.uploadFile);

  // 文件merge
  router.post('/mergeFile', controller.utils.mergeFile);

  router.group(
    {
      name: 'user',
      prefix: '/user',
    },
    router => {
      const { register, login, info, nav, list } = controller.user;
      router.post('/register', register);
      router.post('/login', login);
      router.post('/info', jwt, info);
      router.post('/nav', jwt, nav);
      router.post('/list', jwt, list);
    }
  );
};
