import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Layers, Target, Activity, ArrowRight, Wallet, Zap, BarChart, ChevronRight, X, Search, Filter, AlertTriangle, Globe, Users, ShieldAlert, Scale, BrainCircuit, Trophy, Star, ThumbsUp, Heart, Briefcase, LayoutGrid, AlertCircle, CheckCircle2, Flag, Timer, Gauge, BookOpen } from 'lucide-react';
import { PROJECTS_LIST } from '../constants';
import { Project } from '../types';

interface PortfolioDashboardProps {
  onSelectProject: (project: Project) => void;
}

// Reusable Widget Container (Kept consistent with ProductDashboard style)
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
              <Filter className="w-3 h-3" /> 筛选年份: 2024
           </button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ onSelectProject }) => {
  const [activeDrillDown, setActiveDrillDown] = useState<string | null>(null);

  const isHilltopProject = (project: Project) => {
      // Mock logic: assign first two projects as "Hilltop" for demo
      return project.id === 'PRJ-2024-001' || project.id === 'PRJ-2024-002';
  };

  const renderDrillDownContent = () => {
    switch (activeDrillDown) {
       case 'active_projects':
         return (
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
               <tr>
                 <th className="p-4">项目名称</th>
                 <th className="p-4">所属项目集/部门</th>
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
                     <td className="p-4 text-slate-600">{project.projectSet || '行业产品部'}</td>
                     
                     <td className="p-4">
                        {/* Mock Stage based on progress */}
                        {project.progress > 80 ? 
                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">上市发布 (DCP5)</span> :
                         project.progress > 50 ? 
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">验证 (TR5)</span> :
                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">开发 (TR4)</span>
                        }
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
       case 'manpower':
         return (
          <div className="space-y-6 p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
               <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <div className="text-indigo-600 text-xs font-bold uppercase">总编制 (Headcount)</div>
                  <div className="text-2xl font-bold text-indigo-900 mt-1">850</div>
               </div>
               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-blue-600 text-xs font-bold uppercase">在岗人数</div>
                  <div className="text-2xl font-bold text-blue-900 mt-1">820</div>
               </div>
               <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-emerald-600 text-xs font-bold uppercase">战略投入占比</div>
                  <div className="text-2xl font-bold text-emerald-900 mt-1">65%</div>
               </div>
               <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="text-amber-600 text-xs font-bold uppercase">空缺率</div>
                  <div className="text-2xl font-bold text-amber-900 mt-1">3.5%</div>
               </div>
            </div>

            {/* Department Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="p-4">部门名称</th>
                      <th className="p-4 text-right">编制 (HC)</th>
                      <th className="p-4 text-right">在岗</th>
                      <th className="p-4 text-right">饱和度</th>
                      <th className="p-4">关键职责</th>
                      <th className="p-4 text-right">人均产出 (KLoc/Year)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-4 font-bold text-slate-700">平台架构部</td>
                      <td className="p-4 text-right text-slate-600">300</td>
                      <td className="p-4 text-right font-bold text-slate-800">285</td>
                      <td className="p-4 text-right"><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">95%</span></td>
                      <td className="p-4 text-xs text-slate-500">AICP 核心底座，中间件平台</td>
                      <td className="p-4 text-right font-mono">24.5</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-700">行业产品部</td>
                      <td className="p-4 text-right text-slate-600">400</td>
                      <td className="p-4 text-right font-bold text-slate-800">410</td>
                      <td className="p-4 text-right"><span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">102% (超编)</span></td>
                      <td className="p-4 text-xs text-slate-500">金融、能源行业应用定制</td>
                      <td className="p-4 text-right font-mono">18.2</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-700">创新业务部</td>
                      <td className="p-4 text-right text-slate-600">120</td>
                      <td className="p-4 text-right font-bold text-slate-800">125</td>
                      <td className="p-4 text-right"><span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs">104% (饱和)</span></td>
                      <td className="p-4 text-xs text-slate-500">IoT 边缘计算，新赛道探索</td>
                      <td className="p-4 text-right font-mono">22.0</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
         );
       case 'cycle':
         return (
            <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
               <tr>
                 <th className="p-4">产品线</th>
                 <th className="p-4 text-right">平均上市周期 (TTM)</th>
                 <th className="p-4 text-right">同比变化</th>
                 <th className="p-4">发布频率 (次/年)</th>
                 <th className="p-4">瓶颈阶段</th>
                 <th className="p-4">改进措施</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-bold text-indigo-700">AICP 核心平台</td>
                 <td className="p-4 text-right font-mono font-bold text-slate-800">8.2 月</td>
                 <td className="p-4 text-right"><span className="text-green-600 text-xs font-bold">-12%</span></td>
                 <td className="p-4">2 Major / 4 Minor</td>
                 <td className="p-4 text-xs text-slate-500">TR4-TR5 测试验证</td>
                 <td className="p-4 text-xs text-indigo-600">引入自动化测试流水线</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">IoT 边缘业务</td>
                 <td className="p-4 text-right font-mono font-bold text-slate-800">6.5 月</td>
                 <td className="p-4 text-right"><span className="text-green-600 text-xs font-bold">-5%</span></td>
                 <td className="p-4">4 Major / 8 Minor</td>
                 <td className="p-4 text-xs text-slate-500">DCP2 立项审批</td>
                 <td className="p-4 text-xs text-indigo-600">流程裁减 (Lite IPD)</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">大数据中间件</td>
                 <td className="p-4 text-right font-mono font-bold text-slate-800">11.0 月</td>
                 <td className="p-4 text-right"><span className="text-red-600 text-xs font-bold">+8%</span></td>
                 <td className="p-4">1 Major / 2 Minor</td>
                 <td className="p-4 text-xs text-slate-500">需求澄清与变更</td>
                 <td className="p-4 text-xs text-indigo-600">加强 IPD-R 需求管理</td>
               </tr>
             </tbody>
           </table>
         );
       case 'competitiveness':
         return (
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
               <tr>
                 <th className="p-4">产品线</th>
                 <th className="p-4 text-right">竞争力评分 (1-5)</th>
                 <th className="p-4">市场地位</th>
                 <th className="p-4">最强竞对</th>
                 <th className="p-4">主要差距/短板</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-bold text-indigo-700">AICP 核心平台</td>
                 <td className="p-4 text-right font-mono text-lg font-bold">4.9</td>
                 <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">领跑者 (Leader)</span></td>
                 <td className="p-4">Competitor A (4.5)</td>
                 <td className="p-4 text-xs text-slate-500">多云管理控制台交互体验</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">IoT 边缘业务</td>
                 <td className="p-4 text-right font-mono text-lg font-bold">4.7</td>
                 <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">领跑者 (Leader)</span></td>
                 <td className="p-4">Competitor C (4.6)</td>
                 <td className="p-4 text-xs text-slate-500">南向协议驱动生态数量</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">大数据中间件</td>
                 <td className="p-4 text-right font-mono text-lg font-bold text-amber-600">4.2</td>
                 <td className="p-4"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">挑战者 (Challenger)</span></td>
                 <td className="p-4">Competitor B (4.8)</td>
                 <td className="p-4 text-xs text-slate-500">高并发场景下的吞吐量性能</td>
               </tr>
             </tbody>
           </table>
         );
       case 'satisfaction':
         return (
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
               <tr>
                 <th className="p-4">产品线</th>
                 <th className="p-4 text-right">VOC 满意度 (100)</th>
                 <th className="p-4 text-right">NPS 净推荐值</th>
                 <th className="p-4">主要好评</th>
                 <th className="p-4">主要槽点 (Top Complaint)</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-bold text-indigo-700">AICP 核心平台</td>
                 <td className="p-4 text-right font-mono font-bold text-green-600">95%</td>
                 <td className="p-4 text-right font-mono font-bold text-green-600">+58</td>
                 <td className="p-4 text-xs text-slate-500">稳定性极高，服务响应快</td>
                 <td className="p-4 text-xs text-slate-500">部分配置过于复杂，文档不全</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">IoT 边缘业务</td>
                 <td className="p-4 text-right font-mono font-bold text-emerald-600">92%</td>
                 <td className="p-4 text-right font-mono font-bold text-emerald-600">+45</td>
                 <td className="p-4 text-xs text-slate-500">硬件兼容性好，部署快</td>
                 <td className="p-4 text-xs text-slate-500">云边协同网络偶尔不稳定</td>
               </tr>
               <tr>
                 <td className="p-4 font-bold text-slate-700">大数据中间件</td>
                 <td className="p-4 text-right font-mono font-bold text-amber-600">85%</td>
                 <td className="p-4 text-right font-mono font-bold text-amber-600">+20</td>
                 <td className="p-4 text-xs text-slate-500">功能覆盖全</td>
                 <td className="p-4 text-xs text-slate-500">UI 界面老旧，操作卡顿</td>
               </tr>
             </tbody>
           </table>
         );
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
        
        {/* 1. 人力资源投入 (Manpower) [ROW 1, LEFT] */}
        <DashboardWidget 
          title="人力投入分布 (Manpower)" 
          icon={<Briefcase className="w-4 h-4" />}
          className="xl:col-span-2"
          onClick={() => setActiveDrillDown('manpower')}
        >
           <div className="flex flex-col h-full justify-center gap-4">
              <div className="flex justify-between items-end mb-1">
                 <div>
                    <span className="text-2xl font-bold text-slate-800">820</span>
                    <span className="text-xs text-slate-500 ml-1">研发总人数 (HC)</span>
                 </div>
                 <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">重心: 行业产品落地</div>
              </div>

              {/* Stacked Bar for Departments */}
              <div className="w-full h-12 flex rounded-lg overflow-hidden border border-white shadow-sm">
                 <div className="h-full bg-indigo-600 w-[35%] flex items-center justify-center text-white text-xs font-bold relative group/h1" title="平台架构部">
                    平台: 35%
                 </div>
                 <div className="h-full bg-blue-500 w-[50%] flex items-center justify-center text-white text-xs font-bold relative group/h2" title="行业产品部">
                    行业: 50%
                 </div>
                 <div className="h-full bg-emerald-500 w-[15%] flex items-center justify-center text-white text-xs font-bold relative group/h3" title="创新业务部">
                    创新: 15%
                 </div>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-indigo-600 rounded-full"></div> 平台架构</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 行业产品</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> 创新业务</span>
              </div>
           </div>
        </DashboardWidget>

        {/* 2. 在研项目总览 (Active Projects) [ROW 1, RIGHT - NEW] */}
        <DashboardWidget
           title="在研项目总览 (Active Projects)"
           icon={<LayoutGrid className="w-4 h-4" />}
           className="xl:col-span-2"
           onClick={() => setActiveDrillDown('active_projects')}
        >
           <div className="flex items-center justify-between h-full px-2">
              {/* Left: Stats & Health */}
              <div className="flex flex-col justify-center gap-3 border-r border-slate-100 pr-6">
                 <div>
                    <div className="text-3xl font-bold text-slate-800">42</div>
                    <div className="text-xs text-slate-500">在研项目总数</div>
                 </div>
                 <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                       <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                       <span className="font-bold text-emerald-700">32 正常</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                       <span className="font-bold text-amber-700">7 预警</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                       <span className="font-bold text-red-700">3 风险</span>
                    </div>
                 </div>
              </div>

              {/* Right: Key Milestones */}
              <div className="flex-1 pl-6">
                 <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">近期重点里程碑</div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                            AICP v2.5 发布
                            <span className="bg-red-50 text-red-600 text-[8px] px-1 rounded border border-red-100 flex items-center"><Flag className="w-2 h-2 fill-red-600 mr-0.5" /> 山头</span>
                          </span>
                          <span className="text-[10px] text-slate-400">TR6 验收评审</span>
                       </div>
                       <div className="text-xs font-mono text-slate-600">5天后</div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">金融云 Pilot</span>
                          <span className="text-[10px] text-slate-400">Beta 局点上线</span>
                       </div>
                       <div className="text-xs font-mono text-amber-600">今日</div>
                    </div>
                 </div>
              </div>
           </div>
        </DashboardWidget>

        {/* 3. 研发效率 (Efficiency) [ROW 2, LEFT] */}
        <DashboardWidget 
          title="研发效率 (Efficiency)" 
          icon={<Activity className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('cycle')}
        >
           <div className="flex flex-col gap-2 h-full justify-center">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-800">9.2</span>
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

        {/* 4. Customer Satisfaction [ROW 2, MID] */}
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
              
              {/* Trend Visualization */}
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

        {/* 5. Product Competitiveness [ROW 2, RIGHT - 2 Cols] */}
        <DashboardWidget
           title="产品竞争力 (Competitiveness)"
           icon={<Trophy className="w-4 h-4" />}
           className="xl:col-span-2"
           onClick={() => setActiveDrillDown('competitiveness')}
        >
           <div className="grid grid-cols-2 gap-4 h-full items-center">
              {/* Left: Score */}
              <div className="flex flex-col justify-center border-r border-slate-100 pr-4">
                 <div className="flex justify-between items-end mb-3">
                    <span className="text-xs text-slate-500">综合评分</span>
                    <div className="flex items-baseline gap-1">
                       <span className="text-4xl font-bold text-slate-800">4.7</span>
                       <span className="text-sm text-slate-400">/5</span>
                    </div>
                 </div>
                 <div className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded">
                    主要短板: 用户体验 (UX)
                 </div>
              </div>
              
              {/* Right: Breakdown */}
              <div className="space-y-3 pl-2">
                 <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> 领跑者</span>
                    <span className="font-bold text-slate-700 text-sm">3 个</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 挑战者</span>
                    <span className="font-bold text-slate-700 text-sm">1 个</span>
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
