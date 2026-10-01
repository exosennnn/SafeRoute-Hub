import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEmergency } from '../context/emergencyContext';

function MapClickHandler() {
  const { isReportingMode, setIsReportingMode, setPendingCoords, setIsModalOpen } = useEmergency();
  useMapEvents({
    click(e) {
      if (isReportingMode) {
        setPendingCoords([e.latlng.lat, e.latlng.lng]);
        setIsModalOpen(true);
        setIsReportingMode(false);
      }
    },
  });
  return null;
}

export default function SafeRouteMap() {
  const { 
    activeLayers, 
    floodZones, 
    evacuationCenters, 
    checkpoints, 
    userReports, 
    capacityFilter, 
    setSelectedCenter,
    isReportingMode,
    activeRoute,
    upvoteReport 
  } = useEmergency();

  const filteredCenters = evacuationCenters.filter(center => {
    if (capacityFilter === 'available') return center.status === 'Available';
    if (capacityFilter === 'critical') return center.status.includes('Critical');
    return true;
  });

  return (
    <div className={`h-screen w-full relative z-0 ${isReportingMode ? 'cursor-crosshair' : ''}`}>
      {isReportingMode && (
        <div className="absolute top-24 left-1/2 -transform -translate-x-1/2 z-[1500] bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-2xl font-bold text-sm animate-bounce">
          🎯 Click anywhere on the map to drop your hazard report pin!
        </div>
      )}

      <MapContainer center={[14.3297, 120.9367]} zoom={14} className="h-full w-full" zoomControl={false}>
        <MapClickHandler />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Flood Risk Zones */}
        {activeLayers.floods && floodZones.map((zone) => (
          <Polygon 
            key={zone.id} 
            positions={zone.coordinates} 
            pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.4 }}
          >
            <Popup><div className="p-1"><h3 className="font-bold text-red-600">Flood: {zone.name}</h3><p>Depth: {zone.depth}</p></div></Popup>
          </Polygon>
        ))}

        {/* Safe Route Polyline */}
        {activeRoute && (
          <Polyline positions={activeRoute} pathOptions={{ color: '#2563eb', weight: 6, dashArray: '8, 8' }} />
        )}

        {/* Evacuation Centers */}
        {activeLayers.evacuation && filteredCenters.map((center) => (
          <Marker key={center.id} position={[center.lat, center.lng]} eventHandlers={{ click: () => setSelectedCenter(center) }} />
        ))}

        {/* Rescue Checkpoints */}
        {activeLayers.checkpoints && checkpoints.map((cp) => (
          <Marker key={cp.id} position={[cp.lat, cp.lng]} />
        ))}

        {/* User Hazard Reports with Upvote */}
        {activeLayers.reports && userReports.map((report) => (
          <Marker key={report.id} position={[report.lat, report.lng]}>
            <Popup>
              <div className="p-1 max-w-xs space-y-2">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-red-100 text-red-700">{report.type}</span>
                <p className="text-xs text-gray-700">{report.description}</p>
                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400">{report.timestamp}</span>
                  <button 
                    onClick={() => upvoteReport(report.id, report.upvotes)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs px-2 py-1 rounded transition flex items-center gap-1"
                  >
                    👍 Confirmed ({report.upvotes})
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}