const models = require('./models');
module.exports = {
  testReq: function testReq(req, res) {
    res.send('hello world');
  },
  getDogs: function (req, res) {
    models.Dog.find(function (err, dogs) {
      if (err) return res.status(500).json(err);
      res.json(dogs);
    })
  },
  createDog: function (req, res) {
    // was save, now is create with object as first param
    // we no longer need to create a new Dog()
    models.Dog.create(req.query, function (err, savedDog) {
      if (err) return res.status(400).json(err);
      res.status(201)
      res.json(savedDog);
    })
  },
  deleteDog: function (req, res) {
    models.Dog.deleteOne(req.params, function(err, deleteInfo){
      if (!deleteInfo.deletedCount){
        res.status(404).json({message: `dog not found ${req.params._id}`})
        return;
      }
      res.status(200).json({message: `successfully deleted dog ${req.params._id}`})
    });
  },
  editDog: function (req, res) {
    models.Dog.findById(req.params._id, function (err, dog) {
      if (err) return res.status(404).json({message: `dog not found ${req.params._id}`});
      if(req.query.name) {
        dog.name = req.query.name;
      }
      if(req.query.age) {
        dog.age = req.query.age;
      }
      dog.save(function (err, savedDog) {
        if (err) return res.status(500).json(err);
        res.status(200).json(savedDog);
      })
    });
  }
}
