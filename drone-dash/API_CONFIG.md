# API Configuration

## Environment Variables

### Frontend (.env in drone-dash/)
```
VITE_API_URL=http://localhost:3000
```

Access in code: `import.meta.env.VITE_API_URL`

## API Endpoints

### Backend Running on: http://localhost:3000

1. **Upload KML File**
   - Endpoint: `POST /api/mission/upload-kml`
   - Content-Type: `multipart/form-data`
   - Form field name: `kmlFile`
   - Response:
   ```json
   {
     "mission_id": 15,
     "status": "ok",
     "polygon": [...]
   }
   ```

2. **Get Mission**
   - Endpoint: `GET /api/mission/:id`
   - Response:
   ```json
   {
     "mission_id": 15,
     "polygon": [
       { "lat": 28.98544, "lon": 77.09027, "alt": 0 },
       ...
     ]
   }
   ```

## Backend Updates Made

1. ✅ Added CORS support (`cors` package)
2. ✅ Fixed upload route to `/api/mission/upload-kml`
3. ✅ Changed form field name to `kmlFile` (matches frontend)
4. ✅ Added `getMission` controller function
5. ✅ Added GET route `/:id` for fetching missions
6. ✅ Changed response status from "success" to "ok"

## Frontend Updates Made

1. ✅ Created `.env` file with `VITE_API_URL`
2. ✅ Updated `KmlUpload.jsx` to use `API_URL` from env
3. ✅ Updated `MissionMap.jsx` to use `API_URL` from env
4. ✅ Updated API endpoint to `/api/mission/upload-kml`
5. ✅ Removed Vite proxy (using direct API calls)

## Servers Running

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## Testing

1. Open http://localhost:5173
2. Upload a .kml file
3. You should be redirected to the mission map
4. The map should display all waypoints with markers and polylines
