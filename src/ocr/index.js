const OCRClient = require('baidu-ai').ocr
const fs = require('fs')

const [APP_ID, API_KEY, SECRET_KEY] = ['10163801', 'XHrwxqM4GioCUrT6MxksATZ9', 'DrkXM27742SmwDXrGzAqPSwc19wXMsvR']

const client = new OCRClient(APP_ID, API_KEY, SECRET_KEY)

let requestId
let imageDataString = new Buffer(fs.readFileSync('d:\\Desktop\\timg.jpg')).toString('base64')

client.tableRecorgnize(imageDataString, 'excel', 10000).then(function(result) {
  let resStr = JSON.stringify(result)
  console.log(resStr)
})
