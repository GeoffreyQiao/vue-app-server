/**
 * mongoose 连接 mongodb 服务的配置
 * @typedef  {Object}   DBconfig
 * @param {(String|void)}   user                用户名
 * @param {(String|void)}   password     密码
 * @param {(String|void)}   adress           地址
 * @param {(String|void)}   port                端口
 * @param {(String|void)}   database      数据库名
 */
const CONFIG = {
    user: undefined,
    password: undefined,
    adress: 'localhost',
    port: '27017',
    database: 'app-test'
}

/** @return  {DBconfig}  CONFIG */
module.exports = CONFIG
