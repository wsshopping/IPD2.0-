import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Metric } from '../types';

interface MetricCardProps {
  metric: Metric;
  variant: 'blue' | 'yellow' | 'white';
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, variant }) => {
  const getColors = () => {
    switch (variant) {
      case 'blue':
        return 'bg-blue-50 border-blue-100 text-blue-900';
      case 'yellow':
        return 'bg-amber-50 border-amber-100 text-amber-900';
      case 'white':
      default:
        return 'bg-white border-slate-200 text-slate-900';
    }
  };

  const getTrendIcon = () => {
    if (metric.trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (metric.trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className={`p-4 rounded-lg border shadow-sm flex flex-col justify-between h-full ${getColors()}`}>
      <div>
        <div className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">
          {metric.label}
        </div>
        <div className="text-2xl font-bold flex items-center gap-2">
          {metric.value}
          <span className="text-sm font-normal opacity-60">{metric.unit}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
         <span className="text-xs opacity-70 truncate max-w-[120px]" title={metric.description}>
            {metric.description || '关键指标'}
         </span>
         {getTrendIcon()}
      </div>
    </div>
  );
};