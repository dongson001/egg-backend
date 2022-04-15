'use strict'; // eslint-disable-line

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', jwt, controller.home.index);

  // 验证码
  router.get('/captcha', controller.utils.captcha);

  // 邮箱验证码
  router.get('/sendEmail', controller.utils.sendEmail);

  router.group(
    {
      name: 'user',
      prefix: '/user',
    },
    router => {
      const { register, login } = controller.user;
      router.post('/register', register);
      router.post('/login', login);
    }
  );

  // router.post('/user/login', controller.user.login);
  // router.post('/user/info', jwt, controller.user.index);
  // router.post('/user/add', jwt, controller.user.add);
  // router.post('/user/update', jwt, controller.user.update);
  // router.post('/user/delete', jwt, controller.user.delete);
  // router.post('/user/list', jwt, controller.user.list);
};
