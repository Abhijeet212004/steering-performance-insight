import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { FloorManagerDashboard } from '@/components/dashboards/FloorManagerDashboard';
import { UnitHeadDashboard } from '@/components/dashboards/UnitHeadDashboard';
import { PlantHeadDashboard } from '@/components/dashboards/PlantHeadDashboard';
import { WorkerDashboard } from '@/components/dashboards/WorkerDashboard';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export default function Dashboard() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'floor_manager':
        return <FloorManagerDashboard />;
      case 'unit_head':
        return <UnitHeadDashboard />;
      case 'plant_head':
        return <PlantHeadDashboard />;
      case 'worker':
        return <WorkerDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={3}
      />
      
      <main className="flex-1">
        {renderDashboard()}
      </main>

      <NotificationCenter 
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}