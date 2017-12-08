const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    author: {type: String, required: true},
    amount: {type: Number, required: true, trim: true},
    description: {type: String, required: false}
});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = mongoose.model('Bid');
