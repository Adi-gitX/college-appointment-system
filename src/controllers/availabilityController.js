const prisma = require('../models/prismaClient');

const addAvailability = async (req, res) => {
    try {
        const { time } = req.body;
        const professorId = req.user.id;

        if (!time) {
            return res.status(400).json({ error: 'Time is required' });
        }

        const availability = await prisma.availability.create({
            data: { professorId, time },
        });

        res.status(201).json({ availability });
    } catch (error) {
        console.error('Error adding availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAvailability = async (req, res) => {
    try {
        const { professorId } = req.params;

        if (!professorId) {
            return res.status(400).json({ error: 'Professor ID is required' });
        }

        const availability = await prisma.availability.findMany({
            where: { professorId: Number(professorId) },
        });

        res.status(200).json({ availability });
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addRecurringAvailability = async (req, res) => {
    try {
        const { professorId, time, repeat, days } = req.body;

        if (!professorId || !time || !repeat || !days) {
            return res.status(400).json({ error: 'Professor ID, time, repeat, and days are required' });
        }

        const availabilityPromises = days.map(day => {
            return prisma.recurringAvailability.create({
                data: { professorId, time, repeat, day },
            });
        });

        const availabilities = await Promise.all(availabilityPromises);

        res.status(201).json({ message: 'Recurring availability added successfully', availabilities });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the recurring availability' });
    }
};
module.exports = { addAvailability, getAvailability, addRecurringAvailability };
