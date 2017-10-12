const mongoose = require('mongoose')
const {
    p_public
} = require('./models/index')
mongoose.Promise = global.Promise


const CONFIG = require('./config')

mongoose.set('debug', true)

const DB_URI = (() => {
    if (CONFIG.user && CONFIG.password) {
        return `mongodb://${ CONFIG.user }:${ CONFIG.password }@${ CONFIG.adress }:${ CONFIG.port }/${ CONFIG.database }`
    }
    return `mongodb://${ CONFIG.adress }:${ CONFIG.port }/${ CONFIG.database }`
})()

mongoose.connect(DB_URI, {
    useMongoClient: true
})


let DB = mongoose.connection

DB.on('error', console.error.bind(console, '数据库连接操作发生 "Connect error" 错误!\n'))
    .once('open', () => console.log(`恭喜, 已经成功连接数据库!\n`))

module.exports = DB

p_public.createProduct({
    name: '芙蓉王(SSs)',
    barCode: '98295435645769',
    has_parts: true,
    product_level: 1,
    times_of_lower_product: 10,
    unit_id: '59b7f6baf1199f39eca10962'
})
// M.product_detail_info.getLevelsByOnePID('59b7bcb6a1f5c85fcc029410').then(s => console.log(s)).catch(err => console.log(err))
// user.save().then(data => console.log(`数据库操作成功. \n${data._id}\n`)).catch(err => console.error(`Err: ${err}\n`))
