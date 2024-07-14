// models/Job.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    salaryType: { type: String, required: true },
    jobLocation: { type: String, required: true },
    postingDate: { type: Date, required: true },
    experienceLevel: { type: String, required: true },
    companyLogo: { type: String, required: true },
    employmentType: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: String, required: true },
    Skills: [
        {
            value: { type: String, required: true },
            label: { type: String, required: true }
        }
    ]
}, {
    collection: 'Job_Portal_Collection'
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
