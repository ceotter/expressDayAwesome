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

let req = {

}

let res = {
  sentArgs: '',
  send: function(arg) {
    this.sentArgs = arg;
  },
}

xit('test the test', function() {
  routeHandlers.testReq(req, res);
  expect(res.sentArgs).to.equal('hello world');
})

describe('create dog', function() {

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
