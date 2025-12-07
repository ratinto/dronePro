import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import TopNavigation from './components/TopNavigation'

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

function FlightPlanView() {
  const [missions, setMissions] = useState([])
  const [selectedMission, setSelectedMission] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.name.endsWith('.kml')) {
      setFile(selectedFile)
      setError('')
    } else {
      setFile(null)
      setError('Please select a valid .kml file')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('kmlFile', file)

    try {
      const response = await axios.post(`${API_URL}/api/mission/upload-kml`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.status === 'ok' && response.data.mission_id) {
        const missionResponse = await axios.get(`${API_URL}/api/mission/${response.data.mission_id}`)
        setSelectedMission(missionResponse.data)
        setFile(null)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

  const center = selectedMission?.polygon?.[0] 
    ? [selectedMission.polygon[0].lat, selectedMission.polygon[0].lon]
    : [28.98544, 77.09027]

  const closedPolygon = selectedMission?.polygon 
    ? [...selectedMission.polygon, selectedMission.polygon[0]]
    : []
  const polylinePositions = closedPolygon.map(p => [p.lat, p.lon])

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <TopNavigation />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
          <h2 className="text-white font-bold text-lg mb-4">Mission Upload</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload KML File
              </label>
              <input
                type="file"
                accept=".kml"
                onChange={handleFileChange}
                className="block w-full text-xs text-gray-400 file:mr-2 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-gray-800 rounded border border-gray-700"
              />
              {file && (
                <p className="mt-2 text-xs text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {file.name}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-3 py-2 rounded text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded text-sm transition duration-200"
            >
              {loading ? 'Uploading...' : 'Load Mission'}
            </button>
          </form>

          {selectedMission && (
            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-white font-semibold mb-3">Mission Details</h3>
              <div className="bg-gray-800 rounded p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mission ID:</span>
                  <span className="text-white font-mono">{selectedMission.mission_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Waypoints:</span>
                  <span className="text-white">{selectedMission.polygon.length}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-gray-300 text-sm font-semibold">Waypoints</h4>
                <div className="bg-gray-800 rounded max-h-64 overflow-y-auto">
                  {selectedMission.polygon.map((point, index) => (
                    <div key={index} className="px-3 py-2 border-b border-gray-700 last:border-0">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400 font-semibold">WP {index + 1}</span>
                        <span className="text-gray-400">{point.alt}m</span>
                      </div>
                      <div className="text-xs text-gray-500 font-mono mt-1">
                        {point.lat.toFixed(6)}, {point.lon.toFixed(6)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
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

            {selectedMission && (
              <>
                <Polyline
                  positions={polylinePositions}
                  color="#eab308"
                  weight={3}
                  opacity={0.8}
                />

                {selectedMission.polygon.map((point, index) => (
                  <Marker
                    key={index}
                    position={[point.lat, point.lon]}
                    icon={greenIcon}
                  />
                ))}

                <MapBounds polygon={selectedMission.polygon} />
              </>
            )}
          </MapContainer>

          {!selectedMission && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 pointer-events-none">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-400 text-lg">Upload a KML file to view mission</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightPlanView
