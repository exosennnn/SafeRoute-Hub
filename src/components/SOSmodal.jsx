import { useState } from 'react';
import { useEmergency } from '../context/emergencyContext';

export default function SOSModal() {
  const { isSosActive, setIsSosActive, setSosDetails } = useEmergency();
  const [emergencyType, setEmergencyType] = useState('Trapped by Rising Water');
  const [notes, setNotes] = useState('');
  const [sosSubmitted, setSosSubmitted] = useState(false);

  if (!isSosActive) return null;

  const handleDispatch = (e) => {
    e.preventDefault();
    setSosSubmitted(true);
    setSosDetails({
      type: emergencyType,
      notes,
      coords: [14.3290, 120.9350],
      time: new Date().toLocaleTimeString()
    });
  };

  const handleClose = () => {
    setIsSosActive(false);
    setSosSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border-2 border-red-500">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🚨</span>
            <h3 className="text-xl font-extrabold text-red-600">SOS EMERGENCY BEACON</h3>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
        </div>

        {!sosSubmitted ? (
          <form onSubmit={handleDispatch} className="space-y-4">
            <p className="text-xs text-gray-600 bg-red-50 p-3 rounded-xl border border-red-100 font-medium">
              Activating this beacon transmits your coordinates instantly to local emergency rescue teams (CDRRMO).
            </p>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Emergency Nature</label>
              <select 
                value={emergencyType} 
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-red-500"
              >
                <option value="Trapped by Rising Water">🌊 Trapped by Rising Water</option>
                <option value="Medical Emergency / Injury">🚑 Medical Emergency / Injury</option>
                <option value="Stranded on Rooftop">🏠 Stranded on Rooftop</option>
                <option value="Immediate Evacuation Assistance">🆘 Immediate Evacuation Assistance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Additional Details (Optional)</label>
              <textarea 
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Number of people, elderly/infants present, landmarks..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 rounded-xl transition shadow-lg shadow-red-500/30 text-sm animate-pulse"
            >
              TRANSMIT SOS DISTRESS SIGNAL
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl animate-ping">
              📡
            </div>
            <h4 className="font-extrabold text-gray-800 text-lg">Signal Dispatched Successfully!</h4>
            <p className="text-xs text-gray-600 px-4">
              Rescue Unit #4 (Dasmariñas CDRRMO) has locked onto your coordinates. Stay calm and keep your phone accessible.
            </p>
            <button 
              onClick={handleClose}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-xl text-sm transition"
            >
              Close Tracker View
            </button>
          </div>
        )}
      </div>
    </div>
  );
}