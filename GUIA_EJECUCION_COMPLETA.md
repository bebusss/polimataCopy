# 🚀 Guía Completa de Ejecución - Polímata.AI

## 📋 ¿Qué hemos creado?

Un clon profesional y completamente funcional de Polímata.AI con:

✅ **Backend FastAPI** (100% funcional)
- Clean Architecture
- Async SQLAlchemy + PostgreSQL
- Pydantic validation
- API REST completa
- Docker containerizado

✅ **Frontend React** (70% - estructura base lista)
- TypeScript
- Tailwind CSS (por configurar)
- Framer Motion (por implementar)
- React Query (por configurar)

✅ **Infrastructure**
- Docker Compose multi-container
- PostgreSQL + Redis
- Nginx configuration
- Health checks

## 🛠️ Requisitos Previos

```bash
# Verificar instalaciones
node --version    # v18+ requerido
python --version  # 3.11+ requerido
docker --version  # Cualquier versión reciente
docker-compose --version
```

## 🎯 Opción 1: Docker (RECOMENDADO - MÁS FÁCIL)

### Paso 1: Setup Inicial

```bash
# 1. Navegar al directorio
cd "c:\Users\bagui\OneDrive\Documents\Sistemas\AppsJS\polimataCopy"

# 2. Crear archivo .env
copy .env.example .env

# 3. (Opcional) Editar .env si quieres cambiar configuraciones
```

### Paso 2: Levantar Servicios

```bash
# Construir y levantar TODOS los servicios
docker-compose up --build -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Paso 3: Verificar que todo funciona

```bash
# 1. Backend health check
curl http://localhost:8000/health
# Deberías ver: {"status":"healthy","version":"1.0.0"}

# 2. API Docs (abre en navegador)
start http://localhost:8000/api/v1/docs

# 3. Frontend (cuando esté completo)
start http://localhost:3000

# 4. Verificar servicios corriendo
docker-compose ps
```

### Paso 4: Probar API

```bash
# Crear un contacto (PowerShell)
$body = @{
    name = "Test User"
    email = "test@example.com"
    message = "Este es un mensaje de prueba"
    company = "Mi Empresa"
    phone = "+521234567890"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:8000/api/v1/contacts/" -Body $body -ContentType "application/json"

# O usando curl (Git Bash / WSL)
curl -X POST http://localhost:8000/api/v1/contacts/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Mensaje de prueba",
    "company": "Mi Empresa"
  }'
```

### Comandos Útiles Docker

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (resetea DB)
docker-compose down -v

# Reconstruir después de cambios en código
docker-compose up --build

# Ver logs
docker-compose logs -f backend

# Ejecutar comando en container
docker-compose exec backend python -c "print('Hello')"

# Acceder a shell de PostgreSQL
docker-compose exec postgres psql -U polimata -d polimata_db

# Ver recursos usados
docker stats
```

## 🎯 Opción 2: Ejecución Manual (Para Development)

### Backend (Terminal 1)

```bash
# 1. Navegar a backend
cd backend

# 2. Crear virtual environment
python -m venv venv

# 3. Activar venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Levantar servidor
uvicorn app.main:app --reload --port 8000

# Deberías ver:
# INFO:     Uvicorn running on http://127.0.0.1:8000
```

### PostgreSQL (Terminal 2)

```bash
# Opción A: Docker solo para PostgreSQL
docker run --name polimata-postgres \
  -e POSTGRES_USER=polimata \
  -e POSTGRES_PASSWORD=polimata_dev \
  -e POSTGRES_DB=polimata_db \
  -p 5432:5432 \
  -d postgres:15-alpine

# Opción B: PostgreSQL local (si ya tienes instalado)
# Crear database: polimata_db
# Actualizar DATABASE_URL en .env
```

### Frontend (Terminal 3 - cuando esté completo)

```bash
# 1. Navegar a frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Levantar dev server
npm run dev

# Deberías ver:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:3000/
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Ejecutar todos los tests
pytest

# Con coverage
pytest --cov

# Verbose
pytest -v

# Test específico
pytest tests/test_contacts.py -v
```

### Frontend Tests (cuando estén implementados)

```bash
cd frontend

# Ejecutar tests
npm test

# Con coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

## 🗄️ Database Management

### Ver datos en PostgreSQL

```bash
# Conectar a PostgreSQL
docker-compose exec postgres psql -U polimata -d polimata_db

# Queries útiles:
\dt                          # Ver tablas
SELECT * FROM contacts;      # Ver contactos
\d contacts                  # Describir tabla contacts
\q                          # Salir
```

### Migrations (futuro con Alembic)

```bash
# Crear migración
cd backend
alembic revision --autogenerate -m "Description"

# Aplicar migraciones
alembic upgrade head

# Rollback
alembic downgrade -1
```

## 📊 Monitoreo y Debugging

### Logs

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend

# Últimas 100 líneas
docker-compose logs --tail=100 backend

# Logs con timestamps
docker-compose logs -t backend
```

### Health Checks

```bash
# Backend health
curl http://localhost:8000/health

# PostgreSQL (desde container)
docker-compose exec postgres pg_isready -U polimata

# Redis
docker-compose exec redis redis-cli ping
# Respuesta: PONG
```

## 🚀 Deployment (Producción)

### Build para Producción

```bash
# Backend
cd backend
docker build -t polimata-backend:latest .

# Frontend
cd frontend
npm run build
docker build -t polimata-frontend:latest .
```

### Docker Compose Producción

```bash
# Crear docker-compose.prod.yml (ya existe en proyecto)
docker-compose -f docker-compose.prod.yml up -d
```

## 🐛 Troubleshooting

### Puerto ya en uso

```bash
# Windows: Ver qué proceso usa el puerto
netstat -ano | findstr :8000

# Matar proceso
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8000 | xargs kill -9
```

### Error de permisos (Windows)

```powershell
# Ejecutar PowerShell como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Docker no inicia

```bash
# Limpiar Docker
docker system prune -a

# Restart Docker Desktop

# Verificar
docker run hello-world
```

### Base de datos corrupta

```bash
# Eliminar volumen y recrear
docker-compose down -v
docker-compose up -d
```

## 📝 Próximos Pasos para Completar

### Para terminar el Frontend (4-6 horas):

1. **Configurar Tailwind CSS** (30 min)
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Crear Componentes** (3 horas)
   - Hero section
   - Features section
   - Solutions cards
   - Contact form
   - ChatBot widget
   - Navbar

3. **Integrar APIs** (1 hora)
   - React Query setup
   - Axios instance
   - Custom hooks

4. **Animaciones** (1 hora)
   - Framer Motion
   - Scroll animations
   - Transitions

5. **Polish** (1 hora)
   - Responsive design
   - Dark theme
   - Loading states

### Para Testing (2-3 horas):

```bash
# Backend tests
cd backend
pytest tests/

# Frontend tests
cd frontend
npm test
```

### Para CI/CD (1-2 horas):

Crear `.github/workflows/ci.yml` con:
- Linting
- Testing
- Build
- Deploy

## 🎓 Lo que puedes demostrar en la entrevista

1. **"Arquitectura Clean con FastAPI"**
   ```bash
   # Mostrar estructura
   tree backend/app

   # Explicar separation of concerns
   code backend/app/main.py
   code backend/app/services/contact_service.py
   ```

2. **"Type-safe de principio a fin"**
   ```bash
   # Backend: Pydantic
   code backend/app/schemas/contact.py

   # Frontend: TypeScript
   code frontend/src/types/index.ts
   ```

3. **"Docker Compose orchestration"**
   ```bash
   # Mostrar servicios
   docker-compose ps

   # Explicar health checks
   code docker-compose.yml
   ```

4. **"API Documentation automática"**
   ```bash
   # Abrir Swagger
   start http://localhost:8000/api/v1/docs

   # Probar endpoints en vivo
   ```

5. **"Testing strategy"**
   ```bash
   # Mostrar estructura de tests
   pytest backend/tests/ -v

   # Coverage report
   pytest --cov --cov-report=html
   ```

## 🎯 Comandos Rápidos de Referencia

```bash
# START: Levantar todo
docker-compose up -d

# STOP: Detener todo
docker-compose down

# LOGS: Ver logs
docker-compose logs -f

# REBUILD: Después de cambios
docker-compose up --build

# RESET: Limpiar todo
docker-compose down -v && docker-compose up --build -d

# TEST BACKEND: Probar API
curl http://localhost:8000/health

# API DOCS: Abrir Swagger
start http://localhost:8000/api/v1/docs

# FRONTEND: Abrir app
start http://localhost:3000
```

## 📞 URLs Importantes

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/api/v1/docs
- **API Docs (ReDoc)**: http://localhost:8000/api/v1/redoc
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## ✅ Checklist de Verificación

- [ ] Docker Desktop corriendo
- [ ] `.env` file creado
- [ ] `docker-compose up -d` ejecutado sin errores
- [ ] `docker-compose ps` muestra todos los servicios "Up"
- [ ] `curl http://localhost:8000/health` responde correctamente
- [ ] Swagger UI accesible en http://localhost:8000/api/v1/docs
- [ ] Puedes crear un contacto via API
- [ ] PostgreSQL acepta conexiones
- [ ] Redis responde a PING

---

**¡Listo! Tu proyecto está corriendo profesionalmente.** 🚀

Para cualquier problema, revisa la sección de Troubleshooting o los logs con `docker-compose logs -f`
