# Drone Telemetry API Documentation

## Base URL
`http://localhost:3000/api/drone`

---

## Endpoints

### 1. Get All Drones
Get a list of all drones with their latest telemetry data.

**Endpoint:** `GET /api/drone`

**Response:**
```json
{
  "status": "ok",
  "drones": [
    {
      "id": 1,
      "name": "Drone Alpha",
      "model": "DJI Mavic 3",
      "serialNo": "DJI-001-XYZ",
      "status": "active",
      "createdAt": "2025-12-07T10:00:00.000Z",
      "updatedAt": "2025-12-07T14:00:00.000Z",
      "latestTelemetry": {
        "id": 42,
        "droneId": 1,
        "latitude": 28.98544,
        "longitude": 77.09027,
        "altitude": 150.5,
        "speed": 12.5,
        "heading": 270.0,
        "batteryLevel": 85.5,
        "temperature": 28.5,
        "humidity": 65.0,
        "pressure": 1013.25,
        "satellites": 12,
        "signalStrength": 95.0,
        "flightMode": "auto",
        "armed": true,
        "timestamp": "2025-12-07T14:00:00.000Z"
      }
    }
  ]
}
```

---

### 2. Get Drone by ID
Get detailed information about a specific drone.

**Endpoint:** `GET /api/drone/:id`

**Parameters:**
- `id` (path) - Drone ID

**Response:**
```json
{
  "status": "ok",
  "drone": {
    "id": 1,
    "name": "Drone Alpha",
    "model": "DJI Mavic 3",
    "serialNo": "DJI-001-XYZ",
    "status": "active",
    "createdAt": "2025-12-07T10:00:00.000Z",
    "updatedAt": "2025-12-07T14:00:00.000Z",
    "latestTelemetry": { ... }
  }
}
```

---

### 3. Get Drone Telemetry History
Get telemetry history for a specific drone.

**Endpoint:** `GET /api/drone/:id/telemetry`

**Parameters:**
- `id` (path) - Drone ID
- `limit` (query, optional) - Number of records to return (default: 100)
- `startDate` (query, optional) - Filter from date (ISO 8601)
- `endDate` (query, optional) - Filter to date (ISO 8601)

**Example:**
```
GET /api/drone/1/telemetry?limit=50&startDate=2025-12-07T00:00:00Z
```

**Response:**
```json
{
  "status": "ok",
  "droneId": 1,
  "count": 50,
  "telemetry": [
    {
      "id": 42,
      "droneId": 1,
      "latitude": 28.98544,
      "longitude": 77.09027,
      "altitude": 150.5,
      "speed": 12.5,
      "heading": 270.0,
      "batteryLevel": 85.5,
      "temperature": 28.5,
      "humidity": 65.0,
      "pressure": 1013.25,
      "satellites": 12,
      "signalStrength": 95.0,
      "flightMode": "auto",
      "armed": true,
      "timestamp": "2025-12-07T14:00:00.000Z"
    }
  ]
}
```

---

### 4. Get Latest Telemetry
Get the most recent telemetry data for a drone.

**Endpoint:** `GET /api/drone/:id/telemetry/latest`

**Parameters:**
- `id` (path) - Drone ID

**Response:**
```json
{
  "status": "ok",
  "telemetry": {
    "id": 42,
    "droneId": 1,
    "latitude": 28.98544,
    "longitude": 77.09027,
    "altitude": 150.5,
    "speed": 12.5,
    "heading": 270.0,
    "batteryLevel": 85.5,
    "temperature": 28.5,
    "humidity": 65.0,
    "pressure": 1013.25,
    "satellites": 12,
    "signalStrength": 95.0,
    "flightMode": "auto",
    "armed": true,
    "timestamp": "2025-12-07T14:00:00.000Z"
  }
}
```

---

### 5. Create New Drone
Register a new drone in the system.

**Endpoint:** `POST /api/drone`

**Request Body:**
```json
{
  "name": "Drone Alpha",
  "model": "DJI Mavic 3",
  "serialNo": "DJI-001-XYZ",
  "status": "idle"
}
```

**Required Fields:**
- `name` - Drone name
- `model` - Drone model
- `serialNo` - Unique serial number

**Optional Fields:**
- `status` - Drone status (default: "idle")

**Response:**
```json
{
  "status": "ok",
  "drone": {
    "id": 1,
    "name": "Drone Alpha",
    "model": "DJI Mavic 3",
    "serialNo": "DJI-001-XYZ",
    "status": "idle",
    "createdAt": "2025-12-07T10:00:00.000Z",
    "updatedAt": "2025-12-07T10:00:00.000Z"
  }
}
```

---

### 6. Add Telemetry Data
Add new telemetry data for a drone.

**Endpoint:** `POST /api/drone/:id/telemetry`

**Parameters:**
- `id` (path) - Drone ID

**Request Body:**
```json
{
  "latitude": 28.98544,
  "longitude": 77.09027,
  "altitude": 150.5,
  "speed": 12.5,
  "heading": 270.0,
  "batteryLevel": 85.5,
  "temperature": 28.5,
  "humidity": 65.0,
  "pressure": 1013.25,
  "satellites": 12,
  "signalStrength": 95.0,
  "flightMode": "auto",
  "armed": true
}
```

**Required Fields:**
- `latitude` - GPS latitude
- `longitude` - GPS longitude
- `altitude` - Altitude in meters
- `speed` - Speed in m/s
- `heading` - Heading in degrees (0-360)
- `batteryLevel` - Battery percentage (0-100)

**Optional Fields:**
- `temperature` - Temperature in Celsius
- `humidity` - Humidity percentage
- `pressure` - Atmospheric pressure in hPa
- `satellites` - Number of GPS satellites
- `signalStrength` - Signal strength percentage
- `flightMode` - Flight mode (default: "manual")
- `armed` - Armed status (default: false)

**Response:**
```json
{
  "status": "ok",
  "telemetry": {
    "id": 42,
    "droneId": 1,
    "latitude": 28.98544,
    "longitude": 77.09027,
    "altitude": 150.5,
    "speed": 12.5,
    "heading": 270.0,
    "batteryLevel": 85.5,
    "temperature": 28.5,
    "humidity": 65.0,
    "pressure": 1013.25,
    "satellites": 12,
    "signalStrength": 95.0,
    "flightMode": "auto",
    "armed": true,
    "timestamp": "2025-12-07T14:00:00.000Z"
  }
}
```

---

### 7. Update Drone Status
Update the status of a drone.

**Endpoint:** `PATCH /api/drone/:id/status`

**Parameters:**
- `id` (path) - Drone ID

**Request Body:**
```json
{
  "status": "active"
}
```

**Common Status Values:**
- `idle` - Drone is inactive
- `active` - Drone is flying
- `charging` - Battery charging
- `maintenance` - Under maintenance
- `error` - System error

**Response:**
```json
{
  "status": "ok",
  "drone": {
    "id": 1,
    "name": "Drone Alpha",
    "model": "DJI Mavic 3",
    "serialNo": "DJI-001-XYZ",
    "status": "active",
    "createdAt": "2025-12-07T10:00:00.000Z",
    "updatedAt": "2025-12-07T14:05:00.000Z"
  }
}
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Database Schema

### Drone Table
- `id` - Auto-increment primary key
- `name` - Drone name
- `model` - Drone model
- `serialNo` - Unique serial number
- `status` - Current status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### DroneTelemetry Table
- `id` - Auto-increment primary key
- `droneId` - Foreign key to Drone
- `latitude` - GPS latitude
- `longitude` - GPS longitude
- `altitude` - Altitude in meters
- `speed` - Speed in m/s
- `heading` - Heading in degrees
- `batteryLevel` - Battery percentage
- `temperature` - Temperature (optional)
- `humidity` - Humidity (optional)
- `pressure` - Pressure (optional)
- `satellites` - GPS satellites (optional)
- `signalStrength` - Signal strength (optional)
- `flightMode` - Flight mode
- `armed` - Armed status
- `timestamp` - Data timestamp

---

## Usage Examples

### Create a Drone
```bash
curl -X POST http://localhost:3000/api/drone \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Drone Alpha",
    "model": "DJI Mavic 3",
    "serialNo": "DJI-001-XYZ"
  }'
```

### Add Telemetry
```bash
curl -X POST http://localhost:3000/api/drone/1/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 28.98544,
    "longitude": 77.09027,
    "altitude": 150.5,
    "speed": 12.5,
    "heading": 270.0,
    "batteryLevel": 85.5,
    "satellites": 12,
    "flightMode": "auto",
    "armed": true
  }'
```

### Get Latest Telemetry
```bash
curl http://localhost:3000/api/drone/1/telemetry/latest
```

### Get All Drones
```bash
curl http://localhost:3000/api/drone
```
