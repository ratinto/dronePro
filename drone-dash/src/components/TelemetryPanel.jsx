import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function TelemetryPanel({ drone }) {
  const [telemetry, setTelemetry] = useState(null)

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
      setTelemetry(response.data.telemetry)
    } catch (error) {
      console.error('Failed to fetch telemetry:', error)
    }
  }

  if (!drone) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">Select a drone to view telemetry</p>
      </div>
    )
  }

  if (!telemetry) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">Loading telemetry...</p>
      </div>
    )
  }

  const TelemetryItem = ({ label, value, unit, icon }) => (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center mb-2">
        {icon}
        <span className="text-xs text-gray-400 uppercase ml-2">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">
        {value}
        {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
      </div>
    </div>
  )

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-400'
    if (level > 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{drone.name}</h2>
          <p className="text-sm text-gray-400">{drone.model} • {drone.serialNo}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            drone.status === 'active' ? 'bg-green-500/20 text-green-400' :
            drone.status === 'charging' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {drone.status.toUpperCase()}
          </span>
          {telemetry.armed && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
              ARMED
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <TelemetryItem
          label="Battery"
          value={telemetry.batteryLevel.toFixed(1)}
          unit="%"
          icon={
            <svg className={`w-5 h-5 ${getBatteryColor(telemetry.batteryLevel)}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 6H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2zm3 4a1 1 0 011 1v2a1 1 0 01-1 1v-4z" />
            </svg>
          }
        />

        <TelemetryItem
          label="Altitude"
          value={telemetry.altitude.toFixed(1)}
          unit="m"
          icon={
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          }
        />

        <TelemetryItem
          label="Speed"
          value={telemetry.speed.toFixed(1)}
          unit="m/s"
          icon={
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          }
        />

        <TelemetryItem
          label="Heading"
          value={telemetry.heading.toFixed(0)}
          unit="°"
          icon={
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          }
        />

        <TelemetryItem
          label="Satellites"
          value={telemetry.satellites || 0}
          icon={
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          }
        />

        <TelemetryItem
          label="Signal"
          value={telemetry.signalStrength?.toFixed(0) || 0}
          unit="%"
          icon={
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase mb-1">Latitude</p>
          <p className="text-sm font-mono text-white">{telemetry.latitude.toFixed(6)}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase mb-1">Longitude</p>
          <p className="text-sm font-mono text-white">{telemetry.longitude.toFixed(6)}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase mb-1">Flight Mode</p>
          <p className="text-sm font-semibold text-white uppercase">{telemetry.flightMode}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase mb-1">Last Update</p>
          <p className="text-sm text-white">{new Date(telemetry.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>

      {(telemetry.temperature || telemetry.humidity || telemetry.pressure) && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {telemetry.temperature && (
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Temperature</p>
              <p className="text-lg font-semibold text-orange-400">{telemetry.temperature.toFixed(1)}°C</p>
            </div>
          )}
          {telemetry.humidity && (
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Humidity</p>
              <p className="text-lg font-semibold text-blue-400">{telemetry.humidity.toFixed(1)}%</p>
            </div>
          )}
          {telemetry.pressure && (
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Pressure</p>
              <p className="text-lg font-semibold text-purple-400">{telemetry.pressure.toFixed(2)} hPa</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TelemetryPanel
