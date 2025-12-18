# 📦 FindMyStuff — Campus Lost & Found Platform

FindMyStuff is a full-stack web application designed to make it easier for students to report, discover, and reclaim lost or found items on campus. The platform offers a straightforward interface for uploading images of lost or found items, adding descriptions, and browsing a searchable gallery.
It also includes an optional **AI Assistance** tool that helps users automatically name and describe items from an uploaded image.

---

## 🚀 Features

### 🔐 User Authentication

* Register/Login using email and password
* JWT-based authentication
* Protected routes for reporting and claiming items

### 📸 Report Lost or Found Items

* Upload images from device or using the device's camera
* Add item name, description, category, and location
* Tag as **Lost** or **Found**
* Optionally use **AI** to generate a name and description

### 🔍 Browse & Search

* Search for items using filters:

  * Category
  * Location
  * Item Name
  * Lost/Found type
  * Date range
* Beautiful gallery grid of all active items
* Dedicated item detail page

### 📩 Claim Management

* Students can submit a claim request with:

  * Proof message
  * Optional proof image
* The item reporter (finder) can approve or reject claims
* Item status updates to **Claimed** when resolved

### 🤖 Optional AI Assistance

* Takes an uploaded image
* Suggests item name + description
* User can accept or edit the suggestions

---

## 🏗️ Tech Stack

### **Frontend**

* React
* Axios
* Tailwind CSS
* React Router
* Userway(accessibility)

### **Backend**

* Node.js
* Express.js
* JWT Authentication
* Multer (for image uploads)

### **Database**

* Postgres

### **Storage**

* Cloudinary

### **AI Integration (Optional)**

* A third-party image recognition  API (Gork -API)

---

## 🗂️ Project Structure

```
find-my-stuff/
│
├── backend/
    ├── src/
        ├── controllers/
        ├── models/
        ├── routes/
        ├── middleware/
        ├── utils/
        ├── server.js
        └── config/
├── documents/
│
└── frontend/
    ├── src/
    │   ├── components/
        ├── layouts/
        ├── components/
        ├── assets/
    │   ├── pages/
    │   ├── hooks/
    │   └── App.jsx
    ├── dist/
    └── public/
```

---

## 🧪 API Endpoints (Overview)

### **Authentication**

Prefix: /api/auth

- POST /register – Register a new user
- POST /login – Login user
- GET /profile/:id – Get user profile
- PUT /profile/:id – Update user profile

### **Items**

Prefix: /api/item

- GET /items – Get all items
- GET /my-items/:user_id – Get items posted by a specific user
- POST / – Create a new item
- GET /item/:id – Get details of a specific item
- DELETE /item/:id – Delete an item

### **Claims**

Prefix: /api/claims

- POST / – Submit a new claim
- GET / – Get all claims (Admin/Internal use)
- GET /my-claims – Get claims made by the current user
- GET /received – Get claims made on the current user's items
- GET /:id – Get details of a specific claim
- PUT /:id/status – Update claim status (Approve/Reject)


### **Chats**

Prefix: /api/chats

- POST / – Start a new chat
- GET / – Get all chats for the current user
- GET /:id – Get details of a specific chat


### **Messages**

Prefix: /api/messages

- POST / – Send a message
- GET /:chatId – Get all messages in a specific chat
- GET /unread/count – Get total unread message count
- PUT /:chatId/read – Mark all messages in a chat as read


### **AI Services**

Prefix: /api/ai

- POST /describe – Generate item description from an image

### **Images**

Prefix: /api/image

- POST /upload – Upload an image file

## 📸 Reporting Flow

1. Upload image
2. Choose LOST or FOUND
3. Add details
4. Optionally run AI assistance
5. Submit to the database
6. Item appears in the gallery

---

## 🧩 Claim Flow

1. User clicks **Claim Item**
2. Submits proof + optional image
3. Finder reviews
4. Approve → item marked **claimed**
5. Reject → item returns to active list

---

## 🧑‍💻 Installation

### **Backend**

```bash
cd backend
npm install --legacy-peer-deps
npm start
```

### **Frontend**

```bash
cd frontend
npm install
npm build
```
___ 

## 🙌 Contributing

Pull requests are welcome!
