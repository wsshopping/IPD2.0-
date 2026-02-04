import React, { useState } from 'react';
import { Network, Layers, Server, ShieldCheck, Zap, ChevronRight, Activity, Users, Box, ArrowRight, X, Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SystemLevelDashboardProps {
  onSelectProductLine: () => void;
  systemId?: string; // 'security' | 'cloud' | 'platform'
  onSelectSystem?: (id: string) => void;
}

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
             <h3 className="text-lg font-bold text-slate-800">{title} - 体系级透视</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex gap-2">
           <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
              <input type="text" placeholder="在体系内搜索..." className="pl-8 pr-4 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-400 w-64" />
           </div>
           <button className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:text-indigo-600">
              <Filter className="w-3 h-3" /> 筛选
           </button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SystemLevelDashboard: React.FC<SystemLevelDashboardProps> = ({ onSelectProductLine, systemId = 'security', onSelectSystem }) => {
  const [activeDrillDown, setActiveDrillDown] = useState<string | null>(null);

  // Define data for each system
  const systemData = {
      security: {
          name: '大安全体系 (Big Security)',
          manager: '安全总',
          count: '4 产线',
          headcount: '1,200',
          lines: [
              { name: 'XDR 产品线', desc: 'Extended Detection and Response', manager: '张三', revenue: '¥ 320', health: '9.4', contrib: '高 (核心引擎)' },
              { name: '保护 AI 产品线', desc: 'AI Security Guard', manager: '李四', revenue: '¥ 80', health: '8.8', contrib: '中 (创新)' },
              { name: 'AC 产品线', desc: 'Access Control', manager: '王五', revenue: '¥ 450', health: '9.0', contrib: '高 (现金牛)' },
              { name: 'AF 产品线', desc: 'Next-Gen Firewall', manager: '赵六', revenue: '¥ 600', health: '9.2', contrib: '高 (基石)' },
          ]
      },
      cloud: {
          name: '大云体系 (Big Cloud)',
          manager: '云总',
          count: '3 产线',
          headcount: '800',
           lines: [
              { name: '托管云产品线', desc: 'Managed Cloud Services', manager: '钱七', revenue: '¥ 200', health: '8.5', contrib: '高 (增长)' },
              { name: 'HCI 产品线', desc: 'Hyper-Converged Infrastructure', manager: '孙八', revenue: '¥ 500', health: '9.1', contrib: '高 (基石)' },
              { name: 'AD 产品线', desc: 'Application Delivery', manager: '周九', revenue: '¥ 150', health: '8.7', contrib: '中 (组件)' },
          ]
      },
      platform: {
          name: '研发平台体系 (R&D Platform)',
          manager: '平台总',
          count: '3 部门',
          headcount: '450',
           lines: [
              { name: '风云 AI', desc: 'AI Innovation Lab', manager: '吴十', revenue: '-', health: '8.2', contrib: '高 (技术预研)' },
              { name: '天问 AI', desc: 'Large Model Engineering', manager: '郑十一', revenue: '-', health: '8.9', contrib: '高 (效能赋能)' },
              { name: '中央平台部', desc: 'Common Infrastructure', manager: '王十二', revenue: '-', health: '9.5', contrib: '高 (底座)' },
          ]
      }
  };

  const currentSystemData = systemData[systemId as keyof typeof systemData] || systemData.security;

  const renderDrillDownContent = () => {
      switch (activeDrillDown) {
          case 'architecture':
              return (
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
                        <tr>
                            <th className="p-4">检查项 (Checklist)</th>
                            <th className="p-4">适用产线</th>
                            <th className="p-4">遵从度评分</th>
                            <th className="p-4">主要违规点</th>
                            <th className="p-4">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="p-4 font-bold text-slate-700">API 接口规范性 (Restful/gRPC)</td>
                            <td className="p-4">全体系</td>
                            <td className="p-4 font-bold text-amber-600">85%</td>
                            <td className="p-4 text-xs text-slate-500">部分老旧接口未重构</td>
                            <td className="p-4"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">整改中</span></td>
                        </tr>
                         <tr>
                            <td className="p-4 font-bold text-slate-700">多租户隔离标准</td>
                            <td className="p-4">SaaS 类产品</td>
                            <td className="p-4 font-bold text-emerald-600">98%</td>
                            <td className="p-4 text-xs text-slate-500">无</td>
                            <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">达标</span></td>
                        </tr>
                         <tr>
                            <td className="p-4 font-bold text-slate-700">开源组件安全漏洞扫描</td>
                            <td className="p-4">全体系</td>
                            <td className="p-4 font-bold text-red-600">70%</td>
                            <td className="p-4 text-xs text-slate-500">Log4j 变种漏洞修复滞后</td>
                            <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">高风险</span></td>
                        </tr>
                    </tbody>
                </table>
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
        
        {/* System Switcher Tabs (In case user lands here directly or wants to switch) */}
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
          
          {/* 1. System Health Score - Architecture */}
          <DashboardWidget 
            title="体系架构遵从度" 
            icon={<ShieldCheck className="w-4 h-4" />}
            onClick={() => setActiveDrillDown('architecture')}
          >
              <div className="flex items-center justify-between h-full">
                  <div className="flex flex-col gap-1">
                      <div className="text-4xl font-bold text-indigo-700">92<span className="text-base font-normal text-slate-400">/100</span></div>
                      <div className="text-xs text-slate-500">技术债务率: <span className="text-green-600 font-bold">Low</span></div>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-indigo-600 border-r-indigo-600 flex items-center justify-center bg-indigo-50">
                      <span className="text-xs font-bold text-indigo-800">A级</span>
                  </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 bg-slate-50 p-1.5 rounded">
                  本月重点: 统一认证服务 (IAM) 接入率 100%
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

          {/* 3. System Integration Stability */}
          <DashboardWidget 
             title="集成解决方案稳定性" 
             icon={<Activity className="w-4 h-4" />}
          >
             <div className="flex flex-col gap-2 h-full justify-center">
                 <div className="flex items-center gap-3">
                     <div className="text-3xl font-bold text-slate-800">99.95%</div>
                     <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">达标</div>
                 </div>
                 <div className="text-xs text-slate-500">体系级联调测试通过率</div>
                 <div className="grid grid-cols-2 gap-2 mt-2">
                     <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center">
                         <div className="text-xs text-slate-400">SLA 违约</div>
                         <div className="text-sm font-bold text-slate-700">0 次</div>
                     </div>
                     <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center">
                         <div className="text-xs text-slate-400">接口变更</div>
                         <div className="text-sm font-bold text-amber-600">12 次</div>
                     </div>
                 </div>
             </div>
          </DashboardWidget>

          {/* 4. Cross-Product Resource Pool */}
          <DashboardWidget 
             title="公共资源池负载" 
             icon={<Users className="w-4 h-4" />}
          >
             <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs">
                     <span>SRE 运维池</span>
                     <span className="text-red-500 font-bold">98% (过载)</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full">
                     <div className="h-full bg-red-500 w-[98%] rounded-full"></div>
                 </div>

                 <div className="flex justify-between items-center text-xs">
                     <span>测试/QA 池</span>
                     <span className="text-emerald-600 font-bold">85% (健康)</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full">
                     <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                 </div>

                 <div className="flex justify-between items-center text-xs">
                     <span>架构师池</span>
                     <span className="text-amber-600 font-bold">92% (紧张)</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full">
                     <div className="h-full bg-amber-500 w-[92%] rounded-full"></div>
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
                        onClick={onSelectProductLine}
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
        title={activeDrillDown === 'architecture' ? '体系架构治理报告' : '公共能力复用分析'}
        isOpen={!!activeDrillDown}
        onClose={() => setActiveDrillDown(null)}
      >
        {renderDrillDownContent()}
      </SystemDrillDownModal>

    </div>
  );
};