import TopNavigation from './components/TopNavigation'
import FlightDataView from './components/FlightDataView'

function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <TopNavigation />
      <div className="flex-1 overflow-hidden">
        <FlightDataView />
      </div>
    </div>
  )
}

export default Dashboard
