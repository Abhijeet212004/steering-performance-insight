import { BarChart, TrendingUp, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function UnitHeadDashboard() {
  const stats = [
    {
      title: 'Unit Production',
      value: '1,247',
      target: '1,200',
      change: '+3.9%',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Unit Efficiency',
      value: '96.3%',
      change: '+1.2% from yesterday',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      title: 'Avg Cycle Time',
      value: '47 min',
      target: '45 min',
      change: '-2 min improvement',
      icon: Clock,
      color: 'text-orange-500'
    },
    {
      title: 'Quality Score',
      value: '98.7%',
      change: '+0.5% this week',
      icon: BarChart,
      color: 'text-purple-500'
    }
  ];

  const productionLines = [
    { name: 'Production Line A', status: 'running', efficiency: 94, output: 312, manager: 'Sarah Johnson' },
    { name: 'Production Line B', status: 'running', efficiency: 97, output: 325, manager: 'Mike Chen' },
    { name: 'Production Line C', status: 'maintenance', efficiency: 0, output: 0, manager: 'Lisa Park' },
    { name: 'Quality Control', status: 'running', efficiency: 99, output: 89, manager: 'David Lee' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'alert-success';
      case 'maintenance': return 'alert-warning';
      case 'stopped': return 'alert-critical';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Unit Operations</h1>
          <p className="text-muted-foreground">Manufacturing Unit 1 - Overview and Performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="alert-success">
            Unit Status: Operational
          </Badge>
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
              {stat.target && (
                <p className="text-xs text-muted-foreground">Target: {stat.target}</p>
              )}
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production Lines Overview */}
      <Card className="industrial-card">
        <CardHeader>
          <CardTitle className="text-foreground">Production Lines Status</CardTitle>
          <CardDescription>Real-time status of all production lines in the unit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productionLines.map((line) => (
              <div key={line.name} className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{line.name}</h4>
                  <Badge className={getStatusColor(line.status)}>
                    {line.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Manager:</span>
                    <span className="text-foreground">{line.manager}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="text-foreground">{line.efficiency}%</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Today's Output:</span>
                    <span className="text-foreground">{line.output} units</span>
                  </div>
                  
                  {/* Efficiency Bar */}
                  <div className="w-full bg-secondary rounded-full h-2 mt-3">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${line.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Production Trend</CardTitle>
            <CardDescription>Last 7 days production output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[85, 92, 88, 95, 89, 96, 94].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-primary rounded-t-sm w-8 transition-all duration-300 hover:bg-primary-hover"
                    style={{ height: `${(value / 100) * 200}px` }}
                  />
                  <span className="text-xs text-muted-foreground mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Quality Metrics</CardTitle>
            <CardDescription>Quality control statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Defect Rate</span>
                <span className="text-lg font-semibold text-foreground">1.3%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.7%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">First Pass Yield</span>
                <span className="text-lg font-semibold text-foreground">96.8%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96.8%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                <span className="text-lg font-semibold text-foreground">4.8/5</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}