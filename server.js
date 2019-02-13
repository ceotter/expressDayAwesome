const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const routeHandlers = require('./routeHandlers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', onDBConnected);

function onDBConnected() {
  console.log('we\'re connected!');

  //routes are below
  //=========================
  app.get('/', routeHandlers.testReq)
  app.get('/dogs', routeHandlers.getDogs)
  app.post('/dogs', routeHandlers.createDog)
  app.delete('/dogs/:_id', routeHandlers.deleteDog);
  app.put('/dogs/:_id', routeHandlers.editDog);
}

const appListen = function(){
  console.log("We are running on " + port);
};

app.listen(port, appListen);
