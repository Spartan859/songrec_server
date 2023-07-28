const  express = require('express')//引入模块
const uploadFile = express()//实例化
const multer = require('multer')//引入实例化上传文件模块
const port = 3005 //端口

//配置文件上传临时目录
const upload = multer({
    dest:'./public/upload/temp'//临时存放路径
})
//设置所有接口都允许上传功能
uploadFile.use(upload.any())

//引入路由--接入其他接口
uploadFile.use('/route',require("./router/fileRouter"))//通过路由的方式将上传和下载接口引入

//监听
uploadFile.listen(port, () => {
    //监听成功打印以下语句
    console.log(`Example app listening on port ${port}`)
})