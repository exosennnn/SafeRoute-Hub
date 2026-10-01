import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { mockFloodZones, mockEvacuationCenters, mockCheckpoints } from '../data/mockEmergencyData';

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [activeLayers, setActiveLayers] = useState({
    floods: true,
    evacuation: true,
    checkpoints: true,
    reports: true,
  });
  
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [selectedCenter, setSelectedCenter] = useState(null);

  // --- REAL-TIME SUPABASE USER REPORTS ---
  const [userReports, setUserReports] = useState([]);

  // Fetch initial data & set up Realtime WebSocket listener
  useEffect(() => {
    fetchReports();

    // Realtime subscription
    const reportsChannel = supabase
      .channel('public:user_reports')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_reports' },
        (payload) => {
          console.log('Realtime change received:', payload);
          fetchReports(); // Refresh data instantly when changes occur on any device
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(reportsChannel);
    };
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('user_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
    } else {
      setUserReports(data || []);
    }
  };

  const [isReportingMode, setIsReportingMode] = useState(false);
  const [pendingCoords, setPendingCoords] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // SOS Emergency Beacon
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosDetails, setSosDetails] = useState(null);

  // Safe Route Calculator
  const [activeRoute, setActiveRoute] = useState(null);

  // Weather & Analytics States
  const [weatherData] = useState({
    signal: "Typhoon Signal No. 2",
    temp: "26°C",
    rainfall: "Red Warning (Heavy Flooding Expected)",
    status: "Active Monitoring - Cavite Area",
    windSpeed: "65 km/h"
  });

  const [dispatchLogs, setDispatchLogs] = useState([
    { id: 1, unit: "Rescue Unit Alpha", message: "Dispatched to Low-Lying Riverside Area for extraction.", time: "5 mins ago", status: "En Route" },
    { id: 2, unit: "CDRRMO Medical Team", message: "Supplies & medical kits delivered to Central Gymnasium.", time: "20 mins ago", status: "Completed" },
    { id: 3, unit: "Brgy. Patrol 4", message: "Assisting residents along Market District evacuation route.", time: "35 mins ago", status: "Active" }
  ]);

  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isDispatchLogOpen, setIsDispatchLogOpen] = useState(true);

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // --- ADD REPORT TO SUPABASE ---
  const addReport = async (reportData) => {
    const newReport = {
      type: reportData.type,
      description: reportData.description,
      lat: reportData.lat,
      lng: reportData.lng,
      timestamp: "Just now",
      upvotes: 1
    };

    const { error } = await supabase.from('user_reports').insert([newReport]);
    if (error) {
      console.error('Error adding report:', error);
      alert('Failed to submit report to cloud backend.');
    }
  };

  // --- UPVOTE REPORT IN SUPABASE ---
  const upvoteReport = async (id, currentUpvotes) => {
    const { error } = await supabase
      .from('user_reports')
      .update({ upvotes: currentUpvotes + 1 })
      .eq('id', id);

    if (error) {
      console.error('Error updating upvotes:', error);
    }
  };

  const calculateSafeRoute = (destination) => {
    const startLat = 14.3250;
    const startLng = 120.9300;
    const routeCoords = [
      [startLat, startLng],
      [14.3270, 120.9320],
      [14.3300, 120.9330],
      [destination.lat, destination.lng]
    ];
    setActiveRoute(routeCoords);
    setSelectedCenter(null);
  };

  return (
    <EmergencyContext.Provider value={{
      activeLayers,
      toggleLayer,
      capacityFilter,
      setCapacityFilter,
      selectedCenter,
      setSelectedCenter,
      floodZones: mockFloodZones,
      evacuationCenters: mockEvacuationCenters,
      checkpoints: mockCheckpoints,
      userReports,
      isReportingMode,
      setIsReportingMode,
      pendingCoords,
      setPendingCoords,
      isModalOpen,
      setIsModalOpen,
      addReport,
      upvoteReport,
      isSosActive,
      setIsSosActive,
      sosDetails,
      setSosDetails,
      activeRoute,
      setActiveRoute,
      calculateSafeRoute,
      weatherData,
      dispatchLogs,
      isAnalyticsOpen,
      setIsAnalyticsOpen,
      isDispatchLogOpen,
      setIsDispatchLogOpen,
    }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => useContext(EmergencyContext);