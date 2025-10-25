# Polímata.AI - AI-Powered CRM Platform

Modern fullstack CRM platform with AI-driven lead scoring (Claude AI), JWT authentication, and real-time analytics dashboard.

## 🎯 Key Features

- **🤖 AI Lead Scoring**: Claude API (Anthropic) integration for automatic contact analysis
- **🔐 JWT Authentication**: Secure login/register system with token management
- **📊 Analytics Dashboard**: Real-time metrics, charts, and statistics visualization
- **📱 Mobile App**: React Native (Expo) with data synchronization
- **🎨 Modern UI/UX**: Responsive design with Tailwind CSS and Framer Motion
- **⚡ Async Architecture**: FastAPI with SQLAlchemy async for maximum performance
- **🐳 Dockerized**: Complete deployment with Docker Compose

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Web (React + TypeScript)          Mobile (React Native/Expo)  │
│  ├─ Landing Page                   ├─ Login Screen             │
│  ├─ Login/Register                 ├─ Contacts List            │
│  ├─ Dashboard                      └─ Contact Details          │
│  ├─ Contacts Management                                         │
│  └─ Analytics Charts                                            │
└─────────────────────────────────────────────────────────────────┘
                               ↓ REST API
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  FastAPI (Python 3.11)                                          │
│  ├─ /api/v1/auth          → Authentication (JWT)               │
│  ├─ /api/v1/contacts      → CRUD Contacts                       │
│  ├─ /api/v1/analytics     → Statistics & Metrics                │
│  └─ /api/v1/chat          → AI Chatbot                          │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ├─ UserService           → User management                     │
│  ├─ ContactService        → Contact business logic              │
│  └─ AIService             → Claude API integration              │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL 15 + SQLAlchemy (Async)                             │
│  ├─ users                 → User accounts                       │
│  └─ contacts              → Lead submissions with AI data       │
└─────────────────────────────────────────────────────────────────┘
```


## 🚀 Tech Stack

### Frontend Web

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Library |
| TypeScript | 5.2.2 | Type Safety |
| Vite | 5.0.0 | Ultra-fast Build Tool |
| React Router | 6.20.0 | Client-side Routing |
| Zustand | 4.4.7 | State Management |
| React Query | 5.8.4 | Server State & Caching |
| Axios | 1.6.2 | HTTP Client |
| Recharts | 2.10.3 | Data Visualization |
| Tailwind CSS | 3.3.6 | Utility-first CSS |
| Framer Motion | 10.16.5 | Animations |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.104.1 | Web Framework |
| Python | 3.11+ | Programming Language |
| SQLAlchemy | 2.0.23 | ORM (Async) |
| PostgreSQL | 15 | Relational Database |
| asyncpg | 0.29.0 | Async PostgreSQL Driver |
| Pydantic | 2.5.0 | Data Validation |
| passlib | 1.7.4 | Password Hashing |
| python-jose | 3.3.0 | JWT Tokens |

## 🔧 Quick Start

**Prerequisites:** Docker & Docker Compose

```bash
# Clone repository
git clone <repository-url>
cd polimataCopy

# Start all services
docker-compose up -d

# Access:
# - Web: http://localhost:3000
# - API Docs: http://localhost:8000/api/v1/docs
# - Health: http://localhost:8000/health

# Test credentials:
# Email: admin@polimata.com
# Password: admin123
```

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login with credentials
- `GET /api/v1/auth/me` - Get current user info

### Contacts
- `POST /api/v1/contacts/` - Create contact (with AI scoring)
- `GET /api/v1/contacts/` - List all contacts (protected)
- `PUT /api/v1/contacts/{id}` - Update contact status (protected)
- `DELETE /api/v1/contacts/{id}` - Delete contact (protected)

### Analytics
- `GET /api/v1/analytics/summary` - Get analytics summary (protected)
- `GET /api/v1/analytics/timeline?days=30` - Get timeline (protected)

## 🤖 AI Integration

Uses Claude API for:
- Lead scoring (0-100)
- Priority classification
- Insights extraction
- Response suggestions

Configure: `ANTHROPIC_API_KEY=sk-ant-api03-xxxxx` in backend/.env

## 📱 Mobile Setup

```bash
cd mobile
npm install
# Update API_URL in src/services/api.js with your local IP
npm start
# Scan QR with Expo Go
```

## 🐛 Troubleshooting

**Backend won't start:** `docker-compose logs backend`

**Frontend can't connect:** Check CORS in backend/.env

**Mobile can't connect:** Update IP in mobile/src/services/api.js, verify same WiFi

## 📝 License

MIT License
