# 📦 FindMyStuff — Campus Lost & Found Platform

FindMyStuff is a full-stack web application designed to make it easier for students to report, discover, and reclaim lost or found items on campus. The platform provides a simple interface for uploading images of lost or found items, adding descriptions, and browsing through a searchable gallery.
It also includes an optional **AI Assistance** tool that helps users automatically name and describe items from an uploaded image.

---

## 🚀 Features

### 🔐 User Authentication

* Register/Login using email and password
* JWT-based authentication
* Protected routes for reporting and claiming items

### 📸 Report Lost or Found Items

* Upload images from device or using the devices camera
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

### **Backend**

* Node.js
* Express.js
* JWT Authentication
* Multer (for image uploads)

### **Database**

* MySQL

### **Storage**

* Cloudinary

### **AI Integration (Optional)**

* A third-party image recognition API

---

## 🗂️ Project Structure

```
findmystuff/
│
├── backend/
    ├── prisma/
    ├── src/
        ├── controllers/
        ├── models/
        ├── routes/
        ├── middleware/
        ├── utils/
        ├── server.js
        └── config/
├── Document/
│
└── frontend/
    ├── src/
    │   ├── components/
        ├── assets/
    │   ├── pages/
    │   ├── hooks/
    │   └── App.jsx
    └── public/
```

---

## 🧪 API Endpoints (Overview)

### **Auth**

* `POST /auth/register`
* `POST /auth/login`
* `GET /auth/me`

### **Items**

* `POST /items` – create lost/found item
* `GET /items` – list items with filters
* `GET /items/:id` – item details
* `PATCH /items/:id` – update item
* `DELETE /items/:id`

### **Claims**

* `POST /claims` – submit claim
* `PATCH /claims/:id/approve`
* `PATCH /claims/:id/reject`

### **AI**

* `POST /ai/describe` – return AI-generated name/description

---

## 📸 Reporting Flow

1. Upload image
2. Choose LOST or FOUND
3. Add details
4. Optionally run AI assistance
5. Submit to database
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
npm install
npm run dev
```

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```
___ 

## 🙌 Contributing

Pull requests are welcome!
