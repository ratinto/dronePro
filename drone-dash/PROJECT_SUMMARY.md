# Drone Mission Planner - React + Vite

## Project Overview
A React application for uploading KML files and visualizing drone missions on a satellite map.

## Features
- Upload KML files via drag-and-drop interface
- View mission waypoints on satellite map (Mission Planner style)
- Full-screen map with green waypoint markers
- Yellow polyline connecting waypoints
- Auto-zoom to fit mission polygon

## Tech Stack
- React 19.2.0
- Vite 7.2.6
- React Router DOM (routing)
- React Leaflet (maps)
- Axios (HTTP requests)
- TailwindCSS (styling)

## Project Structure
```
drone-dash/
├── src/
│   ├── main.jsx           # Entry point with Router setup
│   ├── App.jsx            # Route configuration
│   ├── KmlUpload.jsx      # KML file upload page
│   ├── MissionMap.jsx     # Mission visualization page
│   └── index.css          # Tailwind CSS imports
├── vite.config.js         # Vite config with proxy
├── index.html
└── package.json
```

## Routes
- `/upload` - KML upload page
- `/mission/:id` - Mission map visualization

## API Endpoints
### Upload KML
- **POST** `/api/kml/upload`
- Content-Type: multipart/form-data
- Response: `{ "mission_id": 15, "status": "ok" }`

### Get Mission
- **GET** `/api/mission/:mission_id`
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

## Running the Project
```bash
cd drone-dash
npm install
npm run dev
```

Access at: http://localhost:5173

## Backend Proxy
Vite proxy configured to forward `/api/*` requests to `http://localhost:3000`

## Map Configuration
- Tiles: Google Satellite (`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`)
- Subdomains: mt0, mt1, mt2, mt3
- Green markers at each waypoint
- Yellow polyline (color: #eab308, weight: 3)
- Polygon automatically closed (last point connects to first)

## Features Implemented
✅ Clean UI with TailwindCSS
✅ File validation (.kml only)
✅ Loading states
✅ Error handling
✅ Responsive design
✅ Full-screen map
✅ Auto-fit bounds
✅ Mission Planner style satellite view
✅ No code comments (as requested)
