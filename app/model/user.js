'use strict'; // eslint-disable-line

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const userSchema = new Schema({
    email: { type: 'string', required: true },
    passwd: { type: 'string', required: true },
    nickname: { type: 'string', required: true },
    avatar: { type: 'string', required: true, default: '/user.png' },
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
};
