let express = require("express")();
let mysql = require("mysql");
const port = 8080;

// 跨域处理
express.all("/*",function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",`3.2.1`);
    res.header("Content-Type","application/json;charset=utf-8");
    next();
})
let sql = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"students",
    timezone:"08:00"//设置时间类型为年月日，没有时分秒
})
sql.connect();
// 登录接口
express.get("/login",(request,response)=>{
    let username = request.query.username;
    let password = request.query.password;
    sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`,(error,data)=>{
        if(error){
            console.log(error);
            response.send("error")
        }
        else{
            if(!data.length){
                response.send("error")
            }
            else{
                response.send("success")
            }
        }
    })
})
// 注册接口
express.get("/addUser",(request,response)=>{
    let username = request.query.username;
    let password = request.query.password;
    sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`,(error)=>{
        if(error){
            console.log(error);
            response.send("error")
        }
        else{
            response.send("success")
        }
    })
})
// 获取学生信息接口
express.get("/getStudents",(request,response)=>{
    const id = request.query.id;
    let s =id ?`SELECT * FROM students WHERE id="${id}"`:`SELECT * FROM students`
    sql.query(s,(error,data)=>{
        if(error){
            console.log(error);
            response.send("error")
        }
        else{
            response.send(data)
        }
    })
})
// 删除学生信息接口
express.get("/deleteStudents",(request,response)=>{
    const id = request.query.id;
    sql.query(`DELETE FROM students WHERE id=${id}`,(error,data)=>{
        if(error){
            console.log(error);
            response.send("error")
        }
        else{
            response.send("success")
        }
    })
})
// 添加学生信息接口
express.get("/addStudents",(request,response)=>{
    const name = request.query.name;
    const sex= request.query.sex;
    const age = request.query.age;
    const city= request.query.city;
    const joinDate = request.query.joinDate;
    if(name && sex && age && city && joinDate){
    let s =`INSERT INTO students (name,sex,age,city,joinDate) VALUES ("${name}","${sex}","${age}","${city}","${joinDate}") `
    sql.query(s,(error,data)=>{
        if(error){
            console.log(error);
            response.send("error")
        }
        else{
            response.send("success")
        }
    })
    }
    else{
        response.send("error")
    }
})
express.listen(port)
console.log("server is running at" + port)