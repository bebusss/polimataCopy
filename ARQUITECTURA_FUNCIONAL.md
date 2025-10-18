# 🏗️ Arquitectura Funcional del Sistema

## Vista General

```
┌──────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                              │
│                   http://localhost:3000                       │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ Usuario interactúa
                        ↓
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                           │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Navbar    │  │     Hero     │  │ ChatButton   │        │
│  │             │  │              │  │              │        │
│  │ onClick()   │  │  onClick()   │  │  onClick()   │        │
│  │    ↓        │  │      ↓       │  │      ↓       │        │
│  │ scrollTo()  │  │ scrollTo()   │  │ scrollTo()   │        │
│  └─────────────┘  └──────────────┘  └──────────────┘        │
│                          │                                    │
│                          ↓                                    │
│                 ┌──────────────────┐                         │
│                 │  ContactForm     │                         │
│                 │                  │                         │
│                 │  1. Validación   │                         │
│                 │  2. handleSubmit │                         │
│                 │  3. contactAPI   │                         │
│                 └────────┬─────────┘                         │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           │ HTTP POST
                           │ axios request
                           ↓
┌──────────────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI)                            │
│               http://localhost:8000                           │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         API Layer (endpoints/contacts.py)             │   │
│  │                                                        │   │
│  │  @router.post("/")                                    │   │
│  │  async def create_contact(...)                        │   │
│  └────────────────────┬───────────────────────────────────┘   │
│                       │                                       │
│                       ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │       Service Layer (contact_service.py)              │   │
│  │                                                        │   │
│  │  class ContactService:                                │   │
│  │    async def create_contact(...)                      │   │
│  └────────────────────┬───────────────────────────────────┘   │
│                       │                                       │
│                       ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Repository Layer (contact_repository.py)           │   │
│  │                                                        │   │
│  │  class ContactRepository:                             │   │
│  │    async def create(...)                              │   │
│  └────────────────────┬───────────────────────────────────┘   │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        │ SQLAlchemy ORM
                        ↓
        ┌───────────────────────────┐
        │   PostgreSQL Database      │
        │   (polimata_db)           │
        │                           │
        │   Table: contacts         │
        │   - id                    │
        │   - name                  │
        │   - email                 │
        │   - company               │
        │   - message               │
        │   - created_at            │
        └───────────────────────────┘
```

---

## 🔄 Flujo de Interacción del Usuario

### Escenario 1: Click en botón CTA

```
Usuario click "Agenda tu diagnóstico"
         ↓
Hero.tsx detecta onClick
         ↓
scrollToSection('contactform')
         ↓
utils.ts calcula posición
         ↓
window.scrollTo({ behavior: 'smooth' })
         ↓
Usuario ve formulario
```

### Escenario 2: Envío del formulario

```
Usuario llena formulario
         ↓
Validación en tiempo real
(botón habilitado/deshabilitado)
         ↓
Usuario click "Quiero mi llamada"
         ↓
ContactForm.handleSubmit()
         ↓
contactAPI.submit(data)
         ↓
axios POST http://localhost:8000/api/v1/contacts/
         ↓
FastAPI recibe request
         ↓
Pydantic valida datos (ContactCreate schema)
         ↓
ContactService.create_contact()
         ↓
ContactRepository.create()
         ↓
SQLAlchemy INSERT INTO contacts
         ↓
PostgreSQL guarda registro
         ↓
Response 200 OK con datos
         ↓
Frontend muestra mensaje verde
         ↓
Formulario se limpia
```

---

## 📦 Estructura de Archivos

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           ← onClick → scrollToSection
│   │   ├── Hero.tsx             ← onClick → scrollToSection
│   │   ├── ChatButton.tsx       ← onClick → scrollToSection
│   │   ├── ContactForm.tsx      ← handleSubmit → API
│   │   ├── Partners.tsx
│   │   ├── Features.tsx
│   │   ├── Solutions.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   └── Icons.tsx
│   ├── lib/
│   │   ├── api.ts              ← axios instance + contactAPI
│   │   └── utils.ts            ← scrollToSection function
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                        ← VITE_API_URL
└── package.json
```

### Backend (`/backend`)

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │           └── contacts.py    ← POST /api/v1/contacts/
│   ├── core/
│   │   ├── config.py             ← Settings, env vars
│   │   └── database.py           ← SQLAlchemy engine
│   ├── models/
│   │   └── contact.py            ← Contact ORM model
│   ├── schemas/
│   │   └── contact.py            ← Pydantic schemas
│   ├── services/
│   │   └── contact_service.py    ← Business logic
│   ├── repositories/
│   │   └── contact_repository.py ← Data access
│   └── main.py                   ← FastAPI app
└── requirements.txt
```

---

## 🔌 Endpoints del Backend

### Health Check
```
GET http://localhost:8000/health

Response:
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Crear Contacto
```
POST http://localhost:8000/api/v1/contacts/

Request Body:
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "company": "Mi Empresa",
  "message": "Quiero automatizar mi negocio"
}

Response:
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": null,
  "company": "Mi Empresa",
  "message": "Quiero automatizar mi negocio",
  "created_at": "2025-10-18T21:45:00.123456Z"
}
```

### Documentación Interactiva
```
GET http://localhost:8000/docs
→ Swagger UI

GET http://localhost:8000/redoc
→ ReDoc
```

---

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool (super rápido)
- **Tailwind CSS** - Styling
- **Framer Motion** - Animaciones
- **Axios** - HTTP client

### Backend
- **FastAPI** - Web framework
- **Python 3.11** - Programming language
- **SQLAlchemy** - ORM (async)
- **Pydantic** - Data validation
- **PostgreSQL 15** - Database
- **Redis 7** - Cache
- **Uvicorn** - ASGI server

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación
- **Nginx** (opcional) - Reverse proxy

---

## 🔐 Variables de Entorno

### Frontend (`.env`)
```bash
VITE_API_URL=http://localhost:8000
```

### Backend (`.env`)
```bash
DATABASE_URL=postgresql://polimata_user:polimata_pass@postgres:5432/polimata_db
REDIS_URL=redis://redis:6379/0
SECRET_KEY=tu-secret-key-aqui
```

---

## 🚀 Comandos Importantes

### Iniciar todo
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Reiniciar servicio
```bash
docker-compose restart frontend
docker-compose restart backend
```

### Rebuild
```bash
docker-compose down
docker-compose up --build
```

### Conectar a DB
```bash
docker exec -it polimata-postgres psql -U polimata_user -d polimata_db
```

---

## ✨ Patrones de Diseño Implementados

### Frontend
- **Component-based architecture** - React components
- **Custom hooks** - useState, useEffect
- **Utility functions** - lib/utils.ts
- **API abstraction** - lib/api.ts

### Backend
- **Clean Architecture** - Separación de capas
- **Repository Pattern** - Abstracción de datos
- **Service Layer** - Lógica de negocio
- **Dependency Injection** - FastAPI Depends()
- **DTO Pattern** - Pydantic schemas

---

## 🎯 Resultado Final

Un sistema **completamente funcional** con:
- ✅ Separación de responsabilidades
- ✅ Código limpio y mantenible
- ✅ Type safety (TypeScript + Pydantic)
- ✅ Validaciones en frontend y backend
- ✅ Animaciones suaves
- ✅ Experiencia de usuario profesional
- ✅ Arquitectura escalable
- ✅ Fácil de desplegar

**¡Todo listo para producción!** 🚀
