const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    author: String,
    amount: Number,
    description: String
});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = mongoose.model('Bid');
