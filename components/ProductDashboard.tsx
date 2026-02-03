import React, { useState } from 'react';
import { PROJECTS_LIST } from '../constants';
import { ChevronRight, LayoutGrid, List, TrendingUp, TrendingDown, Target, Zap, Users, ShieldCheck, Repeat, Clock, Briefcase, PieChart, X, Search, Filter } from 'lucide-react';
import { Project } from '../types';

interface ProductDashboardProps {
  onSelectProject: (project: Project) => void;
}

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
             <div className="w-1 h-5 bg-blue-600 rounded-full" />
             <h3 className="text-lg font-bold text-slate-800">{title} - 详细分析</h3>
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

        <div className="flex-1 overflow-auto p-0">
          {children}
        </div>
        
        <div className="p-3 border-t border-slate-100 text-xs text-slate-400 flex justify-end bg-slate-50 rounded-b-xl">
           显示 1 - {React.Children.count(children) > 0 ? '10' : '0'} 条记录 (共 24 条)
        </div>
      </div>
    </div>
  );
};

export const ProductDashboard: React.FC<ProductDashboardProps> = ({ onSelectProject }) => {
  const [activeDrillDown, setActiveDrillDown] = useState<string | null>(null);

  // Helper to render table content based on drill-down type
  const renderDrillDownContent = () => {
    switch (activeDrillDown) {
      case 'competitiveness':
        return (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">评估维度</th>
                <th className="p-4">我司得分 (AICP)</th>
                <th className="p-4">主要竞对 (Competitor A)</th>
                <th className="p-4">主要竞对 (Competitor B)</th>
                <th className="p-4">差距分析</th>
                <th className="p-4">改进计划</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium">功能丰富度</td>
                <td className="p-4 text-blue-600 font-bold">4.9</td>
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
          <table className="w-full text-left text-sm">
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
          <table className="w-full text-left text-sm">
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
               {PROJECTS_LIST.map(p => (
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
          <table className="w-full text-left text-sm">
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
                 <td className="p-4 font-medium">AICP 核心平台</td>
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
                <tr>
                 <td className="p-4 font-medium">中间件 SaaS</td>
                 <td className="p-4 text-right text-slate-600">¥ 8,000,000</td>
                 <td className="p-4 text-right text-slate-600">¥ 15,000,000</td>
                 <td className="p-4 text-right font-bold text-slate-700">1 : 1.9</td>
                 <td className="p-4 text-right">40%</td>
                 <td className="p-4"><span className="text-slate-500 text-xs bg-slate-100 px-2 py-1 rounded">盈亏平衡</span></td>
               </tr>
            </tbody>
          </table>
        );
      case 'battlefield':
         return (
          <table className="w-full text-left text-sm">
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
                 <td className="p-4 font-medium text-blue-700">金融核心交易云化</td>
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
               <tr>
                 <td className="p-4 font-medium text-slate-500">自动驾驶车路协同</td>
                 <td className="p-4">吴杰茜</td>
                 <td className="p-4"><span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs">技术预研</span></td>
                 <td className="p-4 text-slate-600">--</td>
                 <td className="p-4">¥ 50亿+</td>
                 <td className="p-4 text-right">10%</td>
               </tr>
            </tbody>
          </table>
         );
      case 'quality':
         return (
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
              <tr>
                <th className="p-4">问题编号</th>
                <th className="p-4">严重级别</th>
                <th className="p-4 w-96">问题描述</th>
                <th className="p-4">来源</th>
                <th className="p-4">发现阶段</th>
                <th className="p-4">当前状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 font-mono text-slate-500">ISSUE-2024-882</td>
                 <td className="p-4"><span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-xs">S1 致命</span></td>
                 <td className="p-4">高并发场景下网关内存泄漏导致 OOM</td>
                 <td className="p-4">内部压测</td>
                 <td className="p-4">TR5 验收</td>
                 <td className="p-4"><span className="text-green-600 text-xs flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> 已闭环</span></td>
               </tr>
               <tr>
                 <td className="p-4 font-mono text-slate-500">ISSUE-2024-901</td>
                 <td className="p-4"><span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded text-xs">S2 严重</span></td>
                 <td className="p-4">控制台在 IE11 浏览器下部分按钮无法点击</td>
                 <td className="p-4">Beta客户</td>
                 <td className="p-4">Beta 发布</td>
                 <td className="p-4"><span className="text-amber-600 text-xs">修复中 (预计 2天)</span></td>
               </tr>
               <tr>
                 <td className="p-4 font-mono text-slate-500">ISSUE-2024-912</td>
                 <td className="p-4"><span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded text-xs">S2 严重</span></td>
                 <td className="p-4">数据库连接池在断网后重连机制失效</td>
                 <td className="p-4">现网 (SRE)</td>
                 <td className="p-4">已上市</td>
                 <td className="p-4"><span className="text-blue-600 text-xs">验证中</span></td>
               </tr>
            </tbody>
          </table>
         );
      case 'manpower':
         return (
           <table className="w-full text-left text-sm">
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
                 <td className="p-4 font-medium">平台架构部</td>
                 <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">技术平台</span></td>
                 <td className="p-4 text-right font-mono">84</td>
                 <td className="p-4 text-right font-mono">20%</td>
                 <td className="p-4 text-slate-600">AICP 核心调度器稳定性、异构算力适配</td>
               </tr>
               <tr>
                 <td className="p-4 font-medium">金融行业产品部</td>
                 <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">战略增长</span></td>
                 <td className="p-4 text-right font-mono">150</td>
                 <td className="p-4 text-right font-mono">35%</td>
                 <td className="p-4 text-slate-600">金融版特性开发、国产化数据库适配</td>
               </tr>
               <tr>
                 <td className="p-4 font-medium">IoT 创新业务部</td>
                 <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">战略增长</span></td>
                 <td className="p-4 text-right font-mono">120</td>
                 <td className="p-4 text-right font-mono">30%</td>
                 <td className="p-4 text-slate-600">边缘网关 Gen5、端侧推理引擎</td>
               </tr>
               <tr>
                 <td className="p-4 font-medium">维护与交付部</td>
                 <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">存量维护</span></td>
                 <td className="p-4 text-right font-mono">66</td>
                 <td className="p-4 text-right font-mono">15%</td>
                 <td className="p-4 text-slate-600">v1.x/v2.0 版本补丁、大客户定制交付</td>
               </tr>
            </tbody>
          </table>
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
                 <td className="p-4 font-medium text-blue-700">AICP v2.4.0</td>
                 <td className="p-4 text-xs">Major</td>
                 <td className="p-4 text-slate-600">2024-Q2 (Plan)</td>
                 <td className="p-4 text-center font-bold text-blue-600">68%</td>
                 <td className="p-4">12</td>
                 <td className="p-4"><span className="bg-slate-100 text-slate-400 text-xs px-2 py-1 rounded">待发布</span></td>
               </tr>
               <tr>
                 <td className="p-4 font-medium text-slate-700">AICP v2.3.0</td>
                 <td className="p-4 text-xs">Minor</td>
                 <td className="p-4 text-slate-600">2023-12-20</td>
                 <td className="p-4 text-center font-bold text-slate-600">65%</td>
                 <td className="p-4">5</td>
                 <td className="p-4"><span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">热销中</span></td>
               </tr>
               <tr>
                 <td className="p-4 font-medium text-slate-700">IoT OS v5.0</td>
                 <td className="p-4 text-xs">Major</td>
                 <td className="p-4 text-slate-600">2023-10-15</td>
                 <td className="p-4 text-center font-bold text-slate-600">60%</td>
                 <td className="p-4">8</td>
                 <td className="p-4"><span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">热销中</span></td>
               </tr>
            </tbody>
          </table>
         );
      default:
        return <div className="p-8 text-center text-slate-500">暂无详细数据</div>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-bold text-slate-800">AICP 产品线 - 商业结果仪表盘</h2>
        </div>
        <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">统计周期: 2024 YTD</div>
      </div>

      {/* 8-Grid Dashboard Layout - All clickable now */}
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
                  <div className="text-3xl font-bold text-slate-800">No.1</div>
                  <div className="text-xs text-slate-500 mt-1">综合市场评价</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600 flex items-center gap-1 justify-end">
                    <TrendingUp className="w-3 h-3" /> 领先竞对
                  </div>
                  <div className="text-xs text-slate-400">Gartner 象限</div>
                </div>
             </div>
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 group-hover:bg-blue-50/30 transition-colors">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-600">VOC 满意度评分</span>
                 <span className="font-bold text-blue-700">92.5 <span className="text-[10px] text-slate-400 font-normal">/100</span></span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-600">NPS 净推荐值</span>
                 <span className="font-bold text-blue-700">+58</span>
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
             <span className="text-3xl font-bold text-slate-800">8.5</span>
             <span className="text-sm text-slate-500">月 (平均 TTM)</span>
             <span className="ml-auto text-xs text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
               <TrendingDown className="w-3 h-3 mr-1" /> 同比缩短 12%
             </span>
           </div>
           <div className="flex-1 overflow-auto pointer-events-none">
             {/* Note: In a real app we might allow clicking rows inside, but parent click handles drill down here */}
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
                 <tr>
                   <td className="p-2 font-medium">AICP 2.4 计算平台</td>
                   <td className="p-2 text-slate-500">23Q4 - 24Q2</td>
                   <td className="p-2 text-right font-mono">8.2</td>
                   <td className="p-2 text-center"><span className="text-green-600 bg-green-50 px-1 rounded">达标</span></td>
                 </tr>
                 <tr>
                   <td className="p-2 font-medium">IoT 网关 Gen5</td>
                   <td className="p-2 text-slate-500">24Q1 - 24Q3</td>
                   <td className="p-2 text-right font-mono">6.5</td>
                   <td className="p-2 text-center"><span className="text-green-600 bg-green-50 px-1 rounded">优异</span></td>
                 </tr>
                 <tr>
                   <td className="p-2 font-medium">云原生中间件 V2</td>
                   <td className="p-2 text-slate-500">23Q3 - 24Q3</td>
                   <td className="p-2 text-right font-mono text-red-500">11.0</td>
                   <td className="p-2 text-center"><span className="text-red-600 bg-red-50 px-1 rounded">超期</span></td>
                 </tr>
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
                    <div className="text-3xl font-extrabold text-blue-900">1:4.2</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">投入产出比</div>
                 </div>
              </div>
              <div className="flex w-full justify-between px-4 mt-2 text-xs text-slate-500">
                 <div>投入: ¥50M</div>
                 <div>预估营收: ¥210M</div>
              </div>
           </div>
        </DashboardWidget>

        {/* 5. 产品年度新战场突破数 */}
        <DashboardWidget 
          title="新战场/新机会点突破" 
          icon={<Zap className="w-4 h-4" />} 
          className="xl:col-span-2"
          onClick={() => setActiveDrillDown('battlefield')}
        >
           <div className="flex items-center gap-4 mb-3">
             <div className="flex-1">
               <div className="flex justify-between text-sm mb-1">
                 <span className="font-semibold text-slate-700">年度目标完成率</span>
                 <span className="font-bold text-blue-600">1 / 5</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-[20%] rounded-full"></div>
               </div>
             </div>
           </div>
           
           <div className="flex-1 overflow-auto pointer-events-none">
             <table className="w-full text-xs text-left">
               <thead className="text-slate-400 font-medium bg-slate-50 sticky top-0">
                 <tr>
                   <th className="p-2">战场/机会点</th>
                   <th className="p-2">承载项目</th>
                   <th className="p-2">进展</th>
                   <th className="p-2 text-right">市场认可度</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 <tr>
                   <td className="p-2 font-medium text-blue-800">金融核心交易云化</td>
                   <td className="p-2">AICP 金融版</td>
                   <td className="p-2"><span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Pilot验证</span></td>
                   <td className="p-2 text-right">高 (Top3银行)</td>
                 </tr>
                 <tr>
                   <td className="p-2 font-medium text-slate-700">边缘计算节点</td>
                   <td className="p-2">IoT Gateway Gen5</td>
                   <td className="p-2"><span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">已上市</span></td>
                   <td className="p-2 text-right">中 (试用中)</td>
                 </tr>
                  <tr>
                   <td className="p-2 font-medium text-slate-400">自动驾驶算力</td>
                   <td className="p-2 text-slate-400">--</td>
                   <td className="p-2"><span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">预研中</span></td>
                   <td className="p-2 text-right">--</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </DashboardWidget>

        {/* 6. 年度关键质量问题闭环 */}
        <DashboardWidget 
          title="关键质量问题闭环" 
          icon={<ShieldCheck className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('quality')}
        >
           <div className="flex flex-col h-full justify-between py-1">
             <div className="flex items-end gap-2">
               <span className="text-4xl font-bold text-slate-800">12</span>
               <span className="text-lg text-slate-400 mb-1">/ 15</span>
               <span className="text-xs text-slate-500 mb-2 ml-auto">年度累计 TopN</span>
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

        {/* 7. 产品大价值版本发布频率 + 复用度 */}
        <DashboardWidget 
          title="版本频率 & 平台复用" 
          icon={<Repeat className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('version')}
        >
           <div className="grid grid-cols-2 gap-2 h-full">
              <div className="bg-slate-50 rounded p-2 flex flex-col justify-center items-center text-center border border-slate-100 group-hover:bg-blue-50/20 transition-colors">
                 <div className="text-xs text-slate-500 mb-1">大版本/年</div>
                 <div className="text-2xl font-bold text-slate-800">2.0</div>
                 <div className="text-[10px] text-green-600">达标</div>
              </div>
              <div className="bg-slate-50 rounded p-2 flex flex-col justify-center items-center text-center border border-slate-100 group-hover:bg-blue-50/20 transition-colors">
                 <div className="text-xs text-slate-500 mb-1">中台复用度</div>
                 <div className="text-2xl font-bold text-blue-700">68%</div>
                 <div className="text-[10px] text-slate-400">目标: 70%</div>
              </div>
              <div className="col-span-2 mt-auto">
                 <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>版本密度</span>
                    <span className="text-blue-600">适中</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-3/4 h-full rounded-full"></div>
                 </div>
              </div>
           </div>
        </DashboardWidget>

        {/* 8. 人力投资地图 */}
        <DashboardWidget 
          title="人力资源投资地图" 
          icon={<Briefcase className="w-4 h-4" />}
          onClick={() => setActiveDrillDown('manpower')}
        >
          <div className="flex flex-col h-full justify-between">
             <div className="flex justify-between items-end mb-2">
                <div>
                   <div className="text-3xl font-bold text-slate-800">420<span className="text-sm font-normal text-slate-500 ml-1">人</span></div>
                   <div className="text-xs text-slate-400">研发人员总数</div>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-blue-600">65%</div>
                   <div className="text-[10px] text-slate-400">战略增长投入</div>
                </div>
             </div>

             {/* The Visual Treemap-style Bar */}
             <div className="flex h-12 w-full gap-1 mb-2">
                <div className="bg-blue-600 h-full w-[65%] rounded-l-md p-2 text-white text-xs relative flex flex-col justify-center group-hover:bg-blue-700 transition-colors">
                   <span className="font-bold scale-90 origin-left">战略增长</span>
                   <div className="absolute top-1 right-2 text-lg font-bold opacity-30">65%</div>
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
              {PROJECTS_LIST.map((proj, idx) => (
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
              ))}
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
            activeDrillDown === 'quality' ? '关键质量问题清单' :
            activeDrillDown === 'version' ? '版本发布与复用统计' :
            activeDrillDown === 'manpower' ? '人力资源分布详情' : ''
          }
          isOpen={!!activeDrillDown} 
          onClose={() => setActiveDrillDown(null)}
        >
          {renderDrillDownContent()}
        </DrillDownModal>

      </section>
    </div>
  );
};
