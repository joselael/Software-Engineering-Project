const mongoose = require('mongoose');
const Bid = require('./Bid');
const User = require('./User')

const ProjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true, trim: true},
    summary: {type: String, required: true},
    details: {type: String, required: true},
    post_date: {type: Date, default: Date.now},
    bid_start: {type: Date, default: Date.now},
    bid_end: {type: Date},
    max_budget: Number,
    bids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bid'}],
    assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    completed: Boolean,
    rating: Number,
    problematic: Boolean,
    admin_comments: String
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');
