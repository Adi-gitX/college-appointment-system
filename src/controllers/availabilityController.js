const prisma = require('../models/prismaClient');

const addAvailability = async (req, res) => {
    const { time } = req.body;
    const professorId = req.user.id;

    const availability = await prisma.availability.create({
        data: { professorId, time },
    });

    res.json({ availability });
};

const getAvailability = async (req, res) => {
    const { professorId } = req.params;

    const availability = await prisma.availability.findMany({
        where: { professorId: Number(professorId) },
    });

    res.json({ availability });
};

module.exports = { addAvailability, getAvailability };
