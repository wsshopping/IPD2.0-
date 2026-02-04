import React, { useState } from 'react';
import { PROJECTS_LIST } from '../constants';
import { ChevronRight, LayoutGrid, List, TrendingUp, TrendingDown, Target, Zap, Users, ShieldCheck, Repeat, Clock, Briefcase, PieChart, X, Search, Filter, BrainCircuit, Cpu, Sparkles, AlertTriangle, Bug, FileCode, CheckCircle2, History, Microscope, Scale, GitBranch, FileWarning, FilterX, Archive, PauseCircle, Star, Hourglass } from 'lucide-react';
import { Project } from '../types';

interface ProductDashboardProps {
  onSelectProject: (project: Project) => void;
  productLineName?: string;
}

// 1. Define Dynamic Data for different product lines
const DASHBOARD_MOCK_DATA: Record<string, any> = {
  'XDR': {
    competitiveness: { rank: 'No.1', score: '4.9', voc: '92.5', nps: '+58', trend: '领先竞对', quadrant: '领跑者' },
    cycle: { value: '8.5', trend: 'down', trendValue: '12%', unit: '月' },
    roi: { ratio: '1:4.2', input: '50M', revenue: '210M' },
    battlefield: { current: 1, total: 5, name: '实战攻防' },
    quality: { 
      closed: 12, total: 15, topN: '年度累计 TopN',
      metrics: {
        removalRate: '100.0%', effectiveTD: 5,
        reopenCount: 0, reopenUsers: 0,
        changeTriggerRate: '0.0%', changeTriggerCount: 0,
        uncoveredRate: '0', uncoveredCount: 0, 
        leakageRate: '0%', leakageCount: 0,
        legacyRate: '0.0%', legacyCount: 0, 
        diValue: 0, haltCount: 0,
        betaWeighted: 0, betaP1: 0,
        fixCycle: 0, closedTD: 0
      },
      tableData: [
        { name: 'HC16.12.0_VT', removalRate: '100.0%', effectiveTD: 5, reopen: 0, changeRate: '0.0%', leakage: '0.0%', coverage: '100%' },
        { name: 'XDR 核心引擎组', removalRate: '99.5%', effectiveTD: 12, reopen: 1, changeRate: '0.2%', leakage: '0.01%', coverage: '98%' },
        { name: 'XDR 管理中心 UI', removalRate: '92.0%', effectiveTD: 25, reopen: 5, changeRate: '1.5%', leakage: '0.1%', coverage: '88%' }
      ]
    },
    version: { count: '2.0', reuse: '68%' },
    manpower: { 
      total: 350, 
      growth: '65%',
      aiStats: { total: 65, algo: 15, eng: 30, native: 20 }
    }
  },
  'HCI': {
    competitiveness: { rank: 'No.1', score: '4.7', voc: '91.0', nps: '+45', trend: '领先竞对', quadrant: '领跑者' },
    cycle: { value: '6.5', trend: 'down', trendValue: '5%', unit: '月' },
    roi: { ratio: '1:3.8', input: '80M', revenue: '304M' },
    battlefield: { current: 2, total: 4, name: '企业级云化' },
    quality: { 
      closed: 8, total: 10, topN: '年度累计 TopN',
      metrics: {
        removalRate: '99.2%', effectiveTD: 8,
        reopenCount: 2, reopenUsers: 1,
        changeTriggerRate: '0.1%', changeTriggerCount: 1,
        uncoveredRate: '2', uncoveredCount: 5,
        leakageRate: '0.01%', leakageCount: 1,
        legacyRate: '1.5%', legacyCount: 3,
        diValue: 8, haltCount: 2,
        betaWeighted: 5, betaP1: 0,
        fixCycle: 3.2, closedTD: 45
      },
      tableData: [
        { name: 'HCI 存储层', removalRate: '100%', effectiveTD: 2, reopen: 0, changeRate: '0.0%', leakage: '0.0%', coverage: '99%' },
        { name: 'HCI 计算虚拟化', removalRate: '99.5%', effectiveTD: 8, reopen: 0, changeRate: '0.1%', leakage: '0.0%', coverage: '97%' },
      ]
    },
    version: { count: '3.0', reuse: '75%' },
    manpower: { 
      total: 350, 
      growth: '40%',
      aiStats: { total: 25, algo: 5, eng: 15, native: 5 }
    }
  },
  'DEFAULT': {
    competitiveness: { rank: 'No.1', score: '4.6', voc: '90.0', nps: '+50', trend: '领先竞对', quadrant: '领跑者' },
    cycle: { value: '7.0', trend: 'stable', trendValue: '0%', unit: '月' },
    roi: { ratio: '1:3.0', input: '40M', revenue: '120M' },
    battlefield: { current: 1, total: 3, name: '战略新市场' },
    quality: { 
      closed: 10, total: 12, topN: '年度累计 TopN', 
      metrics: { 
         removalRate: '95%', effectiveTD: 10,
         reopenCount: 5, reopenUsers: 2,
         changeTriggerRate: '1.0%', changeTriggerCount: 2,
         uncoveredRate: '5', uncoveredCount: 10,
         leakageRate: '0.05%', leakageCount: 1,
         legacyRate: '2.0%', legacyCount: 4,
         diValue: 20, haltCount: 1,
         betaWeighted: 10, betaP1: 1,
         fixCycle: 5.0, closedTD: 50
      }, 
      tableData: [] 
    },
    version: { count: '2.0', reuse: '60%' },
    manpower: { 
      total: 200, 
      growth: '50%',
      aiStats: { total: 40, algo: 10, eng: 20, native: 10 }
    }
  }
};

// Reusable Widget Container with Click Interaction
const DashboardWidget: React.FC<{ 
  title: string; 
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ title, icon, children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col transition-all duration-200 ${className} ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-300 group' : ''}`}
  >
    <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
      {icon && <span className="text-blue-600 group-hover:scale-110 transition-transform">{icon}</span>}
      <h3 className="font-bold text-slate-700 text-sm group-hover:text-blue-700">{title}</h3>
      {onClick && <ChevronRight className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
    </div>
    <div className="flex-1 min-h-0 flex flex-col justify-center pointer-events-none">
      {/* pointer-events-none ensures clicking inner elements triggers the parent widget click */}
      {children}
    </div>
  </div>
);

// Drill Down Modal Component
const DrillDownModal: React.FC<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}> = ({ title, isOpen, onClose, children, widthClass = "max-w-7xl" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`bg-white rounded-xl shadow-2xl w-full ${widthClass} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
             <div className="w-1 h-5 bg-blue-600 rounded-full" />
             <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        {/* Toolbar mockup */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex gap-2">
           <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
              <input type="text" placeholder="搜索..." className="pl-8 pr-4 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-400 w-64" />
           </div>
           <button className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:text-blue-600">
              <Filter className="w-3 h-3" /> 筛选
           </button>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-slate-50/50">
          {children}
        </div>
        
        <div className="p-3 border-t border-slate-100 text-xs text-slate-400 flex justify-end bg-slate-50 rounded-b-xl">
           IPD 质量度量系统 v2.4 (Product Line Level)
        </div>
      </div>
    </div>
  );
};

export const ProductDashboard: React.FC<ProductDashboardProps> = ({ onSelectProject, productLineName = 'XDR 产品线' }) => {
  const [activeDrillDown, setActiveDrillDown] = useState<string | null>(null);

  // 2. Extract keyword and get dynamic data
  const getFilterKeyword = (name: string) => {
    if (name.includes('XDR')) return 'XDR';
    if (name.includes('HCI')) return 'HCI';
    return 'DEFAULT';
  };

  const filterKeyword = getFilterKeyword(productLineName);
  
  // Get data for widgets, fallback to DEFAULT if not found
  const data = DASHBOARD_MOCK_DATA[filterKeyword] || DASHBOARD_MOCK_DATA['DEFAULT'];

  // Filter the projects
  const filteredProjects = filterKeyword !== 'DEFAULT'
    ? PROJECTS_LIST.filter(p => p.projectSet?.includes(filterKeyword))
    : PROJECTS_LIST;


  // Helper to render table content based on drill-down type
  const renderDrillDownContent = () => {
    switch (activeDrillDown) {
      case 'competitiveness':
        return (
          <table className="w-full text-left text-sm bg-white rounded-lg border border-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">评估维度</th>
                <th className="p-4">我司得分 ({productLineName.split(' ')[0]})</th>
                <th className="p-4">主要竞对 (Competitor A)</th>
                <th className="p-4">主要竞对 (Competitor B)</th>
                <th className="p-4">差距分析</th>
                <th className="p-4">改进计划</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium">功能丰富度</td>
                <td className="p-4 text-blue-600 font-bold">{data.competitiveness.score}</td>
                <td className="p-4">4.5</td>
                <td className="p-4">4.2</td>
                <td className="p-4"><span className="text-green-600 text-xs bg-green-50 px-2 py-1 rounded">+ 领先</span></td>
                <td className="p-4 text-slate-500 text-xs">保持现有节奏，扩充边缘场景</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">系统稳定性</td>
                <td className="p-4 text-blue-600 font-bold">4.8</td>
                <td className="p-4">4.8</td>
                <td className="p-4">4.6</td>
                <td className="p-4"><span className="text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded">= 持平</span></td>
                <td className="p-4 text-slate-500 text-xs">TR6 加强混沌工程测试</td>
              </tr>
               <tr>
                <td className="p-4 font-medium">易用性 (UX)</td>
                <td className="p-4 text-blue-600 font-bold">4.5</td>
                <td className="p-4">4.7</td>
                <td className="p-4">4.3</td>
                <td className="p-4"><span className="text-red-600 text-xs bg-red-50 px-2 py-1 rounded">- 落后</span></td>
                <td className="p-4 text-slate-500 text-xs">专项优化控制台交互体验</td>
              </tr>
            </tbody>
          </table>
        );
      case 'voc':
        return (
          <table className="w-full text-left text-sm bg-white rounded-lg border border-slate-200">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">客户名称</th>
                <th className="p-4">反馈类型</th>
                <th className="p-4 w-96">反馈内容摘要</th>
                <th className="p-4">满意度评分</th>
                <th className="p-4">状态</th>
                <th className="p-4">责任人</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-medium">工商银行</td>
                 <td className="p-4"><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">功能需求</span></td>
                 <td className="p-4 text-slate-600">希望增加多集群统一纳管功能的权限细分粒度。</td>
                 <td className="p-4">8.5/10</td>
                 <td className="p-4"><span className="text-emerald-600 text-xs">已规划 (v2.5)</span></td>
                 <td className="p-4">陈亚历</td>
               </tr>
               <tr>
                 <td className="p-4 font-medium">国家电网</td>
                 <td className="p-4"><span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs">投诉</span></td>
                 <td className="p-4 text-slate-600">上周五发生的监控数据延迟问题，希望能给出详细 RCA。</td>
                 <td className="p-4 text-red-500 font-bold">4.0/10</td>
                 <td className="p-4"><span className="text-amber-600 text-xs">处理中</span></td>
                 <td className="p-4">王迈克</td>
               </tr>
            </tbody>
          </table>
        );
      case 'cycle':
        return (
          <table className="w-full text-left text-sm bg-white rounded-lg border border-slate-200">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">项目名称</th>
                <th className="p-4">类型</th>
                <th className="p-4">立项日期 (DCP2)</th>
                <th className="p-4">发布日期 (TR6)</th>
                <th className="p-4 text-right">周期 (月)</th>
                <th className="p-4 text-right">基线值</th>
                <th className="p-4 text-center">偏差</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredProjects.map(p => (
                 <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-blue-700">{p.name}</td>
                    <td className="p-4 text-xs text-slate-500">全新开发</td>
                    <td className="p-4 text-slate-600">2023-10-15</td>
                    <td className="p-4 text-slate-600">2024-05-20</td>
                    <td className="p-4 text-right font-mono font-bold text-slate-800">{p.resultMetrics[2].value}</td>
                    <td className="p-4 text-right font-mono text-slate-400">9.0</td>
                    <td className="p-4 text-center">
                       <span className={`px-2 py-1 rounded text-xs ${p.resultMetrics[2].trend === 'down' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {p.resultMetrics[2].trend === 'down' ? '缩短' : '超期'}
                       </span>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        );
      case 'roi':
        return (
          <table className="w-full text-left text-sm bg-white rounded-lg border border-slate-200">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">产品线/子产品</th>
                <th className="p-4 text-right">总研发投入 (YTD)</th>
                <th className="p-4 text-right">直接营收贡献</th>
                <th className="p-4 text-right">ROI 比例</th>
                <th className="p-4 text-right">毛利率</th>
                <th className="p-4">财务状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-medium">{productLineName} 核心平台</td>
                 <td className="p-4 text-right text-slate-600">¥ 25,000,000</td>
                 <td className="p-4 text-right text-slate-600">¥ 120,000,000</td>
                 <td className="p-4 text-right font-bold text-blue-700">1 : 4.8</td>
                 <td className="p-4 text-right">72%</td>
                 <td className="p-4"><span className="text-green-600 text-xs bg-green-50 px-2 py-1 rounded">盈利强劲</span></td>
               </tr>
               <tr>
                 <td className="p-4 font-medium">IoT 边缘计算套件</td>
                 <td className="p-4 text-right text-slate-600">¥ 12,000,000</td>
                 <td className="p-4 text-right text-slate-600">¥ 30,000,000</td>
                 <td className="p-4 text-right font-bold text-slate-700">1 : 2.5</td>
                 <td className="p-4 text-right">55%</td>
                 <td className="p-4"><span className="text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded">培育期</span></td>
               </tr>
            </tbody>
          </table>
        );
      case 'battlefield':
         return (
          <table className="w-full text-left text-sm bg-white rounded-lg border border-slate-200">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">战略战场名称</th>
                <th className="p-4">负责人</th>
                <th className="p-4">当前阶段</th>
                <th className="p-4">关键客户/项目</th>
                <th className="p-4">市场规模预估</th>
                <th className="p-4 text-right">完成度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-medium text-blue-700">{data.battlefield.name}</td>
                 <td className="p-4">陈亚历</td>
                 <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Pilot 验证期</span></td>
                 <td className="p-4 text-slate-600">Top3 国有大行</td>
                 <td className="p-4">¥ 20亿</td>
                 <td className="p-4 text-right">30%</td>
               </tr>
               <tr>
                 <td className="p-4 font-medium text-slate-700">边缘计算节点算力</td>
                 <td className="p-4">王迈克</td>
                 <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">规模推广期</span></td>
                 <td className="p-4 text-slate-600">智慧交通、智能制造</td>
                 <td className="p-4">¥ 15亿</td>
                 <td className="p-4 text-right">80%</td>
               </tr>
            </tbody>
          </table>
         );
      case 'quality':
         // Simplified Product Line View
         const qm = data.quality.metrics || {};
         return (
           <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-700">本产线质量概况 (Product Line Quality Overview)</h4>
                      <span className="text-xs text-slate-500">Updated: Today</span>
                  </div>
                  
                  {/* Simplified 4-Grid for Product Line */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="bg-white p-3 rounded border border-blue-100">
                          <div className="text-xs text-slate-500 mb-1">遗留缺陷总数</div>
                          <div className="text-2xl font-bold text-blue-600">{qm.legacyCount || 12}</div>
                       </div>
                       <div className="bg-white p-3 rounded border border-amber-100">
                          <div className="text-xs text-slate-500 mb-1">网上问题 (DI)</div>
                          <div className="text-2xl font-bold text-amber-600">{qm.diValue || 5}</div>
                       </div>
                       <div className="bg-white p-3 rounded border border-green-100">
                          <div className="text-xs text-slate-500 mb-1">缺陷前移率</div>
                          <div className="text-2xl font-bold text-green-600">{qm.removalRate}</div>
                       </div>
                        <div className="bg-white p-3 rounded border border-purple-100">
                          <div className="text-xs text-slate-500 mb-1">漏测率</div>
                          <div className="text-2xl font-bold text-purple-600">{qm.leakageRate}</div>
                       </div>
                  </div>
              </div>

              {/* Simple Project List */}
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                   <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 font-bold text-sm text-slate-700">
                      项目质量状态
                   </div>
                   <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium">
                           <tr>
                               <th className="p-3 pl-4">项目名称</th>
                               <th className="p-3">阶段</th>
                               <th className="p-3">Bug数</th>
                               <th className="p-3 text-center">状态</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           {filteredProjects.map(p => (
                               <tr key={p.id} className="hover:bg-slate-50">
                                   <td className="p-3 pl-4 font-medium text-slate-700">{p.name}</td>
                                   <td className="p-3 text-xs text-slate-500">TR4</td>
                                   <td className="p-3 font-mono">23</td>
                                   <td className="p-3 text-center">
                                       <span className={`px-2 py-0.5 rounded text-xs ${p.status === 'normal' ? 'bg-green-100 text-green-700' : p.status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                           {p.status}
                                       </span>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
              </div>
           </div>
         );
      case 'manpower':
         const aiStats = data.manpower.aiStats || { total: 0, algo: 0, eng: 0, native: 0 };
         return (
           <div className="space-y-6">
             {/* AI Talent Breakdown Section */}
             <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-xl p-5 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                       <BrainCircuit className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-800">AI 人才结构透视 (AI Talent Structure)</h4>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold ml-2">
                        渗透率 {Math.round((aiStats.total / data.manpower.total) * 100)}%
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                    {/* Total AI */}
                    <div className="flex flex-col p-4 bg-white/60 rounded-lg border border-blue-100/50">
                        <span className="text-xs text-slate-500 mb-1">AI 专职人才总数</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-bold text-slate-800">{aiStats.total}</span>
                           <span className="text-xs font-normal text-slate-400">人</span>
                        </div>
                    </div>
                    
                    {/* Algorithm Breakdown */}
                    <div className="flex flex-col p-4 bg-white/60 rounded-lg border border-indigo-100/50 hover:bg-white/80 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit className="w-4 h-4 text-indigo-500" />
                            <span className="text-xs font-bold text-slate-600">AI 算法 (Algorithm)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-800">{aiStats.algo}</span>
                            <span className="text-xs text-slate-400">{aiStats.total > 0 ? Math.round((aiStats.algo/aiStats.total)*100) : 0}%</span>
                        </div>
                    </div>

                    {/* Engineering Breakdown */}
                    <div className="flex flex-col p-4 bg-white/60 rounded-lg border border-cyan-100/50 hover:bg-white/80 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-4 h-4 text-cyan-600" />
                            <span className="text-xs font-bold text-slate-600">AI 工程 (Engineering)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-800">{aiStats.eng}</span>
                            <span className="text-xs text-slate-400">{aiStats.total > 0 ? Math.round((aiStats.eng/aiStats.total)*100) : 0}%</span>
                        </div>
                    </div>

                    {/* AI Native Breakdown */}
                    <div className="flex flex-col p-4 bg-white/60 rounded-lg border border-purple-100/50 hover:bg-white/80 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-bold text-slate-600">AI Native (原生应用)</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-800">{aiStats.native}</span>
                            <span className="text-xs text-slate-400">{aiStats.total > 0 ? Math.round((aiStats.native/aiStats.total)*100) : 0}%</span>
                        </div>
                    </div>
                </div>

                {/* Visual Decoration */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
             </div>

             {/* Existing Table */}
             <table className="w-full text-left text-sm mt-4">
               <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                <tr>
                  <th className="p-4">部门/团队</th>
                  <th className="p-4">投入方向</th>
                  <th className="p-4 text-right">人数 (HC)</th>
                  <th className="p-4 text-right">占比</th>
                  <th className="p-4">主要产出目标</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 <tr>
                   <td className="p-4 font-medium">核心研发一部</td>
                   <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">技术平台</span></td>
                   <td className="p-4 text-right font-mono">{Math.floor(data.manpower.total * 0.2)}</td>
                   <td className="p-4 text-right font-mono">20%</td>
                   <td className="p-4 text-slate-600">稳定性、异构算力适配</td>
                 </tr>
                 <tr>
                   <td className="p-4 font-medium">行业产品部</td>
                   <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">战略增长</span></td>
                   <td className="p-4 text-right font-mono">{Math.floor(data.manpower.total * 0.35)}</td>
                   <td className="p-4 text-right font-mono">35%</td>
                   <td className="p-4 text-slate-600">金融版特性开发</td>
                 </tr>
                 <tr>
                   <td className="p-4 font-medium">AI 创新实验室</td>
                   <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">AI 赋能</span></td>
                   <td className="p-4 text-right font-mono">{aiStats.total}</td>
                   <td className="p-4 text-right font-mono">{Math.round((aiStats.total / data.manpower.total) * 100)}%</td>
                   <td className="p-4 text-slate-600">Copilot 插件, 智能分析</td>
                 </tr>
              </tbody>
            </table>
           </div>
         );
       case 'version':
         return (
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">版本号</th>
                <th className="p-4">类型</th>
                <th className="p-4">发布时间</th>
                <th className="p-4 text-center">中台复用率</th>
                <th className="p-4">核心特性数</th>
                <th className="p-4">市场表现</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-medium text-blue-700">v{data.version.count}</td>
                 <td className="p-4 text-xs">Major</td>
                 <td className="p-4 text-slate-600">2024-Q2 (Plan)</td>
                 <td className="p-4 text-center font-bold text-blue-600">{data.version.reuse}</td>
                 <td className="p-4">12</td>
                 <td className="p-4"><span className="bg-slate-100 text-slate-400 text-xs px-2 py-1 rounded">待发布</span></td>
               </tr>
               <tr>
                 <td className="p-4 font-medium text-slate-700">v{parseInt(data.version.count)-1}.0</td>
                 <td className="p-4 text-xs">Major</td>
                 <td className="p-4 text-slate-600">2023-12-20</td>
                 <td className="p-4 text-center font-bold text-slate-600">65%</td>
                 <td className="p-4">5</td>
                 <td className="p-4"><span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">热销中</span></td>
               </tr>
            </tbody>
          </table>
         );
      default:
        return <div className="p-8 text-center text-slate-500">暂无详细数据</div>;
    }
  };

  // Helper icons
  const StarIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-bold text-slate-800">{productLineName} - 商业结果仪表盘</h2>
        </div>
        <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">统计周期: 2024 YTD</div>
      </div>

      {/* 8-Grid Dashboard Layout - Dynamic Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-[220px]">
        
        {/* 1. 产品整体竞争力 */}
        <DashboardWidget 
          title="产品整体竞争力" 
          icon={<Target className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('competitiveness')}
        >
           <div className="flex flex-col gap-4">
             <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-800">{data.competitiveness.rank}</div>
                  <div className="text-xs text-slate-500 mt-1">综合市场评价</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600 flex items-center gap-1 justify-end">
                    <TrendingUp className="w-3 h-3" /> {data.competitiveness.trend}
                  </div>
                  <div className="text-xs text-slate-400">Gartner {data.competitiveness.quadrant}</div>
                </div>
             </div>
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 group-hover:bg-blue-50/30 transition-colors">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-600">VOC 满意度评分</span>
                 <span className="font-bold text-blue-700">{data.competitiveness.voc} <span className="text-[10px] text-slate-400 font-normal">/100</span></span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-600">NPS 净推荐值</span>
                 <span className="font-bold text-blue-700">{data.competitiveness.nps}</span>
               </div>
             </div>
           </div>
        </DashboardWidget>

        {/* 2. 产品整体客户满意度 */}
        <DashboardWidget 
          title="客户满意度趋势 (VOC)" 
          icon={<Users className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('voc')}
        >
           <div className="flex items-end justify-between h-full px-2 gap-2 mt-2">
              {[
                { label: 'Q1', val: 85, color: 'bg-blue-300' },
                { label: 'Q2', val: 88, color: 'bg-blue-400' },
                { label: 'Q3', val: 92, color: 'bg-blue-500' },
                { label: 'Q4(E)', val: 95, color: 'bg-emerald-400' }
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center w-full group/bar">
                   <div className="text-xs font-bold mb-1 opacity-0 group-hover/bar:opacity-100 transition-opacity">{item.val}</div>
                   <div className={`w-full rounded-t-sm transition-all group-hover/bar:opacity-80 ${item.color}`} style={{ height: `${(item.val / 100) * 120}px` }}></div>
                   <div className="text-xs text-slate-500 mt-2 font-medium">{item.label}</div>
                </div>
              ))}
           </div>
        </DashboardWidget>

        {/* 3. 产品平均开发周期 */}
        <DashboardWidget 
          title="平均开发周期监控" 
          icon={<Clock className="w-4 h-4" />} 
          className="xl:col-span-2"
          onClick={() => setActiveDrillDown('cycle')}
        >
           <div className="flex items-baseline gap-2 mb-3">
             <span className="text-3xl font-bold text-slate-800">{data.cycle.value}</span>
             <span className="text-sm text-slate-500">{data.cycle.unit} (平均 TTM)</span>
             <span className={`ml-auto text-xs ${data.cycle.trend === 'down' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'} flex items-center px-2 py-1 rounded-full`}>
               <TrendingDown className="w-3 h-3 mr-1" /> 同比缩短 {data.cycle.trendValue}
             </span>
           </div>
           <div className="flex-1 overflow-auto pointer-events-none">
             <table className="w-full text-xs text-left">
               <thead className="text-slate-400 font-medium bg-slate-50 sticky top-0">
                 <tr>
                   <th className="p-2">项目</th>
                   <th className="p-2">DCP2→TR6</th>
                   <th className="p-2 text-right">周期 (月)</th>
                   <th className="p-2 text-center">状态</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {/* Only show relevant projects in mini table */}
                 {filteredProjects.slice(0, 3).map(p => (
                    <tr key={p.id}>
                        <td className="p-2 font-medium">{p.name}</td>
                        <td className="p-2 text-slate-500">23Q4 - 24Q2</td>
                        <td className="p-2 text-right font-mono">{p.resultMetrics[2].value}</td>
                        <td className="p-2 text-center">
                            <span className={`text-${p.status === 'normal' ? 'green' : 'amber'}-600 bg-${p.status === 'normal' ? 'green' : 'amber'}-50 px-1 rounded`}>
                                {p.status === 'normal' ? '达标' : '预警'}
                            </span>
                        </td>
                    </tr>
                 ))}
                 {filteredProjects.length === 0 && (
                     <tr><td colSpan={4} className="p-4 text-center text-slate-400">暂无项目</td></tr>
                 )}
               </tbody>
             </table>
           </div>
        </DashboardWidget>

        {/* 4. 产品研发投资回报率 (ROI) */}
        <DashboardWidget 
          title="研发投资回报率 (ROI)" 
          icon={<TrendingUp className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('roi')}
        >
           <div className="flex flex-col items-center justify-center h-full">
              <div className="relative w-32 h-32 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
                 {/* Simple CSS Pie representation */}
                 <div className="absolute inset-0 rounded-full border-[12px] border-slate-100"></div>
                 <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-l-transparent border-b-transparent rotate-45"></div>
                 <div className="text-center">
                    <div className="text-3xl font-extrabold text-blue-900">{data.roi.ratio}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">投入产出比</div>
                 </div>
              </div>
              <div className="flex w-full justify-between px-4 mt-2 text-xs text-slate-500">
                 <div>投入: ¥{data.roi.input}</div>
                 <div>预估营收: ¥{data.roi.revenue}</div>
              </div>
           </div>
        </DashboardWidget>

        {/* 5. REMOVED Battlefield Widget */}

        {/* 6. 年度关键质量问题闭环 */}
        <DashboardWidget 
          title="关键质量问题闭环 (Quality)" 
          icon={<ShieldCheck className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('quality')}
        >
           <div className="flex flex-col h-full justify-between py-1">
             <div className="flex items-end gap-2">
               <span className="text-4xl font-bold text-slate-800">{data.quality.closed}</span>
               <span className="text-lg text-slate-400 mb-1">/ {data.quality.total}</span>
               <span className="text-xs text-slate-500 mb-2 ml-auto">{data.quality.topN}</span>
             </div>
             
             <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> 现网重大事故</span>
                   <span className="font-mono">0</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 客户投诉 (S1/S2)</span>
                   <span className="font-mono">3 (处理中)</span>
                </div>
                 <div className="flex justify-between items-center text-xs">
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 彻底改进闭环</span>
                   <span className="font-mono text-emerald-600">80%</span>
                </div>
             </div>
           </div>
        </DashboardWidget>

        {/* 7. REMOVED Version Widget */}

        {/* 8. 人力投资地图 (Updated to span 2 cols) */}
        <DashboardWidget 
          title="人力资源投资地图" 
          icon={<Briefcase className="w-4 h-4" />}
          className="xl:col-span-2"
          onClick={() => setActiveDrillDown('manpower')}
        >
          <div className="flex flex-col h-full justify-between">
             <div className="flex justify-between items-end mb-2">
                <div>
                   <div className="text-3xl font-bold text-slate-800">{data.manpower.total}<span className="text-sm font-normal text-slate-500 ml-1">人</span></div>
                   <div className="text-xs text-slate-400">研发人员总数</div>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-blue-600">{data.manpower.growth}</div>
                   <div className="text-[10px] text-slate-400">战略增长投入</div>
                </div>
             </div>

             {/* The Visual Treemap-style Bar */}
             <div className="flex h-12 w-full gap-1 mb-2">
                <div className="bg-blue-600 h-full w-[65%] rounded-l-md p-2 text-white text-xs relative flex flex-col justify-center group-hover:bg-blue-700 transition-colors">
                   <span className="font-bold scale-90 origin-left">战略增长</span>
                   <div className="absolute top-1 right-2 text-lg font-bold opacity-30">{data.manpower.growth}</div>
                </div>
                <div className="flex flex-col h-full w-[35%] gap-1">
                    <div className="bg-emerald-500 h-[60%] w-full rounded-tr-md px-2 text-white text-[10px] flex items-center justify-between group-hover:bg-emerald-600 transition-colors">
                       <span className="scale-90 origin-left">平台</span>
                       <span className="font-bold">20%</span>
                    </div>
                    <div className="bg-slate-300 h-[40%] w-full rounded-br-md px-2 text-slate-600 text-[10px] flex items-center justify-between group-hover:bg-slate-400 transition-colors">
                       <span className="scale-90 origin-left">维护</span>
                       <span className="font-bold">15%</span>
                    </div>
                </div>
             </div>

             {/* Legend */}
             <div className="flex justify-between items-center text-[10px] text-slate-500 px-1">
                 <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>新产品</div>
                 <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>技术平台</div>
                 <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>老版本</div>
             </div>
          </div>
        </DashboardWidget>

      </div>

      {/* Project Portfolio Table */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
             <div className="w-1 h-5 bg-emerald-500 rounded-full" />
             <h2 className="text-base font-bold text-slate-800">项目组合列表 (Project Portfolio List)</h2>
          </div>
          <button className="text-sm text-blue-600 font-medium hover:underline flex items-center">
             查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-xs border-b border-slate-200">
              {/* Table Header Row 1 - Groupings */}
              <tr>
                <th rowSpan={2} className="px-4 py-3 border-r border-slate-200 bg-slate-100 w-32">项目集</th>
                <th rowSpan={2} className="px-4 py-3 border-r border-slate-200">关键项目</th>
                <th rowSpan={2} className="px-4 py-3 border-r border-slate-200">战场</th>
                <th rowSpan={2} className="px-4 py-3 border-r border-slate-200 w-32">关键价值/质量</th>
                <th rowSpan={2} className="px-4 py-3 border-r border-slate-200 w-32">进度</th>
                
                {/* Grouped Headers */}
                <th colSpan={2} className="px-4 py-2 border-r border-b border-slate-200 text-center bg-blue-50/50">人力投入</th>
                <th colSpan={5} className="px-4 py-2 border-b border-slate-200 text-center bg-yellow-50/50">运营结果</th>
                <th rowSpan={2} className="px-4 py-3 w-10"></th>
              </tr>
              
              {/* Table Header Row 2 - Details */}
              <tr>
                <th className="px-3 py-2 border-r border-slate-200 text-center text-slate-500 bg-blue-50/30 font-medium">人数</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center text-slate-500 bg-blue-50/30 font-medium">占比</th>
                
                <th className="px-3 py-2 border-r border-slate-200 text-center text-slate-500 bg-yellow-50/30 font-medium">价值兑现</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center text-slate-500 bg-yellow-50/30 font-medium">网上问题</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center text-slate-500 bg-yellow-50/30 font-medium">开发周期</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center text-slate-500 bg-yellow-50/30 font-medium">交付质量</th>
                <th className="px-3 py-2 text-center text-slate-500 bg-yellow-50/30 font-medium">人力偏差</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((proj, idx) => (
                  <tr 
                    key={proj.id} 
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => onSelectProject(proj)} 
                  >
                    <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{proj.projectSet}</td>
                    <td className="px-4 py-3 font-medium text-blue-700 border-r border-slate-100">{proj.name}</td>
                    <td className="px-4 py-3 text-slate-600 border-r border-slate-100">{proj.battlefield}</td>
                    
                    {/* Value/Quality */}
                    <td className="px-4 py-3 border-r border-slate-100">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center justify-between">
                           <span className="text-slate-400">价值:</span>
                           <span className="font-bold text-slate-700">高</span>
                         </div>
                         <div className="flex items-center justify-between">
                           <span className="text-slate-400">质量:</span>
                           <span className={`font-bold ${proj.status === 'risk' ? 'text-red-500' : 'text-emerald-500'}`}>
                             {proj.status === 'risk' ? '风险' : '稳定'}
                           </span>
                         </div>
                      </div>
                    </td>
                    
                    {/* Progress */}
                    <td className="px-4 py-3 border-r border-slate-100">
                       <div className="flex flex-col gap-1">
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                            <div 
                              className={`h-full rounded-full ${proj.status === 'risk' ? 'bg-red-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${proj.progress}%` }} 
                            />
                          </div>
                          <div className="flex justify-between items-center text-[10px]">
                             <span className="text-slate-400">{proj.progress}%</span>
                             <span className={`px-1.5 rounded ${
                               proj.status === 'normal' ? 'bg-green-100 text-green-700' : 
                               proj.status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                             }`}>
                               {proj.status === 'normal' ? '正常' : proj.status === 'warning' ? '预警' : '风险'}
                             </span>
                          </div>
                       </div>
                    </td>

                    {/* Manpower */}
                    <td className="px-3 py-3 text-center border-r border-slate-100">{proj.headcount}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-100 text-slate-500">{proj.headcountPercentage}%</td>

                    {/* Operational Results */}
                    {/* Using resultMetrics index 0,1,2,3 for simplicity based on mock data structure */}
                    <td className="px-3 py-3 text-center border-r border-slate-100 font-mono font-medium">{proj.resultMetrics[0].value}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-100 font-mono text-red-600">{proj.resultMetrics[1].value}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-100 font-mono">{proj.resultMetrics[2].value}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-100 font-mono text-emerald-600">{proj.resultMetrics[3].value}</td>
                    <td className={`px-3 py-3 text-center font-mono ${proj.manpowerDeviation?.startsWith('-') ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {proj.manpowerDeviation}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors inline-block" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={13} className="p-8 text-center text-slate-400">
                      该产线暂无相关项目数据
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Drill Down Modal */}
        <DrillDownModal 
          title={
            activeDrillDown === 'competitiveness' ? '产品整体竞争力' :
            activeDrillDown === 'voc' ? '客户满意度反馈' :
            activeDrillDown === 'cycle' ? '开发周期分析' :
            activeDrillDown === 'roi' ? '研发投资回报明细' :
            activeDrillDown === 'battlefield' ? '战略战场突破详情' :
            activeDrillDown === 'quality' ? 'IPD项目质量度量看板' :
            activeDrillDown === 'version' ? '版本发布与复用统计' :
            activeDrillDown === 'manpower' ? '人力资源分布详情' : ''
          }
          isOpen={!!activeDrillDown} 
          onClose={() => setActiveDrillDown(null)}
          widthClass={activeDrillDown === 'quality' ? 'max-w-full m-4' : 'max-w-7xl'}
        >
          {renderDrillDownContent()}
        </DrillDownModal>

      </section>
    </div>
  );
};