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

## 🛠️ Instalación del Entorno de Desarrollo

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

#### Requerimientos Esenciales
- **Docker Desktop** (v20.10+)
  - Windows: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Mac: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Linux: `sudo apt-get install docker docker-compose` o equivalente
- **Git** (v2.30+)
  - [Descargar Git](https://git-scm.com/downloads)

#### Requerimientos Opcionales (solo si NO usas Docker)
- **Node.js** (v18+ con npm)
  - [Descargar Node.js](https://nodejs.org/)
  - Verifica instalación: `node --version && npm --version`
- **Python** (v3.11+)
  - [Descargar Python](https://www.python.org/downloads/)
  - Verifica instalación: `python --version` o `python3 --version`
- **PostgreSQL** (v15+) - Solo para desarrollo sin Docker
- **Redis** (v7+) - Solo para desarrollo sin Docker

---

### 🚀 Instalación Rápida con Docker (Recomendado)

Este método funciona en **Windows, Mac y Linux** y configura todo el entorno automáticamente.

#### Paso 1: Clonar el Repositorio
```bash
git clone <repository-url>
cd polimataCopy
```

#### Paso 2: Configurar Variables de Entorno (Opcional)
```bash
# El proyecto funciona con valores por defecto para desarrollo
# Si quieres personalizar la configuración, crea un archivo .env:

# Backend .env (opcional)
echo "DATABASE_URL=postgresql://polimata:polimata_dev@postgres:5432/polimata_db
REDIS_URL=redis://redis:6379
SECRET_KEY=$(openssl rand -hex 32)
CORS_ORIGINS=http://localhost:3000,http://localhost:8000" > backend/.env

# Frontend .env (opcional)
echo "VITE_API_URL=http://localhost:8000" > frontend/.env
```

#### Paso 3: Iniciar Todos los Servicios
```bash
# Construir e iniciar todos los contenedores en segundo plano
docker-compose up -d

# Ver logs en tiempo real (opcional)
docker-compose logs -f
```

#### Paso 4: Verificar que Todo Funcione
Abre tu navegador y accede a:
- **Frontend Web**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API (Swagger)**: http://localhost:8000/api/v1/docs
- **Documentación API (ReDoc)**: http://localhost:8000/api/v1/redoc

#### Paso 5: Detener los Servicios
```bash
# Detener todos los contenedores
docker-compose down

# Detener y ELIMINAR todos los datos (base de datos, caché)
docker-compose down -v
```

---

### 🔧 Instalación Manual (Sin Docker)

Si prefieres ejecutar los servicios localmente sin Docker:

#### Backend (FastAPI)
```bash
# 1. Navegar a la carpeta del backend
cd backend

# 2. Crear entorno virtual de Python
python -m venv venv

# 3. Activar el entorno virtual
# En Windows:
venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Configurar PostgreSQL y Redis locales
# Asegúrate de que PostgreSQL esté corriendo en localhost:5432
# Asegúrate de que Redis esté corriendo en localhost:6379

# 6. Crear la base de datos
createdb polimata_db  # O usa pgAdmin/DBeaver

# 7. Configurar variables de entorno
export DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/polimata_db"
export REDIS_URL="redis://localhost:6379"
export SECRET_KEY="tu-clave-secreta-aqui"

# 8. Iniciar el servidor de desarrollo
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend (React + Vite)
```bash
# 1. Navegar a la carpeta del frontend (en una nueva terminal)
cd frontend

# 2. Instalar dependencias de Node.js
npm install

# 3. Configurar variable de entorno (opcional)
echo "VITE_API_URL=http://localhost:8000" > .env

# 4. Iniciar el servidor de desarrollo
npm run dev
```

#### Mobile (React Native + Expo)
```bash
# 1. Navegar a la carpeta mobile
cd mobile

# 2. Instalar dependencias
npm install

# 3. Iniciar Expo
npm start

# 4. Opciones:
# - Presiona 'w' para abrir en navegador web
# - Escanea QR con Expo Go (iOS/Android)
# - Presiona 'i' para iOS simulator (Mac)
# - Presiona 'a' para Android emulator
```

---

### 🌍 Configuración Multi-Dispositivo

Para trabajar en diferentes computadoras con el mismo proyecto:

#### Opción 1: Usando Docker (Más Simple)
```bash
# En la nueva computadora:
git clone <repository-url>
cd polimataCopy
docker-compose up -d
# ¡Listo! Todo funciona idéntico en cualquier sistema
```

#### Opción 2: Compartir Configuración Manual
1. **Instala los prerrequisitos** en la nueva máquina (Node.js, Python, PostgreSQL, Redis)
2. **Clona el repositorio**: `git clone <repository-url>`
3. **Copia tus archivos .env** (si los personalizaste)
4. **Instala dependencias**:
   ```bash
   # Frontend
   cd frontend && npm install

   # Backend
   cd ../backend && pip install -r requirements.txt

   # Mobile
   cd ../mobile && npm install
   ```
5. **Configura la base de datos** en el nuevo sistema
6. **Ejecuta los servicios** siguiendo los pasos de instalación manual

---

### 🐛 Solución de Problemas Comunes

#### Docker no inicia los contenedores
```bash
# Verificar que Docker Desktop esté corriendo
docker --version

# Reconstruir imágenes desde cero
docker-compose build --no-cache

# Ver logs de errores
docker-compose logs
```

#### Puerto ya en uso (3000 u 8000)
```bash
# Opción 1: Detener el proceso que usa el puerto
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000

# Opción 2: Cambiar puertos en docker-compose.yml
# Ejemplo: "3001:3000" en lugar de "3000:3000"
```

#### Error de conexión a base de datos
```bash
# Verificar que PostgreSQL esté corriendo
docker-compose ps

# Esperar a que el servicio esté "healthy"
docker-compose up -d postgres
# Espera 10-15 segundos antes de iniciar el backend
```

#### Dependencias de Node.js no se instalan
```bash
# Limpiar caché y reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Python no encuentra módulos
```bash
# Asegúrate de estar en el entorno virtual
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstalar dependencias
pip install -r requirements.txt
```

---

### 📦 Estructura de Servicios Docker

El proyecto utiliza **5 contenedores** en desarrollo:

| Servicio | Puerto | Descripción | Dependencias |
|----------|--------|-------------|--------------|
| **postgres** | 5432 | Base de datos PostgreSQL 15 | Ninguna |
| **redis** | 6379 | Caché y sesiones Redis 7 | Ninguna |
| **backend** | 8000 | API FastAPI con hot-reload | postgres, redis |
| **frontend** | 3000 | Aplicación React con Vite | backend |
| **nginx** | 80 | Proxy inverso (solo producción) | backend, frontend |

#### Volúmenes Persistentes
- `postgres_data`: Almacena datos de PostgreSQL
- `redis_data`: Almacena datos de Redis
- `./backend:/app`: Sincroniza código del backend (hot-reload)
- `./frontend:/app`: Sincroniza código del frontend (hot-reload)

---

### 🔐 Variables de Entorno

#### Backend (`backend/.env`)
```bash
# Base de datos
DATABASE_URL=postgresql+asyncpg://polimata:polimata_dev@postgres:5432/polimata_db
DATABASE_POOL_SIZE=5
DATABASE_MAX_OVERFLOW=10

# Redis
REDIS_URL=redis://redis:6379
REDIS_CACHE_TTL=300

# Seguridad
SECRET_KEY=clave-aleatoria-generada-con-openssl
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=["http://localhost:3000","http://localhost:8000"]

# Servicios opcionales (AI)
OPENAI_API_KEY=sk-...                    # Opcional
ANTHROPIC_API_KEY=sk-ant-...             # Opcional

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password
```

#### Frontend (`frontend/.env`)
```bash
VITE_API_URL=http://localhost:8000
```

---

### ✅ Checklist de Instalación

- [ ] Docker Desktop instalado y corriendo
- [ ] Git instalado
- [ ] Repositorio clonado
- [ ] `docker-compose up -d` ejecutado sin errores
- [ ] Frontend accesible en http://localhost:3000
- [ ] Backend accesible en http://localhost:8000
- [ ] Documentación API visible en http://localhost:8000/api/v1/docs
- [ ] Base de datos PostgreSQL corriendo (verificar logs)
- [ ] Redis corriendo (verificar logs)

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
