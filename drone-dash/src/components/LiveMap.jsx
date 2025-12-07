import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const droneIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0iIzM4ODBmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTYgOGwzIDggLTMgLTIgLTMgMnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

function MapUpdater({ center }) {
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.setView(center, 16)
    }
  }, [center, map])
  
  return null
}

function LiveMap({ drone }) {
  const [telemetry, setTelemetry] = useState(null)
  const [center, setCenter] = useState([28.98544, 77.09027])

  useEffect(() => {
    if (!drone) return

    fetchTelemetry()
    const interval = setInterval(fetchTelemetry, 2000)
    return () => clearInterval(interval)
  }, [drone])

  const fetchTelemetry = async () => {
    if (!drone) return
    try {
      const response = await axios.get(`${API_URL}/api/drone/${drone.id}/telemetry/latest`)
      const data = response.data.telemetry
      setTelemetry(data)
      setCenter([data.latitude, data.longitude])
    } catch (error) {
      console.error('Failed to fetch telemetry:', error)
    }
  }

  if (!drone) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-400">Select a drone to view location</p>
        </div>
      </div>
    )
  }

  return (
    <MapContainer
      center={center}
      zoom={16}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        maxZoom={20}
      />

      {telemetry && (
        <>
          <Marker position={[telemetry.latitude, telemetry.longitude]} icon={droneIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold mb-1">{drone.name}</p>
                <p>Altitude: {telemetry.altitude.toFixed(1)}m</p>
                <p>Speed: {telemetry.speed.toFixed(1)}m/s</p>
                <p>Battery: {telemetry.batteryLevel.toFixed(1)}%</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(telemetry.timestamp).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
          <MapUpdater center={center} />
        </>
      )}
    </MapContainer>
  )
}

export default LiveMap
