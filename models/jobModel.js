const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Applied"   // Applied, Interview, Rejected, Offer
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }, 

    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
});

module.exports = mongoose.model("Job", jobSchema);