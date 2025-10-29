# 🧩 devConnect Backend


> This is the **backend folder only**. The frontend repo can be found [here](https://github.com/Himanshu-Kakkar/devTinder-web).


This repo contains the **backend code** for the **devConnect** application — a platform designed to connect developers, facilitate communication, and enable smooth collaboration.  
The backend handles everything from **user authentication** and **profile management** to **real-time chat** and **payment integration**.

---

## What This Backend Can Do (Theoretical Overview)

The **devConnect backend** serves as the core engine that powers the platform. It manages:
- **User Authentication & Authorization** — secure signup/login using JWT.
- **User Profiles** — allows users to create and manage developer profiles.
- **Real-Time Chat** — implemented using Socket.IO for instant communication.
- **Payment Integration** — supports transactions using Razorpay.
- **Email Notifications** — sends verification or notification emails via AWS SES.
- **Database Management** — stores all user and chat data securely using MongoDB.

---

## Key Technologies & Tools Learned

During the development of this backend, I explored and implemented several modern web technologies:

- **Node.js** — for building the backend logic and APIs.  
- **Express.js** — for routing, middleware, and handling requests/responses.  
- **MongoDB (Mongoose)** — for managing data and schema-based modeling.  
- **jsonwebtoken (JWT)** — for secure authentication and session handling.  
- **Socket.IO** — for real-time chat functionality.  
- **Razorpay** — for integrating secure payment processing.  
- **AWS SES** — for sending transactional emails.  

---

## ⚙️ How to Run the Project Locally

### 1. Clone the Repositories
```bash
# Clone the backend
git clone https://github.com/Himanshu-Kakkar/devConnect-backend.git

# Move into the backend folder
cd devConnect-backend

# Step 2: Install dependencies
npm i

# Step 3: Create a .env file in the root directory and add the following constants:
JWT_SECRET_KEY=
DB_CONNECTION_SECRET=
PORT=
AWS_SECRET_KEY=
AWS_ACCESS_KEY=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Step 4: Run the server
npm run dev