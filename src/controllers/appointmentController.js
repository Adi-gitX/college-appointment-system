const prisma = require('../models/prismaClient');

const bookAppointment = async (req, res) => {
    try {
        const { professorId, time } = req.body;
        const studentId = req.user.id;

        if (!professorId || !time) {
            return res.status(400).json({ error: 'Professor ID and time are required' });
        }

        const appointment = await prisma.appointment.create({
            data: { professorId, studentId, time, status: 'waiting' },
        });

        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while booking the appointment' });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        if (!appointmentId) {
            return res.status(400).json({ error: 'Appointment ID is required' });
        }

        const appointment = await prisma.appointment.update({
            where: { id: Number(appointmentId) },
            data: { isCancelled: true },
        });

        res.status(200).json({ message: 'Appointment canceled successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while cancelling the appointment' });
    }
};


const getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;

        const appointments = await prisma.appointment.findMany({
            where: { studentId: userId, isCancelled: false },
        });

        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the appointments' });
    }
};

const getStudentAppointments = async (req, res) => {
    try {
        const studentId = req.user.id; // Assuming the student ID is attached to the user object

        const appointments = await prisma.appointment.findMany({
            where: { studentId, isCancelled: false },
        });

        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the student appointments' });
    }
};

const getProfessorAppointments = async (req, res) => {
    try {
        const professorId = req.user.id; // Assuming the professor ID is attached to the user object

        const appointments = await prisma.appointment.findMany({
            where: { professorId, isCancelled: false },
        });

        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the professor appointments' });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        if (!appointmentId || !status) {
            return res.status(400).json({ error: 'Appointment ID and status are required' });
        }

        const appointment = await prisma.appointment.update({
            where: { id: Number(appointmentId) },
            data: { status },
        });

        res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        console.error('Error updating appointment status:', error.message);
        res.status(500).json({ error: 'An error occurred while updating the appointment status', details: error.message });
    }
};




module.exports = { bookAppointment, cancelAppointment, getAppointments, getStudentAppointments, getProfessorAppointments, updateAppointmentStatus };