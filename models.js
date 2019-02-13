const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = {
  Dog: Dog
}
