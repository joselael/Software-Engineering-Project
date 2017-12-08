const mongoose = require('mongoose');  

const ProjectBidSchema = new mongoose.Schema({
    title: String,
    author: String,
    bid_end: Date,
    bid_start: { type: Date, default: Date.now },
    max_budget: Number,
    bidders: [],
    bids:[],
    assignee: String,
    bid_active: Boolean
  });

const Project = mongoose.model('ProjectBid', ProjectBidSchema);

module.exports = mongoose.model('ProjectBid');