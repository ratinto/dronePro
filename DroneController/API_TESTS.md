# Drone Telemetry API - Quick Test Guide

## Test the API endpoints using curl or your browser

### 1. Get All Drones
```bash
curl http://localhost:3000/api/drone
```

### 2. Get Drone by ID
```bash
curl http://localhost:3000/api/drone/1
```

### 3. Get Latest Telemetry
```bash
curl http://localhost:3000/api/drone/1/telemetry/latest
```

### 4. Get Telemetry History (last 10 records)
```bash
curl http://localhost:3000/api/drone/1/telemetry?limit=10
```

### 5. Create a New Drone
```bash
curl -X POST http://localhost:3000/api/drone \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Drone Gamma",
    "model": "Autel EVO II",
    "serialNo": "AUTEL-003-DEF"
  }'
```

### 6. Add Telemetry Data
```bash
curl -X POST http://localhost:3000/api/drone/1/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 28.98560,
    "longitude": 77.09040,
    "altitude": 160.0,
    "speed": 14.0,
    "heading": 280.0,
    "batteryLevel": 82.5,
    "satellites": 14,
    "flightMode": "auto",
    "armed": true
  }'
```

### 7. Update Drone Status
```bash
curl -X PATCH http://localhost:3000/api/drone/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "charging"}'
```

### 8. Get Telemetry with Date Filter
```bash
curl "http://localhost:3000/api/drone/1/telemetry?limit=50&startDate=2025-12-07T00:00:00Z"
```

## Browser URLs (GET requests only)

Open these in your browser:

- All Drones: http://localhost:3000/api/drone
- Drone 1: http://localhost:3000/api/drone/1
- Latest Telemetry: http://localhost:3000/api/drone/1/telemetry/latest
- Telemetry History: http://localhost:3000/api/drone/1/telemetry?limit=10

## Sample Data Created

The seed script created:
- **Drone Alpha** (ID: 1) - DJI Mavic 3, Active
- **Drone Beta** (ID: 2) - Parrot Anafi, Idle

Each drone has telemetry data with GPS coordinates, battery level, and sensor readings.
