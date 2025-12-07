import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function QuickActions({ drone }) {
  return (
    <div className="bg-gray-900 rounded border border-gray-700 p-3">
      <h3 className="text-white font-semibold mb-3 text-sm">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600">
          Actions
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600">
          Gauges
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600">
          Status
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600">
          Servo
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600">
          Telemetry Logs
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600">
          DataFlash Logs
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded border border-gray-600 col-span-3">
          Scripts
        </button>
      </div>
    </div>
  )
}

function HUD({ telemetry }) {
  if (!telemetry) {
    return (
      <div className="bg-linear-to-b from-blue-400 to-green-600 rounded border-2 border-gray-700 flex items-center justify-center" style={{ height: '380px' }}>
        <div className="text-center">
          <p className="text-white text-xl font-bold mb-2">GPS: No GPS</p>
          <p className="text-red-500 text-2xl font-bold">DISARMED</p>
        </div>
      </div>
    )
  }

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-400'
    if (level > 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-linear-to-b from-blue-400 to-green-600 rounded border-2 border-gray-700 relative overflow-hidden" style={{ height: '380px' }}>
      <div className="absolute top-4 left-4 text-white">
        <div className="flex items-center space-x-4 text-sm">
          <div>AS {telemetry.speed.toFixed(1)}</div>
          <div>GS {telemetry.speed.toFixed(1)}</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-white text-sm">
        <div>Unknown</div>
        <div>0&gt;0</div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-6xl font-bold mb-2">{telemetry.heading.toFixed(0)}°</div>
          <div className="flex items-center justify-center space-x-8 text-white">
            <div className="transform rotate-90 text-xl">|</div>
            <div className="text-4xl">─</div>
            <div className="transform rotate-90 text-xl">|</div>
          </div>
          <div className="mt-4">
            {telemetry.armed ? (
              <p className="text-green-400 text-xl font-bold animate-pulse">ARMED</p>
            ) : (
              <p className="text-red-500 text-2xl font-bold">DISARMED</p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-xs">
        <div className={`text-lg font-bold ${getBatteryColor(telemetry.batteryLevel)}`}>
          {telemetry.batteryLevel.toFixed(0)}%
        </div>
        <div>0:0:0:0</div>
      </div>

      <div className="absolute bottom-4 right-4 text-white">
        <p className="text-sm">
          GPS: {telemetry.satellites ? `${telemetry.satellites} Sats` : 'No GPS'}
        </p>
      </div>
    </div>
  )
}

function TelemetryMetrics({ telemetry }) {
  if (!telemetry) {
    return (
      <div className="bg-gray-900 rounded border border-gray-700 p-4">
        <p className="text-gray-400 text-center">No telemetry data</p>
      </div>
    )
  }

  const MetricRow = ({ label, value, color = 'text-purple-400' }) => (
    <div className="flex justify-between py-2 border-b border-gray-800">
      <span className="text-gray-300 text-sm">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
  )

  return (
    <div className="bg-gray-900 rounded border border-gray-700 p-4">
      <h3 className="text-white font-semibold mb-3">Altitude (Meters)</h3>
      <div className={`text-5xl font-bold text-center mb-4 ${
        telemetry.altitude > 0 ? 'text-purple-400' : 'text-gray-400'
      }`}>
        {telemetry.altitude.toFixed(2)}
      </div>

      <h3 className="text-white font-semibold mb-3 mt-6">GroundSpeed (m/s)</h3>
      <div className="text-5xl font-bold text-orange-400 text-center mb-4">
        {telemetry.speed.toFixed(2)}
      </div>

      <h3 className="text-white font-semibold mb-3 mt-6">Dist to WP (Meters)</h3>
      <div className="text-5xl font-bold text-red-400 text-center mb-4">
        0.00
      </div>

      <h3 className="text-white font-semibold mb-3 mt-6">Yaw (deg)</h3>
      <div className="text-5xl font-bold text-green-400 text-center mb-4">
        {telemetry.heading.toFixed(2)}
      </div>

      <h3 className="text-white font-semibold mb-3 mt-6">Vertical Speed (m/s)</h3>
      <div className="text-5xl font-bold text-yellow-400 text-center mb-4">
        0.00
      </div>

      <h3 className="text-white font-semibold mb-3 mt-6">DistToMAV</h3>
      <div className="text-5xl font-bold text-cyan-400 text-center">
        0.00
      </div>
    </div>
  )
}

function FlightDataView() {
  const [drones, setDrones] = useState([])
  const [activeDrone, setActiveDrone] = useState(null)
  const [telemetry, setTelemetry] = useState(null)

  useEffect(() => {
    fetchDrones()
    const interval = setInterval(fetchDrones, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!activeDrone) return

    fetchTelemetry()
    const interval = setInterval(fetchTelemetry, 2000)
    return () => clearInterval(interval)
  }, [activeDrone])

  const fetchDrones = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/drone`)
      const droneList = response.data.drones || []
      setDrones(droneList)
      if (!activeDrone && droneList.length > 0) {
        setActiveDrone(droneList[0])
      }
    } catch (error) {
      console.error('Failed to fetch drones:', error)
    }
  }

  const fetchTelemetry = async () => {
    if (!activeDrone) return
    try {
      const response = await axios.get(`${API_URL}/api/drone/${activeDrone.id}/telemetry/latest`)
      setTelemetry(response.data.telemetry)
    } catch (error) {
      console.error('Failed to fetch telemetry:', error)
    }
  }

  return (
    <div className="flex h-full bg-gray-950">
      <div className="w-1/4 p-4 space-y-4 overflow-y-auto border-r border-gray-800">
        <QuickActions drone={activeDrone} />
        <TelemetryMetrics telemetry={telemetry} />
      </div>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <select 
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
            value={activeDrone?.id || ''}
            onChange={(e) => {
              const drone = drones.find(d => d.id === parseInt(e.target.value))
              setActiveDrone(drone)
            }}
          >
            <option value="">Select Drone</option>
            {drones.map(drone => (
              <option key={drone.id} value={drone.id}>
                {drone.name} - {drone.model}
              </option>
            ))}
          </select>
        </div>

        <HUD telemetry={telemetry} />

        {telemetry && (
          <div className="mt-4 grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-900 rounded border border-gray-700 p-3">
              <div className="text-xs text-gray-400 mb-1">Latitude</div>
              <div className="text-white font-mono text-sm">{telemetry.latitude.toFixed(6)}</div>
            </div>
            <div className="bg-gray-900 rounded border border-gray-700 p-3">
              <div className="text-xs text-gray-400 mb-1">Longitude</div>
              <div className="text-white font-mono text-sm">{telemetry.longitude.toFixed(6)}</div>
            </div>
            <div className="bg-gray-900 rounded border border-gray-700 p-3">
              <div className="text-xs text-gray-400 mb-1">Flight Mode</div>
              <div className="text-white font-semibold text-sm uppercase">{telemetry.flightMode}</div>
            </div>
            <div className="bg-gray-900 rounded border border-gray-700 p-3">
              <div className="text-xs text-gray-400 mb-1">Signal</div>
              <div className="text-green-400 font-bold text-sm">{telemetry.signalStrength?.toFixed(0) || 0}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlightDataView
