import { Building, Users, TrendingUp, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PlantHeadDashboard() {
  const plantStats = [
    {
      title: 'Total Production',
      value: '4,847',
      target: '4,500',
      change: '+7.7% vs target',
      icon: Building,
      color: 'text-green-500'
    },
    {
      title: 'Plant Efficiency',
      value: '94.8%',
      change: '+2.3% this month',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      title: 'Total Workforce',
      value: '247',
      change: '12 units active',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      title: 'Revenue Impact',
      value: '$2.4M',
      change: '+15% this quarter',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  const units = [
    { 
      name: 'Manufacturing Unit 1', 
      status: 'optimal', 
      efficiency: 96, 
      production: 1247, 
      workforce: 89,
      manager: 'Mike Wilson'
    },
    { 
      name: 'Manufacturing Unit 2', 
      status: 'good', 
      efficiency: 92, 
      production: 1156, 
      workforce: 83,
      manager: 'Anna Chen'
    },
    { 
      name: 'Manufacturing Unit 3', 
      status: 'maintenance', 
      efficiency: 0, 
      production: 0, 
      workforce: 75,
      manager: 'Robert Kim'
    }
  ];

  const kpis = [
    { metric: 'Overall Equipment Effectiveness (OEE)', value: '87.3%', target: '85%', status: 'exceeding' },
    { metric: 'On-Time Delivery', value: '96.2%', target: '95%', status: 'exceeding' },
    { metric: 'Safety Incidents', value: '0', target: '0', status: 'meeting' },
    { metric: 'Energy Efficiency', value: '92.1%', target: '90%', status: 'exceeding' },
    { metric: 'Customer Satisfaction', value: '4.7/5', target: '4.5/5', status: 'exceeding' },
    { metric: 'Cost per Unit', value: '$12.4', target: '$13.0', status: 'exceeding' }
  ];

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'alert-success';
      case 'good': return 'bg-blue-500';
      case 'maintenance': return 'alert-warning';
      case 'critical': return 'alert-critical';
      default: return 'bg-gray-500';
    }
  };

  const getKPIStatusIcon = (status: string) => {
    return status === 'exceeding' || status === 'meeting' ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plant Operations</h1>
          <p className="text-muted-foreground">Comprehensive overview of entire facility operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="alert-success">
            Plant Status: Operational
          </Badge>
        </div>
      </div>

      {/* Plant-wide Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plantStats.map((stat) => (
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

      {/* Manufacturing Units Overview */}
      <Card className="industrial-card">
        <CardHeader>
          <CardTitle className="text-foreground">Manufacturing Units Status</CardTitle>
          <CardDescription>Real-time status of all manufacturing units</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {units.map((unit) => (
              <div key={unit.name} className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{unit.name}</h4>
                  <Badge className={getUnitStatusColor(unit.status)}>
                    {unit.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unit Head:</span>
                    <span className="text-foreground">{unit.manager}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="text-foreground">{unit.efficiency}%</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Production:</span>
                    <span className="text-foreground">{unit.production} units</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Workforce:</span>
                    <span className="text-foreground">{unit.workforce} people</span>
                  </div>
                  
                  {/* Efficiency Bar */}
                  <div className="w-full bg-secondary rounded-full h-2 mt-3">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${unit.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <Card className="industrial-card">
        <CardHeader>
          <CardTitle className="text-foreground">Key Performance Indicators</CardTitle>
          <CardDescription>Plant-wide KPIs and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{kpi.metric}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-foreground">{kpi.value}</span>
                    <span className="text-xs text-muted-foreground">/ {kpi.target}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getKPIStatusIcon(kpi.status)}
                  <span className="text-xs text-muted-foreground capitalize">{kpi.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Trends</CardTitle>
            <CardDescription>Production and efficiency trends over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-1">
              {[88, 91, 89, 93, 90, 95, 92, 94, 96, 93, 95, 94].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-gradient-to-t from-primary to-primary-hover rounded-t-sm w-6 transition-all duration-300"
                    style={{ height: `${(value / 100) * 200}px` }}
                  />
                  <span className="text-xs text-muted-foreground mt-2 rotate-45 origin-top-left">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="text-foreground">Cost Analysis</CardTitle>
            <CardDescription>Operational cost breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Raw Materials', amount: '$1.2M', percentage: 48 },
                { category: 'Labor Costs', amount: '$720K', percentage: 29 },
                { category: 'Energy', amount: '$380K', percentage: 15 },
                { category: 'Maintenance', amount: '$200K', percentage: 8 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                    <span className="text-sm font-semibold text-foreground">{item.amount}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}