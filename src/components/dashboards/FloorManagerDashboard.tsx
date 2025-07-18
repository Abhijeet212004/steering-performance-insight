import { Thermometer, AlertTriangle, Users, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageDialog } from '@/components/messaging/MessageDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

export function FloorManagerDashboard() {

  const alerts = [
    {
      id: '1',
      type: 'temperature',
      severity: 'critical',
      machine: 'M-003',
      worker: 'Tom Rodriguez',
      workerId: 'W001',
      temperature: 85,
      threshold: 80,
      timestamp: '2 mins ago'
    },
    {
      id: '2',
      type: 'speed',
      severity: 'medium',
      machine: 'M-007',
      worker: 'Anna Martinez',
      workerId: 'W002',
      speed: 45,
      threshold: 50,
      timestamp: '15 mins ago'
    },
    {
      id: '3',
      type: 'temperature',
      severity: 'high',
      machine: 'M-001',
      worker: 'Carlos Silva',
      workerId: 'W003',
      temperature: 82,
      threshold: 80,
      timestamp: '28 mins ago'
    }
  ];

  const workers = [
    { id: 'W001', name: 'Tom Rodriguez', machine: 'M-003', status: 'active', shift: 'Day', efficiency: 92 },
    { id: 'W002', name: 'Anna Martinez', machine: 'M-007', status: 'active', shift: 'Day', efficiency: 88 },
    { id: 'W003', name: 'Carlos Silva', machine: 'M-001', status: 'active', shift: 'Day', efficiency: 95 },
    { id: 'W004', name: 'Lisa Park', machine: 'M-005', status: 'break', shift: 'Day', efficiency: 90 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-warning';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };


  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Floor Management</h1>
          <p className="text-muted-foreground">Monitor production line A and manage worker activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="alert-success">
            Production Line A - Active
          </Badge>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="industrial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="industrial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground">On current shift</p>
          </CardContent>
        </Card>

        <Card className="industrial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">78°C</div>
            <p className="text-xs text-muted-foreground">Within normal range</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts Table */}
      <Card className="industrial-card">
        <CardHeader>
          <CardTitle className="text-foreground">Active Alerts</CardTitle>
          <CardDescription>Temperature and performance alerts requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Worker</TableHead>
                <TableHead>Worker ID</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{alert.worker}</TableCell>
                  <TableCell>{alert.workerId}</TableCell>
                  <TableCell>{alert.machine}</TableCell>
                  <TableCell>
                    {alert.type === 'temperature' 
                      ? `Temp: ${alert.temperature}°C (>${alert.threshold}°C)`
                      : `Speed: ${alert.speed}rpm (<${alert.threshold}rpm)`
                    }
                  </TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>
                    <MessageDialog
                      trigger={
                        <Button size="sm" variant="outline" className="border-border">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      }
                      defaultRecipient={{ id: alert.workerId, name: alert.worker, role: 'Worker' }}
                      senderRole="floor_manager"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Worker Status */}
      <Card className="industrial-card">
        <CardHeader>
          <CardTitle className="text-foreground">Worker Status</CardTitle>
          <CardDescription>Current shift workers and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workers.map((worker) => (
              <div key={worker.id} className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{worker.name}</h4>
                  <Badge variant={worker.status === 'active' ? 'default' : 'secondary'}>
                    {worker.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>ID: {worker.id}</p>
                  <p>Machine: {worker.machine}</p>
                  <p>Shift: {worker.shift}</p>
                  <p>Efficiency: {worker.efficiency}%</p>
                </div>
                <MessageDialog
                  trigger={
                    <Button size="sm" variant="outline" className="w-full mt-3 border-border">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Send Message
                    </Button>
                  }
                  defaultRecipient={{ id: worker.id, name: worker.name, role: 'Worker' }}
                  senderRole="floor_manager"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}