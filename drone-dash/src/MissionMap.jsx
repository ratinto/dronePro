import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const greenIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEMxOC42MjcgMCAyNCA1LjM3MyAyNCAxMmMwIDkuNjI3LTEyIDI0LTEyIDI0UzAgMjEuNjI3IDAgMTJDMCA1LjM3MyA1LjM3MyAwIDEyIDBaIiBmaWxsPSIjMTBiOTgxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36]
})

function MapBounds({ polygon }) {
  const map = useMap()

  useEffect(() => {
    if (polygon && polygon.length > 0) {
      const bounds = L.latLngBounds(polygon.map(p => [p.lat, p.lon]))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [polygon, map])

  return null
}

function MissionMap() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/mission/${id}`)
        setMission(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load mission')
      } finally {
        setLoading(false)
      }
    }

    fetchMission()
  }, [id])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 text-lg">Loading mission...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => navigate('/upload')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Back to Upload
          </button>
        </div>
      </div>
    )
  }

  if (!mission || !mission.polygon || mission.polygon.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600">No mission data available</p>
        </div>
      </div>
    )
  }

  const closedPolygon = [...mission.polygon, mission.polygon[0]]
  const polylinePositions = closedPolygon.map(p => [p.lat, p.lon])
  const center = [mission.polygon[0].lat, mission.polygon[0].lon]

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 left-4 z-1000 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Mission {mission.mission_id}</h2>
        <p className="text-sm text-gray-600">{mission.polygon.length} waypoints</p>
        <button
          onClick={() => navigate('/upload')}
          className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          New Mission
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={15}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          maxZoom={20}
        />

        <Polyline
          positions={polylinePositions}
          color="#eab308"
          weight={3}
          opacity={0.8}
        />

        {mission.polygon.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lon]}
            icon={greenIcon}
          />
        ))}

        <MapBounds polygon={mission.polygon} />
      </MapContainer>
    </div>
  )
}

export default MissionMap
