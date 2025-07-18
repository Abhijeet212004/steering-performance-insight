import { UserRole } from './auth';

export interface MachineData {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'running' | 'idle' | 'maintenance' | 'error';
  temperature: number;
  pressure: number;
  speed: number;
  efficiency: number;
  lastUpdate: string;
}

export interface Alert {
  id: string;
  type: 'temperature' | 'pressure' | 'speed' | 'efficiency' | 'breakdown';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  machineId: string;
  machineName: string;
  workerId?: string;
  workerName?: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'message' | 'system' | 'announcement';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  targetRole?: UserRole;
  fromUserId?: string;
  fromUserName?: string;
}

export interface ProductionMetrics {
  steeringCount: number;
  targetCount: number;
  efficiency: number;
  averageTime: number;
  defectRate: number;
  timestamp: string;
}

export interface WorkerMessage {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
  acknowledged: boolean;
}