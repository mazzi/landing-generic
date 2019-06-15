const mongoose = require('mongoose');

const Lead = mongoose.model('Lead', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    timestamp: Date
}));

module.exports = Lead;