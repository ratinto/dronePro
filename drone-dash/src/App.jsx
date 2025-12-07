import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import FlightPlanView from './FlightPlanView'
import KmlUpload from './KmlUpload'
import MissionMap from './MissionMap'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/flight-plan" element={<FlightPlanView />} />
      <Route path="/upload" element={<KmlUpload />} />
      <Route path="/mission/:id" element={<MissionMap />} />
      <Route path="/setup" element={<Dashboard />} />
      <Route path="/config" element={<Dashboard />} />
      <Route path="/simulation" element={<Dashboard />} />
      <Route path="/terminal" element={<Dashboard />} />
      <Route path="/help" element={<Dashboard />} />
    </Routes>
  )
}

export default App
