# Polímata Mobile CRM

App móvil React Native para gestión de contactos/leads de Polímata.

## Stack Tecnológico

- React Native + Expo
- React Navigation (Stack Navigator)
- Axios (HTTP client)
- AsyncStorage (persistencia local)
- FastAPI backend integration

## Características

✅ **Login simple** - Pantalla de autenticación (demo)
✅ **Lista de contactos** - Con búsqueda y filtros por estado
✅ **Detalle de contacto** - Vista completa con acciones
✅ **Actualización de estado** - Cambiar status (nuevo/contactado/cerrado)
✅ **Pull to refresh** - Recargar datos del servidor
✅ **Fallback inteligente** - Usa datos mock si el backend no responde
✅ **Navegación profesional** - Stack navigation con React Navigation

## Instalación y Ejecución

### 1. Instalar dependencias

```bash
cd mobile
npm install
```

### 2. Configurar conexión al backend

Edita `src/services/api.js` línea 7:

```javascript
// Cambia localhost por la IP de tu computadora
const API_URL = 'http://192.168.1.XXX:8000';
```

**Para encontrar tu IP:**
- Windows: `ipconfig` (busca IPv4)
- Mac/Linux: `ifconfig` (busca inet)

### 3. Ejecutar la app

```bash
npm start
```

### 4. Probar en tu teléfono

1. Descarga **Expo Go** (App Store o Play Store)
2. Escanea el QR que aparece en la terminal
3. La app se cargará en tu teléfono

## Flujo de la App

```
Login (cualquier email/password)
  ↓
Lista de Contactos
  ├─ Búsqueda en tiempo real
  ├─ Filtros por estado (todos/nuevos/contactados/cerrados)
  ├─ Pull to refresh
  └─ Tap en contacto → Detalle
       ├─ Ver información completa
       ├─ Enviar email directo
       ├─ Llamar (si tiene teléfono)
       └─ Cambiar estado
```

## Integración con Backend

La app consume los siguientes endpoints de FastAPI:

- `GET /api/v1/contacts/` - Listar contactos
- `GET /api/v1/contacts/{id}` - Detalle de contacto
- `PUT /api/v1/contacts/{id}` - Actualizar estado

**Modo Fallback:**
Si el backend no está disponible, la app automáticamente usa 3 contactos de prueba (modo demo).

## Estructura del Proyecto

```
mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js           # Pantalla de login
│   │   ├── ContactsListScreen.js    # Lista con filtros y búsqueda
│   │   └── ContactDetailScreen.js   # Detalle + cambiar estado
│   ├── services/
│   │   └── api.js                   # Cliente Axios + endpoints
│   └── data/
│       └── mockData.js              # Datos de prueba
├── App.js                           # Navegación principal
└── package.json
```

## Arquitectura y Buenas Prácticas

### ✅ Separación de Responsabilidades
- **Screens**: Lógica de UI y estado local
- **Services**: Llamadas HTTP y lógica de API
- **Data**: Datos mock para desarrollo/testing

### ✅ Navegación Profesional
- React Navigation Stack Navigator
- Paso de parámetros entre pantallas
- Navegación con callbacks (actualizar lista al volver)

### ✅ Manejo de Estado
- AsyncStorage para sesión de usuario
- Estado local con useState/useEffect
- Actualización optimista de UI

### ✅ Experiencia de Usuario
- Pull to refresh
- Indicador de fuente de datos (backend vs mock)
- Búsqueda en tiempo real
- Filtros visuales con feedback

### ✅ Integración Backend
- Axios con timeout configurado
- Manejo de errores graceful
- Fallback automático a datos mock
- Headers apropiados (Content-Type)

## Para Producción

### Mejoras recomendadas:

1. **Autenticación real** - JWT tokens en lugar de login mock
2. **Crear contactos** - Formulario para agregar nuevos leads
3. **Notificaciones push** - Expo Notifications para nuevos contactos
4. **Offline-first** - Cache local con sincronización
5. **Tests** - Jest + React Native Testing Library

### Deploy a Stores:

```bash
# Build para Android
eas build --platform android --profile production

# Build para iOS
eas build --platform ios --profile production

# Submit a stores
eas submit --platform android
eas submit --platform ios
```

## Demostrar en Portfolio

**Elevator pitch:**
> "Desarrollé una app móvil React Native que consume el mismo backend FastAPI del proyecto web, demostrando arquitectura de microservicios donde múltiples frontends (web + móvil) comparten un único backend. Implementé navegación profesional con React Navigation, gestión de estado local, integración HTTP con fallback inteligente, y UX optimizada con búsqueda en tiempo real y pull-to-refresh."

**Keywords técnicos:**
- React Native + Expo
- React Navigation (Stack Navigator)
- Axios HTTP client
- AsyncStorage
- Microservices architecture
- RESTful API consumption
- Offline-first patterns
- Mobile UX best practices

## Valor para Entrevistas

Esta app demuestra:

1. **Full-stack thinking** - Frontend móvil + backend compartido
2. **Arquitectura moderna** - Microservicios, separación de concerns
3. **Buenas prácticas móviles** - Navegación, estado, persistencia
4. **Manejo de errores** - Fallback graceful, user feedback
5. **UX profesional** - Búsqueda, filtros, refresh, acciones directas

**Diferenciador:** No es solo una app demo, es parte de un ecosistema completo (web + móvil + backend).
