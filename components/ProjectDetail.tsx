import React, { useState } from 'react';
import { Project, Metric } from '../types';
import { Timeline } from './Timeline';
import { ArrowLeft, User, Calendar, Settings, MoreHorizontal, TrendingUp, TrendingDown, Minus, Target, AlertTriangle, Clock, ShieldCheck, Activity } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activePhaseId, setActivePhaseId] = useState<string | null>(
    project.phases.find(p => p.status === 'current')?.id || project.phases[0].id
  );

  const activePhase = project.phases.find(p => p.id === activePhaseId);

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'normal': return '正常';
      case 'warning': return '预警';
      case 'risk': return '风险';
      default: return status;
    }
  };

  const renderTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-emerald-600" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-600" />;
    if (trend === 'stable') return <Minus className="w-3 h-3 text-slate-400" />;
    return null;
  };

  // Helper for Card Styling based on metric index/type
  const getCardStyle = (index: number) => {
    const styles = [
      { // Value - Gold/Amber
        icon: <Target className="w-5 h-5" />,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'group-hover:border-amber-200',
        fill: 'bg-amber-500',
        gradient: 'from-amber-500/20'
      },
      { // Bugs - Red
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'group-hover:border-red-200',
        fill: 'bg-red-500',
        gradient: 'from-red-500/20'
      },
      { // Time - Blue
        icon: <Clock className="w-5 h-5" />,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'group-hover:border-blue-200',
        fill: 'bg-blue-500',
        gradient: 'from-blue-500/20'
      },
      { // Quality - Green
        icon: <ShieldCheck className="w-5 h-5" />,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'group-hover:border-emerald-200',
        fill: 'bg-emerald-500',
        gradient: 'from-emerald-500/20'
      }
    ];
    return styles[index % styles.length];
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Header Section */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-1 text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h2 className="text-xl font-bold text-slate-800">{project.name}</h2>
               <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                 project.status === 'normal' ? 'bg-green-50 border-green-200 text-green-700' : 
                 project.status === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                 'bg-red-50 border-red-200 text-red-700'
               }`}>
                  {getStatusLabel(project.status)}
               </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> 项目经理: {project.manager}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 所属战场: {project.battlefield}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-2 text-slate-400 hover:text-slate-600"><Settings className="w-5 h-5" /></button>
           <button className="p-2 text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
      </div>

      {/* 2. Project Results (Redesigned Cards) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
           <h3 className="font-bold text-slate-800 text-sm border-l-4 border-slate-800 pl-2">项目结果 (Project Result)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {project.resultMetrics.map((metric, index) => {
             const style = getCardStyle(index);
             return (
               <div key={metric.id} className={`group bg-white rounded-xl p-5 border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 relative overflow-hidden ${style.border}`}>
                  
                  {/* Content Layout */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start mb-2">
                          <div className={`p-2.5 rounded-lg ${style.bg} ${style.color}`}>
                              {style.icon}
                          </div>
                          {metric.trend && (
                              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                  metric.trend === 'up' ? 'bg-green-50 text-green-700' : 
                                  metric.trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'
                              }`}>
                                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '-'}
                              </div>
                          )}
                      </div>

                      <div>
                          <div className="text-sm font-medium text-slate-500 mb-1">{metric.label}</div>
                          <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold text-slate-800 tracking-tight">{metric.value}</span>
                              {metric.unit && <span className="text-xs text-slate-400 font-semibold">{metric.unit}</span>}
                          </div>
                      </div>

                      {/* Visualizations */}
                      <div className="h-10 w-full mt-4 flex items-end opacity-80">
                          {index === 0 && ( // Progress Bar Style
                             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${style.fill}`} style={{ width: '85%' }}></div>
                             </div>
                          )}
                          {index === 1 && ( // Bar Chart Style
                             <div className="w-full flex justify-between items-end h-full px-2 gap-2">
                                <div className="w-full bg-slate-100 rounded-t h-[40%]"></div>
                                <div className="w-full bg-slate-100 rounded-t h-[60%]"></div>
                                <div className={`w-full rounded-t h-[30%] ${style.fill}`}></div>
                                <div className="w-full bg-slate-100 rounded-t h-[20%]"></div>
                             </div>
                          )}
                          {index === 2 && ( // Area Chart Style
                             <div className="w-full h-full relative">
                                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                   <path d="M0,40 L0,30 C20,25 40,35 60,20 C80,5 100,15 100,10 L100,40 Z" fill="currentColor" className={`${style.color} opacity-20`} />
                                   <path d="M0,30 C20,25 40,35 60,20 C80,5 100,15 100,10" fill="none" stroke="currentColor" strokeWidth="2" className={style.color} />
                                </svg>
                             </div>
                          )}
                          {index === 3 && ( // Badge Style
                             <div className="flex items-center gap-2 w-full bg-slate-50 rounded-lg p-2">
                                <div className={`w-2 h-2 rounded-full ${style.fill}`}></div>
                                <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                                <div className="ml-auto text-xs font-bold text-slate-400">A+</div>
                             </div>
                          )}
                      </div>
                  </div>

                  {/* Decorative Background Blob */}
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${style.gradient} to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
               </div>
             );
          })}
        </div>
      </section>

      {/* 3. Activity Progress (Timeline) */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-2">
           <h3 className="font-bold text-slate-800 text-sm border-l-4 border-slate-800 pl-2">活动进展 (Activity Progress)</h3>
        </div>
        
        <div className="mt-4">
          <Timeline 
            phases={project.phases} 
            activePhaseId={activePhaseId} 
            onPhaseSelect={setActivePhaseId} 
            projectName={project.name}
          />
        </div>

        {/* 4. Phase Drill-down Detail */}
        {activePhase && (
          <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <h4 className="font-bold text-slate-700 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                   {activePhase.name} {activePhase.subName} - 详细度量指标
                 </h4>
                 {activePhase.status === 'completed' && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">已完成</span>}
                 {activePhase.status === 'current' && <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">进行中</span>}
              </div>
            </div>

            {activePhase.metrics.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activePhase.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-emerald-50/50 border border-emerald-100/60 rounded-lg p-4 flex flex-col hover:bg-emerald-50 transition-colors">
                    <div className="text-xs text-emerald-800/70 font-medium mb-2 h-8 leading-tight">
                       {metric.label}
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                       <div className="text-xl font-bold text-emerald-900">
                          {metric.value} <span className="text-xs font-normal opacity-70">{metric.unit}</span>
                       </div>
                       {metric.trend && <div className="mb-1">{renderTrendIcon(metric.trend)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                 <div className="text-slate-400 text-sm">该阶段暂无详细度量数据</div>
                 <div className="text-slate-300 text-xs mt-1">请选择其他已完成的阶段 (如 DCP2-1, TR1, TR6 等)</div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};