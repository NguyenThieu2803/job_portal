// src/models/jobModel.js
 const connectDB = require('../config/ConnectDb')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;


async function createJob(body) {
  const { JobCollection } = await connectDB();
  const result = await JobCollection.insertOne(body);
  return result;
}

async function getAllJobs() {
  try {
    const { JobCollection } = await connectDB();
  const result = await JobCollection.find().toArray();
  return result;
  } catch (error) {
    console.log(error);
  }
  
}

async function getJobsByEmail(email) {
  const { JobCollection } = await connectDB();
  const result = await JobCollection.find({ postedBy: email }).toArray();
  return result;
}

async function deleteJobById(id) {
  const { JobCollection } = await connectDB();
  const result = await JobCollection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

async function getJobById(id) {
  const { JobCollection } = await connectDB();
  const result = await JobCollection.find({ _id: new ObjectId(id) }).toArray();
  return result;
}

async function updateJobById(id, jobData) {
  const { JobCollection } = await connectDB();
  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: jobData };
  const option = { upsert: true };
  const result = await JobCollection.updateOne(filter, updateDoc, option);
  return result;
}


module.exports = {
  createJob,
  getAllJobs,
  getJobsByEmail,
  deleteJobById,
  getJobById,
  updateJobById,
};
