import { Users, Activity, AlertTriangle, TrendingUp, Plus, Settings, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShiftManagement } from '@/components/admin/ShiftManagement';
import { MessageDialog } from '@/components/messaging/MessageDialog';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '47',
      change: '+3 this week',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Active Machines',
      value: '12',
      change: '2 in maintenance',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      title: 'Open Alerts',
      value: '8',
      change: '3 critical',
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
    {
      title: 'System Efficiency',
      value: '94.2%',
      change: '+2.1% from last week',
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  const users = [
    { id: '1', name: 'Sarah Johnson', role: 'Floor Manager', status: 'active', lastSeen: '2 mins ago' },
    { id: '2', name: 'Mike Wilson', role: 'Unit Head', status: 'active', lastSeen: '5 mins ago' },
    { id: '3', name: 'Lisa Chen', role: 'Plant Head', status: 'active', lastSeen: '1 hour ago' },
    { id: '4', name: 'Tom Rodriguez', role: 'Worker', status: 'offline', lastSeen: '2 hours ago' },
    { id: '5', name: 'Anna Martinez', role: 'Worker', status: 'active', lastSeen: 'Just now' },
  ];

  const recentActivities = [
    { action: 'New user created', user: 'John Doe (Worker)', time: '5 mins ago', type: 'user' },
    { action: 'Critical alert triggered', machine: 'Machine M-003', time: '12 mins ago', type: 'alert' },
    { action: 'System backup completed', time: '1 hour ago', type: 'system' },
    { action: 'User role updated', user: 'Sarah Johnson', time: '2 hours ago', type: 'user' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
          <p className="text-muted-foreground">Manage users, monitor system health, and configure settings</p>
        </div>
        <div className="flex space-x-3">
          <Button className="industrial-button">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <Button variant="outline" className="border-border">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="industrial-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">User Management</CardTitle>
            <CardDescription>Manage system users and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageDialog
                      trigger={
                        <Button size="sm" variant="outline" className="h-8">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      }
                      defaultRecipient={{ id: user.id, name: user.name, role: user.role }}
                      senderRole="admin"
                    />
                    <div className="text-right">
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{user.lastSeen}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activities</CardTitle>
            <CardDescription>Latest system activities and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-md">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'alert' ? 'bg-red-500' : 
                    activity.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    {activity.user && (
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    )}
                    {activity.machine && (
                      <p className="text-xs text-muted-foreground">{activity.machine}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shift Management */}
        <ShiftManagement />
      </div>
    </div>
  );
}