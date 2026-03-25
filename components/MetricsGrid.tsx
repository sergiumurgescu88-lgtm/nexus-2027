
import React from 'react';
import { Metric } from '../types';

interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl hover:border-gray-700 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-gray-400">{metric.label}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              metric.trend === 'up' ? 'bg-green-500/10 text-green-400' : 
              metric.trend === 'down' ? 'bg-red-500/10 text-red-400' : 'bg-gray-500/10 text-gray-400'
            }`}>
              {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '▬'} {metric.percentChange || '0%'}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors">
            {metric.value}
          </div>
          <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
