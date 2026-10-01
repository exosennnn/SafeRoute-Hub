import { useEmergency } from '../context/emergencyContext';

export default function Navbar() {
  const { setIsSosActive, setIsAnalyticsOpen, weatherData } = useEmergency();

  const showHotlines = () => {
    alert(
      "EMERGENCY HOTLINES DIRECTORY:\n\n" +
      "• National CDRRMC: (02) 8911-5061\n" +
      "• Dasmariñas CDRRMO: (046) 416-0000\n" +
      "• Philippine Red Cross: 143"
    );
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm px-5 py-3 flex items-center justify-between">
      {/* App Branding */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl animate-pulse">🚨</span>
        <div>
          <h1 className="font-extrabold text-gray-800 text-base sm:text-lg tracking-tight leading-none">
            SafeRoute <span className="text-blue-600">Community Hub</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">Real-Time Flood & Evacuation Portal</p>
        </div>
      </div>

      {/* PAGASA Weather & Typhoon Signal Banner */}
      <div className="hidden xl:flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-800 shadow-inner">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
        <span>🌤 <strong>{weatherData.signal}</strong> | Temp: {weatherData.temp} | Wind: {weatherData.windSpeed}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Analytics Button */}
        <button 
          onClick={() => setIsAnalyticsOpen(true)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>📊</span> <span className="hidden sm:inline">Analytics</span>
        </button>

        {/* SOS Emergency Button */}
        <button 
          onClick={() => setIsSosActive(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-red-500/30 animate-pulse transition flex items-center gap-1.5 active:scale-95"
        >
          <span>🆘</span> SOS BEACON
        </button>

        <button 
          onClick={showHotlines}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition hidden md:flex items-center gap-1.5"
        >
          <span>📞</span> Hotlines
        </button>
      </div>
    </header>
  );
}