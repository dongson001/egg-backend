'use strict'; // eslint-disable-line

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const userSchema = new Schema({
    __v: { type: Number, select: false },
    email: { type: 'string', required: true },
    passwd: { type: 'string', required: true, select: false },
    nickname: { type: 'string', required: true },
    avatar: { type: 'string', required: true, default: '/user.png' },
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
};
