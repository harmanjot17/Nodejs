const express = require('express');
const app = express()
const port = 3000
var mongoose = require('mongoose')

var mongoDB =  'mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log("Connected to DB");
});



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

//   var myobj = { name: "swift", address: "Highway 37" };
//   dbo.collection("model").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   })

dbo.collection("model").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close()
  });
});




app.get('/', (req, res)=>{
    // welcome to book store
    res.json({ message : 'Welcome to book  store'});  //.json return objects
});

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})