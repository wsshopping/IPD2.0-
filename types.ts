
export type ViewMode = 'portfolio-dashboard' | 'system-map' | 'product-dashboard' | 'project-detail';

export interface Metric {
  id: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  unit?: string;
  description?: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  subName?: string; // e.g. "立项", "用户需求"
  status: 'completed' | 'current' | 'pending' | 'delayed';
  plannedDate?: string;
  actualDate?: string;
  metrics: Metric[];
}

export interface Project {
  id: string;
  name: string;
  manager: string;
  progress: number;
  status: 'normal' | 'risk' | 'warning';
  
  // New fields for the complex table
  projectSet?: string;      // 项目集
  battlefield?: string;     // 战场
  headcount?: number;       // 人力人数
  headcountPercentage?: number; // 人力占比
  manpowerDeviation?: string;   // 人力偏差
  
  businessMetrics: Metric[]; // Blue cards
  resultMetrics: Metric[]; // Yellow cards
  phases: ProjectPhase[];
}
