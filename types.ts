
export type ViewMode = 'portfolio-dashboard' | 'system-dashboard' | 'system-map' | 'product-dashboard' | 'project-detail' | 'personal-dashboard';

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
  isHilltop?: boolean;
  phase?: 'TR1' | 'TR2' | 'TR3' | 'TR4' | 'TR5' | 'TR6' | 'DCP2' | 'DCP3' | 'DCP4' | 'DCP5';
  
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

export interface RosterMember {
  id: string; // 5-digit string
  name: string;
  system: string;
  productLine: string;
  team: string;
  function: '研发' | '测试' | '规划' | '安全运营' | '技术支持';
  level: number; // 4-10
  projects: string[];
  role: string;
  direction: string;
  keyProject: boolean;
  employment: '正式员工' | '合作方';
}
