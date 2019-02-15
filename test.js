const mocha = require('mocha');
const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('sinon-mongoose');
const superTest = require('supertest');

const models = require('./models');
const routeHandlers = require('./routeHandlers');

const ValidationError = mongoose.Error.ValidationError;

xit('dummyTest', function(){
  expect(true).to.equal(true);
})

xit('test the test', function() {
  let req = {};
  let res = {
    sentArgs: '',
    send: function(arg) {
      this.sentArgs = arg;
    },
  };
  routeHandlers.testReq(req, res);
  expect(res.sentArgs).to.equal('hello world');
})

let res = {};

let sandbox;

beforeEach(function() {
  sandbox = sinon.createSandbox();
  // Setting a spy function on json and status
  res = {
    json: sinon.spy(),
    status: sinon.stub().returns({json: sinon.spy()})
  }
})
afterEach(function(){
  sandbox.restore();
})

describe('create dog', function() {

  it('Should create a dog', function() {
    let req = {
      query: {
        name: "Hercules",
        age: 5
      }
    };
    let expectedResult = req.query;
    sandbox.stub(models.Dog, 'create').yields(null, expectedResult);
    routeHandlers.createDog(req, res);
    sinon.assert.calledWith(models.Dog.create, req.query);
    sinon.assert.calledWith(res.json, sinon.match({name: req.query.name, age: req.query.age}));
  })

  it('should require name and age', function(){
    let req = {
      query: {}
    }
    let expectedResult = new ValidationError();
    expectedResult.errors = {
      age: {
        type: 'required'
      },
      name: {
        type: 'required'
      }
    };
    sandbox.stub(models.Dog, 'create').yields(expectedResult);
    routeHandlers.createDog(req, res);
    sinon.assert.calledWith(res.status, sinon.match(400))
  })
})

describe('get dogs', function(){
  it('should return an array of dogs', function(){
    let req = {
      query: {}
    }
    let expectedResult = [
      {
        "_id": "5c6329f3818608506c11a9fe",
        "name": "Roxy",
        "age": 1,
        "__v": 0
      },
      {
        "_id": "5c632b6a53013e50a43cbe36",
        "name": "Sophie",
        "age": 5,
        "__v": 0
      }
    ];

    sandbox.stub(models.Dog, 'find').yields(null, expectedResult);
    routeHandlers.getDogs(req, res);
    sinon.assert.calledWith(res.status, sinon.match(200))
  })
})
