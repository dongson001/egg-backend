
<!-- 返回格式 -->
{
  code: 0,
  data: {},
  message: ''
}

code 0 是成功 其它都失败
    -1 是错误
    -666 登录状态过期


export PATH=/usr/local/mongodb/bin:$PATH
mongod --config /usr/local/etc/mongod.conf --fork