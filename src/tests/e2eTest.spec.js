const request = require('supertest');
const app = require('../app');

describe('E2E Test', () => {
    let studentToken, professorToken, appointmentId;

    test('Complete user flow', async () => {
        // Signup and login for professor
        await request(app).post('/auth/signup').send({ email: 'prof@college.com', password: '1234', role: 'professor' });
        const professorLogin = await request(app).post('/auth/login').send({ email: 'prof@college.com', password: '1234' });
        professorToken = professorLogin.body.token;

        // Professor adds availability
        await request(app)
            .post('/availability')
            .send({ time: '10:00 AM' })
            .set('Authorization', `Bearer ${professorToken}`);

        // Signup and login for student
        await request(app).post('/auth/signup').send({ email: 'stud@college.com', password: '1234', role: 'student' });
        const studentLogin = await request(app).post('/auth/login').send({ email: 'stud@college.com', password: '1234' });
        studentToken = studentLogin.body.token;

        // Student books appointment
        const appointment = await request(app)
            .post('/appointments')
            .send({ professorId: 1, time: '10:00 AM' })
            .set('Authorization', `Bearer ${studentToken}`);
        appointmentId = appointment.body.appointment.id;

        // Professor cancels appointment
        await request(app)
            .delete(`/appointments/${appointmentId}`)
            .set('Authorization', `Bearer ${professorToken}`);

        // Student checks appointments
        const appointments = await request(app)
            .get('/appointments')
            .set('Authorization', `Bearer ${studentToken}`);
        expect(appointments.body.appointments.length).toBe(0);
    });
});
