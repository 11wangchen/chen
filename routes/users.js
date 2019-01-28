var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册接口
router.post("/regist",(req,res)=>{
var  data=req.body;
	var username = data.username;
//查询数据库中是否重名
MongoClient.connect(url,(err,db)=>{

if(err) throw err;
		var dbase = db.db("mydb");
		var cols = dbase.collection("users");
  cols.find({username:username}).toArray((err,result)=>{
			if(result.length != 0){
				res.send("0");
			}else{
				cols.insertOne(data,(err,result)=>{
					res.send("1");
				})
			}
			db.close();
		})
})
// res.send("1");

})
module.exports = router;
