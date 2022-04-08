'use strict'; // eslint-disable-line

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
//   jwt: {
//     enable: true,
//     package: 'egg-jwt',
//   },
//   cors: {
//     enable: true,
//     package: 'egg-cors',
//   },
//   mysql: {
//     enable: true,
//     package: 'egg-mysql',
//   },
// };

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

