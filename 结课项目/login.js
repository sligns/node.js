var mysql = require('mysql')
var express = require('express')
var multer = require('multer')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var jade = require('jade')
var app = express()
var user = express.Router()
app.use(bodyParser.urlencoded({}))
app.use(multer({dest:'./img'}).any())
app.use('/user', user)

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'haozhishuo',
	database: 'login',
	port: 3306
})

user.post('/denglu', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	var user = req.body.user
	var pass = req.body.pass
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection::' + err)
			return
		}
		connection.query('select * from user where user=?', [user], function(err, data) {
			if(err) {
				console.log('mysql::' + err)
				return
			}
			if(data == '') {
				res.send('用户名不存在')
			} else {
				if(data[0].pass == pass) {
					res.send('登陆成功')
				} else {
					res.send('用户名或密码不对')
				}
			}

		})
	})

})

user.post('/zhuce', function(req, res) {
	var user = req.body.user
	var pass = req.body.pass
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection::' + err)
			return
		}

		connection.query('select * from user where user=?', [user], function(err, data) {
			if(err) {
				console.log('mysql::' + err)
				return
			}
			if(data == '') {
				connection.query('insert into user(user,pass) values(?,?)', [user, pass], function(err, data) {
					if(err) {
						console.log('mysql::' + err)
						return
					}
					res.send('注册成功')
				})
			} else {
				res.send('用户名存在')
			}

		})
	})

})

user.post('/img',function(req,res){
	var img = req.files
	var name = req.files[0].filename
	var newName = name+path.parse(req.files[0].originalname).ext
	fs.rename('./img/'+name,'./img/'+newName,function(err){
		if(err){
			console.log(err)
			return
		}
		res.send('http://localhost:8000/img/'+newName)
	})
	console.log(newName)
	
})
user.post('/lee',function(req,res){
	var imgurls = req.body.imgurls
    var name = req.body.name
    var sex = req.body.sex
    var ip = req.body.ip
    var tel = req.body.tel
    var email = req.body.email
    var qq = req.body.qq
    var userid = req.body.userid
    pool.getConnection(function(err,connection){
    	if(err){
    		console.log('connection::'+err)
    		return
    	}
    	var sql = 'insert into name(name,imgurl,sex,ip,tel,email,qq,userid) values(?,?,?,?,?,?,?,?)'
    	var arr = [name,imgurls,sex,ip,tel,email,qq,userid]
    	connection.query(sql,arr,function(err,data){
    		if(err){
    			console.log('mysql::'+err)
    			return
    		}
    		
    		res.send('ok')
    		connection.end()
    	})
    })
})


app.use(express.static('./'))
app.listen(8000, function() {
	console.log('ok')
})