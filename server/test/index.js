//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var User = require('../models/user');
var _ = require('lodash');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

const testUser = {
  email: 'testemail@mail.com',
  password: 'testpassword'
};

//Our parent block
describe('Users', function () {
  this.timeout(10000);
  after(function(done) {
    User.remove({email: testUser.email}, function(err) {
      done();
    });
  });
  describe('GET auth/users', function() {
    it('it should return all the users', function(done) {
      chai.request(server)
        .get('/api/auth/users')
        .end(function(err, res) {
          res.should.have.status(200);
          JSON.parse(res.text).should.be.a('array');
          done();
        });
    });
  });

  describe('POST auth/register', function() {
    it('it should not register a new user without email', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({password: testUser.password})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should not register a new user without password', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({email:testUser.email})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property('password');
          res.body.errors.password.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should register a new user', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send(testUser)
        .end(function(err, res) {
          // console.log("Registering a new user: ", res.body);
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.data.should.have.property("_id");
          res.body.data.should.have.property("email");
          res.body.data.should.have.property("token");
          done();
        });
    });

    it('it should not register the same user twice', function(done) {
        chai.request(server)
          .post('/api/auth/register')
          .send(testUser)
          .end(function(err, res) {
            res.should.not.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("code").eql(11000);
            res.body.should.have.property("errmsg");
            console.log('STAUTS: ', res.status);
            console.log("Not registering twice: ", res.body);
            console.log("Not registering twice error: ", err);
            done();
          });
    });
  });
});
