const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//Create connection with mysql

const db = mysql.createConnection({
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'users'
});

//Connect with db

db.connect((err) => {
      if(err){
            throw err;
            console.log('Database Error', err);
      }
      else{
            console.log('Mysql connected...');
      }
})


app.listen('3200', () => {
      console.log('Server started on port 3200');
})

//Create DB
app.get('/createDB', (req, res) => {
      console.log('Create Database');
      let sql = 'CREATE DATABASE users';

      db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Database Created');
            }
      })
})

app.get('/createpostsTable', (req, res) => {
      let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';

      db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Table Created');
            }
      })
})

app.get('/addPost', (req, res) => {
      let post = {title : "Post One", body : "This is post number one"};
      let sql = 'INSERT INTO posts SET ?';
      let query = db.query(sql, post, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  res.send('Data Inserted');
            }
      })
})

app.get('/getPosts', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let sql = 'SELECT * FROM posts';
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                
                  let obj = {
                        status : 200,
                        error : false,
                        response : result
                  };

                  res.send(obj);
            }
      })
})

app.post('/addUser', (req, res) => {

      let requestObj = req.body;

      console.log('Request Body', req.body);

      requestObj.map((ele) => {
            ele.created_date = new Date();
            let sql = 'INSERT INTO user_details SET ?';
            let query = db.query(sql, ele, (err, result) => {
                  if(err){
                        throw err;
                  }
                  else{
                        console.log('Result', result);
                        let userObj = [{
                              username : ele.email,
                              password : 'abc123',
                              user_id : result.insertId
                        }];

                        let sql2 = 'INSERT INTO users SET ?';
                        let query2 = db.query(sql2, userObj, (err, result) => {
                              if(err){
                                    throw err
                              }
                        })
                  }
            })
      }, (res) => {
            res.send({
                  status : 200,
                  error : false,
                  response : "Data inserted" 
            })
      })
})

app.post('/login', (req, res) => {
      let userObj = req.body;

      let sql = `SELECT * FROM users WHERE username = '${userObj.username}' AND password = '${userObj.password}'`;
      let query = db.query(sql, (err, result) => {
            if(err){
               throw(err);
                 res.send({
                       error : true,
                       status : 500
                 })
            }
            else{
                  console.log('Result', result);
                  if(result.length > 0){
                        res.send({
                              error: false,
                              status : 200,
                              response : 'User authenticated'
                        })
                  }
                  else{
                        res.send({
                              error: true,
                              status : 200,
                              response : 'User not authenticated'
                        })
                  }
                 
            }
      })
})

app.get('/getPost/:id', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Fetched...');
            }
      })
})

app.get('/updatePost/:id', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let newTitle = "Post Two";
      let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`;
      console.log('SQL Query', sql);
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Post Updated...');
            }
      })
})

app.get('/deletePost/:id', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Posts Deleted...');
            }
      })
})

app.get('/getUsers/:name', (req, res) => {
      // let post = {title : "Post One", body : "This is post number one"};
      let sql = `SELECT d.*, u.* FROM departments AS d LEFT JOIN users AS u ON u.id = d.user_id WHERE d.department = "${req.params.name}"`;
       db.query(sql, (err, result) => {
            if(err){
                  throw err;
            }
            else{
                  console.log('SQL Result', result);
                  res.send('Users Fetched...');
            }
      })
})