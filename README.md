# 🏥 Clinic Management System

A role-based web application designed to manage patient flow efficiently in a clinic.  
The system allows receptionists to register patients and generate tokens, while doctors can view the queue and add prescriptions.  

This project demonstrates real-world workflow implementation using Firebase.

---

## 🚀 Features

### 🔐 Authentication
- User registration with role selection
- Secure login and logout
- Role-based dashboard redirection
- Firebase Authentication integration

### 🧑‍💼 Receptionist Module
- Add patient details
- Automatic token generation
- Create billing records
- Store patient information in database

### 👨‍⚕️ Doctor Module
- View waiting patient queue
- Add prescriptions
- Automatically mark tokens as completed
- Real-time data updates

### 🗄 Database
- Firebase Firestore integration
- Structured collections for data storage
- Real-time cloud database

### 📊 Logging
- Console logging for all major actions
- Tracks authentication, patient creation, billing, and prescriptions

---

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Firebase Authentication
- Firebase Firestore
- Vercel (Hosting)
- GitHub (Version Control)

---

## 📊 Database Schema

### Users
- uid
- email
- role (doctor / receptionist)

### Patients
- name
- age
- gender
- phone
- address
- createdAt

### Tokens
- patientId
- status (waiting / completed)
- createdAt

### Bills
- patientId
- amount
- description
- createdAt

### Prescriptions
- patientId
- notes
- createdAt

---

## 🔄 System Workflow

1️⃣ Receptionist logs in  
2️⃣ Adds patient details  
3️⃣ Token generated automatically  
4️⃣ Doctor views waiting queue  
5️⃣ Doctor adds prescription  
6️⃣ Token marked as completed  
7️⃣ Billing stored  

---

## 🧱 Project Structure

```
clinic-management-system/
│
├── index.html
├── register.html
├── receptionist.html
├── doctor.html
├── style.css
├── app.js
├── firebase.js
└── README.md
```

---

## 🎯 Key Highlights

✔ Role-based access control  
✔ Real-world workflow simulation  
✔ Cloud database integration  
✔ Token queue management  
✔ Professional UI design  
✔ Secure authentication  
✔ Fully deployed web app  

---

## 🧪 Testing

The application was tested for:

- User authentication flow
- Database operations
- Token lifecycle
- Billing creation
- Prescription storage
- Role-based access control

---

## ⚠️ Challenges Faced

- Firebase configuration mismatch
- Module caching issues
- Role-based redirection logic
- Token lifecycle management

---

## 🔮 Future Enhancements

- Patient history dashboard
- Admin analytics panel
- Notification system
- Search functionality
- Mobile responsive UI
- Dark mode
- Appointment scheduling

---

## 👨‍💻 Author

**Harshwardhan Rajmane**

---

## 🌐 Live Demo

👉 https://clinic-management-system-byharsh.vercel.app/

---

## 📜 License

This project is developed for educational and internship purposes.
