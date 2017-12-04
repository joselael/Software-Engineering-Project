const mongoose = require('mongoose');  

var ProjectSchema = new mongoose.Schema({
    title: String,
    author_username: String,
    summary: String,
    details: String,
    post_date: { type: Date, default: Date.now },
    bid_start: { type: Date, default: Date.now },
    bid_end: Date,
    min_budget: Number,
    max_budget: Number,
    assignee: String,
    completed: Boolean,
    problematic: Boolean,
    admin_comments: String
  });

var Project = mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');
