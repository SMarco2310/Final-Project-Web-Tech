# 🧭 Campus Navigation App

A smart web application designed to help students and visitors easily navigate around campus.
It provides building information, route directions, real-time location tracking, and event updates — all within an interactive campus map.

---

## 🚀 Overview

The **Campus Navigation App** helps users find their way around the university using location data, live tracking, and route guidance.
It can also display ongoing **campus events**, provide **feedback channels**, and collect **usage analytics** for continuous improvement.

This project integrates mapping technologies (like **Google Maps API** or **Leaflet.js**) with a robust backend powered by **Spring Boot / Node.js** to deliver fast and reliable results.

---

## 🎯 Features

- **Interactive Campus Map** – Displays buildings, facilities, and routes between locations.
- **Search and Directions** – Find the shortest or most accessible path between two points.
- **Live Location Tracking** – View user or shuttle movement in real time (via GPS).
- **Event Highlights** – See upcoming campus activities, programs, and announcements.
- **Feedback and Reports** – Allow users to report incorrect paths or suggest updates.
- **User Authentication** – Secure login (SSO integration or custom JWT-based system).

---

## 🗄️ Database Design

Below are the core entities used in the backend system:

```
entity "users" as users {
  + id (PK)
  --
  name
  email
  password_hash
  role
  created_at
}

entity "locations" as locations {
  + id (PK)
  --
  name
  type
  latitude
  longitude
  description
}

entity "routes" as routes {
  + id (PK)
  --
  start_location_id (FK)
  end_location_id (FK)
  distance
  duration
}

entity "feedback_reports" as feedback_reports {
  + id (PK)
  --
  user_id (FK)
  message
  location_id (FK)
  created_at
}

entity "usage_logs" as usage_logs {
  + id (PK)
  --
  user_id (FK)
  action
  timestamp
  details
}

entity "events" as events {
  + id (PK)
  --
  title
  description
  date
  time
  location_id (FK)
  image_url
}
```

---

## ⚙️ Tech Stack

**Frontend:**

- React.js
- Tailwind CSS for styling
- Google Maps API for map rendering

**Backend:**

- Node.js with Express
- RESTful APIs for routes, locations, and events
- JWT authentication
- MySQL database

**Other Integrations:**

- Google Maps API (for directions & geocoding)
- WebSocket for live tracking
- Camu SSO (optional) for user authentication

---

## 🧩 How Dijkstra’s Algorithm Fits In

If the app uses **custom mapping data** (not Google’s built-in navigation),
Dijkstra’s Algorithm is applied on the backend to calculate the **shortest path** between two campus locations.

Example workflow:

1. The frontend sends a route request (start ID, end ID).
2. The backend retrieves the graph (nodes = locations, edges = paths).
3. Dijkstra’s algorithm runs to find the optimal route.
4. The result (ordered list of coordinates) is sent back to the frontend for map display.

If using **Google Maps API**, that step can be skipped — the API handles routing.

---

## 🔐 Authentication

- Supports **JWT-based login** or optional **Camu SSO integration** (if available).
- Tokens protect routes and API endpoints.
- Admins have extended privileges for managing data and events.

## 🧠 Future Enhancements

- Voice-guided directions.
- Integration with university event management API.

---

## 👨🏽‍💻 Author

**Ammes** — Student & aspiring software/AI engineer
Passionate about intelligent systems, backend development, and real-world software design.
