const express = require('express');
const { getTasks, createTask, deleteTask, toggleTask, editTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.delete('/:id', protect, deleteTask);
router.put('/toggle/:id', protect, toggleTask);
router.put('/edit/:id', protect, editTask);

module.exports = router;
