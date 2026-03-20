# Game Developer Portfolio & Distribution Platform

## Project Description

This project is a Full-Stack Web Application designed as a personal **Game Developer Portfolio and Project Distribution Platform**.

The system allows the developer (system owner) to manage portfolio content including:

- Game projects
- Project descriptions
- Media assets (images/videos)
- Technologies used
- Contact information

It also allows external users such as HR or players to:

- View portfolio content
- Submit contact requests

This project demonstrates implementation of:

- Multi-user role system
- Authentication & authorization
- Full CRUD database operations
- Layered system architecture
- Secure backend design



# Problem Statement

Game developers need a centralized platform to:

- Showcase projects professionally
- Manage portfolio content efficiently
- Allow recruiters to contact them easily

This system provides:

- Structured portfolio management
- Role-based access control
- Clean and scalable architecture



# User Roles & Permissions

The system implements three distinct roles:

### 1. Developer (Admin)

**Responsibilities:**
- Manage portfolio content

**Permissions:**
- Create new game projects
- Update project details
- Delete projects
- Manage media assets
- View contact messages

**CRUD Access:**
- Full CRUD on Games
- Read on Contact messages

---

### 2. HR / Recruiter

**Responsibilities:**
- Explore portfolio
- Contact developer

**Permissions:**
- View projects
- Submit contact form

**CRUD Access:**
- Create contact message
- Read public portfolio content

---

### 3️. Player / Visitor

**Responsibilities:**
- Browse and explore games

**Permissions:**
- View published projects

**CRUD Access:**
- Read-only access to public data


# System Architecture Overview

This project follows a 3-Tier Layered Architecture:

Presentation Layer  → Next.js (Frontend)  
Application Layer   → FastAPI (Backend API)  
Data Layer          → SQLite (Database)


## Presentation Layer (Frontend)

- Built with Next.js
- Handles UI rendering
- Sends API requests to backend
- Role-based content rendering


## Application Layer (Backend)

- Built with FastAPI
- Handles:
  - Authentication
  - Authorization
  - Business logic
  - API routing
  - Input validation
- Implements JWT-based authentication


## Data Layer

- SQLite database
- Stores:
  - Users
  - Roles
  - Permissions
  - Games
  - Contact messages


# Architecture Characteristics

This system emphasizes:

- Separation of Concerns
- Modularity
- Scalability
- Security
- Maintainability
- Low deployment complexity


# Database Design

Main Tables:

- users
- roles
- permissions
- games


Relationships:

- One user has one role
- One role has multiple permissions
- Games are managed by Developer


# Authentication & Authorization

The system implements:

- Secure login & logout
- Password hashing
- JWT token authentication
- Role-based access control
- Protected API endpoints
- Permission-based route guarding


# Technology Stack

## Frontend
- Next.js
- React
- Tailwind CSS

## Backend
- FastAPI
- SQLAlchemy (ORM)
- Pydantic
- JWT Authentication

## Database
- SQLite


# Installation & Setup

## Clone Repository
```

git clone https://github.com/your-username/your-repository.git  
cd gamedev-resume  
```

## Backend Setup
```
cd backend  

python -m venv venv  
```

# Mac/Linux
```
source venv/bin/activate  
```

# Windows
```
venv\Scripts\activate  
```

### Install Dependencies:
```
pip install -r requirements.txt  
```

### Run backend:

```
uvicorn backend.main:app --reload
```

Backend runs at:  
http://localhost:8000  

---

## Frontend Setup

```
cd frontend  
```
### Install Dependencies:
```
npm install  
npm run dev  
```
Frontend runs at:  
http://localhost:3000  

---

# How to Run the System

1. Start backend server
2. Start frontend server
3. Access application at:
   http://localhost:3000

---

# Screenshots

TBA

---

# Repository Structure

root/  
│  
├── frontend/          # Next.js  
├── backend/           # FastAPI  
├── README.md  

---


# Academic Purpose

This project was developed as part of a Software Architecture course assignment to demonstrate:

- Practical implementation of architectural principles
- Clean code structure
- Secure system design
- Role-based access control