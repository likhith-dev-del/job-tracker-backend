const express = require("express");

const router = express.Router();

const {getJobs, getJobStats, addJob, updateJob, deleteJob} = require ("../controllers/jobController");
const {protect} = require("../middleware/authMiddleware");

router.get("/" , protect, getJobs);
router.get("/stats",  getJobStats);

router.post("/", protect,  addJob);

router.put("/:id", protect,updateJob);

router.delete("/:id", protect,deleteJob);
// router.get("/", (req,res) =>{

//     res.json({message : "job route is working"});
// })

module.exports = router;