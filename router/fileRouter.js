const express = require("express");
const fs = require("fs");
var router = express.Router();


//post请求 写个接口测试一下路由会不会报错 
// router.post('/test',function(req,res){
//     // res.send(req.body)
//     res.send('ok')
// })

//写上传接口
router.post('/upload', (req, res) => {
    //检查是否有文件
    if (!req.files) {//如果req是空 返回400
        res.send({
            code: 400,
            msg: '上传文件不能为空',
        });
        return;
    }

        //保存文件
        let files = req.files; //将获取的文件放到files
        let ret_files = []; //定义一个空数组
        for (let file of files) {//将files循环成单个
            //获取名字后缀
            let file_ext = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
            //将文件名改为时间戳
            let file_name = new Date().getTime() + '.' + file_ext
            //移动文件并且修改文件名字
            fs.renameSync(
                process.cwd() + "/public/upload/temp/" + file.filename,//file.filename：文件最初名字
                process.cwd() + "/public/upload/" + file_name, //file_name：时间戳新起的名字
            );
            //将改完的文件写进空数组
            ret_files.push("./public/upload/" + file_name)
        }

        res.send({
            code: 200,
            msg: 'OK',
            data: ret_files //返回data给前端预览
        })
})

//下载接口
router.get('/download',async(req,res)=>{
    let file_name = req.query.file_name;
    let file_path = process.cwd()+'/public/upload/'+file_name;
    res.download(file_path);
})


//3、把它加到模块上
module.exports = router;