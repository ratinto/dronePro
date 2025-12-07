import { Link, useLocation } from 'react-router-dom'

function TopNavigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path)

  const tabs = [
    { name: 'FLIGHT DATA', path: '/dashboard', icon: '📊' },
    { name: 'FLIGHT PLAN', path: '/flight-plan', icon: '🗺️' },
    { name: 'INITIAL SETUP', path: '/setup', icon: '⚙️' },
    { name: 'CONFIG/TUNING', path: '/config', icon: '🔧' },
    { name: 'SIMULATION', path: '/simulation', icon: '🎮' },
    { name: 'TERMINAL', path: '/terminal', icon: '💻' },
    { name: 'HELP', path: '/help', icon: '❓' },
    { name: 'UPLOAD MISSION', path: '/upload', icon: '📤' }
  ]

  return (
    <div className="bg-gray-900 border-b-2 border-gray-700">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="text-white font-bold text-lg">Mission Planner 1.2.70</div>
          <div className="text-gray-400 text-sm">mav 1.0</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="bg-gray-800 text-white text-sm px-3 py-1 rounded border border-gray-700">
            <option>COM32</option>
            <option>COM1</option>
            <option>COM2</option>
          </select>
          <select className="bg-gray-800 text-white text-sm px-3 py-1 rounded border border-gray-700">
            <option>57600</option>
            <option>115200</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-semibold text-sm">
            CONNECT
          </button>
        </div>
      </div>

      <div className="flex bg-gray-800">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`px-6 py-3 text-sm font-semibold border-r border-gray-700 transition-colors ${
              isActive(tab.path)
                ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopNavigation
