import { Settings, MessageSquare, Plus, Edit3, AlertTriangle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Worker {
  id: string;
  name: string;
  currentMachine: string;
  status: string;
  shift: string;
  efficiency: number;
  lastActive: string;
}

export function WorkerManagement() {
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 'W001', name: 'Tom Rodriguez', currentMachine: 'M-003', status: 'active', shift: 'Day', efficiency: 92, lastActive: '2 mins ago' },
    { id: 'W002', name: 'Anna Martinez', currentMachine: 'M-007', status: 'active', shift: 'Day', efficiency: 88, lastActive: '5 mins ago' },
    { id: 'W003', name: 'Carlos Silva', currentMachine: 'M-001', status: 'active', shift: 'Day', efficiency: 95, lastActive: '1 min ago' },
    { id: 'W004', name: 'Lisa Park', currentMachine: 'M-005', status: 'break', shift: 'Day', efficiency: 90, lastActive: '15 mins ago' },
    { id: 'W005', name: 'James Wilson', currentMachine: 'M-002', status: 'active', shift: 'Day', efficiency: 87, lastActive: '3 mins ago' },
  ]);

  const availableMachines = ['M-001', 'M-002', 'M-003', 'M-004', 'M-005', 'M-006', 'M-007', 'M-008'];

  const handleMachineAssignment = (workerId: string, machineId: string) => {
    setWorkers(prev => prev.map(worker => 
      worker.id === workerId ? { ...worker, currentMachine: machineId } : worker
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'alert-success';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Worker & Machine Management</CardTitle>
            <CardDescription>Assign workers to machines and monitor their performance</CardDescription>
          </div>
          <Button className="industrial-button">
            <Plus className="mr-2 h-4 w-4" />
            Add Worker
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Worker</TableHead>
              <TableHead>Worker ID</TableHead>
              <TableHead>Current Machine</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Efficiency</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>{worker.id}</TableCell>
                <TableCell>
                  <Select 
                    value={worker.currentMachine} 
                    onValueChange={(value) => handleMachineAssignment(worker.id, value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMachines.map((machine) => (
                        <SelectItem key={machine} value={machine}>
                          {machine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(worker.status)}>
                    {worker.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{worker.efficiency}%</span>
                    {worker.efficiency < 90 && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{worker.lastActive}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <MessageDialog
                      trigger={
                        <Button size="sm" variant="outline" className="border-border">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      }
                      defaultRecipient={{ id: worker.id, name: worker.name, role: 'Worker' }}
                      senderRole="floor_manager"
                    />
                    <Button size="sm" variant="outline" className="border-border">
                      <Edit3 className="h-3 w-3" />
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