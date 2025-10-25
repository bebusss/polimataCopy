# Polímata.AI - AI-Powered Business Solutions Platform

Modern, scalable platform for AI-driven business automation and optimization. Built with enterprise-grade architecture and industry best practices.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **Zustand** for state management
- **Vite** for blazing-fast builds

### Backend
- **FastAPI** (Python 3.11+)
- **PostgreSQL** with Supabase
- **SQLAlchemy** ORM
- **Pydantic** for validation
- **Alembic** for migrations
- **Redis** for caching

### DevOps
- **Docker** & Docker Compose
- **GitHub Actions** for CI/CD
- **Nginx** reverse proxy
- **Let's Encrypt** SSL

### Testing
- **Jest** + React Testing Library (Frontend)
- **Pytest** + Coverage (Backend)
- **Cypress** for E2E testing

## 📁 Project Structure

```
polimataCopy/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript definitions
│   ├── public/
│   └── tests/
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── core/            # Core configurations
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── tests/
│   └── alembic/             # DB migrations
├── docker/                   # Docker configurations
├── nginx/                    # Nginx configuration
├── .github/workflows/        # CI/CD pipelines
└── docs/                     # Documentation

```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd polimataCopy
```

2. **Environment Setup**
```bash
# Copy environment files
cp .env.example .env
```

3. **Docker Setup (Recommended)**
```bash
# Build and start all services
docker-compose up -d

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

4. **Manual Setup (Alternative)**

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test                 # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:coverage   # Generate coverage report
```

### Backend Tests
```bash
cd backend
pytest                   # Run all tests
pytest --cov            # With coverage
pytest -v               # Verbose output
```

## 🚢 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
docker build -t polimata-api .
```

### Docker Deployment
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Features

- ✅ Modern, responsive UI with dark theme
- ✅ Real-time AI chatbot integration
- ✅ Multiple language support (ES/EN)
- ✅ Advanced analytics dashboard
- ✅ Microservices-ready architecture
- ✅ Comprehensive API documentation
- ✅ Performance optimized
- ✅ SEO friendly
- ✅ Accessibility compliant (WCAG 2.1)
- ✅ Type-safe (TypeScript + Pydantic)

## 🏗️ Architecture

### Design Patterns
- **Clean Architecture**: Separation of concerns
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic encapsulation
- **DTO Pattern**: Data transfer objects

### Key Principles
- SOLID principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)

## 📈 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- API Response Time: < 100ms (p95)

## 🔒 Security

- HTTPS/TLS encryption
- JWT authentication
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection
- Rate limiting
- Security headers

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🙏 Acknowledgments

Built with modern web technologies and industry best practices.
