const prisma = require('../models/prismaClient');

const bookAppointment = async (req, res) => {
    const { professorId, time } = req.body;
    const studentId = req.user.id;

    const appointment = await prisma.appointment.create({
        data: { professorId, studentId, time },
    });

    res.json({ appointment });
};

const cancelAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    const appointment = await prisma.appointment.update({
        where: { id: Number(appointmentId) },
        data: { isCancelled: true },
    });

    res.json({ appointment });
};

const getAppointments = async (req, res) => {
    const userId = req.user.id;

    const appointments = await prisma.appointment.findMany({
        where: { studentId: userId, isCancelled: false },
    });

    res.json({ appointments });
};

module.exports = { bookAppointment, cancelAppointment, getAppointments };
