import { Building, MessageSquare, TrendingUp, Users, Plus, Settings, Target } from 'lucide-react';
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

export function UnitHeadManagement() {
  const unitHeads = [
    {
      id: 'UH001',
      name: 'Mike Wilson',
      unit: 'Manufacturing Unit 1',
      floorManagers: 4,
      totalWorkers: 89,
      unitEfficiency: 96,
      productionTarget: 1200,
      actualProduction: 1247,
      status: 'active',
      lastLogin: '10 mins ago'
    },
    {
      id: 'UH002',
      name: 'Anna Chen',
      unit: 'Manufacturing Unit 2', 
      floorManagers: 3,
      totalWorkers: 83,
      unitEfficiency: 92,
      productionTarget: 1100,
      actualProduction: 1156,
      status: 'active',
      lastLogin: '5 mins ago'
    },
    {
      id: 'UH003',
      name: 'Robert Kim',
      unit: 'Manufacturing Unit 3',
      floorManagers: 2,
      totalWorkers: 75,
      unitEfficiency: 0,
      productionTarget: 1000,
      actualProduction: 0,
      status: 'maintenance',
      lastLogin: '2 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'alert-success';
      case 'maintenance': return 'alert-warning';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getProductionStatus = (actual: number, target: number) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return { color: 'text-green-500', status: 'Exceeding' };
    if (percentage >= 90) return { color: 'text-blue-500', status: 'On Track' };
    if (percentage >= 80) return { color: 'text-yellow-500', status: 'Behind' };
    return { color: 'text-red-500', status: 'Critical' };
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Unit Head Management</CardTitle>
            <CardDescription>Oversee unit heads and manufacturing unit performance</CardDescription>
          </div>
          <Button className="industrial-button">
            <Plus className="mr-2 h-4 w-4" />
            Add Unit Head
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">Manufacturing Units</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{unitHeads.length}</p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Total Workforce</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {unitHeads.reduce((acc, head) => acc + head.totalWorkers, 0)}
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">Total Production</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {unitHeads.reduce((acc, head) => acc + head.actualProduction, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-muted-foreground">Avg Efficiency</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(unitHeads.filter(head => head.unitEfficiency > 0)
                .reduce((acc, head) => acc + head.unitEfficiency, 0) / 
                unitHeads.filter(head => head.unitEfficiency > 0).length)}%
            </p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit Head</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Managers</TableHead>
              <TableHead>Workers</TableHead>
              <TableHead>Efficiency</TableHead>
              <TableHead>Production</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unitHeads.map((head) => {
              const productionStatus = getProductionStatus(head.actualProduction, head.productionTarget);
              return (
                <TableRow key={head.id}>
                  <TableCell className="font-medium">{head.name}</TableCell>
                  <TableCell>{head.unit}</TableCell>
                  <TableCell>{head.floorManagers} managers</TableCell>
                  <TableCell>{head.totalWorkers} workers</TableCell>
                  <TableCell>
                    <span className={head.unitEfficiency >= 90 ? 'text-green-500' : 'text-yellow-500'}>
                      {head.unitEfficiency}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={productionStatus.color}>
                          {head.actualProduction.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          / {head.productionTarget.toLocaleString()}
                        </span>
                      </div>
                      <Badge variant="outline" className={productionStatus.color}>
                        {productionStatus.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(head.status)}>
                      {head.status}
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
                        defaultRecipient={{ id: head.id, name: head.name, role: 'Unit Head' }}
                        senderRole="plant_head"
                      />
                      <Button size="sm" variant="outline" className="border-border">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}