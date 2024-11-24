const request = require('supertest');
const app = require('../app');

describe('E2E Test', () => {
    let studentToken, professorToken, appointmentId;

    const professorCredentials = { email: 'prof@college.com', password: '1234', role: 'professor' };
    const studentCredentials = { email: 'stud@college.com', password: '1234', role: 'student' };
    const availabilityTime = '10:00 AM';

    test('Complete user flow', async () => {
        // Signup and login for professor
        await request(app).post('/auth/signup').send(professorCredentials);
        const professorLogin = await request(app).post('/auth/login').send(professorCredentials);
        professorToken = professorLogin.body.token;
        expect(professorToken).toBeDefined();

        // Professor adds availability
        const availabilityResponse = await request(app)
            .post('/availability')
            .send({ time: availabilityTime })
            .set('Authorization', `Bearer ${professorToken}`);
        expect(availabilityResponse.status).toBe(200);

        // Signup and login for student
        await request(app).post('/auth/signup').send(studentCredentials);
        const studentLogin = await request(app).post('/auth/login').send(studentCredentials);
        studentToken = studentLogin.body.token;
        expect(studentToken).toBeDefined();

        // Student books appointment
        const appointmentResponse = await request(app)
            .post('/appointments')
            .send({ professorId: 1, time: availabilityTime })
            .set('Authorization', `Bearer ${studentToken}`);
        appointmentId = appointmentResponse.body.appointment.id;
        expect(appointmentId).toBeDefined();

        // Professor cancels appointment
        const cancelResponse = await request(app)
            .delete(`/appointments/${appointmentId}`)
            .set('Authorization', `Bearer ${professorToken}`);
        expect(cancelResponse.status).toBe(200);

        // Student checks appointments
        const appointmentsResponse = await request(app)
            .get('/appointments')
            .set('Authorization', `Bearer ${studentToken}`);
        expect(appointmentsResponse.body.appointments.length).toBe(0);
    });
});
