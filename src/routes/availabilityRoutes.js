const express = require('express');
const router = express.Router();
const { addAvailability, getAvailability,addRecurringAvailability } = require('../controllers/availabilityController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addAvailability);
router.get('/:professorId', authMiddleware, getAvailability);
// Route to add recurring availability
router.post('/recurring', authMiddleware, addRecurringAvailability);

module.exports = router;
