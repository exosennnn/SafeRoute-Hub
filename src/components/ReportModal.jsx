import { useState } from 'react';
import { useEmergency } from '../context/emergencyContext';

export default function ReportModal() {
  const { isModalOpen, setIsModalOpen, pendingCoords, addReport } = useEmergency();
  const [hazardType, setHazardType] = useState('Severe Flooding');
  const [description, setDescription] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    addReport({
      type: hazardType,
      description,
      lat: pendingCoords[0],
      lng: pendingCoords[1],
    });

    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>📍</span> Report Community Hazard
          </h3>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Hazard Type</label>
            <select 
              value={hazardType} 
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Severe Flooding">🌊 Severe Flooding</option>
              <option value="Blocked Road">🚧 Blocked / Impassable Road</option>
              <option value="Fallen Tree / Debris">🌳 Fallen Tree / Debris</option>
              <option value="Power Outage">⚡ Power Line Issue</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Description / Situation</label>
            <textarea 
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe current water depth, landmarks, or accessibility..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="text-xs text-gray-400 bg-gray-50 p-2.5 rounded-lg">
            Coordinates: {pendingCoords ? `${pendingCoords[0].toFixed(4)}, ${pendingCoords[1].toFixed(4)}` : 'Not set'}
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow-lg shadow-blue-500/20 text-sm"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}