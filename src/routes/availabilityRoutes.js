const express = require('express');
const router = express.Router();
const { addAvailability, getAvailability } = require('../controllers/availabilityController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addAvailability);
router.get('/:professorId', authMiddleware, getAvailability);

module.exports = router;
