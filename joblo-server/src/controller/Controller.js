// src/controllers/jobController.js

const jobModel = require('../model/Jobs');

async function createJob(req, res) {
  try {
    const body = req.body;
    body.CreateAt = new Date();
    const result = await jobModel.createJob(body);
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
}

async function getAllJobs(req, res) {
  try {
    const result = await jobModel.getAllJobs();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}

async function getJobsByEmail(req, res) {
  try {
    const result = await jobModel.getJobsByEmail(req.params.email);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}

async function deleteJobById(req, res) {
  try {
    const id = req.params.id;
    const result = await jobModel.deleteJobById(id);
    res.send(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}

async function getJobById(req, res) {
  try {
    const result = await jobModel.getJobById(req.params.id);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}

async function updateJobById(req, res) {
  try {
    const jobData = req.body;
    const result = await jobModel.updateJobById(req.params.id, jobData);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}

module.exports = {
  createJob,
  getAllJobs,
  getJobsByEmail,
  deleteJobById,
  getJobById,
  updateJobById,
};
