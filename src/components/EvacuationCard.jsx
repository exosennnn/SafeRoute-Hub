import { useEmergency } from '../context/emergencyContext';

export default function EvacuationCard() {
  const { selectedCenter, setSelectedCenter, calculateSafeRoute } = useEmergency();

  if (!selectedCenter) return null;

  const occupancyRate = Math.round((selectedCenter.currentOccupants / selectedCenter.maxCapacity) * 100);
  const isCritical = selectedCenter.status.includes('Critical');

  return (
    <div className="absolute bottom-6 right-6 z-[999] w-96 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-gray-100 animate-fadeIn">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full mb-1 ${
            isCritical ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {selectedCenter.status}
          </span>
          <h2 className="text-lg font-bold text-gray-800">{selectedCenter.name}</h2>
          <p className="text-xs text-gray-500">{selectedCenter.address}</p>
        </div>
        <button onClick={() => setSelectedCenter(null)} className="text-gray-400 hover:text-gray-600 font-bold text-lg px-2">✕</button>
      </div>

      <div className="my-4">
        <div className="flex justify-between text-xs font-semibold mb-1 text-gray-600">
          <span>Capacity Status</span>
          <span>{selectedCenter.currentOccupants} / {selectedCenter.maxCapacity} ({occupancyRate}%)</span>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-500 ${isCritical ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${occupancyRate}%` }}></div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-5 bg-gray-50 p-3 rounded-xl border border-gray-100">
        <p className="font-medium text-gray-700 mb-1">Emergency Hotline:</p>
        <p className="text-blue-600 font-bold">{selectedCenter.contact}</p>
      </div>

      <button 
        onClick={() => calculateSafeRoute(selectedCenter)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow-lg shadow-blue-500/20 text-sm"
      >
        Calculate Safe Route (Bypass Floods)
      </button>
    </div>
  );
}