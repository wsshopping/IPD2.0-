import React from 'react';
import { Check, Circle, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { ProjectPhase } from '../types';

interface TimelineProps {
  phases: ProjectPhase[];
  activePhaseId: string | null;
  onPhaseSelect: (id: string) => void;
  projectName: string;
}

export const Timeline: React.FC<TimelineProps> = ({ phases, activePhaseId, onPhaseSelect, projectName }) => {
  const completedCount = phases.filter(p => p.status === 'completed').length;
  // Calculate progress percentage for the green line. 
  // We want the line to go to the center of the current/last completed node.
  const progressPercent = Math.max(0, (completedCount / (phases.length - 1)) * 100);

  return (
    <div className="w-full bg-white">
      
      {/* 1. Information Bar */}
      <div className="flex items-center justify-between text-xs mb-6 px-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <span className="font-bold text-blue-600 text-sm">{projectName}</span>
           </div>
           <div>
             <span className="text-slate-500 mr-2">当前投入:</span>
             <span className="font-medium text-slate-800">120 人</span>
           </div>
           <div>
             <span className="text-slate-500 mr-2">流程名称:</span>
             <span className="font-medium text-slate-800">主线版本-IPD2.0</span>
           </div>
        </div>
        
        <div className="flex items-center gap-4 text-slate-500">
           <div>
              DCP5上市原计划: <span className="text-slate-800 font-mono">2026-02-27</span>
           </div>
           <div>
              最新变更: <span className="text-slate-800">暂无</span>
           </div>
           <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* 2. Scrollable Timeline Area */}
      <div className="overflow-x-auto pb-4 px-2">
        <div className="min-w-[1400px] relative pt-2">
          
          {/* Timeline Tracks */}
          <div className="absolute top-[18px] left-0 w-full h-[3px] bg-slate-200 -z-10" />
          <div 
            className="absolute top-[18px] left-0 h-[3px] bg-emerald-500 -z-10 transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Nodes Container */}
          <div className="flex justify-between items-start">
            {phases.map((phase, index) => {
              const isCompleted = phase.status === 'completed';
              const isCurrent = phase.status === 'current';
              const isPending = phase.status === 'pending';
              const isActive = activePhaseId === phase.id;

              // Node Styles
              let nodeClass = "bg-slate-50 border-slate-300 text-slate-300"; // Default/Pending
              if (isCompleted) {
                nodeClass = "bg-slate-800 border-slate-800 text-white"; // Dark node for completed
              } else if (isCurrent) {
                nodeClass = "bg-white border-emerald-500 text-emerald-600 ring-4 ring-emerald-50";
              }

              // Text Color
              const titleColor = isPending ? "text-slate-400" : "text-slate-800";
              
              return (
                <div key={phase.id} className="flex flex-col items-center group relative cursor-pointer" onClick={() => onPhaseSelect(phase.id)}>
                  
                  {/* Node Circle */}
                  <div className={`w-9 h-9 rounded-full border-[3px] flex items-center justify-center z-10 transition-colors duration-300 ${nodeClass} ${isActive ? 'scale-110' : ''}`}>
                    {isCompleted ? (
                      <div className="w-3 h-3 bg-white rounded-full" /> 
                    ) : isCurrent ? (
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                    )}
                  </div>

                  {/* Text Labels */}
                  <div className="mt-3 flex flex-col items-center text-center space-y-0.5">
                    <span className={`text-[10px] font-bold uppercase ${titleColor}`}>{phase.name}</span>
                    <span className={`text-[10px] ${titleColor}`}>{phase.subName}</span>
                  </div>

                  {/* Dates Row */}
                  <div className="mt-4 flex flex-col items-center gap-1 text-[10px] font-mono">
                     <span className="text-slate-600">{phase.plannedDate}</span>
                     <span className="text-amber-500">{phase.actualDate}</span>
                  </div>
                  
                  {/* Active Indicator Triangle */}
                  {isActive && (
                     <div className="absolute top-10 mt-1">
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-slate-800"></div>
                     </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};