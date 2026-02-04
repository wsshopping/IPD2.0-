import React, { useState, useMemo } from 'react';
import { Network, Layers, Server, ShieldCheck, Zap, ChevronRight, Activity, Users, Box, ArrowRight, X, Search, Filter, AlertTriangle, CheckCircle2, Briefcase, TrendingUp, LayoutGrid, Flag, Clock, AlertCircle, BrainCircuit, Cpu, Code2, Bug, Repeat, GitBranch, Scale, Microscope, FileWarning, FilterX, Archive, PauseCircle, Star, Hourglass, List, ChevronDown, RefreshCw } from 'lucide-react';

interface SystemLevelDashboardProps {
  onSelectProductLine: (id: string, name: string) => void;
  systemId?: string; // 'security' | 'cloud' | 'platform' | 'aibg'
  onSelectSystem?: (id: string) => void;
}

// --- Data Types for Quality Module ---
interface QualityMetricRow {
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
const MOCK_QUALITY_DATASET: QualityMetricRow[] = [
  { id: '1', product: 'XDR', project: 'XDR 核心引擎升级', version: 'v3.0', team: '核心引擎组', module: '威胁检测', feature: 'AI模型', removalRate: 99.5, effectiveTD: 45, reopenCount: 1, reopenUsers: 1, changeTriggerRate: 0.2, changeTriggerCount: 1, uncoveredRate: 0, uncoveredCount: 0, leakageRate: 0.01, leakageCount: 1, legacyRate: 0.5, legacyCount: 2, diValue: 12, haltCount: 0, betaWeighted: 2, betaP1: 0, fixCycle: 2.5, closedTD: 120 },
  { id: '2', product: 'XDR', project: 'XDR 核心引擎升级', version: 'v3.0', team: '数据平台组', module: '日志存储', feature: 'ES集群', removalRate: 98.2, effectiveTD: 30, reopenCount: 3, reopenUsers: 2, changeTriggerRate: 0.5, changeTriggerCount: 2, uncoveredRate: 1.5, uncoveredCount: 5, leakageRate: 0.05, leakageCount: 0, legacyRate: 1.2, legacyCount: 8, diValue: 25, haltCount: 1, betaWeighted: 5, betaP1: 0, fixCycle: 4.0, closedTD: 85 },
  { id: '3', product: 'XDR', project: 'XDR 管理中心 UI', version: 'v2.5', team: '前端交互组', module: '控制台', feature: '大屏展示', removalRate: 92.0, effectiveTD: 25, reopenCount: 8, reopenUsers: 4, changeTriggerRate: 1.8, changeTriggerCount: 5, uncoveredRate: 5.0, uncoveredCount: 12, leakageRate: 0.1, leakageCount: 2, legacyRate: 2.5, legacyCount: 15, diValue: 45, haltCount: 2, betaWeighted: 10, betaP1: 1, fixCycle: 5.5, closedTD: 60 },
  { id: '4', product: 'HCI', project: 'HCI 超融合 6.9', version: 'v6.9', team: '存储虚拟化', module: 'vSAN', feature: '纠删码', removalRate: 99.8, effectiveTD: 120, reopenCount: 0, reopenUsers: 0, changeTriggerRate: 0.05, changeTriggerCount: 0, uncoveredRate: 0.5, uncoveredCount: 2, leakageRate: 0.0, leakageCount: 0, legacyRate: 0.8, legacyCount: 5, diValue: 8, haltCount: 0, betaWeighted: 0, betaP1: 0, fixCycle: 3.0, closedTD: 250 },
  { id: '5', product: 'HCI', project: 'HCI 超融合 6.9', version: 'v6.9', team: '计算虚拟化', module: 'Hypervisor', feature: '热迁移', removalRate: 99.0, effectiveTD: 80, reopenCount: 2, reopenUsers: 1, changeTriggerRate: 0.3, changeTriggerCount: 1, uncoveredRate: 1.0, uncoveredCount: 8, leakageRate: 0.02, leakageCount: 1, legacyRate: 1.5, legacyCount: 10, diValue: 20, haltCount: 0, betaWeighted: 8, betaP1: 0, fixCycle: 3.5, closedTD: 180 },
  { id: '6', product: 'AC', project: 'AC 行为管理 v13', version: 'v13.0', team: '应用识别组', module: 'DPI引擎', feature: '规则库', removalRate: 96.5, effectiveTD: 60, reopenCount: 5, reopenUsers: 2, changeTriggerRate: 0.8, changeTriggerCount: 3, uncoveredRate: 2.0, uncoveredCount: 10, leakageRate: 0.08, leakageCount: 3, legacyRate: 3.0, legacyCount: 25, diValue: 50, haltCount: 1, betaWeighted: 15, betaP1: 2, fixCycle: 6.0, closedTD: 110 },
];

// Reusable Widget
const DashboardWidget: React.FC<{ 
  title: string; 
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ title, icon, children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col transition-all duration-200 ${className} ${onClick ? 'cursor-pointer hover:shadow-md hover:border-indigo-300 group' : ''}`}
  >
    <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
      {icon && <span className="text-indigo-600 group-hover:scale-110 transition-transform">{icon}</span>}
      <h3 className="font-bold text-slate-700 text-sm group-hover:text-indigo-700">{title}</h3>
      {onClick && <ChevronRight className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
    </div>
    <div className="flex-1 min-h-0 flex flex-col justify-center pointer-events-none">
      {children}
    </div>
  </div>
);

// Drill Down Modal
const SystemDrillDownModal: React.FC<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}> = ({ title, isOpen, onClose, children, widthClass = "max-w-5xl" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`bg-white rounded-xl shadow-2xl w-full ${widthClass} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
             <div className="w-1 h-5 bg-indigo-600 rounded-full" />
             <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        {/* Only show default toolbar if NOT in quality view (quality has its own custom filter bar) */}
        {!title.includes('质量') && (
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex gap-2">
            <div className="relative">
                <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
                <input type="text" placeholder="在体系内搜索..." className="pl-8 pr-4 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-400 w-64" />
            </div>
            <button className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:text-indigo-600">
                <Filter className="w-3 h-3" /> 筛选
            </button>
            </div>
        )}

        <div className="flex-1 overflow-auto p-4 bg-slate-50/50">
          {children}
        </div>
        <div className="p-3 border-t border-slate-100 text-xs text-slate-400 flex justify-end bg-slate-50 rounded-b-xl">
           IPD 质量度量系统 v2.4 (System Level)
        </div>
      </div>
    </div>
  );
};

export const SystemLevelDashboard: React.FC<SystemLevelDashboardProps> = ({ onSelectProductLine, systemId = 'security', onSelectSystem }) => {
  const [activeDrillDown, setActiveDrillDown] = useState<string | null>(null);

  // --- Quality Filter State ---
  const [qualityFilters, setQualityFilters] = useState({
    product: 'all',
    project: 'all',
    version: 'all',
    team: 'all',
    module: 'all',
    feature: 'all'
  });

  // Define data for each system
  const systemData = {
      security: {
          name: '大安全体系 (Big Security)',
          manager: '安全总',
          count: '4 产线',
          headcount: 1200,
          projectStats: { total: 45, normal: 38, warning: 5, risk: 2 },
          milestones: [
            { name: 'XDR v3.0 发布', date: '5天后', type: 'TR6 验收' },
            { name: '跨网关数据同步', date: '2周后', type: 'TR5 验证' }
          ],
          lines: [
              { id: 'xdr', name: 'XDR 产品线', desc: 'Extended Detection and Response', manager: '张三', revenue: '¥ 320', health: '9.4', contrib: '高 (核心引擎)', headcount: 350, focus: '核心引擎攻关' },
              { id: 'ai-sec', name: '保护 AI 产品线', desc: 'AI Security Guard', manager: '李四', revenue: '¥ 80', health: '8.8', contrib: '中 (创新)', headcount: 150, focus: '新赛道探索' },
              { id: 'ac', name: 'AC 产品线', desc: 'Access Control', manager: '王五', revenue: '¥ 450', health: '9.0', contrib: '高 (现金牛)', headcount: 400, focus: '存量经营' },
              { id: 'af', name: 'AF 产品线', desc: 'Next-Gen Firewall', manager: '赵六', revenue: '¥ 600', health: '9.2', contrib: '高 (基石)', headcount: 300, focus: '性能优化' },
          ]
      },
      cloud: {
          name: '大云体系 (Big Cloud)',
          manager: '云总',
          count: '3 产线',
          headcount: 800,
          projectStats: { total: 32, normal: 25, warning: 4, risk: 3 },
          milestones: [
            { name: 'HCI 6.9.0', date: '今日', type: 'DCP5 上市' },
            { name: 'RDS 数据库池化', date: '1个月后', type: 'TR4 测试' }
          ],
           lines: [
              { id: 'managed-cloud', name: '托管云产品线', desc: 'Managed Cloud Services', manager: '钱七', revenue: '¥ 200', health: '8.5', contrib: '高 (增长)', headcount: 300, focus: '市场扩张' },
              { id: 'hci', name: 'HCI 产品线', desc: 'Hyper-Converged Infrastructure', manager: '孙八', revenue: '¥ 500', health: '9.1', contrib: '高 (基石)', headcount: 350, focus: '国产化适配' },
              { id: 'ad', name: 'AD 产品线', desc: 'Application Delivery', manager: '周九', revenue: '¥ 150', health: '8.7', contrib: '中 (组件)', headcount: 150, focus: '功能完善' },
          ]
      },
      platform: {
          name: '研发平台体系 (R&D Platform)',
          manager: '平台总',
          count: '3 部门',
          headcount: 450,
          projectStats: { total: 18, normal: 16, warning: 2, risk: 0 },
          milestones: [
            { name: '天问大模型 v2', date: '3天后', type: 'DCP4 Beta' },
            { name: 'DevOps 流水线', date: '1周后', type: '灰度升级' }
          ],
           lines: [
              { id: 'fengyun', name: '风云 AI', desc: 'AI Innovation Lab', manager: '吴十', revenue: '-', health: '8.2', contrib: '高 (技术预研)', headcount: 100, focus: '算法研究' },
              { id: 'tianwen', name: '天问 AI', desc: 'Large Model Engineering', manager: '郑十一', revenue: '-', health: '8.9', contrib: '高 (效能赋能)', headcount: 150, focus: '工具链开发' },
              { id: 'central', name: '中央平台部', desc: 'Common Infrastructure', manager: '王十二', revenue: '-', health: '9.5', contrib: '高 (底座)', headcount: 200, focus: '高可用架构' },
          ]
      },
      aibg: {
          name: 'AI 体系 (AI BG)',
          manager: '首席科学家',
          count: '2 产线',
          headcount: 600,
          projectStats: { total: 15, normal: 10, warning: 4, risk: 1 },
          milestones: [
            { name: '数字人 v3.0 发布', date: '2周后', type: 'TR6 验收' },
            { name: '机器人抓取算法 Gen2', date: '1个月后', type: 'TR4 验证' }
          ],
           lines: [
              { id: 'digital-human', name: '销售数字人产品线', desc: 'Sales Digital Human', manager: '张数字', revenue: '¥ 120', health: '9.2', contrib: '高 (变现)', headcount: 350, focus: '多模态交互' },
              { id: 'embodied-ai', name: '具身智能产品线', desc: 'Embodied AI / Robotics', manager: '李机器人', revenue: '-', health: '8.8', contrib: '高 (未来)', headcount: 250, focus: '端侧大模型' },
          ]
      }
  };

  const currentSystemData = systemData[systemId as keyof typeof systemData] || systemData.security;

  // Helper icons
  const StarIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );

  const renderDrillDownContent = () => {
      switch (activeDrillDown) {
          case 'active_projects':
              return (
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                        <tr>
                            <th className="p-4">项目名称</th>
                            <th className="p-4">所属产线</th>
                            <th className="p-4">当前阶段</th>
                            <th className="p-4">健康状态</th>
                            <th className="p-4">进度偏差</th>
                            <th className="p-4">近期里程碑</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {/* Mock data for demonstration */}
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">XDR 威胁检测引擎 v3.0</td>
                            <td className="p-4 text-slate-600">XDR 产品线</td>
                            <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">TR6 验收</span></td>
                            <td className="p-4"><span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-4 h-4"/> 正常</span></td>
                            <td className="p-4 text-slate-500">0%</td>
                            <td className="p-4 text-xs text-slate-500">发布评审 (5天后)</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">AI 恶意代码识别模型</td>
                            <td className="p-4 text-slate-600">保护 AI 产品线</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">TR4 验证</span></td>
                            <td className="p-4"><span className="flex items-center gap-1 text-amber-600 font-bold"><AlertTriangle className="w-4 h-4"/> 预警</span></td>
                            <td className="p-4 text-amber-600">-5%</td>
                            <td className="p-4 text-xs text-slate-500">性能基线测试</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">AC 行为审计增强包</td>
                            <td className="p-4 text-slate-600">AC 产品线</td>
                            <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">DCP2 立项</span></td>
                            <td className="p-4"><span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-4 h-4"/> 正常</span></td>
                            <td className="p-4 text-slate-500">0%</td>
                            <td className="p-4 text-xs text-slate-500">需求评审</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">下一代防火墙硬件适配</td>
                            <td className="p-4 text-slate-600">AF 产品线</td>
                            <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">TR2 系统设计</span></td>
                            <td className="p-4"><span className="flex items-center gap-1 text-red-600 font-bold"><AlertCircle className="w-4 h-4"/> 风险</span></td>
                            <td className="p-4 text-red-600">-15%</td>
                            <td className="p-4 text-xs text-slate-500">供应链物料回货</td>
                        </tr>
                    </tbody>
                 </table>
              );
          case 'manpower':
               // Dynamic mock data for AI stats based on system
               // Higher AI ratio for AI BG
               const aiRatio = systemId === 'aibg' ? 0.85 : (systemId === 'platform' ? 0.45 : systemId === 'security' ? 0.18 : 0.12);
               const totalAi = Math.floor(currentSystemData.headcount * aiRatio);
               const algoRatio = systemId === 'aibg' ? 0.7 : (systemId === 'platform' ? 0.6 : 0.35); // AI BG has high researcher ratio
               const algoCount = Math.floor(totalAi * algoRatio);
               const engCount = totalAi - algoCount;

              return (
                <div className="space-y-6 p-4">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <div className="text-indigo-600 text-xs font-bold uppercase">体系总编制 (HC)</div>
                            <div className="text-2xl font-bold text-indigo-900 mt-1">{currentSystemData.headcount}</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-blue-600 text-xs font-bold uppercase">实际在岗</div>
                            <div className="text-2xl font-bold text-blue-900 mt-1">{Math.floor(currentSystemData.headcount * 0.96)}</div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                            <div className="text-emerald-600 text-xs font-bold uppercase">人均产出</div>
                            <div className="text-2xl font-bold text-emerald-900 mt-1">¥ 210w</div>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <div className="text-amber-600 text-xs font-bold uppercase">空缺率</div>
                            <div className="text-2xl font-bold text-amber-900 mt-1">4.0%</div>
                        </div>
                    </div>

                    {/* AI Talent Structure (New Section) */}
                    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <BrainCircuit className="w-5 h-5 text-violet-600" />
                            <h4 className="font-bold text-slate-800">AI 人才结构透视 (AI Talent Structure)</h4>
                            <span className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5 rounded-full font-bold ml-2">
                                渗透率 {Math.round(aiRatio * 100)}%
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6 relative z-10">
                            {/* Total AI */}
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">AI 专职人才总数</span>
                                <span className="text-2xl font-bold text-slate-800">{totalAi} <span className="text-xs font-normal text-slate-400">人</span></span>
                            </div>
                            
                            {/* Algorithm Breakdown */}
                            <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border border-violet-100/50">
                                <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
                                    <BrainCircuit className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">AI 算法 (Algorithm)</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-slate-800">{algoCount}</span>
                                        <span className="text-xs text-slate-400">占比 {Math.round((algoCount/totalAi)*100)}%</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">模型训练 / 算法研究</div>
                                </div>
                            </div>

                            {/* Engineering Breakdown */}
                            <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border border-blue-100/50">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Cpu className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">AI 工程 (Engineering)</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-slate-800">{engCount}</span>
                                        <span className="text-xs text-slate-400">占比 {Math.round((engCount/totalAi)*100)}%</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">MLOps / 推理优化 / 平台</div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Decoration */}
                        <div className="absolute right-0 top-0 w-32 h-32 bg-violet-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                    </div>

                    {/* Department Table */}
                    <table className="w-full text-left text-sm border border-slate-200 rounded-lg overflow-hidden">
                        <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                            <tr>
                                <th className="p-4">产线/部门名称</th>
                                <th className="p-4 text-right">编制 (HC)</th>
                                <th className="p-4 text-right">占比</th>
                                <th className="p-4 text-right">饱和度</th>
                                <th className="p-4">投入重心</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {currentSystemData.lines.map((line, idx) => (
                                <tr key={idx}>
                                    <td className="p-4 font-bold text-slate-700">{line.name}</td>
                                    <td className="p-4 text-right text-slate-600">{line.headcount}</td>
                                    <td className="p-4 text-right text-slate-600">{Math.round((line.headcount / currentSystemData.headcount) * 100)}%</td>
                                    <td className="p-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">98%</span></td>
                                    <td className="p-4 text-xs text-slate-500">{line.focus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              );
          case 'quality':
               // 1. FILTERING LOGIC
               const filteredData = MOCK_QUALITY_DATASET.filter(row => {
                  if (qualityFilters.product !== 'all' && row.product !== qualityFilters.product) return false;
                  if (qualityFilters.project !== 'all' && row.project !== qualityFilters.project) return false;
                  if (qualityFilters.version !== 'all' && row.version !== qualityFilters.version) return false;
                  if (qualityFilters.team !== 'all' && row.team !== qualityFilters.team) return false;
                  if (qualityFilters.module !== 'all' && row.module !== qualityFilters.module) return false;
                  if (qualityFilters.feature !== 'all' && row.feature !== qualityFilters.feature) return false;
                  return true;
               });

               // 2. DYNAMIC AGGREGATION LOGIC
               const aggregates = {
                  removalRate: filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.removalRate, 0) / filteredData.length).toFixed(1) : '0.0',
                  effectiveTD: filteredData.reduce((acc, curr) => acc + curr.effectiveTD, 0),
                  reopenCount: filteredData.reduce((acc, curr) => acc + curr.reopenCount, 0),
                  reopenUsers: filteredData.reduce((acc, curr) => acc + curr.reopenUsers, 0),
                  changeTriggerRate: filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.changeTriggerRate, 0) / filteredData.length).toFixed(2) : '0.00',
                  changeTriggerCount: filteredData.reduce((acc, curr) => acc + curr.changeTriggerCount, 0),
                  uncoveredRate: filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.uncoveredRate, 0) / filteredData.length).toFixed(1) : '0.0',
                  uncoveredCount: filteredData.reduce((acc, curr) => acc + curr.uncoveredCount, 0),
                  leakageRate: filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.leakageRate, 0) / filteredData.length).toFixed(2) : '0.00',
                  leakageCount: filteredData.reduce((acc, curr) => acc + curr.leakageCount, 0),
                  legacyRate: filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.legacyRate, 0) / filteredData.length).toFixed(2) : '0.00',
                  legacyCount: filteredData.reduce((acc, curr) => acc + curr.legacyCount, 0),
                  diValue: filteredData.reduce((acc, curr) => acc + curr.diValue, 0),
                  haltCount: filteredData.reduce((acc, curr) => acc + curr.haltCount, 0),
                  betaWeighted: filteredData.reduce((acc, curr) => acc + curr.betaWeighted, 0),
                  betaP1: filteredData.reduce((acc, curr) => acc + curr.betaP1, 0),
                  fixCycle: filteredData.length > 0 ? (filteredData.reduce((acc, curr) => acc + curr.fixCycle, 0) / filteredData.length).toFixed(1) : '0.0',
                  closedTD: filteredData.reduce((acc, curr) => acc + curr.closedTD, 0),
               };

               // Helper for dynamic options
               const getOptions = (key: keyof QualityMetricRow) => {
                  return Array.from(new Set(MOCK_QUALITY_DATASET.map(item => item[key] as string))).sort();
               };

               return (
                <div className="space-y-6">

                   {/* DYNAMIC FILTER BAR */}
                   <div className="flex flex-wrap items-center bg-slate-50 border border-slate-200 rounded-lg p-2 gap-4 shadow-sm">
                        {[
                            { label: '产品', key: 'product', options: getOptions('product') },
                            { label: '项目', key: 'project', options: getOptions('project') },
                            { label: '版本', key: 'version', options: getOptions('version') },
                            { label: '团队', key: 'team', options: getOptions('team') },
                            { label: '功能模块', key: 'module', options: getOptions('module') },
                            { label: '业务特征', key: 'feature', options: getOptions('feature') }
                        ].map((f) => (
                            <div key={f.key} className="flex items-center gap-2 border-r border-slate-200 pr-4 last:border-0 last:pr-0">
                                <span className="text-xs font-bold text-slate-700">{f.label}</span>
                                <div className="relative">
                                    <select 
                                      className="appearance-none bg-white border border-slate-200 pl-3 pr-8 py-1.5 rounded text-xs text-slate-600 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-w-[120px] cursor-pointer shadow-sm"
                                      value={qualityFilters[f.key as keyof typeof qualityFilters]}
                                      onChange={(e) => setQualityFilters(prev => ({ ...prev, [f.key]: e.target.value }))}
                                    >
                                        <option value="all">无限制</option>
                                        {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                        
                        <button 
                          className="ml-auto text-xs text-blue-600 hover:underline px-2 flex items-center gap-1"
                          onClick={() => setQualityFilters({
                            product: 'all', project: 'all', version: 'all', team: 'all', module: 'all', feature: 'all'
                          })}
                        >
                          <RefreshCw className="w-3 h-3" /> 重置筛选
                        </button>
                    </div>

                   {/* Logic Banner */}
                   <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-lg flex items-start gap-3">
                       <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-full mt-0.5">
                          <BrainCircuit className="w-4 h-4" />
                       </div>
                       <div>
                          <h5 className="text-sm font-bold text-slate-700">体系质量度量逻辑 (System Quality Metric Logic)</h5>
                          <p className="text-xs text-slate-600 mt-1">
                             基于 IPD 全流程，通过<b>缺陷前移 (Shift Left)</b> 减少后期返工，监控<b>漏测率</b>与<b>覆盖率</b>确保测试有效性，并严格控制<b>历史遗留问题</b>与<b>变动风险</b>，实现全体系的质量闭环管理。
                          </p>
                       </div>
                   </div>

                   {/* DYNAMIC HEADER CARDS */}
                   <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                      {[
                        { label: '缺陷前移率', val: `${aggregates.removalRate}%`, icon: <TrendingUp className="w-4 h-4 text-blue-500"/>, color: 'border-blue-200', desc: `有效TD数 ${aggregates.effectiveTD}个`, bg: 'bg-white' },
                        { label: '多次reopen数', val: aggregates.reopenCount, icon: <Repeat className="w-4 h-4 text-amber-500"/>, color: 'border-amber-200', desc: `人数 ${aggregates.reopenUsers}人`, bg: 'bg-white' },
                        { label: '改动引发率', val: `${aggregates.changeTriggerRate}%`, icon: <GitBranch className="w-4 h-4 text-blue-500"/>, color: 'border-blue-200', desc: `引发数 ${aggregates.changeTriggerCount}个`, bg: 'bg-white' },
                        { label: '案例无覆盖率', val: aggregates.uncoveredRate, icon: <FileWarning className="w-4 h-4 text-amber-500"/>, color: 'border-amber-200', desc: `无覆盖数 ${aggregates.uncoveredCount}个`, bg: 'bg-white' },
                        { label: '漏测率', val: `${aggregates.leakageRate}%`, icon: <FilterX className="w-4 h-4 text-amber-500"/>, color: 'border-amber-200', desc: `漏测数 ${aggregates.leakageCount}个`, bg: 'bg-white' },
                        { label: '历史遗留问题率', val: `${aggregates.legacyRate}%`, icon: <Archive className="w-4 h-4 text-blue-500"/>, color: 'border-blue-200', desc: `遗留数 ${aggregates.legacyCount}个`, bg: 'bg-white' },
                        { label: '挂起DI值', val: aggregates.diValue, icon: <PauseCircle className="w-4 h-4 text-blue-500"/>, color: 'border-blue-200', desc: `Halt数 ${aggregates.haltCount}个`, bg: 'bg-white' },
                        { label: 'Beta客户问题', val: aggregates.betaWeighted, icon: <Star className="w-4 h-4 text-red-500"/>, color: 'border-red-200', desc: `P1问题 ${aggregates.betaP1}个`, bg: 'bg-white' },
                        { label: '缺陷平均生命周期', val: aggregates.fixCycle, icon: <Hourglass className="w-4 h-4 text-blue-500"/>, color: 'border-blue-200', desc: `结束有效TD ${aggregates.closedTD}个`, bg: 'bg-white' },
                      ].map((card, i) => (
                         <div key={i} className={`rounded-lg p-3 border shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow ${card.color} ${card.bg}`}>
                            <div className="flex flex-col items-center mb-2">
                               <div className="mb-2 p-1.5 rounded-full bg-slate-50">{card.icon}</div>
                               <div className="text-[11px] text-slate-500 font-medium text-center leading-tight h-8 flex items-center">{card.label}</div>
                            </div>
                            <div className="text-xl font-bold text-slate-800 text-center tracking-tight">{card.val}</div>
                            <div className="text-[9px] text-slate-400 text-center mt-2 pt-2 border-t border-slate-100 w-full truncate">{card.desc}</div>
                         </div>
                      ))}
                   </div>

                   {/* DYNAMIC DETAILED GRID TABLE */}
                   <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                       <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <h4 className="font-bold text-slate-700 text-sm">筛选结果列表 (Filtered Results)</h4>
                          <div className="text-xs text-slate-500">共找到 {filteredData.length} 条数据</div>
                       </div>
                       <div className="overflow-x-auto">
                           <table className="w-full text-xs text-left min-w-[1200px]">
                              <thead className="bg-[#6B8ABC] text-white font-medium">
                                 <tr>
                                    <th className="p-3 border-r border-blue-400/30 w-48">团队/模块</th>
                                    <th colSpan={2} className="p-3 text-center border-r border-blue-400/30 bg-[#5A79AB]">缺陷前移率</th>
                                    <th colSpan={2} className="p-3 text-center border-r border-blue-400/30 bg-[#5A79AB]">reopen</th>
                                    <th colSpan={3} className="p-3 text-center border-r border-blue-400/30 bg-[#5A79AB]">改动引发</th>
                                    <th colSpan={2} className="p-3 text-center border-r border-blue-400/30 bg-[#5A79AB]">案例覆盖</th>
                                    <th colSpan={2} className="p-3 text-center bg-[#5A79AB]">漏测</th>
                                 </tr>
                                 <tr className="bg-[#7D9AC9]">
                                    <th className="p-2 border-r border-blue-400/30 pl-3">名称 (Team - Module)</th>
                                    <th className="p-2 text-center border-r border-blue-400/30">缺陷前移率 <StarIcon className="w-3 h-3 inline text-yellow-300"/></th>
                                    <th className="p-2 text-center border-r border-blue-400/30">有效TD数</th>
                                    <th className="p-2 text-center border-r border-blue-400/30">多次reopen数 <StarIcon className="w-3 h-3 inline text-yellow-300"/></th>
                                    <th className="p-2 text-center border-r border-blue-400/30">责任人人数</th>
                                    <th className="p-2 text-center border-r border-blue-400/30">改动引发率 <StarIcon className="w-3 h-3 inline text-yellow-300"/></th>
                                    <th className="p-2 text-center border-r border-blue-400/30">多次改动人数</th>
                                    <th className="p-2 text-center border-r border-blue-400/30">改动引发数</th>
                                    <th className="p-2 text-center border-r border-blue-400/30">无覆盖率 <StarIcon className="w-3 h-3 inline text-yellow-300"/></th>
                                    <th className="p-2 text-center border-r border-blue-400/30">无覆盖数</th>
                                    <th className="p-2 text-center border-r border-blue-400/30">漏测率 <StarIcon className="w-3 h-3 inline text-yellow-300"/></th>
                                    <th className="p-2 text-center">执行漏测数 <StarIcon className="w-3 h-3 inline text-yellow-300"/></th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                 {/* Render Filtered Data */}
                                 {filteredData.map((row, idx) => (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                       <td className="p-3 font-medium text-slate-700 border-r border-slate-100">
                                          <div className="flex flex-col">
                                              <span>{row.team}</span>
                                              <span className="text-[10px] text-slate-400">{row.module} - {row.feature}</span>
                                          </div>
                                       </td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100 bg-blue-50/30">{row.removalRate}%</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100 bg-blue-50/30">{row.effectiveTD}</td>
                                       <td className={`p-3 text-center font-mono border-r border-slate-100 ${row.reopenCount > 3 ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>{row.reopenCount}</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100">{row.reopenUsers}</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100 bg-blue-50/30">{row.changeTriggerRate}%</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100 bg-blue-50/30">0</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100 bg-blue-50/30">{row.changeTriggerCount}</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100">{row.uncoveredRate}</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100">{row.uncoveredCount}</td>
                                       <td className="p-3 text-center font-mono border-r border-slate-100 bg-blue-50/30">{row.leakageRate}%</td>
                                       <td className="p-3 text-center font-mono bg-blue-50/30">{row.leakageCount}</td>
                                    </tr>
                                 ))}
                                 
                                 {filteredData.length === 0 && (
                                     <tr><td colSpan={12} className="p-8 text-center text-slate-400">没有符合筛选条件的数据</td></tr>
                                 )}

                                  {/* DYNAMIC AGGREGATE ROW */}
                                 <tr className="bg-[#DAE3F3] font-bold text-slate-800">
                                    <td className="p-3 border-r border-white">合计 (Total)</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.removalRate}%</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.effectiveTD}</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.reopenCount}</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.reopenUsers}</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.changeTriggerRate}%</td>
                                    <td className="p-3 text-center border-r border-white">0</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.changeTriggerCount}</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.uncoveredRate}</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.uncoveredCount}</td>
                                    <td className="p-3 text-center border-r border-white">{aggregates.leakageRate}%</td>
                                    <td className="p-3 text-center">{aggregates.leakageCount}</td>
                                 </tr>
                              </tbody>
                           </table>
                       </div>
                   </div>

                   {/* 3. Analysis Charts */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      {/* Reopen Analysis Chart */}
                      <div className="bg-white rounded-lg p-2">
                         <h5 className="font-bold text-slate-700 text-sm mb-4 pl-2 border-l-4 border-slate-700">多次reopen分析</h5>
                         <div className="h-64 border-t border-r border-slate-100 relative pt-4">
                            {/* Y Axis Labels */}
                            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-slate-400 py-2">
                               <span>10</span>
                               <span>8</span>
                               <span>6</span>
                               <span>4</span>
                               <span>2</span>
                               <span>0</span>
                            </div>
                            
                            {/* Chart Area */}
                            <div className="ml-10 h-full border-l border-b border-slate-200 relative flex items-end justify-around px-4">
                               {/* Grid Lines */}
                               {[0, 20, 40, 60, 80, 100].map((p, i) => (
                                  <div key={i} className="absolute w-full border-t border-slate-100 border-dashed" style={{ bottom: `${p}%`, left: 0 }}></div>
                               ))}
                               
                               {/* Dynamic Bars based on Filtered Data */}
                               {filteredData.slice(0, 6).map((d, i) => (
                                   <div key={i} className="relative flex flex-col items-center group w-8">
                                       <div className="w-6 bg-amber-400 rounded-t hover:bg-amber-500 transition-all" style={{ height: `${Math.min((d.reopenCount / 10) * 100, 100)}%` }}></div>
                                       <div className="text-[10px] text-slate-500 mt-1 truncate w-12 text-center" title={d.team}>{d.team}</div>
                                       {/* Tooltip */}
                                       <div className="absolute bottom-full mb-1 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                           {d.reopenCount} 次
                                       </div>
                                   </div>
                               ))}
                               
                               {filteredData.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">暂无数据</div>}
                            </div>
                            <div className="absolute -left-6 top-1/2 -rotate-90 text-[10px] text-slate-400">多次reopen数</div>
                         </div>
                      </div>

                      {/* Change Analysis Chart */}
                      <div className="bg-white rounded-lg p-2">
                         <h5 className="font-bold text-slate-700 text-sm mb-4 pl-2 border-l-4 border-slate-700">多次改动引发分析</h5>
                         <div className="h-64 border-t border-r border-slate-100 relative pt-4">
                             {/* Y Axis Labels */}
                            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-slate-400 py-2">
                               <span>5</span>
                               <span>4</span>
                               <span>3</span>
                               <span>2</span>
                               <span>1</span>
                               <span>0</span>
                            </div>

                            {/* Chart Area */}
                            <div className="ml-10 h-full border-l border-b border-slate-200 relative flex items-end justify-around px-4">
                                {/* Grid Lines */}
                               {[0, 20, 40, 60, 80, 100].map((p, i) => (
                                  <div key={i} className="absolute w-full border-t border-slate-100 border-dashed" style={{ bottom: `${p}%`, left: 0 }}></div>
                               ))}
                               
                                {/* Dynamic Bars */}
                                {filteredData.slice(0, 6).map((d, i) => (
                                   <div key={i} className="relative flex flex-col items-center group w-8">
                                       <div className="w-6 bg-blue-400 rounded-t hover:bg-blue-500 transition-all" style={{ height: `${Math.min((d.changeTriggerCount / 5) * 100, 100)}%` }}></div>
                                       <div className="text-[10px] text-slate-500 mt-1 truncate w-12 text-center" title={d.team}>{d.team}</div>
                                        <div className="absolute bottom-full mb-1 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                           {d.changeTriggerCount} 次
                                       </div>
                                   </div>
                               ))}

                               {filteredData.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">暂无数据</div>}
                            </div>
                            <div className="absolute -left-6 top-1/2 -rotate-90 text-[10px] text-slate-400">改动引发数</div>
                         </div>
                      </div>
                   </div>
                </div>
               );
          case 'reuse':
               return (
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
                        <tr>
                            <th className="p-4">公共组件/服务</th>
                            <th className="p-4">提供方 (Owner)</th>
                            <th className="p-4 text-right">被调用次数 (Daily)</th>
                            <th className="p-4 text-right">接入产线数</th>
                            <th className="p-4">复用节省人力 (Est.)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="p-4 font-bold text-indigo-700">统一认证服务 (IAM)</td>
                            <td className="p-4">中央平台部</td>
                            <td className="p-4 text-right font-mono">15,000,000</td>
                            <td className="p-4 text-right">8 / 8</td>
                            <td className="p-4 text-emerald-600 font-bold">45 人/月</td>
                        </tr>
                         <tr>
                            <td className="p-4 font-bold text-slate-700">威胁情报库</td>
                            <td className="p-4">大安全-XDR</td>
                            <td className="p-4 text-right font-mono">5,300,000</td>
                            <td className="p-4 text-right">3 / 4</td>
                            <td className="p-4 text-emerald-600 font-bold">20 人/月</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-slate-700">低代码前端引擎</td>
                            <td className="p-4">中央平台部</td>
                            <td className="p-4 text-right font-mono">50,000</td>
                            <td className="p-4 text-right">2 / 8</td>
                            <td className="p-4 text-slate-400">3 人/月 (推广期)</td>
                        </tr>
                    </tbody>
                </table>
              );
          default:
              return <div className="p-8 text-center text-slate-500">暂无数据</div>;
      }
  }

  // Helper to get bar color
  const getBarColor = (index: number) => {
      const colors = ['bg-indigo-500', 'bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400'];
      return colors[index % colors.length];
  }

  const getDotColor = (index: number) => {
      const colors = ['bg-indigo-500', 'bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400'];
      return colors[index % colors.length];
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-600 rounded-lg shadow-sm text-white">
                <Network className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-800">{currentSystemData.name}</h2>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>负责人: {currentSystemData.manager}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>下辖: {currentSystemData.count}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>总人力: {currentSystemData.headcount} HC</span>
                </div>
             </div>
        </div>
        
        {/* System Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
           <button 
             onClick={() => onSelectSystem && onSelectSystem('security')}
             className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${systemId === 'security' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
           >大安全</button>
           <button 
             onClick={() => onSelectSystem && onSelectSystem('cloud')}
             className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${systemId === 'cloud' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
           >大云</button>
           <button 
             onClick={() => onSelectSystem && onSelectSystem('platform')}
             className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${systemId === 'platform' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
           >研发平台</button>
           <button 
             onClick={() => onSelectSystem && onSelectSystem('aibg')}
             className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${systemId === 'aibg' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
           >AI 体系</button>
        </div>

        <div className="flex gap-2 hidden md:flex">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm text-slate-600 hover:text-indigo-600 font-medium">
                下载月度运营报告
            </button>
            <button className="px-3 py-1.5 bg-indigo-600 rounded text-sm text-white hover:bg-indigo-700 font-medium shadow-sm">
                发起体系评审
            </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[160px]">
          
          {/* 1. Manpower Investment (Replaced Architecture) */}
          <DashboardWidget 
            title="体系人力分布 (Manpower)" 
            icon={<Briefcase className="w-4 h-4" />}
            onClick={() => setActiveDrillDown('manpower')}
          >
              <div className="flex flex-col h-full justify-center gap-3">
                  <div className="flex justify-between items-end">
                      <div>
                        <div className="text-3xl font-bold text-slate-800">{currentSystemData.headcount}</div>
                        <div className="text-xs text-slate-500">总编制 (HC)</div>
                      </div>
                      <div className="text-right">
                         <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">饱和度 96%</div>
                      </div>
                  </div>

                  {/* Stacked Bar */}
                  <div className="w-full h-8 flex rounded overflow-hidden">
                      {currentSystemData.lines.map((line, idx) => {
                          const widthPct = (line.headcount / currentSystemData.headcount) * 100;
                          return (
                              <div 
                                key={idx} 
                                className={`${getBarColor(idx)} h-full group/bar relative`} 
                                style={{ width: `${widthPct}%` }}
                                title={`${line.name}: ${line.headcount}人`}
                              >
                              </div>
                          )
                      })}
                  </div>

                  {/* Legend (First 2-3 items) */}
                  <div className="flex flex-wrap gap-2 mt-1">
                      {currentSystemData.lines.slice(0, 3).map((line, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] text-slate-500">
                              <div className={`w-2 h-2 rounded-full ${getDotColor(idx)}`}></div>
                              <span className="truncate max-w-[60px]">{line.name.split(' ')[0]}</span>
                          </div>
                      ))}
                      {currentSystemData.lines.length > 3 && <span className="text-[10px] text-slate-400">...</span>}
                  </div>
              </div>
          </DashboardWidget>

          {/* 2. Shared Capability Reuse */}
          <DashboardWidget 
             title="公共能力复用" 
             icon={<Layers className="w-4 h-4" />}
             onClick={() => setActiveDrillDown('reuse')}
          >
             <div className="flex flex-col gap-2 h-full justify-center">
                 <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-600">组件复用率</span>
                     <span className="font-bold text-slate-800">68%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[68%]"></div>
                 </div>
                 
                 <div className="mt-2 flex justify-between items-center text-sm">
                     <span className="text-slate-600">重复造轮子</span>
                     <span className="font-bold text-red-500">3 项</span>
                 </div>
                 <div className="text-[10px] text-slate-400">通过复用节省约 50 HC/年</div>
             </div>
          </DashboardWidget>

          {/* 3. Active Projects Overview (Replaced Integration Stability) */}
          <DashboardWidget 
             title="在研项目总览" 
             icon={<LayoutGrid className="w-4 h-4" />}
             onClick={() => setActiveDrillDown('active_projects')}
          >
             <div className="flex items-center justify-between h-full px-2">
                {/* Stats */}
                <div className="flex flex-col gap-3">
                   <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-800">{currentSystemData.projectStats.total}</span>
                      <span className="text-xs text-slate-500">个项目</span>
                   </div>
                   <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1 font-bold text-emerald-600" title="正常"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> {currentSystemData.projectStats.normal}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-600" title="预警"><div className="w-2 h-2 rounded-full bg-amber-500"></div> {currentSystemData.projectStats.warning}</span>
                      <span className="flex items-center gap-1 font-bold text-red-600" title="风险"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> {currentSystemData.projectStats.risk}</span>
                   </div>
                </div>
                {/* Milestones */}
                <div className="flex-1 pl-4 border-l border-slate-100 ml-4 space-y-2">
                   {currentSystemData.milestones.map((m, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                         <div>
                            <div className="font-bold text-slate-700">{m.name}</div>
                            <div className="text-[10px] text-slate-400">{m.type}</div>
                         </div>
                         <div className="text-indigo-600 font-mono">{m.date}</div>
                      </div>
                   ))}
                </div>
             </div>
          </DashboardWidget>

          {/* 4. Quality & Red Line (Replaced Resource Pool) */}
          <DashboardWidget 
             title="体系质量红线监控" 
             icon={<ShieldCheck className="w-4 h-4" />}
             onClick={() => setActiveDrillDown('quality')}
          >
             <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs">
                     <span>Reopen 总数</span>
                     <span className="text-red-500 font-bold">15 (超标)</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full">
                     <div className="h-full bg-red-500 w-[80%] rounded-full"></div>
                 </div>

                 <div className="flex justify-between items-center text-xs">
                     <span>严重问题 (S1)</span>
                     <span className="text-emerald-600 font-bold">0 (安全)</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full">
                     <div className="h-full bg-emerald-500 w-[5%] rounded-full"></div>
                 </div>

                 <div className="flex justify-between items-center text-xs">
                     <span>遗留 DI 值</span>
                     <span className="text-amber-600 font-bold">54 (预警)</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full">
                     <div className="h-full bg-amber-500 w-[60%] rounded-full"></div>
                 </div>
             </div>
          </DashboardWidget>

      </div>

      {/* Product Lines Breakdown Table (The Drill Down Entry Point) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
             <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-slate-700">下辖产线监控 (Product Lines)</h3>
             </div>
          </div>
          <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                      <th className="p-4 pl-6">产线/部门名称</th>
                      <th className="p-4">负责人</th>
                      <th className="p-4">定位</th>
                      <th className="p-4 text-center">当期营收 (M)</th>
                      <th className="p-4 text-center">综合健康度</th>
                      <th className="p-4 text-center">体系贡献度</th>
                      <th className="p-4 w-10"></th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {currentSystemData.lines.map((line, idx) => (
                      <tr 
                        key={idx}
                        className="hover:bg-slate-50 cursor-pointer group transition-colors"
                        onClick={() => onSelectProductLine(line.id, line.name)}
                      >
                          <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 rounded bg-blue-100 text-blue-600">
                                      {idx === 0 ? <Server className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                                  </div>
                                  <div>
                                      <div className="font-bold text-slate-800 group-hover:text-blue-600">{line.name}</div>
                                      <div className="text-xs text-slate-400">{line.desc}</div>
                                  </div>
                              </div>
                          </td>
                          <td className="p-4 text-slate-600">{line.manager}</td>
                          <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">主营</span></td>
                          <td className="p-4 text-center font-mono font-bold">{line.revenue}</td>
                          <td className="p-4 text-center">
                              <span className={`font-bold flex items-center justify-center gap-1 ${parseFloat(line.health) > 9 ? 'text-green-600' : 'text-amber-600'}`}>
                                  {parseFloat(line.health) > 9 ? <CheckCircle2 className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>} 
                                  {line.health}
                              </span>
                          </td>
                          <td className="p-4 text-center text-xs text-slate-500">{line.contrib}</td>
                          <td className="p-4"><ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" /></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      <SystemDrillDownModal 
        title={
          activeDrillDown === 'manpower' ? '体系人力资源分布详情' : 
          activeDrillDown === 'active_projects' ? '在研项目健康度列表' :
          activeDrillDown === 'quality' ? '体系质量红线监控' :
          '公共能力复用分析'
        }
        isOpen={!!activeDrillDown}
        onClose={() => setActiveDrillDown(null)}
        widthClass={activeDrillDown === 'quality' ? 'max-w-full m-4' : 'max-w-5xl'}
      >
        {renderDrillDownContent()}
      </SystemDrillDownModal>

    </div>
  );
};