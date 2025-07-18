import { Bell, Settings, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onNotificationsClick: () => void;
  notificationCount: number;
}

export function Header({ onNotificationsClick, notificationCount }: HeaderProps) {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'System Administrator';
      case 'floor_manager': return 'Floor Manager';
      case 'unit_head': return 'Unit Head';
      case 'plant_head': return 'Plant Head';
      case 'worker': return 'Operator';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'floor_manager': return 'bg-blue-500';
      case 'unit_head': return 'bg-green-500';
      case 'plant_head': return 'bg-orange-500';
      case 'worker': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">SteelForge Analytics</h1>
            <p className="text-xs text-muted-foreground">Performance Monitoring System</p>
          </div>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsClick}
          className="relative hover:bg-secondary"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs notification-badge"
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 hover:bg-secondary px-3">
              <div className={`w-8 h-8 rounded-full ${getRoleColor(user?.role || '')} flex items-center justify-center`}>
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{getRoleDisplayName(user?.role || '')}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                {user?.workerId && (
                  <p className="text-xs text-muted-foreground">Worker ID: {user.workerId}</p>
                )}
                {user?.department && (
                  <p className="text-xs text-muted-foreground">Dept: {user.department}</p>
                )}
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-secondary text-destructive focus:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}