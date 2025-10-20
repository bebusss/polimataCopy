# Setup React Native Mobile App

## 1. Migración de Base de Datos

Primero, agrega el campo `status` a la tabla contacts:

```bash
# Opción 1: Comando directo (recomendado)
docker exec -it polimata-postgres psql -U polimata -d polimata_db -c "ALTER TABLE contacts ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' NOT NULL;"

# Opción 2: Interactivo
docker exec -it polimata-postgres psql -U polimata -d polimata_db
# Luego dentro de psql ejecuta:
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' NOT NULL;
\d contacts
\q
```

## 2. Reiniciar Backend

```bash
cd backend
docker-compose restart backend
# O si no usas Docker:
# uvicorn app.main:app --reload
```

## 3. Configurar IP del Backend en Mobile

Encuentra tu IP local:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

Edita `mobile/src/services/api.ts` línea 8:
```typescript
const API_URL = 'http://TU_IP_AQUI:8000';  // Ejemplo: http://192.168.1.10:8000
```

## 4. Ejecutar App Móvil

```bash
cd mobile
npm start
```

## 5. Probar en tu teléfono

1. Descarga **Expo Go** desde App Store (iOS) o Play Store (Android)
2. Abre Expo Go
3. Escanea el QR que aparece en la terminal
4. La app se cargará en tu teléfono

## Troubleshooting

### No puedo conectar al backend
- Asegúrate que tu teléfono y computadora están en la misma red WiFi
- Verifica que usaste tu IP local, NO `localhost`
- Verifica que el backend está corriendo: `curl http://localhost:8000/health`

### Errores de dependencias
```bash
cd mobile
rm -rf node_modules
npm install
```

### Backend no responde
```bash
# Verificar que el backend esté corriendo
docker ps

# Ver logs
docker-compose logs -f backend
```
