var mysql = require('mysql')
var express = require('express')
var jade = require('jade')
var app = express()
var user = express.Router()
app.use('/user', user)

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'haozhishuo',
	database: 'login',
	port: 3306
})

user.post('/list', function(req, res) {
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection：：' + err)
			return
		}
		var sql = 'select * from news'
		connection.query(sql, function(err, data) {
			if(err) {
				console.log('mysql：：' + err)
				return
			}

			var str = jade.renderFile('./1.jade', {
				pretty: true,
				arrs: data
			})
			res.send(str)
			connection.end()
		})
	})
})
user.get('', function(req, res) {
	var uid = req.query.uid
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection：：' + err)
			return
		}
		var sql = 'select * from news where uid=?'
		connection.query(sql, [uid], function(err, data) {
			if(err) {
				console.log('mysql：：' + err)
				return
			}
			var str = jade.renderFile('./2.jade', {
				pretty: true,
				news: data[0]
			})
			res.send(str)
			connection.end()
		})
	})

})
app.use(express.static('./'))
app.listen(8000, function() {
	console.log('ok')
})