import React, { useState } from 'react';
import { 
  Code2, CheckCircle2, Users, Briefcase, 
  Layout, ListTodo, GitPullRequest, Bug, 
  Activity, Clock, AlertCircle, CheckSquare, 
  PlayCircle, FileText, MessageSquare, 
  TrendingUp, Calendar, Zap, ShieldAlert,
  MoreHorizontal, Plus, Repeat, ShieldCheck, Flag,
  ChevronRight
} from 'lucide-react';

type RoleType = 'dev' | 'qa' | 'tl' | 'pm';

const ROLES: { id: RoleType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'dev', label: '开发工程师 (Dev)', icon: <Code2 className="w-4 h-4" />, desc: '代码构建与缺陷修复' },
  { id: 'qa', label: '测试工程师 (QA)', icon: <CheckCircle2 className="w-4 h-4" />, desc: '质量保障与验证' },
  { id: 'tl', label: 'TL (技术主管)', icon: <Users className="w-4 h-4" />, desc: '团队管理与技术决策' },
  { id: 'pm', label: 'PM (项目经理)', icon: <Briefcase className="w-4 h-4" />, desc: '进度质量把控与端到端计划' },
];

// --- Reusable Components for Personal Dashboard ---

const StatCard: React.FC<{ 
  label: string; 
  value: string | number; 
  subValue?: string; 
  icon: React.ReactNode; 
  trend?: 'up' | 'down'; 
  color?: 'blue' | 'purple' | 'green' | 'amber' | 'red';
}> = ({ label, value, subValue, icon, trend, color = 'blue' }) => {
  const styles = {
    blue: { iconBg: 'bg-blue-100', iconText: 'text-blue-700', border: 'border-l-4 border-l-blue-500' },
    purple: { iconBg: 'bg-purple-100', iconText: 'text-purple-700', border: 'border-l-4 border-l-purple-500' },
    green: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-700', border: 'border-l-4 border-l-emerald-500' },
    amber: { iconBg: 'bg-amber-100', iconText: 'text-amber-700', border: 'border-l-4 border-l-amber-500' },
    red: { iconBg: 'bg-red-100', iconText: 'text-red-700', border: 'border-l-4 border-l-red-500' },
  };

  const currentStyle = styles[color];

  return (
    <div className={`p-5 rounded-lg bg-white border border-slate-300 shadow-sm hover:shadow-md transition-all ${currentStyle.border}`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-slate-600 text-sm font-bold">{label}</span>
        <div className={`p-2 rounded-lg ${currentStyle.iconBg} ${currentStyle.iconText}`}>{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800 tracking-tight">{value}</div>
        {subValue && <div className="text-xs text-slate-500 mt-1 font-medium">{subValue}</div>}
      </div>
    </div>
  );
};

const TaskList: React.FC<{ 
  title: string; 
  items: { id: string; title: string; priority: 'High' | 'Medium' | 'Low'; status: string; date: string }[] 
}> = ({ title, items }) => (
  <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden flex flex-col h-full">
    <div className="px-5 py-4 border-b border-slate-200 bg-slate-100 flex justify-between items-center">
      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
        <ListTodo className="w-4 h-4 text-slate-500" /> {title}
      </h3>
      <button className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center">
        查看全部 <ChevronRight className="w-3 h-3" />
      </button>
    </div>
    <div className="divide-y divide-slate-200 flex-1 overflow-auto">
      {items.map(item => (
        <div key={item.id} className="p-4 hover:bg-slate-50 flex items-center gap-4 group cursor-pointer transition-colors">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
            item.priority === 'High' ? 'bg-red-500 ring-2 ring-red-100' : 
            item.priority === 'Medium' ? 'bg-amber-500 ring-2 ring-amber-100' : 
            'bg-blue-500 ring-2 ring-blue-100'
          }`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-slate-800 font-semibold truncate group-hover:text-blue-700">{item.title}</div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="font-mono bg-slate-100 px-1 rounded text-slate-600">{item.id}</span>
              <span>•</span>
              <span>{item.date}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${
               item.status === '进行中' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
               item.status === '待验证' ? 'bg-purple-50 text-purple-700 border-purple-200' :
               item.status === '待处理' ? 'bg-slate-100 text-slate-600 border-slate-200' :
               item.status === '准备中' ? 'bg-amber-50 text-amber-700 border-amber-200' :
               item.status === '协调中' || item.status === '制定预案' ? 'bg-red-50 text-red-700 border-red-200' :
               'bg-green-50 text-green-700 border-green-200'
             }`}>{item.status}</span>
          </div>
        </div>
      ))}
      {items.length === 0 && <div className="p-8 text-center text-slate-400 text-sm">暂无任务</div>}
    </div>
  </div>
);

// --- Role Specific Content ---

const DeveloperDashboard = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    {/* 1. Top Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard 
        label="我的待办 (Pending Tasks)" 
        value="8" 
        subValue="3个高优先级" 
        icon={<ListTodo className="w-5 h-5" />} 
        color="blue" 
      />
      <StatCard 
        label="待我评审 (Code Review)" 
        value="4" 
        subValue="平均等待 12h" 
        icon={<GitPullRequest className="w-5 h-5" />} 
        color="purple" 
      />
      <StatCard 
        label="我的 Bug (Assigned Bugs)" 
        value="5" 
        subValue="1个严重 (S1)" 
        icon={<Bug className="w-5 h-5" />} 
        color="red" 
      />
      <StatCard 
        label="AI 提效 (Efficiency)" 
        value="30%" 
        subValue="本周代码采纳率" 
        icon={<Zap className="w-5 h-5" />} 
        color="green" 
      />
    </div>

    {/* 2. Main Work Area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
      {/* Left: Current Sprint Tasks */}
      <div className="lg:col-span-2 h-full">
        <TaskList 
          title="当前 Sprint 任务 (Sprint 24)" 
          items={[
            { id: 'TASK-1024', title: '[XDR] 威胁情报数据清洗接口开发', priority: 'High', status: '进行中', date: 'Due Today' },
            { id: 'TASK-1025', title: '[Common] 登录组件由 OAuth2 升级到 OIDC', priority: 'Medium', status: '进行中', date: 'Due Tomorrow' },
            { id: 'BUG-402', title: '大屏展示在 4K 分辨率下布局错乱', priority: 'High', status: '待处理', date: 'Overdue 1d' },
            { id: 'TASK-1028', title: '编写威胁检测引擎单元测试用例', priority: 'Low', status: '待处理', date: 'Due Friday' },
            { id: 'TASK-1030', title: '调研 eBPF 性能采集方案', priority: 'Medium', status: '已完成', date: 'Done' },
          ]}
        />
      </div>

      {/* Right: Code Review & Quality */}
      <div className="flex flex-col gap-4 h-full">
         <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
            <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
               <Activity className="w-4 h-4 text-emerald-600" /> 个人代码质量趋势
            </h3>
            <div className="flex items-end justify-between h-32 px-2 pb-2 border-b border-slate-200">
               {[0.5, 0.2, 0.8, 0.1, 0.05, 0.0, 0.1].map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 group">
                     <div className="w-6 bg-emerald-100 border border-emerald-200 rounded-t-sm relative group-hover:bg-emerald-200 transition-colors" style={{height: `${val * 100}%`}}>
                        <div className="absolute bottom-0 w-full bg-emerald-500" style={{height: `${val * 60}%`}}></div>
                     </div>
                     <span className="text-[10px] text-slate-500 font-medium">Day {i+1}</span>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-600">
               <span>千行 Bug 率: <b className="text-emerald-700">0.05</b></span>
               <span>自测通过率: <b className="text-blue-700">98%</b></span>
            </div>
         </div>

         <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1 flex flex-col">
            <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
               <GitPullRequest className="w-4 h-4 text-purple-600" /> 待处理 PR (Need Review)
            </h3>
            <div className="space-y-3 overflow-auto flex-1">
               <div className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                     <img src="https://i.pravatar.cc/150?u=a" alt="" className="w-8 h-8 rounded-full border border-slate-200" />
                     <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">feat: 新增告警规则</span>
                        <span className="text-slate-500">by 张三 • 2h ago</span>
                     </div>
                  </div>
                  <button className="text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded font-medium transition-colors">Review</button>
               </div>
               <div className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                     <img src="https://i.pravatar.cc/150?u=b" alt="" className="w-8 h-8 rounded-full border border-slate-200" />
                     <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">fix: 内存泄漏优化</span>
                        <span className="text-slate-500">by 李四 • 5h ago</span>
                     </div>
                  </div>
                  <button className="text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded font-medium transition-colors">Review</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
);

const QADashboard = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard 
        label="测试用例执行 (Execution)" 
        value="85%" 
        subValue="本周目标: 100%" 
        icon={<PlayCircle className="w-5 h-5" />} 
        color="blue" 
      />
      <StatCard 
        label="发现缺陷 (Bugs Found)" 
        value="12" 
        subValue="今日新增 3个" 
        icon={<Bug className="w-5 h-5" />} 
        color="red" 
      />
      <StatCard 
        label="自动化通过率 (Auto Pass)" 
        value="98.5%" 
        subValue="覆盖率 72%" 
        icon={<Zap className="w-5 h-5" />} 
        color="green" 
      />
      <StatCard 
        label="回归测试 (Regression)" 
        value="Pending" 
        subValue="待版本构建" 
        icon={<Repeat className="w-5 h-5" />} 
        color="amber" 
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
      <div className="lg:col-span-2 h-full">
        <TaskList 
          title="我的测试任务 (Test Tasks)" 
          items={[
            { id: 'TC-2001', title: '验证 XDR 告警聚合逻辑 (边界值)', priority: 'High', status: '待执行', date: 'Due Today' },
            { id: 'TC-2005', title: 'HCI 虚拟机热迁移稳定性测试 (72h)', priority: 'High', status: '进行中', date: 'Running' },
            { id: 'BUG-VERIFY', title: '验证 BUG-402: 4K 分辨率布局修复', priority: 'Medium', status: '待验证', date: 'Dev Fixed' },
            { id: 'AUTO-SCRIPT', title: '编写 API 接口自动化脚本 (Login)', priority: 'Low', status: '进行中', date: 'Sprint Task' },
          ]}
        />
      </div>
      <div className="h-full flex flex-col gap-4">
         {/* Defect Distribution Widget */}
         <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
            <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
               <ShieldAlert className="w-4 h-4 text-red-600" /> 我提交的缺陷分布
            </h3>
            <div className="space-y-4">
               {[
                 { label: '致命 (Critical)', count: 2, color: 'bg-red-500', width: '20%' },
                 { label: '严重 (Major)', count: 8, color: 'bg-orange-500', width: '50%' },
                 { label: '一般 (Normal)', count: 15, color: 'bg-blue-500', width: '70%' },
                 { label: '提示 (Minor)', count: 5, color: 'bg-slate-400', width: '30%' },
               ].map((d, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                       <span className="font-medium">{d.label}</span>
                       <span className="font-bold text-slate-800">{d.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                       <div className={`h-full rounded-full ${d.color}`} style={{width: d.width}}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200 flex flex-col justify-center items-center text-center shadow-sm">
             <div className="bg-white p-3 rounded-full shadow-md mb-3 ring-4 ring-indigo-50">
                <PlayCircle className="w-8 h-8 text-indigo-600" />
             </div>
             <h4 className="font-bold text-indigo-900 text-sm">开始每日构建测试</h4>
             <p className="text-xs text-indigo-700/80 mt-1 mb-4">Build #20240215-01 ready</p>
             <button className="bg-indigo-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors w-full shadow-sm hover:shadow">
                启动流水线
             </button>
         </div>
      </div>
    </div>
  </div>
);

const TLDashboard = () => {
  // Data for Swimlanes
  const kanbanData = [
     {
        member: '张三 (Sr. Dev)',
        avatar: 'https://i.pravatar.cc/150?u=a',
        tasks: [
           { id: '101', title: '核心引擎高并发优化', status: 'In Progress', type: 'feat', priority: 'high' },
           { id: '102', title: 'Code Review: Auth模块', status: 'Review', type: 'chore', priority: 'medium' }
        ]
     },
     {
        member: '李四 (Dev)',
        avatar: 'https://i.pravatar.cc/150?u=b',
        tasks: [
           { id: '201', title: 'UI 适配 4K 分辨率', status: 'To Do', type: 'feat', priority: 'medium' },
           { id: '202', title: '修复内存泄漏 Bug', status: 'Done', type: 'fix', priority: 'high' }
        ]
     },
     {
        member: '王五 (Dev)',
        avatar: 'https://i.pravatar.cc/150?u=c',
        tasks: [
           { id: '301', title: '编写单元测试', status: 'In Progress', type: 'chore', priority: 'low' },
           { id: '302', title: '日志组件升级', status: 'To Do', type: 'chore', priority: 'low' }
        ]
     },
     {
        member: '赵六 (QA)',
        avatar: 'https://i.pravatar.cc/150?u=d',
        tasks: [
           { id: '401', title: '回归测试 Sprint 23', status: 'In Progress', type: 'test', priority: 'high' },
           { id: '402', title: '验证 Bug 1024', status: 'Review', type: 'test', priority: 'high' }
        ]
     }
  ];

  const getStatusColumn = (status: string) => {
      switch(status) {
          case 'To Do': return 0;
          case 'In Progress': return 1;
          case 'Review': return 2;
          case 'Done': return 3;
          default: return 0;
      }
  };

  const renderCard = (task: any) => (
      <div key={task.id} className="bg-white p-3 rounded-lg border border-slate-300 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                  task.type === 'feat' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  task.type === 'fix' ? 'bg-red-50 text-red-700 border-red-100' :
                  task.type === 'test' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  'bg-slate-50 text-slate-600 border-slate-100'
              }`}>
                  {task.type}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ring-1 ring-white shadow-sm ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-400'
              }`} title={`Priority: ${task.priority}`}></span>
          </div>
          <div className="text-xs font-bold text-slate-800 leading-snug mb-3 group-hover:text-blue-700">
              {task.title}
          </div>
          <div className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded inline-block">
              #{task.id}
          </div>
      </div>
  );

  return (
  <div className="space-y-6 animate-in fade-in duration-300">
    {/* 1. Top Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard 
        label="团队速率 (Velocity)" 
        value="42 SP" 
        subValue="上个 Sprint: 40 SP" 
        icon={<Zap className="w-5 h-5" />} 
        color="blue" 
      />
      <StatCard 
        label="团队负载 (Team Load)" 
        value="92%" 
        subValue="2名成员超负荷" 
        icon={<Activity className="w-5 h-5" />} 
        color="amber" 
      />
      <StatCard 
        label="Sprint 风险" 
        value="2" 
        subValue="技术难点/依赖" 
        icon={<AlertCircle className="w-5 h-5" />} 
        color="red" 
      />
      <StatCard 
        label="代码评审积压" 
        value="15" 
        subValue="需关注" 
        icon={<GitPullRequest className="w-5 h-5" />} 
        color="purple" 
      />
    </div>

    {/* 2. Swimlane Kanban Board */}
    <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm overflow-hidden flex flex-col h-[650px]">
        {/* Board Header */}
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Layout className="w-5 h-5 text-blue-600" /> Sprint 24 迭代看板 (Swimlane View)
            </h3>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 mr-4 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> High</span>
                    <span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Med</span>
                </div>
                <button className="text-xs flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> 添加任务
                </button>
            </div>
        </div>

        {/* Board Container */}
        <div className="flex-1 overflow-auto bg-slate-100 rounded-xl border border-slate-300 shadow-inner">
            <div className="min-w-[1000px] h-full flex flex-col">
                
                {/* Column Headers */}
                <div className="grid grid-cols-[220px_1fr_1fr_1fr_1fr] border-b border-slate-300 bg-white sticky top-0 z-10 shadow-sm">
                    <div className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider pl-6 flex items-center bg-slate-50">成员 (Member)</div>
                    <div className="p-4 text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-50 border-l border-slate-200 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400"></div> 待办 (To Do)
                    </div>
                    <div className="p-4 text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50/50 border-l border-slate-200 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div> 进行中 (In Progress)
                    </div>
                    <div className="p-4 text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-50/50 border-l border-slate-200 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> 待评审 (Review)
                    </div>
                    <div className="p-4 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50/50 border-l border-slate-200 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> 已完成 (Done)
                    </div>
                </div>

                {/* Swimlane Rows */}
                <div className="flex-1 divide-y divide-slate-300">
                    {kanbanData.map((swimlane, idx) => (
                        <div key={idx} className="grid grid-cols-[220px_1fr_1fr_1fr_1fr] min-h-[160px] group/row bg-white hover:bg-slate-50 transition-colors">
                            {/* Member Info Column */}
                            <div className="p-5 flex flex-col justify-start border-r border-slate-300 bg-slate-50/50 sticky left-0 z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={swimlane.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800">{swimlane.member.split(' ')[0]}</span>
                                        <span className="text-[10px] text-slate-500 font-medium">{swimlane.member.split('(')[1].replace(')', '')}</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                        <span>Load</span>
                                        <span>70%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full w-[70%]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Task Columns */}
                            {[0, 1, 2, 3].map((colIndex) => {
                                const tasksInCol = swimlane.tasks.filter(t => getStatusColumn(t.status) === colIndex);
                                return (
                                    <div key={colIndex} className={`p-3 border-l border-slate-200 relative ${colIndex % 2 !== 0 ? 'bg-slate-50/30' : ''}`}>
                                        <div className="h-full rounded-lg transition-colors space-y-3">
                                            {tasksInCol.map(task => renderCard(task))}
                                            {tasksInCol.length === 0 && (
                                                <div className="h-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity">
                                                    <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-white hover:text-blue-600 hover:shadow-md hover:border hover:border-blue-100 transition-all">
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  </div>
  );
};

const PMDashboard = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard 
        label="负责项目 (Projects)" 
        value="3" 
        subValue="1个风险, 2个正常" 
        icon={<Briefcase className="w-5 h-5" />} 
        color="blue" 
      />
      <StatCard 
        label="近期里程碑 (Milestones)" 
        value="4" 
        subValue="未来2周内到期" 
        icon={<Flag className="w-5 h-5" />} 
        color="purple" 
      />
      <StatCard 
        label="整体风险 (Risks)" 
        value="5" 
        subValue="2个高风险 (S1)" 
        icon={<AlertCircle className="w-5 h-5" />} 
        color="red" 
      />
      <StatCard 
        label="总资源投入 (Resources)" 
        value="45 人/月" 
        subValue="预算消耗 68%" 
        icon={<Users className="w-5 h-5" />} 
        color="green" 
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
       {/* Left Column: Project Portfolio Status */}
       <div className="lg:col-span-2 space-y-6">
          
          {/* Project List Card */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
             <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-100">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                   <Layout className="w-4 h-4 text-slate-500" /> 我的项目概览 (Project Portfolio)
                </h3>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline">查看详情</button>
             </div>
             <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                   <tr>
                      <th className="p-4">项目名称</th>
                      <th className="p-4">当前阶段</th>
                      <th className="p-4">健康度</th>
                      <th className="p-4">进度偏差</th>
                      <th className="p-4">下个里程碑</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-blue-700">XDR 威胁检测引擎 v3.0</td>
                      <td className="p-4"><span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded text-[10px] font-medium">TR4 验证</span></td>
                      <td className="p-4"><span className="text-green-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> 正常</span></td>
                      <td className="p-4 text-slate-500">0天</td>
                      <td className="p-4 text-slate-600 font-medium">02/20 (TR4评审)</td>
                   </tr>
                   <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">AI 恶意代码识别模型</td>
                      <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-[10px] font-medium">开发中</span></td>
                      <td className="p-4"><span className="text-amber-600 font-bold flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> 预警</span></td>
                      <td className="p-4 text-amber-600 font-bold">-3天</td>
                      <td className="p-4 text-slate-600 font-medium">02/25 (性能测试)</td>
                   </tr>
                   <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">AC 行为审计增强包</td>
                      <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-[10px] font-medium">立项</span></td>
                      <td className="p-4"><span className="text-green-600 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> 正常</span></td>
                      <td className="p-4 text-slate-500">0天</td>
                      <td className="p-4 text-slate-600 font-medium">03/01 (DCP2)</td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* Cross-Project Risks/Issues */}
          <TaskList 
            title="跨项目重点事项跟进 (Key Items & Risks)" 
            items={[
              { id: 'RISK-102', title: '[XDR] AI 芯片供应可能延期 2 周', priority: 'High', status: '制定预案', date: 'Open' },
              { id: 'MILE-005', title: '[XDR] TR4 版本验证评审材料准备', priority: 'High', status: '进行中', date: 'Due: 02/20' },
              { id: 'ISSUE-099', title: '[AI模型] 自动化测试环境资源不足', priority: 'Medium', status: '协调中', date: 'Blocked' },
              { id: 'TASK-305', title: '[AC] 核心团队组建与资源锁定', priority: 'Medium', status: '进行中', date: 'Due: 02/28' },
            ]} 
          />
       </div>

       {/* Right Column: Resource & Schedule Viz */}
       <div className="flex flex-col gap-4 h-full">
          {/* Resource Usage */}
          <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
             <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> 资源池负载 (Resource Pool)
             </h3>
             <div className="space-y-5">
                <div>
                   <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-700">后端开发 (Backend)</span>
                      <span className="text-slate-500">18/20 人</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-200">
                      <div className="bg-blue-500 h-full rounded-full" style={{width: '90%'}}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-700">前端开发 (Frontend)</span>
                      <span className="text-slate-500">8/10 人</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-200">
                      <div className="bg-emerald-500 h-full rounded-full" style={{width: '80%'}}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-700">测试 (QA)</span>
                      <span className="text-slate-500">12/12 人</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-200">
                      <div className="bg-red-500 h-full rounded-full" style={{width: '100%'}}></div>
                   </div>
                   <div className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-bold"><AlertCircle className="w-3 h-3"/> 资源瓶颈</div>
                </div>
             </div>
          </div>

          {/* Key Milestone Timeline (simplified for multiple projects) */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-300 flex-1">
             <h3 className="font-bold text-slate-800 text-sm mb-5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" /> 未来30天关键节点
             </h3>
             <div className="relative border-l-2 border-slate-200 ml-2 space-y-8">
                <div className="relative pl-5">
                   <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-slate-50 border border-blue-600"></div>
                   <div className="text-xs font-bold text-slate-800">02/20 - XDR TR4</div>
                   <div className="text-[10px] text-slate-500 font-medium mt-0.5">验证评审</div>
                </div>
                <div className="relative pl-5">
                   <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-slate-50 border border-amber-600"></div>
                   <div className="text-xs font-bold text-slate-800">02/25 - AI模型 性能测试</div>
                   <div className="text-[10px] text-slate-500 font-medium mt-0.5">基线目标: QPS &gt; 1000</div>
                </div>
                <div className="relative pl-5">
                   <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-green-500 ring-4 ring-slate-50 border border-green-600"></div>
                   <div className="text-xs font-bold text-slate-800">03/01 - AC DCP2</div>
                   <div className="text-[10px] text-slate-500 font-medium mt-0.5">立项审批</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// --- Main Container ---

export const PersonalDashboard: React.FC = () => {
  const [activeRole, setActiveRole] = useState<RoleType>('dev');

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Role Switcher */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
               我的工作台 (My Workbench)
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
               聚焦个人与团队执行，实时跟进任务、质量与效率。
            </p>
         </div>

         <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {ROLES.map(role => (
               <button
                 key={role.id}
                 onClick={() => setActiveRole(role.id)}
                 className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                   ${activeRole === role.id 
                     ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200' 
                     : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
               >
                 {role.icon}
                 <span className="hidden sm:inline">{role.label.split('(')[0]}</span>
                 <span className="sm:hidden">{role.id.toUpperCase()}</span>
               </button>
            ))}
         </div>
      </div>

      {/* 2. Role Description Banner */}
      <div className="bg-slate-800 text-white rounded-xl p-5 shadow-lg flex items-center justify-between border border-slate-700">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
               {React.cloneElement(ROLES.find(r => r.id === activeRole)?.icon as React.ReactElement, { className: "w-6 h-6" })}
            </div>
            <div>
               <h3 className="font-bold text-lg">{ROLES.find(r => r.id === activeRole)?.label}</h3>
               <p className="text-sm text-slate-300 font-medium opacity-90">{ROLES.find(r => r.id === activeRole)?.desc}</p>
            </div>
         </div>
         <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 transition-colors border border-blue-500">
               <Plus className="w-4 h-4" /> 新建任务
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg backdrop-blur-sm transition-colors border border-white/10">
               <MoreHorizontal className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* 3. Dynamic Content Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeRole === 'dev' && <DeveloperDashboard />}
        {activeRole === 'qa' && <QADashboard />}
        {activeRole === 'tl' && <TLDashboard />}
        {activeRole === 'pm' && <PMDashboard />}
      </div>

    </div>
  );
};