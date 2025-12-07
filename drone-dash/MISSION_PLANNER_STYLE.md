# Mission Planner Style Dashboard - Complete

## 🎯 Overview
Completely restructured dashboard to match Mission Planner's interface with top navigation tabs and dedicated views.

## 🎨 New Layout Structure

### Top Navigation Bar
- **Header Row**: Mission Planner branding, COM port selector, baud rate, CONNECT button
- **Tab Bar**: Horizontal tabs for different views (FLIGHT DATA, FLIGHT PLAN, etc.)
- **Mission Planner Style**: Dark theme with gray/blue color scheme

## 📑 Main Views

### 1. FLIGHT DATA (`/dashboard`)
**Left Panel (25% width):**
- Quick Actions buttons (Actions, Gauges, Status, Servo, Telemetry Logs, etc.)
- Large metric displays:
  - Altitude (purple)
  - Ground Speed (orange)
  - Distance to WP (red)
  - Yaw/Heading (green)
  - Vertical Speed (yellow)
  - Distance to MAV (cyan)

**Main Panel (75% width):**
- Drone selector dropdown
- HUD (Heads-Up Display):
  - Blue sky gradient to green ground
  - Artificial horizon
  - Heading indicator
  - ARMED/DISARMED status
  - Battery level
  - GPS status
  - Speed indicators (AS/GS)
- Bottom metrics bar:
  - Latitude/Longitude
  - Flight Mode
  - Signal Strength

### 2. FLIGHT PLAN (`/flight-plan`)
**Left Sidebar:**
- KML file upload interface
- Mission details panel
- Waypoint list with coordinates

**Main Map Area:**
- Full-screen satellite map
- Green waypoint markers
- Yellow connecting polylines
- Auto-zoom to mission bounds

### 3. Other Tabs
- INITIAL SETUP
- CONFIG/TUNING
- SIMULATION
- TERMINAL
- HELP
- UPLOAD MISSION

## 🎨 Color Scheme (Mission Planner Style)

### Background Colors
- Primary: `#0a0e27` (gray-950)
- Secondary: `#1a1d2e` (gray-900)
- Tertiary: `#2a2d3e` (gray-800)
- Borders: `#3a3d4e` (gray-700)

### Metric Colors
- Purple: `#a78bfa` - Altitude
- Orange: `#fb923c` - Ground Speed
- Red: `#f87171` - Distance to WP
- Green: `#4ade80` - Yaw
- Yellow: `#facc15` - Vertical Speed
- Cyan: `#22d3ee` - Distance to MAV

### Status Colors
- Green: Armed, Active, Good
- Red: Disarmed, Error
- Yellow: Warning, Charging
- Gray: Idle, Unknown

## 📊 HUD Features

### Artificial Horizon
- Blue gradient top (sky)
- Green gradient bottom (ground)
- White horizon line
- Pitch indicators

### Status Indicators
- Top Left: Airspeed (AS), Ground Speed (GS)
- Top Right: Mode display
- Center: Large heading (270°)
- Bottom Left: Battery percentage with color coding
- Bottom Right: GPS satellite count
- Center Bottom: ARMED/DISARMED status

## 🗺️ Map Integration

### Satellite Tiles
- Google Satellite imagery
- Subdomains: mt0, mt1, mt2, mt3
- High resolution (zoom 15-20)

### Mission Visualization
- Green markers at waypoints
- Yellow polyline connecting points
- Closed polygon (last connects to first)
- Auto-fit bounds to show all waypoints

## 📡 Real-time Updates

### Update Frequencies
- Telemetry: Every 2 seconds
- Drone list: Every 5 seconds
- HUD: Live updates with telemetry

### Data Displayed
- GPS Position (lat/lon)
- Altitude (meters)
- Speed (m/s)
- Heading (degrees)
- Battery level (%)
- GPS satellites count
- Signal strength (%)
- Flight mode
- Armed status

## 🎮 Quick Actions Panel

Buttons matching Mission Planner:
- **Actions**: Mission commands
- **Gauges**: Instrument displays
- **Status**: System status
- **Servo**: Servo output
- **Telemetry Logs**: Log viewer
- **DataFlash Logs**: Flight data
- **Scripts**: Automation scripts

## 🔧 Top Bar Controls

### Connection Panel
- **COM Port Selector**: Choose serial port
- **Baud Rate**: Select connection speed (57600, 115200, etc.)
- **CONNECT Button**: Green button to establish connection

## 📱 Responsive Design

### Desktop Layout
- Top navigation bar: Fixed height
- Main content: Flexible height
- Side panels: Fixed width (320px or 25%)

### Panels
- Left panel: Metrics and actions
- Main area: HUD/Map display
- Consistent padding: 16px

## 🚀 Usage

### View Flight Data
1. Navigate to FLIGHT DATA tab
2. Select drone from dropdown
3. View real-time HUD and metrics
4. Monitor telemetry in left panel

### Plan Mission
1. Click FLIGHT PLAN tab
2. Upload KML file from sidebar
3. View waypoints on satellite map
4. Review mission details

### Navigation
- Use top tabs to switch views
- All views maintain connection status
- Consistent theme across all pages

## 🎨 Visual Hierarchy

### Font Sizes
- **Extra Large (5xl)**: Main metric values
- **Large (xl-2xl)**: Headings, HUD status
- **Medium (base-lg)**: Labels, buttons
- **Small (xs-sm)**: Secondary info, timestamps

### Font Weights
- **Bold**: Metric values, headings
- **Semibold**: Labels, buttons
- **Regular**: Secondary text
- **Mono**: Coordinates, numeric values

## 🔄 Data Flow

1. **Backend API** → Telemetry data
2. **React State** → Store drone/telemetry
3. **Components** → Display updates
4. **Auto-refresh** → 2-5 second intervals

## 📦 Components Structure

```
src/
├── App.jsx                          # Main router
├── Dashboard.jsx                    # Flight Data wrapper
├── FlightPlanView.jsx              # Mission planning
├── components/
│   ├── TopNavigation.jsx           # Tab bar + header
│   ├── FlightDataView.jsx          # HUD + metrics
│   ├── Sidebar.jsx                 # Old sidebar (backup)
│   ├── TelemetryPanel.jsx          # Old panel (backup)
│   └── LiveMap.jsx                 # Map component
```

## 🎯 Key Differences from Old Design

### Old Design
- Sidebar navigation (left side)
- Card-based telemetry display
- Dashboard-centric layout

### New Design (Mission Planner Style)
- Top navigation tabs
- HUD-style flight display
- Large metric displays
- Mission Planner color scheme
- Quick action buttons
- Dedicated mission planning view

## 🐛 Troubleshooting

### HUD Not Showing Data
- Check backend connection
- Verify drone has telemetry
- Select drone from dropdown

### Map Not Loading
- Check internet connection
- Verify mission uploaded
- Check browser console

### Tabs Not Working
- Check React Router setup
- Verify route paths
- Check browser console for errors

## 🎉 Features Implemented

✅ Mission Planner-style top navigation  
✅ HUD with artificial horizon  
✅ Large color-coded metric displays  
✅ Quick action buttons panel  
✅ Flight data view  
✅ Flight plan view with map  
✅ Real-time telemetry updates  
✅ Satellite map integration  
✅ Mission waypoint visualization  
✅ Connection status display  
✅ Dark theme matching Mission Planner  

## 🚀 Next Steps

Future enhancements to match Mission Planner:
- [ ] Actual servo output controls
- [ ] Telemetry log viewer
- [ ] Dataflash log analysis
- [ ] Parameter configuration
- [ ] Pre-flight checklist
- [ ] Geofencing setup
- [ ] Rally point management
- [ ] Camera gimbal control
