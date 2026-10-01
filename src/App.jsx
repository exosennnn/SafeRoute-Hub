import { EmergencyProvider } from './context/emergencyContext';
import Navbar from './components/Navbar';
import ControlPanel from './components/ControlPanel';
import EvacuationCard from './components/EvacuationCard';
import ReportModal from './components/ReportModal';
import SOSModal from './components/SOSmodal';
import SafeRouteMap from './components/SafeRouteMap';
import AnalyticsModal from './components/AnalyticsModal';

export default function App() {
  return (
    <EmergencyProvider>
      <div className="relative h-screen w-screen overflow-hidden">
        <Navbar />
        <ControlPanel />
        <EvacuationCard />
        <ReportModal />
        <SOSModal />
        <SafeRouteMap />
        
        {/* Idagdag mo ito rito para lumitaw ang modal kapag pinindot ang button */}
        <AnalyticsModal />
      </div>
    </EmergencyProvider>
  );
}