# **QR Scanner: Automated Solution for Lost Bag Management**

## **Project Description**
This project addresses a recurring human error in managing bags identified by QR codes. Sometimes, due to lack of attention, some bags go missing, requiring tedious manual searches in the warehouse. This involves physically inspecting the warehouse or comparing a handwritten list with the available bags.

With this system, we automate the search for lost bags by uploading their data into the application. The software then identifies the matches automatically, saving time and effort in logistical operations.

---

## **Main Features**
- **Upload lost bags:** Allows registering QR codes of missing bags.
- **Automated identification:** Automatically compares entered codes with the database to identify matches.
- **Efficient management:** Eliminates the need for manual searches and reduces human errors.
- **Intuitive interface:** A user-friendly frontend built with React and React-Bootstrap.

---

## **Project Structure**
The project is divided into two main parts:

### 1. **Backend**
- **Technologies used:**
  - Node.js
  - Express.js
  - MongoDB (for data storage)
- **Key functions:**
  - API to manage QR codes (create, list, delete).
  - Connection with MongoDB database.

### 2. **Frontend**
- **Technologies used:**
  - React
  - React-Bootstrap
- **Key functions:**
  - Upload QR codes.
  - Display lost bags.
  - Delete individual codes or the entire list.

---

## **How to Set Up the Project**

### **Prerequisites**
- Node.js installed on your machine.
- MongoDB Atlas or a local database server configured.

### **Setup Instructions**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tutesuarez/qrscanner.git
   cd qrscanner
   ```

2. **Install dependencies:**
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Configure environment variables:**
   - Create a `.env` file in the `backend` folder with the following values:
     ```
     MONGO_URI=your_mongodb_url
     PORT=5000
     ```

4. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

5. **Start the frontend server:**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000/api/qr`

---

## **Project Deployment**
This project can be deployed using services like Render or Heroku. It also supports Docker containers for enhanced production flexibility.

### **Frontend on Render:**
1. Configure the `frontend` folder as a static web service on Render.
2. Ensure proper connection with the backend.

### **Backend on Render:**
1. Configure the `backend` folder as a web service on Render.
2. Set up the necessary environment variables in the Render dashboard.

---

## **Technologies Used**
- **Frontend:** React, React-Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Additional tools:**
  - Html5Qrcodes.
  - Axios for HTTP requests.
  - Docker (optional) for containerization.

---

## **Contributing**
If you wish to contribute to the project, please open an issue or submit a pull request. All ideas are welcome to improve the system.

---

