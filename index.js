// Importing mongotb modules specifcially
// mongo db client obejct 
var MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express()
// Mongodb database uri 
const uri = "__YOUR URI HERE__";

// Database varible
// we create this variable to resure the
// db connection when we want to query our db
// or in other words a request
let db;
// Make connection pass in parrameters of database 
// Here we are using the functions we just imported
// to connect to our db
// {useUnifiedTopology: true} : 
MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) =>{
     if (err) throw err;

     console.log('MongoDB connection Succeeded.');

    // creating our db
    // call it whatever you want but make sure its relevant
     db = client.db('Blogs')
})

app.post('/addBlog', (req, res) =>{
    db.collection('blogs').insertOne({
        title: 'hello world',
        content: 'First blog post'
    }, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/getBlog', (req, res) =>{
    db.collection('blogs').findOne({
        title: 'hello world',
    }, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})

var port = process.env.Port || 3000;
app.listen(port, ()=>{
    console.log('Listenig on port', port)
})
