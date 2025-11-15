const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

router.post('/', controller.addStudent);
router.get('/', controller.getStudents);
router.delete('/:id', controller.deleteStudent);

module.exports = router;