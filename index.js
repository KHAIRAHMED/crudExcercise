const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const pass = "mongoExcercise"
const userName = "mongoExcercise"
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mongoExcercise:mongoExcercise@cluster0.le06q.mongodb.net/mongoExcercise?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectId = require('mongodb').ObjectId;

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html")
})



// mongoDB server 



// CRUD operation 
client.connect(err => {
  const collection = client.db("mongoExcercise").collection("products");
  // C= Create operation 
  app.post('/addProduct', function (req, res) {
    const product = req.body
    collection.insertOne(product)
    .then(result => {
      res.redirect("/")
    });
   }); 

  //  R = Read operation 
  app.get("/products",(req , res)=>{
    collection.find({})
    .toArray((err , doc)=>{
      res.send(doc)
    })
  })

// D = Delete Operation 

app.delete('/delete/:id',(req , res)=>{
  // console.log(req.params.id)
  collection.deleteOne({_id : ObjectId(req.params.id)})
  .then(result => {
    res.send(result.deletedCount > 0)
  })
})


  // U = Update Operation 
app.get('/product/:id',(req , res )=>{
  collection.find({_id : ObjectId(req.params.id)})
  .toArray((err , doc)=>{
    res.send(doc[0])
  })
})
app.patch('/update/:id',(req , res)=>{
  collection.updateOne({_id : ObjectId(req.params.id)},
  {$set: {price : req.body.price , quantity : req.body.quantity}}
  )
  .then(result =>  {
    res.send(result.modifiedCount > 0)
  })
  })


})




app.listen(3030,()=>console.log("server is working"))