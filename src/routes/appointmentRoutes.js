const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment, getAppointments, getStudentAppointments, getProfessorAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to book an appointment
router.post('/', authMiddleware, bookAppointment);

// Route to cancel an appointment by ID
router.delete('/:appointmentId', authMiddleware, cancelAppointment);

// Route to get all appointments for the authenticated user
router.get('/', authMiddleware, getAppointments);

// Route to get appointments for a specific student
router.get('/student', authMiddleware, getStudentAppointments);

// Route to get appointments for a specific professor
router.get('/professor', authMiddleware, getProfessorAppointments);

// Route to update appointment status
router.patch('/:appointmentId/status', authMiddleware, updateAppointmentStatus);

module.exports = router;