
import React, { useState, useEffect } from 'react';

interface Point {
  id: string;
  x: number;
  y: number;
  type: 'vehicle' | 'incident' | 'facility' | 'disaster';
  label: string;
  status?: string;
}

const MapView: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    { id: 'v1', x: 20, y: 30, type: 'vehicle', label: 'Fleet-01', status: 'En route' },
    { id: 'v2', x: 45, y: 60, type: 'vehicle', label: 'Fleet-02', status: 'Idle' },
    { id: 'f1', x: 10, y: 10, type: 'facility', label: 'HQ-Warehouse' },
    { id: 'i1', x: 80, y: 70, type: 'incident', label: 'Traffic Blockage', status: 'Active' },
    { id: 'd1', x: 70, y: 20, type: 'disaster', label: 'Storm Zone', status: 'High Risk' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => prev.map(p => {
        if (p.type === 'vehicle') {
          return {
            ...p,
            x: Math.max(5, Math.min(95, p.x + (Math.random() - 0.5) * 2)),
            y: Math.max(5, Math.min(95, p.y + (Math.random() - 0.5) * 2))
          };
        }
        return p;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* Map Content */}
      <div className="absolute inset-0">
         {/* Simplified road-like SVG overlay */}
         <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <path d="M0,100 Q250,50 500,100 T1000,100" stroke="#0ea5e9" strokeWidth="40" fill="none" />
            <path d="M200,0 V500" stroke="#0ea5e9" strokeWidth="20" fill="none" />
            <path d="M0,400 H1000" stroke="#0ea5e9" strokeWidth="20" fill="none" />
         </svg>

         {points.map(point => (
           <div 
             key={point.id}
             className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[3000ms] linear"
             style={{ left: `${point.x}%`, top: `${point.y}%` }}
           >
             <div className={`relative group/marker cursor-pointer`}>
               {/* Marker Icon */}
               <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                 point.type === 'vehicle' ? 'bg-cyan-400' :
                 point.type === 'incident' ? 'bg-orange-500 pulse-cyan' :
                 point.type === 'disaster' ? 'bg-red-600 animate-pulse' : 'bg-green-500'
               }`}></div>
               
               {/* Label (Tooltip Style) */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity border border-gray-700 pointer-events-none">
                 <p className="font-bold text-gray-100">{point.label}</p>
                 {point.status && <p className="text-gray-400">{point.status}</p>}
               </div>
             </div>
           </div>
         ))}
      </div>

      {/* HUD Elements */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-2 rounded-lg">
          <p className="text-[10px] text-cyan-400 font-mono">LAT: 37.7749</p>
          <p className="text-[10px] text-cyan-400 font-mono">LNG: -122.4194</p>
        </div>
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-2 rounded-lg">
          <p className="text-[10px] text-orange-400 font-mono">RISK: LOW</p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-md border border-gray-700 p-3 rounded-xl flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span className="text-[11px] text-gray-300">Active Units</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-[11px] text-gray-300">Congestion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="text-[11px] text-gray-300">Threat Area</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
