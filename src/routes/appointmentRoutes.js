const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment, getAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookAppointment);
router.delete('/:appointmentId', authMiddleware, cancelAppointment);
router.get('/', authMiddleware, getAppointments);

module.exports = router;
