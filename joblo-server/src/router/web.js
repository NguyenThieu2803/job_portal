// src/routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const jobController = require('../controller/Controller');

router.post('/api/v1/jobs-post', jobController.createJob);
router.get('/api/v1/jobs-get', jobController.getAllJobs);
router.get('/api/v1/myjobs/:email', jobController.getJobsByEmail);
router.delete('/api/v1/jobs-delete/:id', jobController.deleteJobById);
router.get('/api/v1/jobs-get/:id', jobController.getJobById);
router.patch('/api/v1/update-jobs/:id', jobController.updateJobById);

module.exports = router;
