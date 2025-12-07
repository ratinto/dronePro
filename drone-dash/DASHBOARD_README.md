# Drone Mission Planner - Mission Planner Style Dashboard

## 🚁 Features

### Dashboard View
- **Real-time Telemetry Display** - Live drone data updates every 2 seconds
- **Fleet Management Sidebar** - View all drones with status indicators
- **Live Map Tracking** - Satellite view with drone position markers
- **Comprehensive Metrics**:
  - Battery level with color-coded warnings
  - Altitude, speed, and heading
  - GPS coordinates and satellite count
  - Signal strength monitoring
  - Environmental sensors (temperature, humidity, pressure)
  - Flight mode and armed status

### Mission Planning
- **KML File Upload** - Import mission waypoints
- **Mission Visualization** - View missions on satellite map
- **Waypoint Display** - Green markers with yellow polylines

### Professional UI
- **Dark Theme** - Mission Planner inspired design
- **Sidebar Navigation** - Easy access to all features
- **Real-time Updates** - Auto-refreshing telemetry data
- **Status Indicators** - Visual drone status (Active, Idle, Charging, etc.)

## 📁 Project Structure

```
drone-dash/src/
├── App.jsx                      # Main routing
├── Dashboard.jsx                # Main dashboard layout
├── KmlUpload.jsx               # Mission upload page
├── MissionMap.jsx              # Mission visualization
├── components/
│   ├── Sidebar.jsx             # Navigation sidebar
│   ├── TelemetryPanel.jsx      # Telemetry display
│   └── LiveMap.jsx             # Live drone tracking map
└── index.css                   # Tailwind styles
```

## 🎨 Pages

### 1. Dashboard (`/dashboard`)
Main control center with:
- Fleet sidebar showing all drones
- Real-time telemetry panel
- Live satellite map with drone location
- Auto-updating every 2 seconds

### 2. Upload Mission (`/upload`)
- Clean upload interface
- Drag & drop KML files
- File validation
- Automatic navigation to mission view

### 3. Mission View (`/mission/:id`)
- Full-screen satellite map
- Green waypoint markers
- Yellow connecting polylines
- Mission details panel
- Auto-zoom to fit all waypoints

## 🎯 Color Coding

### Status Indicators
- 🟢 **Green** - Active/Armed
- 🟡 **Yellow** - Charging/Warning
- ⚪ **Gray** - Idle
- 🟠 **Orange** - Maintenance
- 🔴 **Red** - Error

### Battery Levels
- 🟢 **Green** - Above 60%
- 🟡 **Yellow** - 30-60%
- 🔴 **Red** - Below 30%

## 🔄 Real-time Updates

- **Telemetry**: Updates every 2 seconds
- **Drone List**: Refreshes every 5 seconds
- **Map Position**: Updates with latest telemetry

## 🗺️ Map Features

- **Google Satellite Tiles** - High-resolution imagery
- **Custom Drone Icons** - Blue circular markers with heading indicator
- **Auto-Centering** - Map follows selected drone
- **Popup Info** - Click drone for detailed telemetry
- **Zoom Level 16** - Optimal for drone operations

## 📊 Telemetry Metrics

### Primary Metrics (Large Display)
1. **Battery** - Percentage with color warnings
2. **Altitude** - Meters above ground
3. **Speed** - Meters per second
4. **Heading** - Degrees (0-360)
5. **Satellites** - GPS satellite count
6. **Signal** - Connection strength

### Secondary Metrics
- GPS Coordinates (Lat/Lon)
- Flight Mode (Manual, Auto, etc.)
- Last Update Timestamp

### Environmental (Optional)
- Temperature (°C)
- Humidity (%)
- Atmospheric Pressure (hPa)

## 🚀 Running the Application

```bash
# Frontend
cd drone-dash
npm run dev
# Access at http://localhost:5173

# Backend
cd DroneController
npm start
# Running on http://localhost:3000
```

## 🎮 Usage Guide

1. **Start Both Servers**
   - Backend: `npm start` in DroneController
   - Frontend: `npm run dev` in drone-dash

2. **View Dashboard**
   - Navigate to http://localhost:5173
   - Auto-redirects to `/dashboard`

3. **Select a Drone**
   - Click any drone in the sidebar
   - View real-time telemetry
   - See location on map

4. **Upload Mission**
   - Click "Upload Mission" in sidebar
   - Select KML file
   - View mission waypoints on map

## 🛠️ API Integration

All components use the centralized `VITE_API_URL` from `.env`:

```
VITE_API_URL=http://localhost:3000
```

### Endpoints Used
- `GET /api/drone` - Fetch all drones
- `GET /api/drone/:id` - Get drone details
- `GET /api/drone/:id/telemetry/latest` - Latest telemetry
- `POST /api/mission/upload-kml` - Upload mission
- `GET /api/mission/:id` - Get mission data

## 🎨 Design System

### Colors
- **Background**: Gray-950 (Dark)
- **Cards**: Gray-800
- **Borders**: Gray-700
- **Primary**: Blue-600
- **Text**: White/Gray-100
- **Muted**: Gray-400

### Typography
- **Headings**: Bold, White
- **Body**: Regular, Gray-300
- **Labels**: Small, Uppercase, Gray-400

### Components
- **Rounded Corners**: 8px (lg)
- **Spacing**: 4px increments
- **Icons**: 20px (w-5 h-5)

## 📱 Responsive Design

- **Desktop**: Full sidebar + content
- **Tablet**: Optimized grid layouts
- **Mobile**: (Future enhancement)

## 🔐 Features Coming Soon

- [ ] User authentication
- [ ] Mission planning interface
- [ ] Telemetry history graphs
- [ ] Multi-drone simultaneous tracking
- [ ] Flight path recording
- [ ] Geofencing
- [ ] Emergency controls

## 📸 Screenshots

### Dashboard View
- Dark theme with sidebar
- Real-time telemetry cards
- Live satellite map

### Mission View
- Full-screen map
- Waypoint visualization
- Mission details overlay

## 🐛 Troubleshooting

### Drone Not Showing on Map
- Check if drone has telemetry data
- Verify API connection
- Check browser console for errors

### Telemetry Not Updating
- Ensure backend is running
- Check CORS settings
- Verify drone ID is valid

### Map Not Loading
- Check internet connection (for satellite tiles)
- Verify Leaflet CSS is imported
- Check browser console for errors
