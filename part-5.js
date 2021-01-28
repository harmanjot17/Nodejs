const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//Import the mongoose module
var mongoose = require('mongoose');


var mongoDB = 'mongodb://127.0.0.1/todo-app'; //Set up default mongoose connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection; //Get the default connection

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function(){
  console.log("Connected to DB");
  //do operations which involve interacting with DB.
});



// Define schema
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title : String,
  description : String,
  status : String,
  created: Date
});

const  todo = mongoose.model('Todo', todoSchema ); // Compile model from schema

//** TODO Task creation Route */
app.post('/todo', (req, res)=> {

    const title = req.body.item_name;
    const description = req.body.item_description;
    const status = req.body.item_status;

    const todoItem = new todo( { title : title , description : description, status : status});

    todoItem.save(function(err){
        
        res.json({message : 'Todo item created'});

    });    

});


/** TODO Task display  - Get all todo items */

app.get('/todo', (req, res)=>{

    todo.find({}, (err, obj)=>{
        res.json(obj) ;
    })
});

app.put('/todo/:id',(req,res)=>{

  const ID = req.params.id
  const title = req.body.item_name;
  const description=req.body.item_description;
  const status = req.body.item_status;
todo.findByIdAndUpdate(ID,{ title : title , description : description, status : status},function(err, result){

    if(err){
        res.json({"mess":"error"});
    }
    else{
      res.json({"mess":"Updated"});
    }
})
});
app.delete('/todo/del/:id',(req,res)=>{
  const ID = req.params.id;
  todo.findByIdAndRemove(ID, function(err, result){

    if(err){
        res.json({"mess":"error"});
    }
    else{
      res.json({"mess":"Deleted"});
    }
})
})

app.listen(4000, ()=>{
    console.log('server started');
}) 

