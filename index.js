const express = require('express');
const app = express()
const port = 3000


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("model").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
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