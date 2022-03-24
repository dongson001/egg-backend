'use strict'; // eslint-disable-line

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', jwt, controller.home.index);

  // 验证码
  router.get('/captcha', controller.utils.captcha);

  router.post('/user/login', controller.user.login);
  router.post('/user/info', jwt, controller.user.index);
  router.post('/user/add', jwt, controller.user.add);
  router.post('/user/update', jwt, controller.user.update);
  router.post('/user/delete', jwt, controller.user.delete);
  router.post('/user/list', jwt, controller.user.list);
};
