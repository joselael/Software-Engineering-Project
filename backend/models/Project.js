const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    author: String,
    summary: String,
    details: String,
    post_date: {type: Date, default: Date.now},
    bid_start: {type: Date, default: Date.now},
    bid_end: Date,
    max_budget: Number,
    bidders: [],
    assignee: String,
    completed: Boolean,
    problematic: Boolean,
    admin_comments: String
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');
