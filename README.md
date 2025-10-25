## Campus Navigator System

# Campus Navigator System

## 🗺️ Project Overview

The **Campus Navigator System** is an intelligent, full-stack web application designed to transform the campus navigation experience from a static map into a personalized and efficient routing tool. By combining a dedicated **Graph Data Structure** with user personalization features, the system provides not only the shortest path between two points but also contextual navigation to the user's specific classes, events, and frequently visited locations.

This project utilizes a decoupled architecture, leveraging a **React** front-end for a responsive map interface and a robust **PHP (Laravel)** API for complex back-end logic, including pathfinding and secure user data management.

---

## ✨ Core Features

The application delivers functionality across three main areas:

### 1. Intelligent Routing & Mapping
* **Campus Map Integration:** Uses **React-Leaflet** to display a custom, non-geographic map overlay of the campus infrastructure.
* **Intelligent Pathfinding:** Utilizes a **Graph Data Model** (`graph_nodes`, `graph_edges`) in the database to enable the server-side implementation of **Dijkstra's Algorithm**, providing precise shortest-path directions.
* **Search Functionality:** A powerful search bar allows users to quickly locate buildings, rooms, and points of interest for routing.
* **Map Event Listener:** Enables users to select start and end points directly on the map via click/tap interaction.

### 2. User Personalization and Profile
* **Secure Authentication:** Implements a robust system for user signup and login to protect personalized data.
* **Personalized Navigation:** Provides routing specifically to the user's **classes and events** based on their schedule.
* **Previous Trips:** A profile feature allowing users to view a history of their calculated routes.
* **Favorite Locations:** Users can save frequently visited locations for quick access and personalized map markers.

### 3. Content and Administration
* **Event Listing:** Displays a centralized list of upcoming campus events, with routing links to their locations.
* **Location Data Management:** Centralized storage of all points of interest, buildings, and rooms.

---

## 🛠️ Technology Stack

This project uses a modern, industry-standard stack to ensure performance, scalability, and maintainability.

| Component | Technology | Key Role in Project |
| :--- | :--- | :--- |
| **Frontend (Client)** | **React** | Renders the component-based UI, manages map state, and handles user interactions. |
| **Mapping Library** | **React-Leaflet** | Displays the map, manages a custom coordinate system, and draws the routes (Polylines). |
| **Backend (API)** | **PHP (Laravel)** | Handles authentication, database modeling, and executes the core shortest-path algorithm. |
| **Database** | **MySQL/PostgreSQL** | Stores all application data, including the critical **Graph Data Structure** (Nodes and Edges). |
| **Algorithm** | **Dijkstra's Algorithm** | The primary logic for efficient pathfinding on the campus graph. |

---

## 🏗️ System Architecture

The application employs a clear **Model-View-Controller (MVC)** pattern on the back-end and a **Component-Based** architecture on the front-end, communicating via a RESTful API. 

1.  **Data Persistence:** The **Database** stores the graph structure (`graph_nodes`, `graph_edges`) and user data.
2.  **Business Logic:** The **Laravel API** receives requests (e.g., "Find route from A to B"). It queries the graph data, runs the pathfinding algorithm, and secures personalized data based on the user's authentication token.
3.  **Presentation:** The **React Client** receives the calculated route (a sequence of coordinates in JSON), renders it on the Leaflet map, and provides the interactive user interface.

## 🗃️ Database Schema Summary

The schema is built to support the navigation core and personalization features:

| Component | Key Tables | Purpose |
| :--- | :--- | :--- |
| **Navigation** | `graph_nodes`, `graph_edges` | Defines the actual paths for the shortest-path algorithm. |
| **Content Link** | `locations` | Links user-facing names (e.g., "Science Hall") to the nearest `graph_node` for routing. |
| **Personalization**| `users`, `user_classes`, `user_favorites`, `user_trips` | Stores authenticated user data, class schedules, and records trip history. |

---

## ⚙️ Local Development Setup

To get the project running:

### 1. Backend Setup (Laravel)
1.  Clone the repository and install PHP dependencies: `composer install`
2.  Configure database credentials in the `.env` file.
3.  Run migrations to create all necessary tables: `php artisan migrate`
4.  Start the API server: `php artisan serve`

### 2. Frontend Setup (React)
1.  Navigate to the client directory and install dependencies: `npm install`
2.  Start the React development server: `npm start` (or `npm run dev`)
