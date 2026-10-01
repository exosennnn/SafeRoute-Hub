import { useEmergency } from '../context/emergencyContext';

export default function AnalyticsModal() {
  const { isAnalyticsOpen, setIsAnalyticsOpen, evacuationCenters, userReports, floodZones } = useEmergency();

  if (!isAnalyticsOpen) return null;

  const totalEvacuees = evacuationCenters.reduce((acc, center) => acc + center.currentOccupants, 0);
  const totalCapacity = evacuationCenters.reduce((acc, center) => acc + center.maxCapacity, 0);
  const overallOccupancyRate = Math.round((totalEvacuees / totalCapacity) * 100);

  return (
    <div className="fixed inset-0 z-[4000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="text-lg font-extrabold text-gray-800">City-Wide Crisis Analytics Dashboard</h3>
              <p className="text-xs text-gray-500 font-medium">Real-time telemetry and evacuation tracking overview</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAnalyticsOpen(false)}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg p-2"
          >
            ✕
          </button>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">Total Evacuated</span>
            <span className="text-2xl font-extrabold text-blue-900">{totalEvacuees} <span className="text-xs font-normal text-blue-700">/ {totalCapacity}</span></span>
            <div className="w-full bg-blue-200 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${overallOccupancyRate}%` }}></div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">Active Flood Zones</span>
            <span className="text-2xl font-extrabold text-red-900">{floodZones.length} Sectors</span>
            <span className="text-[11px] font-medium text-red-700 block mt-1">Status: High Risk Warning</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">Citizen Hazard Reports</span>
            <span className="text-2xl font-extrabold text-emerald-900">{userReports.length} Verified</span>
            <span className="text-[11px] font-medium text-emerald-700 block mt-1">Crowdsourced Active Pins</span>
          </div>
        </div>

        {/* Center Details Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Evacuation Center Telemetry</h4>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {evacuationCenters.map(center => {
              const rate = Math.round((center.currentOccupants / center.maxCapacity) * 100);
              return (
                <div key={center.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                  <div>
                    <span className="font-bold text-gray-800 block">{center.name}</span>
                    <span className="text-gray-500">{center.address}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold px-2 py-0.5 rounded-full ${rate >= 90 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {center.currentOccupants} / {center.maxCapacity} ({rate}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => setIsAnalyticsOpen(false)}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}