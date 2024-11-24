Endpoints
1. User Authentication
Signup
POST /auth/signup
Request Body:
{
  "email": "professor1@college.com",
  "password": "password123",
  "role": "professor"
}
or
{
  "email": "student1@college.com",
  "password": "password123",
  "role": "student"
}
Login
POST /auth/login
Request Body:
{
  "email": "professor1@college.com",
  "password": "password123"
}
Response:
{
  "token": "JWT-TOKEN"
}
Save the returned JWT token for authorization in future requests.
2. Professor Availability
Add Availability
POST /availability
Headers:
{
  "Authorization": "Bearer <JWT-TOKEN>"
}
Request Body:
{
  "time": "10:00 AM"
}
Get Availability
GET /availability/:professorId
Headers:
{
  "Authorization": "Bearer <JWT-TOKEN>"
}
Path Parameter:
professorId: ID of the professor (can be obtained after signup/login).
3. Appointments
Book Appointment
POST /appointments
Headers:
{
  "Authorization": "Bearer <JWT-TOKEN>"
}
Request Body:
{
  "professorId": 1,
  "time": "10:00 AM"
}
Get Appointments (Student)
GET /appointments
Headers:
{
  "Authorization": "Bearer <JWT-TOKEN>"
}
Cancel Appointment (Professor)
DELETE /appointments/:appointmentId
Headers:
{
  "Authorization": "Bearer <JWT-TOKEN>"
}
Path Parameter:
appointmentId: ID of the appointment to be canceled (can be obtained after booking).
Postman Testing Workflow
Step 1: Signup Users
Signup as Professor using the /auth/signup endpoint.
Signup as Student using the same endpoint.
Step 2: Login Users
Login as Professor to get a JWT token.
Login as Student to get a separate JWT token.
Step 3: Professor Adds Availability
Use the /availability POST endpoint.
Include the Professor's JWT token in the Authorization header.
Provide the availability time (e.g., "10:00 AM").
Step 4: Student Views Availability
Use the /availability/:professorId GET endpoint.
Replace :professorId with the Professor's ID.
Include the Student's JWT token in the Authorization header.
Step 5: Student Books Appointment
Use the /appointments POST endpoint.
Include the Student's JWT token in the Authorization header.
Provide the professor's ID and time in the request body.
Step 6: Professor Cancels Appointment
Use the /appointments/:appointmentId DELETE endpoint.
Replace :appointmentId with the Appointment's ID.
Include the Professor's JWT token in the Authorization header.
Step 7: Student Checks Appointments
Use the /appointments GET endpoint.
Include the Student's JWT token in the Authorization header.