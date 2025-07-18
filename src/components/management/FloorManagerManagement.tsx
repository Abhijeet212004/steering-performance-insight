import { Users, MessageSquare, TrendingUp, AlertCircle, Plus, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageDialog } from '@/components/messaging/MessageDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function FloorManagerManagement() {
  const floorManagers = [
    {
      id: 'FM001',
      name: 'Sarah Johnson',
      productionLine: 'Line A',
      workersManaged: 8,
      efficiency: 94,
      alertsHandled: 15,
      status: 'active',
      lastLogin: '5 mins ago'
    },
    {
      id: 'FM002', 
      name: 'Mike Chen',
      productionLine: 'Line B',
      workersManaged: 12,
      efficiency: 97,
      alertsHandled: 8,
      status: 'active',
      lastLogin: '2 mins ago'
    },
    {
      id: 'FM003',
      name: 'Lisa Park',
      productionLine: 'Line C',
      workersManaged: 6,
      efficiency: 89,
      alertsHandled: 22,
      status: 'break',
      lastLogin: '25 mins ago'
    },
    {
      id: 'FM004',
      name: 'David Lee',
      productionLine: 'Quality Control',
      workersManaged: 4,
      efficiency: 99,
      alertsHandled: 3,
      status: 'active',
      lastLogin: '1 min ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'alert-success';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-500';
    if (efficiency >= 90) return 'text-blue-500';
    if (efficiency >= 85) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Floor Manager Management</CardTitle>
            <CardDescription>Monitor and coordinate floor managers across production lines</CardDescription>
          </div>
          <Button className="industrial-button">
            <Plus className="mr-2 h-4 w-4" />
            Add Floor Manager
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">Total Managers</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{floorManagers.length}</p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Avg Efficiency</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(floorManagers.reduce((acc, mgr) => acc + mgr.efficiency, 0) / floorManagers.length)}%
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-muted-foreground">Alerts Handled</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {floorManagers.reduce((acc, mgr) => acc + mgr.alertsHandled, 0)}
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">Workers Managed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {floorManagers.reduce((acc, mgr) => acc + mgr.workersManaged, 0)}
            </p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Manager</TableHead>
              <TableHead>Manager ID</TableHead>
              <TableHead>Production Line</TableHead>
              <TableHead>Workers</TableHead>
              <TableHead>Efficiency</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {floorManagers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell className="font-medium">{manager.name}</TableCell>
                <TableCell>{manager.id}</TableCell>
                <TableCell>{manager.productionLine}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{manager.workersManaged}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={getEfficiencyColor(manager.efficiency)}>
                    {manager.efficiency}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {manager.alertsHandled} handled
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(manager.status)}>
                    {manager.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <MessageDialog
                      trigger={
                        <Button size="sm" variant="outline" className="border-border">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      }
                      defaultRecipient={{ id: manager.id, name: manager.name, role: 'Floor Manager' }}
                      senderRole="unit_head"
                    />
                    <Button size="sm" variant="outline" className="border-border">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}