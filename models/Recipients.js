const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;