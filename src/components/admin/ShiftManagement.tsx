import { useState } from 'react';
import { Calendar, Clock, User, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const mockWorkers = [
  { id: '1', name: 'Anna Martinez', workerId: 'W001', currentShift: 'Morning (6AM-2PM)' },
  { id: '2', name: 'Tom Rodriguez', workerId: 'W002', currentShift: 'Afternoon (2PM-10PM)' },
  { id: '3', name: 'John Doe', workerId: 'W003', currentShift: 'Night (10PM-6AM)' },
  { id: '4', name: 'Sarah Wilson', workerId: 'W004', currentShift: 'Morning (6AM-2PM)' },
];

const shifts = [
  { value: 'morning', label: 'Morning (6AM-2PM)', color: 'bg-blue-500' },
  { value: 'afternoon', label: 'Afternoon (2PM-10PM)', color: 'bg-orange-500' },
  { value: 'night', label: 'Night (10PM-6AM)', color: 'bg-purple-500' },
  { value: 'off', label: 'Off Day', color: 'bg-gray-500' },
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ShiftManagement() {
  const [selectedWorker, setSelectedWorker] = useState('');
  const [weekShifts, setWeekShifts] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleShiftChange = (day: string, shift: string) => {
    setWeekShifts(prev => ({ ...prev, [day]: shift }));
  };

  const handleSaveShifts = () => {
    if (!selectedWorker) {
      toast({
        title: "Worker Required",
        description: "Please select a worker to assign shifts.",
        variant: "destructive",
      });
      return;
    }

    const worker = mockWorkers.find(w => w.id === selectedWorker);
    toast({
      title: "Shifts Updated",
      description: `Weekly shifts updated for ${worker?.name}`,
    });
    
    setWeekShifts({});
    setSelectedWorker('');
  };

  const getShiftBadge = (shiftValue: string) => {
    const shift = shifts.find(s => s.value === shiftValue);
    if (!shift) return null;
    
    return (
      <Badge variant="secondary" className="text-xs">
        {shift.label}
      </Badge>
    );
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Shift Management
        </CardTitle>
        <CardDescription>Assign weekly shifts to workers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Worker Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Worker</label>
          <Select value={selectedWorker} onValueChange={setSelectedWorker}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a worker..." />
            </SelectTrigger>
            <SelectContent>
              {mockWorkers.map((worker) => (
                <SelectItem key={worker.id} value={worker.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{worker.name} ({worker.workerId})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Shift Info */}
        {selectedWorker && (
          <div className="p-3 bg-secondary/20 rounded-md">
            <p className="text-sm text-muted-foreground">Current Shift</p>
            <p className="font-medium text-foreground">
              {mockWorkers.find(w => w.id === selectedWorker)?.currentShift}
            </p>
          </div>
        )}

        {/* Weekly Shift Assignment */}
        {selectedWorker && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Weekly Schedule
            </h4>
            
            <div className="grid gap-3">
              {weekDays.map((day) => (
                <div key={day} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                  <span className="font-medium text-foreground min-w-[100px]">{day}</span>
                  
                  <div className="flex items-center gap-3 flex-1">
                    <Select 
                      value={weekShifts[day] || ''} 
                      onValueChange={(value) => handleShiftChange(day, value)}
                    >
                      <SelectTrigger className="max-w-[200px]">
                        <SelectValue placeholder="Select shift..." />
                      </SelectTrigger>
                      <SelectContent>
                        {shifts.map((shift) => (
                          <SelectItem key={shift.value} value={shift.value}>
                            {shift.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {weekShifts[day] && getShiftBadge(weekShifts[day])}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleSaveShifts} 
              className="industrial-button w-full"
              disabled={Object.keys(weekShifts).length === 0}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Weekly Shifts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}