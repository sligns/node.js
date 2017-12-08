var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var user = express.Router()
var user1 = express.Router()
var user2 = express.Router()
var app = express()
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'haozhishuo',
	database:'name',
	port:'3306'
})
app.use(bodyParser.urlencoded({})
app.use('/user',user)
app.use('/user1',user1) 
app.use('/user2',user2) 

user.post('',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var uid=req.body.uid
	var name=req.body.name
	var pass=req.body.pass
	var tele=req.body.tele
	pool.getConnection(function(){
		if(err){
    		console.log('connection::'+err)
    		return
    	}
		    	var sql = 'select * from name where name=?'
    	connection.query(sql,[name],function(err,data){
    		 var newArr = []
    		if(err){
    			console.log('mysql::'+err)
    			return
    		}
    		if(uid == undefined){
	 	newArr=name.slice(0,3)
	 	uid = 0
	 }else{
	 	newArr=name.slice(uid*3,uid*3+3)
	 }
	 var num = Math.ceil(name.length/3)	
	var str = jade.renderFile('./jade.jade',{pretty:true,titles:'新闻',txtArr:newArr,nums:num,txtUsd:uid,urld:'name'})
    		
    		res.send(str)
    		connection.end()
    	})
    	})
	})
	user1.post('',function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*')
	var uid=req.body.uid
	var name=req.body.name
	var pass=req.body.pass
	var tele=req.body.tele
	pool.getConnection(function(){
		if(err){
    		console.log('connection::'+err)
    		return
    	}
		    	var sql = 'select * from name where pass=?'
    	connection.query(sql,[pass],function(err,data){
    		 var newArr = []
    		if(err){
    			console.log('mysql::'+err)
    			return
    		}
    		if(uid == undefined){
	 	newArr=pass.slice(0,3)
	 	uid = 0
	 }else{
	 	newArr=pass.slice(uid*3,uid*3+3)
	 }
	 var num = Math.ceil(pass.length/3)	
	var str = jade.renderFile('./jade.jade',{pretty:true,titles:'新闻',txtArr:newArr,nums:num,txtUsd:uid,urld:'pass'})
    		
    		res.send(str)
    		connection.end()
    	})
    	})
	})
	
	user2.post('',function(req,res){
		res.setHeader('Access-Control-Allow-Origin','*')
	var uid=req.body.uid
	var name=req.body.name
	var pass=req.body.pass
	var tele=req.body.tele
	pool.getConnection(function(){
		if(err){
    		console.log('connection::'+err)
    		return
    	}
		    	var sql = 'select * from name where tele=?'
    	connection.query(sql,[tele],function(err,data){
    		 var newArr = []
    		if(err){
    			console.log('mysql::'+err)
    			return
    		}
    		if(uid == undefined){
	 	newArr=tele.slice(0,3)
	 	uid = 0
	 }else{
	 	newArr=tele.slice(uid*3,uid*3+3)
	 }
	 var num = Math.ceil(tele.length/3)	
	var str = jade.renderFile('./jade.jade',{pretty:true,titles:'bbb',txtArr:newArr,nums:num,txtUsd:uid,urld:'tele'})
    		
    		res.send(str)
    		connection.end()
    	})
    	})
	
	})

	

app.use(express.static('./'))
app.listen(8000,function(){
	console.log('ok')
})
