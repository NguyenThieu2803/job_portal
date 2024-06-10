const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://thieu:2003@cluster0.pjyvmvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB successfully");

    // Get the database
    const db = client.db("Job_Portal");
    const JobCollection = db.collection("Job_Portal_Collection");

    // Create job
    app.post('/api/v1/jobs-post', async (req, res) => {
      try {
        const body = req.body;
        const result = await JobCollection.insertOne(body);
        body.CreateAt= new Date()
        if (result.insertedId) {
          res.status(201).json({
            message: "Job Posted Successfully",
            result,
          });
        } else {
          res.status(500).json({
            message: "Job Posting Failed",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
          error,
        });
      }
    });

    // Get all jobs
    app.get('/api/v1/jobs-get', async (req, res) => {
      try {
        const result = await JobCollection.find().toArray();
        res.status(200).json({
          result,
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
          error,
        });
      }
    });

    // Ping MongoDB to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run().catch(console.dir);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
