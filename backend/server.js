const { MongoClient } = require('mongodb')
const express = require('express');
const app = express();

let dbConnection;
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/hospital')
      .then((client) => {
        console.log("Connected to MongoDb")
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}





