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
    project_end: {type: Date},
    max_budget: Number,
    bids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bid'}],
    assignee: {
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
        username: {type: String, default: null},
        bid_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Bid', default: null}
    },
    completed: Boolean,
    bidding_in_progress: Boolean,
    reason_for_selection: String,
    require_review: Boolean,
    require_rating: Boolean,
    rating_author: Number,
    rating_assignee: Number,
    problematic: Boolean,
    author_comments: String,
    admin_comments: String
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');

