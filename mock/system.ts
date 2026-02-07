export interface QualityMetricRow {
  id: string;
  product: string;
  project: string;
  version: string;
  team: string;
  module: string;
  feature: string;
  
  // Metrics
  removalRate: number; // Percentage 0-100
  effectiveTD: number;
  reopenCount: number;
  reopenUsers: number;
  changeTriggerRate: number; // Percentage
  changeTriggerCount: number;
  uncoveredRate: number;
  uncoveredCount: number;
  leakageRate: number; // Percentage
  leakageCount: number;
  legacyRate: number;
  legacyCount: number;
  diValue: number;
  haltCount: number;
  betaWeighted: number;
  betaP1: number;
  fixCycle: number;
  closedTD: number;
}

// --- MOCK DATA CONSTRUCTION ---
export const MOCK_QUALITY_DATASET: QualityMetricRow[] = [
  { id: '1', product: 'XDR', project: 'XDR 核心引擎升级', version: 'v3.0', team: '核心引擎组', module: '威胁检测', feature: 'AI模型', removalRate: 99.5, effectiveTD: 45, reopenCount: 1, reopenUsers: 1, changeTriggerRate: 0.2, changeTriggerCount: 1, uncoveredRate: 0, uncoveredCount: 0, leakageRate: 0.01, leakageCount: 1, legacyRate: 0.5, legacyCount: 2, diValue: 12, haltCount: 0, betaWeighted: 2, betaP1: 0, fixCycle: 2.5, closedTD: 120 },
  { id: '2', product: 'XDR', project: 'XDR 核心引擎升级', version: 'v3.0', team: '数据平台组', module: '日志存储', feature: 'ES集群', removalRate: 98.2, effectiveTD: 30, reopenCount: 3, reopenUsers: 2, changeTriggerRate: 0.5, changeTriggerCount: 2, uncoveredRate: 1.5, uncoveredCount: 5, leakageRate: 0.05, leakageCount: 0, legacyRate: 1.2, legacyCount: 8, diValue: 25, haltCount: 1, betaWeighted: 5, betaP1: 0, fixCycle: 4.0, closedTD: 85 },
  { id: '3', product: 'XDR', project: 'XDR 管理中心 UI', version: 'v2.5', team: '前端交互组', module: '控制台', feature: '大屏展示', removalRate: 92.0, effectiveTD: 25, reopenCount: 8, reopenUsers: 4, changeTriggerRate: 1.8, changeTriggerCount: 5, uncoveredRate: 5.0, uncoveredCount: 12, leakageRate: 0.1, leakageCount: 2, legacyRate: 2.5, legacyCount: 15, diValue: 45, haltCount: 2, betaWeighted: 10, betaP1: 1, fixCycle: 5.5, closedTD: 60 },
  { id: '4', product: 'HCI', project: 'HCI 超融合 6.9', version: 'v6.9', team: '存储虚拟化', module: 'vSAN', feature: '纠删码', removalRate: 99.8, effectiveTD: 120, reopenCount: 0, reopenUsers: 0, changeTriggerRate: 0.05, changeTriggerCount: 0, uncoveredRate: 0.5, uncoveredCount: 2, leakageRate: 0.0, leakageCount: 0, legacyRate: 0.8, legacyCount: 5, diValue: 8, haltCount: 0, betaWeighted: 0, betaP1: 0, fixCycle: 3.0, closedTD: 250 },
  { id: '5', product: 'HCI', project: 'HCI 超融合 6.9', version: 'v6.9', team: '计算虚拟化', module: 'Hypervisor', feature: '热迁移', removalRate: 99.0, effectiveTD: 80, reopenCount: 2, reopenUsers: 1, changeTriggerRate: 0.3, changeTriggerCount: 1, uncoveredRate: 1.0, uncoveredCount: 8, leakageRate: 0.02, leakageCount: 1, legacyRate: 1.5, legacyCount: 10, diValue: 20, haltCount: 0, betaWeighted: 8, betaP1: 0, fixCycle: 3.5, closedTD: 180 },
  { id: '6', product: 'AC', project: 'AC 行为管理 v13', version: 'v13.0', team: '应用识别组', module: 'DPI引擎', feature: '规则库', removalRate: 96.5, effectiveTD: 60, reopenCount: 5, reopenUsers: 2, changeTriggerRate: 0.8, changeTriggerCount: 3, uncoveredRate: 2.0, uncoveredCount: 10, leakageRate: 0.08, leakageCount: 3, legacyRate: 3.0, legacyCount: 25, diValue: 50, haltCount: 1, betaWeighted: 15, betaP1: 2, fixCycle: 6.0, closedTD: 110 },
];

