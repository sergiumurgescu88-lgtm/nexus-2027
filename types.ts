
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  LOGISTICS = 'LOGISTICS',
  CLIMATE = 'CLIMATE',
  WORKFORCE = 'WORKFORCE',
  FINANCE = 'FINANCE',
  CUSTOMER = 'CUSTOMER',
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
  COMPLIANCE = 'COMPLIANCE'
}

export interface Metric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  percentChange?: string;
}

export interface Task {
  id: string;
  title: string;
  worker: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
}

export interface AIResponse {
  text: string;
  type: 'insight' | 'alert' | 'recommendation';
}
