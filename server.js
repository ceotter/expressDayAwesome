const express = require('express');
const port = 3000;
const app = express();
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', onDBConnected);

function onDBConnected() {
  console.log('we\'re connected!');
  const dogSchema = new mongoose.Schema({
    name: String,
    age: Number
  });

  dogSchema.methods.speak = function () {
    const greeting = this.name
      ? "Wooff name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }

  const Dog = mongoose.model('Dog', dogSchema);

  // const sophie = new Dog({ name: 'Sophie', age: 5 });


  // sophie.save(function (err, savedSophie) {
  //   if (err) return console.error(err);
  //   savedSophie.speak();
  // });
  app.get('/', function (req, res) {
    res.send('hello world')
  })
  app.get('/dogs', function (req, res) {
    Dog.find(function (err, dogs) {
      if (err) return res.status(500).json(err);
      res.json(dogs);
    })
  })
    // POST method route
  app.post('/dogs', function (req, res) {
    console.log(req.query)
    const newDog = new Dog(req.query);
    newDog.save(function (err, savedDog) {
      if (err) return res.status(500).json(err);
      res.status(201).json(savedDog);
    })
  })

  app.delete('/dogs/:_id', function (req, res) {
    console.log(req.params);
    Dog.deleteOne(req.params, function(err, deleteInfo){
      console.log(err);
      if (!deleteInfo.deletedCount){
        res.status(404).json({message: `dog not found ${req.params._id}`})
        return;
      }
      res.status(200).json({message: `successfully deleted dog ${req.params._id}`})
    });
  });

}

const appListen = function(){
  console.log("We are running on " + port);
};

//Middle man
// function addStatic(){
//    return express.static(path.join(__dirname, "public"))
// }


// app.use(addStatic())
app.listen(port, appListen);
