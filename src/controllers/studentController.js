const Student = require('../models/Student');


// Add a new student
exports.addStudent = async (req, res) => {
try {
const { name, email, phone } = req.body;
if (!name || !email || !phone) {
return res.status(400).json({ error: 'Name, email, and phone are required' });
}


// Basic server-side validations
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
return res.status(400).json({ error: 'Invalid email format' });
}
if (phone.length < 7) {
return res.status(400).json({ error: 'Phone number too short' });
}


// Prevent duplicate emails
const existing = await Student.findOne({ email });
if (existing) return res.status(409).json({ error: 'Email already registered' });


const student = new Student({ name, email, phone });
await student.save();
return res.status(201).json(student);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
};


// Get all students
exports.getStudents = async (req, res) => {
try {
const students = await Student.find().sort({ createdAt: -1 });
return res.json(students);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
};


// Delete a student
exports.deleteStudent = async (req, res) => {
try {
const { id } = req.params;
const student = await Student.findByIdAndDelete(id);
if (!student) return res.status(404).json({ error: 'Student not found' });
return res.json({ message: 'Student deleted' });
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
};