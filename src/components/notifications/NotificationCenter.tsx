import { X, Bell, AlertTriangle, Info, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationCenter({ open, onClose }: NotificationCenterProps) {
  const notifications = [
    {
      id: '1',
      type: 'alert',
      severity: 'critical',
      title: 'Critical Temperature Alert',
      message: 'Machine M-003 temperature exceeded threshold (85°C)',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'message',
      severity: 'info',
      title: 'Message from Floor Manager',
      message: 'Great work on maintaining quality standards today!',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'system',
      severity: 'warning',
      title: 'Maintenance Scheduled',
      message: 'Machine M-003 scheduled for routine maintenance tomorrow at 2 PM',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'announcement',
      severity: 'success',
      title: 'Production Target Achieved',
      message: 'Congratulations! Daily production target exceeded by 7%',
      timestamp: '5 hours ago',
      read: true
    },
    {
      id: '5',
      type: 'alert',
      severity: 'warning',
      title: 'Speed Variance Detected',
      message: 'Machine M-007 operating below optimal speed (45 RPM)',
      timestamp: '6 hours ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string, severity: string) => {
    switch (type) {
      case 'alert':
        return severity === 'critical' ? 
          <AlertTriangle className="h-4 w-4 text-red-500" /> :
          <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'system':
        return <Info className="h-4 w-4 text-gray-500" />;
      case 'announcement':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/20';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/20';
      case 'success': return 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20';
      case 'info': return 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/20';
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-notification">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-foreground">Notifications</CardTitle>
              <CardDescription>
                Recent alerts, messages, and system updates
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-2 p-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-l-4 p-4 rounded-lg transition-all duration-200 hover:shadow-sm ${getSeverityColor(notification.severity)} ${
                      !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type, notification.severity)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-semibold text-foreground">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}