# **College Appointment System API Documentation**

This API allows students to book appointments with professors, and professors to manage their availability. Below are the endpoints and workflows for using the system.

---

## **Endpoints**

### **1. User Authentication**

#### **Signup**
- **POST** `/auth/signup`

  **Request Body**:
  ```json
  {
    "email": "professor1@college.com",
    "password": "password123",
    "role": "professor"
  }
  ```
  or
  ```json
  {
    "email": "student1@college.com",
    "password": "password123",
    "role": "student"
  }
  ```

#### **Login**
- **POST** `/auth/login`

  **Request Body**:
  ```json
  {
    "email": "professor1@college.com",
    "password": "password123"
  }
  ```

  **Response**:
  ```json
  {
    "token": "JWT-TOKEN"
  }
  ```

  Save the returned JWT token for authorization in future requests.

---

### **2. Professor Availability**

#### **Add Availability**
- **POST** `/availability`

  **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT-TOKEN>"
  }
  ```

  **Request Body**:
  ```json
  {
    "time": "10:00 AM"
  }
  ```

#### **Get Availability**
- **GET** `/availability/:professorId`

  **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT-TOKEN>"
  }
  ```

  **Path Parameter**:
  - `professorId`: ID of the professor (can be obtained after signup/login).

---

### **3. Appointments**

#### **Book Appointment**
- **POST** `/appointments`

  **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT-TOKEN>"
  }
  ```

  **Request Body**:
  ```json
  {
    "professorId": 1,
    "time": "10:00 AM"
  }
  ```

#### **Get Appointments (Student)**
- **GET** `/appointments`

  **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT-TOKEN>"
  }
  ```

#### **Cancel Appointment (Professor)**
- **DELETE** `/appointments/:appointmentId`

  **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT-TOKEN>"
  }
  ```

  **Path Parameter**:
  - `appointmentId`: ID of the appointment to be canceled (can be obtained after booking).

---

## **Postman Testing Workflow**

### **Step 1: Signup Users**
1. Signup as a **Professor** using the `/auth/signup` endpoint.
2. Signup as a **Student** using the same endpoint.

### **Step 2: Login Users**
1. Login as a **Professor** to get a JWT token.
2. Login as a **Student** to get a separate JWT token.

### **Step 3: Professor Adds Availability**
1. Use the `/availability` **POST** endpoint.
2. Include the Professor's JWT token in the `Authorization` header.
3. Provide the availability time (e.g., `"10:00 AM"`).

### **Step 4: Student Views Availability**
1. Use the `/availability/:professorId` **GET** endpoint.
2. Replace `:professorId` with the Professor's ID.
3. Include the Student's JWT token in the `Authorization` header.

### **Step 5: Student Books Appointment**
1. Use the `/appointments` **POST** endpoint.
2. Include the Student's JWT token in the `Authorization` header.
3. Provide the Professor's ID and time in the request body.

### **Step 6: Professor Cancels Appointment**
1. Use the `/appointments/:appointmentId` **DELETE** endpoint.
2. Replace `:appointmentId` with the Appointment's ID.
3. Include the Professor's JWT token in the `Authorization` header.

### **Step 7: Student Checks Appointments**
1. Use the `/appointments` **GET** endpoint.
2. Include the Student's JWT token in the `Authorization` header.



