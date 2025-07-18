import { Gauge, Clock, Target, MessageCircle, Thermometer, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function WorkerDashboard() {
  const workerStats = [
    {
      title: 'Today\'s Production',
      value: '47',
      target: '50',
      change: '94% of target',
      icon: Target,
      color: 'text-blue-500'
    },
    {
      title: 'Efficiency Score',
      value: '92%',
      change: '+3% from yesterday',
      icon: Gauge,
      color: 'text-green-500'
    },
    {
      title: 'Avg Cycle Time',
      value: '58 min',
      target: '60 min',
      change: '2 min ahead',
      icon: Clock,
      color: 'text-purple-500'
    },
    {
      title: 'Quality Rate',
      value: '98.7%',
      change: 'Excellent quality',
      icon: Zap,
      color: 'text-orange-500'
    }
  ];

  const machineStatus = {
    id: 'M-003',
    name: 'CNC Lathe M-003',
    status: 'running',
    temperature: 76,
    pressure: 142,
    speed: 1850,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15'
  };

  const recentMessages = [
    {
      id: '1',
      from: 'Sarah Johnson (Floor Manager)',
      message: 'Great work on maintaining quality standards today!',
      time: '2 hours ago',
      priority: 'normal'
    },
    {
      id: '2',
      from: 'Maintenance Team',
      message: 'Machine M-003 scheduled for routine check tomorrow at 2 PM',
      time: '4 hours ago',
      priority: 'normal'
    },
    {
      id: '3',
      from: 'Safety Department',
      message: 'Safety reminder: Always wear protective equipment',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  const shiftSchedule = [
    { day: 'Monday', shift: 'Day (6AM - 2PM)', status: 'completed' },
    { day: 'Tuesday', shift: 'Day (6AM - 2PM)', status: 'current' },
    { day: 'Wednesday', shift: 'Day (6AM - 2PM)', status: 'scheduled' },
    { day: 'Thursday', shift: 'Day (6AM - 2PM)', status: 'scheduled' },
    { day: 'Friday', shift: 'Day (6AM - 2PM)', status: 'scheduled' }
  ];

  const getMachineStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'alert-success';
      case 'idle': return 'bg-yellow-500';
      case 'maintenance': return 'alert-warning';
      case 'error': return 'alert-critical';
      default: return 'bg-gray-500';
    }
  };

  const getParameterStatus = (value: number, min: number, max: number) => {
    if (value < min || value > max) return 'text-red-500';
    if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Operator Dashboard</h1>
          <p className="text-muted-foreground">Worker ID: W001 - Tom Rodriguez - Machine M-003</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="alert-success">
            Shift: Day (6AM - 2PM)
          </Badge>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workerStats.map((stat) => (
          <Card key={stat.title} className="industrial-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              {stat.target && (
                <p className="text-xs text-muted-foreground">Target: {stat.target}</p>
              )}
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Status */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Machine Status</CardTitle>
            <CardDescription>Real-time monitoring of your assigned machine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{machineStatus.name}</h4>
                  <p className="text-sm text-muted-foreground">Machine ID: {machineStatus.id}</p>
                </div>
                <Badge className={getMachineStatusColor(machineStatus.status)}>
                  {machineStatus.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <Thermometer className={`h-6 w-6 mx-auto mb-2 ${getParameterStatus(machineStatus.temperature, 70, 80)}`} />
                  <p className="text-sm font-medium text-foreground">{machineStatus.temperature}°C</p>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                </div>
                
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <Gauge className={`h-6 w-6 mx-auto mb-2 ${getParameterStatus(machineStatus.pressure, 130, 150)}`} />
                  <p className="text-sm font-medium text-foreground">{machineStatus.pressure} PSI</p>
                  <p className="text-xs text-muted-foreground">Pressure</p>
                </div>
                
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <Zap className={`h-6 w-6 mx-auto mb-2 ${getParameterStatus(machineStatus.speed, 1800, 2000)}`} />
                  <p className="text-sm font-medium text-foreground">{machineStatus.speed} RPM</p>
                  <p className="text-xs text-muted-foreground">Speed</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Maintenance:</span>
                  <span className="text-foreground">{machineStatus.lastMaintenance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Maintenance:</span>
                  <span className="text-foreground">{machineStatus.nextMaintenance}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Messages</CardTitle>
            <CardDescription>Messages from supervisors and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{message.from}</p>
                    <p className="text-xs text-muted-foreground">{message.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.message}</p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-border">
                <MessageCircle className="mr-2 h-4 w-4" />
                View All Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shift Schedule */}
      <Card className="industrial-card">
        <CardHeader>
          <CardTitle className="text-foreground">This Week's Schedule</CardTitle>
          <CardDescription>Your assigned shifts for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {shiftSchedule.map((day) => (
              <div key={day.day} className={`p-4 rounded-lg text-center ${
                day.status === 'current' ? 'bg-primary/20 border border-primary' :
                day.status === 'completed' ? 'bg-green-500/20 border border-green-500' :
                'bg-secondary/30'
              }`}>
                <h4 className="font-semibold text-foreground">{day.day}</h4>
                <p className="text-xs text-muted-foreground mt-1">{day.shift}</p>
                <Badge 
                  className={`mt-2 ${
                    day.status === 'current' ? 'bg-primary text-primary-foreground' :
                    day.status === 'completed' ? 'alert-success' :
                    'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {day.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}