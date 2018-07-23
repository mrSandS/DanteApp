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
  password: 'qweqweqwe0'
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
    it('it should not validate register process if email field is empty', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({password: testUser.password})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });

    it('it should not validate register process if email is not validated', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({email: "testemail.com", password: testUser.password})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });

    it('it should not validate register process if password field is empty', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({email:testUser.email})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });

    it('it should not validate register process if there are no digits in password', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({email: testUser.email, password: "qweqweqwe"})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });

    it('it should not validate register process with less than 8 symbols in password', function(done) {
      chai.request(server)
        .post('/api/auth/register')
        .send({email: testUser.email, password: "qweqweqwe"})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
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

    it('it should not validate register process if a user with same email already exists in db', function(done) {
        chai.request(server)
          .post('/api/auth/register')
          .send(testUser)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("errors");
            res.body.should.have.property("messages");
            res.body.messages.should.be.a("array");
            res.body.messages.forEach(function(el){
              el.should.have.property("source");
              el.should.have.property("body");
            });
            done();
          });
    });
  });

  describe('POST auth/login', function() {
    this.timeout(10000);
    before(function(done) {
      User.create(testUser, function(err) {
        done();
      });
    });
    after(function(done) {
      User.remove({email: testUser.email}, function(err) {
        done();
      });
    });
    it('it should not validate login process if a user left email field empty', function(done) {
      chai.request(server)
        .post('/api/auth/login')
        .send({password: testUser.password})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });
    it('it should not validate login process if a user left password field empty', function(done) {
      chai.request(server)
        .post('/api/auth/login')
        .send({email: testUser.email})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });
    it('it should not validate login process if there is no such email in db', function(done) {
      chai.request(server)
        .post('/api/auth/login')
        .send({email: "notexistedtestuser@mail.com", password: testUser.password})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });
    it('it should not validate login process if password is incorrect', function(done) {
      chai.request(server)
        .post('/api/auth/login')
        .send({email: testUser.email, password: "kje2309jdsdu230"})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("messages");
          res.body.messages.should.be.a("array");
          res.body.messages.forEach(function(el){
            el.should.have.property("source");
            el.should.have.property("body");
          });
          done();
        });
    });
    it('it should log in a user', function(done) {
      chai.request(server)
        .post('/api/auth/login')
        .send(testUser)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.data.should.have.property("_id");
          res.body.data.should.have.property("email");
          res.body.data.should.have.property("token");
          done();
        });
    });
  })
});
