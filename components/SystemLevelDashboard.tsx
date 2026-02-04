import React, { useState } from 'react';
import { Network, Layers, Server, ShieldCheck, Zap, ChevronRight, Activity, Users, Box, ArrowRight, X, Search, Filter, AlertTriangle, CheckCircle2, Briefcase, TrendingUp, LayoutGrid, Flag, Clock, AlertCircle, BrainCircuit, Cpu, Code2 } from 'lucide-react';

interface SystemLevelDashboardProps {
  onSelectProductLine: (id: string, name: string) => void;
  systemId?: string; // 'security' | 'cloud' | 'platform' | 'aibg'
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

  const renderDrillDownContent = () => {
      switch (activeDrillDown) {
          case 'active_projects':
              return (
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
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
                        {/* New AI BG Projects */}
                         <tr className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">数字人多模态交互引擎 v2</td>
                            <td className="p-4 text-slate-600">销售数字人产品线</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">TR4 验证</span></td>
                            <td className="p-4"><span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-4 h-4"/> 正常</span></td>
                            <td className="p-4 text-slate-500">0%</td>
                            <td className="p-4 text-xs text-slate-500">灰度测试</td>
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
                        <thead className="bg-slate-50 text-slate-500 font-medium">
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
          '公共能力复用分析'
        }
        isOpen={!!activeDrillDown}
        onClose={() => setActiveDrillDown(null)}
      >
        {renderDrillDownContent()}
      </SystemDrillDownModal>

    </div>
  );
};