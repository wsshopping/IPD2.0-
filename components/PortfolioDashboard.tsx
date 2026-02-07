import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Briefcase, LayoutGrid, Activity, ThumbsUp, Trophy, ArrowRight, ChevronRight, X, Search, Filter, CheckCircle2, AlertTriangle, AlertCircle, Flag, Sparkles, Users } from 'lucide-react';
import { PROJECTS_LIST, ROSTER } from '../constants';
import { Project } from '../types';

interface PortfolioDashboardProps {
  onSelectProject: (project: Project) => void;
  onSelectSystem?: (systemId: string, options?: { openDrillDown?: string }) => void;
}

// Reusable Widget Container
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
const PortfolioDrillDownModal: React.FC<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
             <div className="w-1 h-5 bg-indigo-600 rounded-full" />
             <h3 className="text-lg font-bold text-slate-800">{title} - 集团级透视</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        {/* Mock Toolbar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex gap-2">
           <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
              <input type="text" placeholder="按关键字搜索..." className="pl-8 pr-4 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-400 w-64" />
           </div>
           <button className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:text-indigo-600">
              <Filter className="w-3 h-3" /> 筛选年份: 2025
           </button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ onSelectProject, onSelectSystem }) => {
  const [activeDrillDown, setActiveDrillDown] = useState<string | null>(null);

  const isHilltopProject = (project: Project) => {
      if (typeof project.isHilltop === 'boolean') return project.isHilltop;
      return project.id === 'PRJ-2024-001' || project.id === 'PRJ-2024-002';
  };

  const renderDrillDownContent = () => {
    switch (activeDrillDown) {
       case 'active_projects': {
         return (
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
               <tr>
                 <th className="p-4">项目名称</th>
                 <th className="p-4">所属体系/产线</th>
                 <th className="p-4">当前阶段</th>
                 <th className="p-4">健康度</th>
                 <th className="p-4">进度偏差</th>
                 <th className="p-4">下次里程碑</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {PROJECTS_LIST.map((project) => (
                   <tr 
                     key={project.id} 
                     onClick={() => onSelectProject(project)}
                     className="hover:bg-indigo-50/50 cursor-pointer group transition-colors"
                   >
                     <td className="p-4 font-bold text-slate-700 group-hover:text-indigo-700">
                        <div className="flex items-center gap-2">
                            {project.name}
                            {isHilltopProject(project) && (
                                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 text-[10px] font-medium animate-in fade-in">
                                    <Flag className="w-3 h-3 fill-red-600" /> 山头项目
                                </span>
                            )}
                        </div>
                     </td>
                     <td className="p-4 text-slate-600">{project.projectSet}</td>
                     <td className="p-4">
                        {project.phase ? (
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{project.phase}</span>
                        ) : (
                          project.progress > 80 ? 
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">上市发布 (DCP5)</span> :
                           project.progress > 50 ? 
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">验证 (TR5)</span> :
                              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">开发 (TR4)</span>
                        )}
                     </td>
                     <td className="p-4">
                        {project.status === 'normal' && <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-4 h-4"/> 正常</span>}
                        {project.status === 'warning' && <span className="flex items-center gap-1 text-amber-600 font-bold"><AlertTriangle className="w-4 h-4"/> 预警</span>}
                        {project.status === 'risk' && <span className="flex items-center gap-1 text-red-600 font-bold"><AlertCircle className="w-4 h-4"/> 风险</span>}
                     </td>
                     <td className={`p-4 ${project.status === 'risk' ? 'text-red-500' : project.status === 'warning' ? 'text-amber-500' : 'text-slate-500'}`}>
                        {project.status === 'risk' ? '-15% (延期)' : project.status === 'warning' ? '-5%' : '0%'}
                     </td>
                     <td className="p-4 text-xs text-slate-500">
                        {project.progress > 80 ? 'TR6 验收' : 'TR5 评审'}
                     </td>
                   </tr>
               ))}
             </tbody>
           </table>
         );
       }
       case 'manpower': {
         const groupAiStats = { total: 850, algo: 350, eng: 400, native: 100 };
         const totalRoster = ROSTER.length;
         const functionOrder = ['研发', '测试', '规划', '安全运营', '技术支持'] as const;
         const levelOrder = [4, 5, 6, 7, 8, 9, 10];
         const employmentOrder = ['正式员工', '合作方'] as const;
         const functionCounts = functionOrder.map(fn => ({
           label: fn,
           count: ROSTER.filter(member => member.function === fn).length
         }));
         const levelCounts = levelOrder.map(level => ({
           label: `${level}级`,
           count: ROSTER.filter(member => member.level === level).length
         }));
         const employmentCounts = employmentOrder.map(type => ({
           label: type,
           count: ROSTER.filter(member => member.employment === type).length
         }));
         return (
          <div className="space-y-6 p-4">
            <div className="grid grid-cols-4 gap-4">
               <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <div className="text-indigo-600 text-xs font-bold uppercase">总编制 (Headcount)</div>
                  <div className="text-2xl font-bold text-indigo-900 mt-1">3,050</div>
               </div>
               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-blue-600 text-xs font-bold uppercase">在岗人数</div>
                  <div className="text-2xl font-bold text-blue-900 mt-1">2,980</div>
               </div>
               <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-emerald-600 text-xs font-bold uppercase">战略投入占比</div>
                  <div className="text-2xl font-bold text-emerald-900 mt-1">75%</div>
               </div>
               <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="text-amber-600 text-xs font-bold uppercase">空缺率</div>
                  <div className="text-2xl font-bold text-amber-900 mt-1">2.3%</div>
               </div>
            </div>

             <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-slate-500" />
                    <h4 className="font-bold text-slate-700 text-sm">集团人才结构透视</h4>
                    <span className="text-[11px] text-slate-400">样本 {totalRoster} 人</span>
                </div>
                {totalRoster === 0 ? (
                    <div className="text-sm text-slate-500">暂无人员数据</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3">
                                <div className="text-xs font-bold text-slate-600 mb-2">职能占比</div>
                                <div className="space-y-2">
                                    {functionCounts.map(item => {
                                        const pct = Math.round((item.count / totalRoster) * 100);
                                        return (
                                            <div key={item.label} className="flex items-center gap-2 text-xs">
                                                <span className="w-12 text-slate-500">{item.label}</span>
                                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: `${pct}%` }}></div>
                                                </div>
                                                <span className="w-12 text-right text-slate-600">{item.count} ({pct}%)</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3">
                                <div className="text-xs font-bold text-slate-600 mb-2">职级分布</div>
                                <div className="space-y-2">
                                    {levelCounts.map(item => {
                                        const pct = Math.round((item.count / totalRoster) * 100);
                                        return (
                                            <div key={item.label} className="flex items-center gap-2 text-xs">
                                                <span className="w-12 text-slate-500">{item.label}</span>
                                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${pct}%` }}></div>
                                                </div>
                                                <span className="w-12 text-right text-slate-600">{item.count} ({pct}%)</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3">
                                <div className="text-xs font-bold text-slate-600 mb-2">用工类型</div>
                                <div className="space-y-2">
                                    {employmentCounts.map(item => {
                                        const pct = Math.round((item.count / totalRoster) * 100);
                                        return (
                                            <div key={item.label} className="flex items-center gap-2 text-xs">
                                                <span className="w-16 text-slate-500">{item.label}</span>
                                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }}></div>
                                                </div>
                                                <span className="w-12 text-right text-slate-600">{item.count} ({pct}%)</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-lg p-4 relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-violet-600" />
                                <div className="text-xs font-bold text-slate-700">AI 子集</div>
                                <span className="ml-auto text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">
                                    渗透率 28%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-800">{groupAiStats.total} <span className="text-xs font-normal text-slate-400">人</span></div>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                {[
                                  { label: '算法', value: groupAiStats.algo, color: 'text-indigo-600' },
                                  { label: '工程', value: groupAiStats.eng, color: 'text-cyan-600' },
                                  { label: '原生', value: groupAiStats.native, color: 'text-purple-600' }
                                ].map((item) => (
                                    <div key={item.label} className="bg-white/70 border border-white/60 rounded-lg p-2">
                                        <div className="text-[10px] text-slate-500">{item.label}</div>
                                        <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                                        <div className="text-[10px] text-slate-400">
                                            {Math.round((item.value / groupAiStats.total) * 100)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute right-0 top-0 w-24 h-24 bg-violet-200/30 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
                        </div>
                    </div>
                )}
             </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="p-4">体系 (System)</th>
                      <th className="p-4 text-right">编制 (HC)</th>
                      <th className="p-4 text-right">在岗</th>
                      <th className="p-4 text-right">饱和度</th>
                      <th className="p-4">战略重心</th>
                      <th className="p-4 text-right">人均产出</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-blue-50 cursor-pointer" onClick={() => onSelectSystem && onSelectSystem('security', { openDrillDown: 'manpower' })}>
                      <td className="p-4 font-bold text-indigo-700">大安全 (Big Security)</td>
                      <td className="p-4 text-right text-slate-600">1,200</td>
                      <td className="p-4 text-right font-bold text-slate-800">1,180</td>
                      <td className="p-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">98%</span></td>
                      <td className="p-4 text-xs text-slate-500">XDR 3.0, 保护AI</td>
                      <td className="p-4 text-right font-mono">24.5</td>
                    </tr>
                    <tr className="hover:bg-blue-50 cursor-pointer" onClick={() => onSelectSystem && onSelectSystem('cloud', { openDrillDown: 'manpower' })}>
                      <td className="p-4 font-bold text-blue-600">大云 (Big Cloud)</td>
                      <td className="p-4 text-right text-slate-600">800</td>
                      <td className="p-4 text-right font-bold text-slate-800">790</td>
                      <td className="p-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">99%</span></td>
                      <td className="p-4 text-xs text-slate-500">托管云, HCI 市场下沉</td>
                      <td className="p-4 text-right font-mono">21.2</td>
                    </tr>
                    <tr className="hover:bg-blue-50 cursor-pointer" onClick={() => onSelectSystem && onSelectSystem('platform', { openDrillDown: 'manpower' })}>
                      <td className="p-4 font-bold text-emerald-600">研发平台 (Platform)</td>
                      <td className="p-4 text-right text-slate-600">450</td>
                      <td className="p-4 text-right font-bold text-slate-800">410</td>
                      <td className="p-4 text-right"><span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs">91%</span></td>
                      <td className="p-4 text-xs text-slate-500">天问大模型, 效能工具</td>
                      <td className="p-4 text-right font-mono">28.0</td>
                    </tr>
                    <tr className="hover:bg-blue-50 cursor-pointer" onClick={() => onSelectSystem && onSelectSystem('aibg', { openDrillDown: 'manpower' })}>
                      <td className="p-4 font-bold text-violet-600">AI 体系 (AI BG) <span className="text-[10px] text-white bg-red-500 px-1 rounded ml-1">New</span></td>
                      <td className="p-4 text-right text-slate-600">600</td>
                      <td className="p-4 text-right font-bold text-slate-800">600</td>
                      <td className="p-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">100%</span></td>
                      <td className="p-4 text-xs text-slate-500">销售数字人, 具身智能</td>
                      <td className="p-4 text-right font-mono">--</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
         );
       }
       case 'cycle': {
         return (
            <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
               <tr>
                 <th className="p-4">体系/产线</th>
                 <th className="p-4 text-right">平均上市周期 (TTM)</th>
                 <th className="p-4 text-right">同比变化</th>
                 <th className="p-4">发布频率 (次/年)</th>
                 <th className="p-4">瓶颈阶段</th>
                 <th className="p-4">改进措施</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-bold text-indigo-700">大安全 - XDR</td>
                 <td className="p-4 text-right font-mono font-bold text-slate-800">8.2 月</td>
                 <td className="p-4 text-right"><span className="text-green-600 text-xs font-bold">-12%</span></td>
                 <td className="p-4">2 Major / 4 Minor</td>
                 <td className="p-4 text-xs text-slate-500">TR4-TR5 测试验证</td>
                 <td className="p-4 text-xs text-indigo-600">引入自动化测试流水线</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">大云 - HCI</td>
                 <td className="p-4 text-right font-mono font-bold text-slate-800">6.5 月</td>
                 <td className="p-4 text-right"><span className="text-green-600 text-xs font-bold">-5%</span></td>
                 <td className="p-4">4 Major / 8 Minor</td>
                 <td className="p-4 text-xs text-slate-500">DCP2 立项审批</td>
                 <td className="p-4 text-xs text-indigo-600">流程裁减 (Lite IPD)</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">研发平台 - 天问AI</td>
                 <td className="p-4 text-right font-mono font-bold text-slate-800">3.0 月</td>
                 <td className="p-4 text-right"><span className="text-green-600 text-xs font-bold">-20%</span></td>
                 <td className="p-4">12 Major (Agile)</td>
                 <td className="p-4 text-xs text-slate-500">算力资源调度</td>
                 <td className="p-4 text-xs text-indigo-600">模型训练推理一体化优化</td>
               </tr>
             </tbody>
           </table>
         );
       }
       case 'competitiveness': {
         // Detailed Competitiveness Matrix based on user data
         const compData = [
             { name: '大安全 - XDR', h2: '认可', h1: '认可', trend: '持平' },
             { name: '大安全 - AC', h2: '一般', h1: '一般', trend: '提升' },
             { name: '大安全 - AF', h2: '基本认可', h1: '基本认可', trend: '提升 (质量拉动)' },
             { name: '大云 - HCI', h2: '认可', h1: '认可', trend: '持平' },
             { name: '大云 - EDS', h2: '认可', h1: '认可', trend: '持平' },
             { name: '大云 - MSP', h2: '基本认可', h1: '认可', trend: '下降' },
             { name: '平台 - 天问AI', h2: '基本认可', h1: '基本认可', trend: '下降' },
             { name: '平台 - DevOps', h2: '一般', h1: '一般', trend: '持平' },
             { name: '平台 - 基础架构', h2: 'NA', h1: 'NA', trend: '/' },
             { name: 'AI BG - 数字人', h2: 'NA', h1: 'NA', trend: '/' },
             { name: 'AI BG - 机器人', h2: '基本认可', h1: '基本认可', trend: '提升' },
             { name: '大云 - AD', h2: '基本认可', h1: '基本认可', trend: '下降' },
             { name: '创新 - SSL VPN', h2: 'NA', h1: 'NA', trend: '/' },
             { name: '创新 - 零信任', h2: '不认可', h1: '一般', trend: '下降' },
             { name: '其它组件', h2: '不认可', h1: '不认可', trend: '下降' }
         ];

         return (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b-2 border-slate-300">
                        <tr>
                            <th className="p-3 border-r border-slate-200">产线 / 产品</th>
                            <th className="p-3 text-center border-r border-slate-200">2025 H2 竞争力档位</th>
                            <th className="p-3 text-center border-r border-slate-200 bg-slate-200/50">2025 H1 竞争力档位</th>
                            <th className="p-3 text-center">竞争力趋势 2025H2VS2025H1</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {compData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 font-medium text-slate-700 border-r border-slate-100">{row.name}</td>
                                <td className="p-3 text-center border-r border-slate-100">
                                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                                        row.h2 === '认可' ? 'bg-green-100 text-green-700' :
                                        row.h2 === '基本认可' ? 'bg-blue-50 text-blue-700' :
                                        row.h2 === '一般' ? 'bg-amber-50 text-amber-700' :
                                        row.h2 === '不认可' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {row.h2}
                                    </span>
                                </td>
                                <td className="p-3 text-center border-r border-slate-100 bg-slate-50/30">
                                     <span className={`px-3 py-1 rounded text-xs font-medium ${
                                        row.h1 === '认可' ? 'text-green-600' :
                                        row.h1 === '基本认可' ? 'text-blue-600' :
                                        row.h1 === '一般' ? 'text-amber-600' :
                                        row.h1 === '不认可' ? 'text-red-600' : 'text-slate-400'
                                    }`}>
                                        {row.h1}
                                    </span>
                                </td>
                                <td className={`p-3 text-center font-bold ${
                                    row.trend.includes('提升') ? 'bg-[#92D050] text-slate-900' :
                                    row.trend.includes('下降') ? 'bg-red-500 text-white' :
                                    'text-slate-500'
                                }`}>
                                    {row.trend}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="p-3 bg-yellow-50 text-xs text-yellow-700 border-t border-yellow-100 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>说明：竞争力档位分为 认可、基本认可、一般、不认可。趋势基于两期档位变化评估。</span>
                </div>
            </div>
         );
       }
       case 'satisfaction': {
         const satData = [
             { name: '大安全 - XDR', ext: 90.70, int: 89.42, total: 90.06, grade: '满意', rank: 1, trend: '持平' },
             { name: '大安全 - AC', ext: 95.31, int: 83.92, total: 89.61, grade: '基本满意', rank: 2, trend: '持平' },
             { name: '大安全 - AF', ext: 95.29, int: 81.88, total: 88.59, grade: '基本满意', rank: 3, trend: '持平' },
             { name: '大云 - HCI', ext: 92.63, int: 82.27, total: 87.45, grade: '基本满意', rank: 4, trend: '持平' },
             { name: '大云 - EDS', ext: 92.61, int: 82.28, total: 87.44, grade: '基本满意', rank: 5, trend: '持平' },
             { name: '大云 - MSP', ext: 92.39, int: 79.72, total: 86.06, grade: '基本满意', rank: 6, trend: '持平' },
             { name: '平台 - 天问AI', ext: 90.72, int: 80.51, total: 85.61, grade: '基本满意', rank: 7, trend: '持平' },
             { name: '平台 - DevOps', ext: 89.00, int: 82.18, total: 85.59, grade: '基本满意', rank: 8, trend: '持平' },
             { name: '平台 - 基础架构', ext: 86.78, int: 81.82, total: 84.30, grade: '满意一般', rank: 9, trend: '持平' },
             { name: 'AI BG - 数字人', ext: 91.50, int: 76.21, total: 83.86, grade: '满意一般', rank: 10, trend: '持平' },
             { name: 'AI BG - 机器人', ext: 83.90, int: 78.57, total: 81.24, grade: '满意一般', rank: 11, trend: '持平' },
             { name: '大云 - AD', ext: 88.09, int: 74.00, total: 81.05, grade: '满意一般', rank: 12, trend: '持平' },
             { name: '创新 - SSL VPN', ext: 90.77, int: 71.15, total: 80.96, grade: '满意一般', rank: 13, trend: '持平' },
             { name: '创新 - 零信任', ext: 92.00, int: 68.42, total: 80.21, grade: '满意一般', rank: 14, trend: '持平' },
             { name: '其它组件', ext: 92.12, int: 68.07, total: 80.10, grade: '满意一般', rank: 15, trend: '提升' }
         ];

         return (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b-2 border-slate-300">
                        <tr>
                            <th className="p-3 border-r border-slate-200">产线 / 部门</th>
                            <th className="p-3 text-right border-r border-slate-200">外部满意度</th>
                            <th className="p-3 text-right border-r border-slate-200">内部满意度</th>
                            <th className="p-3 text-right border-r border-slate-200 bg-slate-200">整体满意度</th>
                            <th className="p-3 text-center border-r border-slate-200">档位</th>
                            <th className="p-3 text-center border-r border-slate-200">排名</th>
                            <th className="p-3 text-center">满意度趋势 (VS H1)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {satData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 font-medium text-slate-700 border-r border-slate-100">{row.name}</td>
                                <td className="p-3 text-right font-mono text-slate-600 border-r border-slate-100">{row.ext.toFixed(2)}</td>
                                <td className="p-3 text-right font-mono text-slate-600 border-r border-slate-100">{row.int.toFixed(2)}</td>
                                <td className="p-3 text-right font-mono font-bold text-slate-800 border-r border-slate-100 bg-slate-50">{row.total.toFixed(2)}</td>
                                <td className="p-3 text-center border-r border-slate-100">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                        row.grade === '满意' ? 'text-green-700 bg-green-50' :
                                        row.grade === '基本满意' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 bg-slate-100'
                                    }`}>
                                        {row.grade}
                                    </span>
                                </td>
                                <td className="p-3 text-center font-mono border-r border-slate-100">{row.rank}</td>
                                <td className={`p-3 text-center font-medium ${row.trend === '提升' ? 'bg-[#92D050] text-black' : 'text-slate-500'}`}>
                                    {row.trend}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-3 bg-yellow-50 text-xs text-yellow-700 border-t border-yellow-100 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>说明：整体满意度 = (外部满意度 + 内部满意度) / 2。档位划分：&gt;90为满意，85-90为基本满意，&lt;85为满意一般。</span>
                </div>
            </div>
         );
       }
      default:
        return <div className="p-8 text-center text-slate-500">暂无数据</div>;
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-indigo-600 rounded-full" />
            <h2 className="text-lg font-bold text-slate-800">集团组合概览 (Portfolio Overview)</h2>
        </div>
        <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">统计范围: 全集团 | 2024 YTD</div>
      </div>

      {/* 8-Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-[220px]">
        
        {/* 1. Manpower Investment */}
        <DashboardWidget 
          title="人力投入分布 (Manpower)" 
          icon={<Briefcase className="w-4 h-4" />}
          className="xl:col-span-2"
          onClick={() => setActiveDrillDown('manpower')}
        >
           <div className="flex flex-col h-full justify-center gap-4">
              <div className="flex justify-between items-end mb-1">
                 <div>
                    <span className="text-2xl font-bold text-slate-800">3,050</span>
                    <span className="text-xs text-slate-500 ml-1">研发总人数 (HC)</span>
                 </div>
                 <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">重心: 大安全体系</div>
              </div>

              {/* Stacked Bar for Systems */}
              <div className="w-full h-12 flex rounded-lg overflow-hidden border border-white shadow-sm cursor-pointer">
                 {/* Security */}
                 <div 
                    className="h-full bg-indigo-600 w-[40%] flex items-center justify-center text-white text-xs font-bold relative group/h1 hover:opacity-90 transition-opacity" 
                    title="大安全体系"
                    onClick={(e) => { e.stopPropagation(); onSelectSystem && onSelectSystem('security'); }}
                 >
                    大安全: 40%
                 </div>
                 {/* Cloud */}
                 <div 
                    className="h-full bg-blue-500 w-[25%] flex items-center justify-center text-white text-xs font-bold relative group/h2 hover:opacity-90 transition-opacity" 
                    title="大云体系"
                    onClick={(e) => { e.stopPropagation(); onSelectSystem && onSelectSystem('cloud'); }}
                 >
                    大云: 25%
                 </div>
                 {/* Platform */}
                 <div 
                    className="h-full bg-emerald-500 w-[15%] flex items-center justify-center text-white text-xs font-bold relative group/h3 hover:opacity-90 transition-opacity" 
                    title="研发平台"
                    onClick={(e) => { e.stopPropagation(); onSelectSystem && onSelectSystem('platform'); }}
                 >
                    平台: 15%
                 </div>
                  {/* AI BG */}
                 <div 
                    className="h-full bg-violet-500 w-[20%] flex items-center justify-center text-white text-xs font-bold relative group/h4 hover:opacity-90 transition-opacity" 
                    title="AI 体系"
                    onClick={(e) => { e.stopPropagation(); onSelectSystem && onSelectSystem('aibg'); }}
                 >
                    AI: 20%
                 </div>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-indigo-600 rounded-full"></div> 大安全</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 大云</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> 平台</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-violet-500 rounded-full"></div> AI 体系</span>
              </div>
           </div>
        </DashboardWidget>

        {/* 2. Active Projects */}
        <DashboardWidget
           title="在研项目总览 (Active Projects)"
           icon={<LayoutGrid className="w-4 h-4" />}
           className="xl:col-span-2"
           onClick={() => setActiveDrillDown('active_projects')}
        >
           <div className="flex items-center justify-between h-full px-2">
              <div className="flex flex-col justify-center gap-3 border-r border-slate-100 pr-6">
                 <div>
                    <div className="text-3xl font-bold text-slate-800">142</div>
                    <div className="text-xs text-slate-500">在研项目总数</div>
                 </div>
                 <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                       <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                       <span className="font-bold text-emerald-700">112 正常</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                       <span className="font-bold text-amber-700">20 预警</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                       <span className="font-bold text-red-700">10 风险</span>
                    </div>
                 </div>
              </div>

              <div className="flex-1 pl-6">
                 <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">近期重点里程碑</div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                            XDR v3.0 发布
                            <span className="bg-red-50 text-red-600 text-[8px] px-1 rounded border border-red-100 flex items-center"><Flag className="w-2 h-2 fill-red-600 mr-0.5" /> 山头</span>
                          </span>
                          <span className="text-[10px] text-slate-400">TR6 验收评审</span>
                       </div>
                       <div className="text-xs font-mono text-slate-600">5天后</div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">托管云数据库 RDS</span>
                          <span className="text-[10px] text-slate-400">Beta 局点上线</span>
                       </div>
                       <div className="text-xs font-mono text-amber-600">今日</div>
                    </div>
                 </div>
              </div>
           </div>
        </DashboardWidget>

        {/* 3. Efficiency */}
        <DashboardWidget 
          title="研发效率 (Efficiency)" 
          icon={<Activity className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('cycle')}
        >
           <div className="flex flex-col gap-2 h-full justify-center">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-800">8.5</span>
                <span className="text-sm text-slate-500">月</span>
              </div>
              <div className="text-xs text-slate-500 mb-2">全集团平均上市周期 (TTM)</div>
              
              <div className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-100">
                 <TrendingDown className="w-4 h-4 text-green-600" />
                 <span className="text-green-600 font-bold">-5%</span>
                 <span className="text-slate-400">同比缩短</span>
              </div>
           </div>
        </DashboardWidget>

        {/* 4. Satisfaction */}
        <DashboardWidget
           title="客户满意度 (Satisfaction)"
           icon={<ThumbsUp className="w-4 h-4" />}
           onClick={() => setActiveDrillDown('satisfaction')}
        >
           <div className="flex flex-col h-full justify-center">
              <div className="flex justify-between items-end mb-2">
                 <span className="text-xs text-slate-500 flex items-center gap-1">集团 VOC</span>
                 <span className="text-2xl font-bold text-emerald-600">92%</span>
              </div>
              
              <div className="flex items-end justify-between h-12 gap-1 mb-2">
                 {[60, 70, 65, 80, 92].map((h, i) => (
                    <div key={i} className={`w-full bg-emerald-${200 + i*100} rounded-t-sm`} style={{ height: `${h}%` }}></div>
                 ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                 <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">NPS 净推荐值</span>
                    <span className="text-sm font-bold text-slate-700">+58</span>
                 </div>
                 <div className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-medium">
                    持续提升
                 </div>
              </div>
           </div>
        </DashboardWidget>

        {/* 5. Competitiveness */}
        <DashboardWidget
           title="产品竞争力 (Competitiveness)"
           icon={<Trophy className="w-4 h-4" />}
           className="xl:col-span-2"
           onClick={() => setActiveDrillDown('competitiveness')}
        >
           <div className="grid grid-cols-2 gap-4 h-full items-center">
              <div className="flex flex-col justify-center border-r border-slate-100 pr-4">
                 <div className="flex justify-between items-end mb-3">
                    <span className="text-xs text-slate-500">综合评分</span>
                    <div className="flex items-baseline gap-1">
                       <span className="text-4xl font-bold text-slate-800">4.7</span>
                       <span className="text-sm text-slate-400">/5</span>
                    </div>
                 </div>
                 <div className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded">
                    主要短板: 生态丰富度
                 </div>
              </div>
              
              <div className="space-y-3 pl-2">
                 <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> 领跑者</span>
                    <span className="font-bold text-slate-700 text-sm">8 个</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 挑战者</span>
                    <span className="font-bold text-slate-700 text-sm">3 个</span>
                 </div>
              </div>
           </div>
        </DashboardWidget>

      </div>

      <PortfolioDrillDownModal
        title={
            activeDrillDown === 'market' ? '市场地位 & 客户健康度' :
            activeDrillDown === 'manpower' ? '人力资源投入分布详情' :
            activeDrillDown === 'active_projects' ? '在研项目健康度大盘' : 
            activeDrillDown === 'cycle' ? '研发效率 TTM 分析' : 
            activeDrillDown === 'quality' ? '集团质量红线监控' : 
            activeDrillDown === 'resources' ? '关键资源池负载详情' : 
            activeDrillDown === 'competitiveness' ? '产品竞争力雷达' : 
            activeDrillDown === 'satisfaction' ? '客户满意度 (VOC) 分析' : ''
        }
        isOpen={!!activeDrillDown}
        onClose={() => setActiveDrillDown(null)}
      >
        {renderDrillDownContent()}
      </PortfolioDrillDownModal>

    </div>
  );
};
