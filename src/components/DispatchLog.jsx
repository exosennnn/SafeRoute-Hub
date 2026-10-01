import { useEmergency } from '../context/emergencyContext';

export default function DispatchLog() {
  const { dispatchLogs, isDispatchLogOpen, setIsDispatchLogOpen } = useEmergency();

  if (!isDispatchLogOpen) {
    return (
      <button 
        onClick={() => setIsDispatchLogOpen(true)}
        className="absolute bottom-6 left-4 z-[990] bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 px-4 py-2 rounded-2xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Live Rescue Feed ({dispatchLogs.length})</span>
      </button>
    );
  }

  return (
    <div className="absolute bottom-6 left-4 z-[990] w-80 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 border border-gray-100 animate-fadeIn">
      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700">CDRRMO Rescue Feed</h4>
        </div>
        <button 
          onClick={() => setIsDispatchLogOpen(false)}
          className="text-gray-400 hover:text-gray-600 font-bold text-xs"
        >
          Minimize ✕
        </button>
      </div>

      <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
        {dispatchLogs.map(log => (
          <div key={log.id} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[11px]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-extrabold text-blue-600">{log.unit}</span>
              <span className="text-[10px] text-gray-400">{log.time}</span>
            </div>
            <p className="text-gray-700 font-medium">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}