// src/models/initDB.js

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  await client.connect();
  const db = client.db("Job_Portal");
  return {
    JobCollection: db.collection("Job_Portal_Collection"),
    User: db.collection("User"),
  };
}

module.exports = connectDB;
