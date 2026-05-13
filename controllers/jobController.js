const Job = require("../models/jobModel");

// GET all jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get status of jobs

const getJobStats = async (req, res) => {
  try {
    const jobs = await Job.find();

    const totalJobs = jobs.length;

    const applied = jobs.filter(job => job.status === "Applied").length;

    const interview = jobs.filter(job => job.status === "Interview").length;

    const offers = jobs.filter(job => job.status === "Offer").length;

    const rejected = jobs.filter(job => job.status === "Rejected").length;

    res.json({
      totalJobs,
      applied,
      interview,
      offers,
      rejected,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD job
const addJob = async (req, res) => {
console.log(req.user);
console.log(req.body);
    try {
        const { company, role , status} = req.body;

        const newJob = new Job({ company, role , status, user: req.user.id });
        await newJob.save();

        res.status(201).json({
            message: "Job added successfully",
            job: newJob
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE job
const updateJob = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            req.body,
            { returnDocument : "after" }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json({
            message: "Job updated successfully",
            job: updatedJob
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE job
const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json({
            message: "Job deleted successfully",
            job: deletedJob
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getJobs, getJobStats, addJob, updateJob, deleteJob };