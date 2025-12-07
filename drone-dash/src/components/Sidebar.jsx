import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Sidebar({ activeDrone, onDroneSelect }) {
  const [drones, setDrones] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetchDrones()
    const interval = setInterval(fetchDrones, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchDrones = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/drone`)
      setDrones(response.data.drones || [])
    } catch (error) {
      console.error('Failed to fetch drones:', error)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      idle: 'bg-gray-400',
      charging: 'bg-yellow-500',
      maintenance: 'bg-orange-500',
      error: 'bg-red-500'
    }
    return colors[status] || 'bg-gray-400'
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 bg-gray-900 text-gray-100 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Drone Command</h1>
        <p className="text-xs text-gray-400">Mission Planner</p>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="p-2">
          <Link
            to="/dashboard"
            className={`block px-4 py-2 rounded mb-1 transition ${
              isActive('/dashboard')
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </div>
          </Link>

          <Link
            to="/upload"
            className={`block px-4 py-2 rounded mb-1 transition ${
              isActive('/upload')
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
              Upload Mission
            </div>
          </Link>
        </div>

        <div className="px-2 mt-4">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
            Fleet ({drones.length})
          </div>
          {drones.map((drone) => (
            <button
              key={drone.id}
              onClick={() => onDroneSelect(drone)}
              className={`w-full text-left px-4 py-3 rounded mb-1 transition ${
                activeDrone?.id === drone.id
                  ? 'bg-gray-800 border-l-4 border-blue-500'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(drone.status)} mr-2 shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{drone.name}</p>
                    <p className="text-xs text-gray-400 truncate">{drone.model}</p>
                  </div>
                </div>
                {drone.latestTelemetry && (
                  <div className="text-right ml-2 shrink-0">
                    <p className="text-xs text-green-400">{drone.latestTelemetry.batteryLevel.toFixed(0)}%</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-500">
          <div className="flex justify-between mb-1">
            <span>Server</span>
            <span className="text-green-400">Online</span>
          </div>
          <div className="flex justify-between">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
