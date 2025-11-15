const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
email: { type: String, required: true, trim: true, unique: true },
phone: { type: String, required: true, trim: true },
}, { timestamps: true });


module.exports = mongoose.model('Student', StudentSchema);