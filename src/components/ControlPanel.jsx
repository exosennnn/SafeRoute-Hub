import { useEmergency } from '../context/emergencyContext';

export default function ControlPanel() {
  const { activeLayers, toggleLayer, capacityFilter, setCapacityFilter, setIsReportingMode, isReportingMode } = useEmergency();

  return (
    <div className="absolute top-20 left-4 z-[999] w-80 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🚨</span>
        <h1 className="font-bold text-lg text-gray-800">SafeRoute Hub</h1>
      </div>

      {/* Citizen Report Trigger Button */}
      <div className="mb-5">
        <button 
          onClick={() => setIsReportingMode(true)}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition shadow-md flex items-center justify-center gap-2 ${
            isReportingMode 
              ? 'bg-amber-500 text-white animate-pulse' 
              : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20'
          }`}
        >
          <span>📍</span> {isReportingMode ? 'Click Map to Place Pin...' : 'Report a Hazard'}
        </button>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-3 mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Map Layers</label>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Flood Risk Zones
          </span>
          <input 
            type="checkbox" 
            checked={activeLayers.floods} 
            onChange={() => toggleLayer('floods')}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span> Evacuation Centers
          </span>
          <input 
            type="checkbox" 
            checked={activeLayers.evacuation} 
            onChange={() => toggleLayer('evacuation')}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Rescue Checkpoints
          </span>
          <input 
            type="checkbox" 
            checked={activeLayers.checkpoints} 
            onChange={() => toggleLayer('checkpoints')}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span> Citizen Reports
          </span>
          <input 
            type="checkbox" 
            checked={activeLayers.reports} 
            onChange={() => toggleLayer('reports')}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Capacity Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Evacuation Status Filter</label>
        <select 
          value={capacityFilter} 
          onChange={(e) => setCapacityFilter(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Show All Centers</option>
          <option value="available">Available Only</option>
          <option value="critical">Critical / Near Capacity</option>
        </select>
      </div>
    </div>
  );
}