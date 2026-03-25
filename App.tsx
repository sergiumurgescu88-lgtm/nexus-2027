
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import MetricsGrid from './components/MetricsGrid';
import ChatBot from './components/ChatBot';
import { AppView, Metric, Task, Shipment } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockFinanceData = [
  { name: 'Mon', revenue: 4000, costs: 2400 },
  { name: 'Tue', revenue: 3000, costs: 1398 },
  { name: 'Wed', revenue: 2000, costs: 9800 },
  { name: 'Thu', revenue: 2780, costs: 3908 },
  { name: 'Fri', revenue: 1890, costs: 4800 },
  { name: 'Sat', revenue: 2390, costs: 3800 },
  { name: 'Sun', revenue: 3490, costs: 4300 },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const mainMetrics: Metric[] = [
    { label: 'Operational Efficiency', value: '94.2%', trend: 'up', percentChange: '+2.4%' },
    { label: 'Real-time ROI', value: '$1.24M', trend: 'up', percentChange: '+12.1%' },
    { label: 'Active Workforce', value: '482', trend: 'neutral', percentChange: '0%' },
    { label: 'Risk Exposure', value: 'Low', trend: 'down', percentChange: '-8.5%' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-gray-100 tracking-tight">CENTRAL COMMAND</h2>
                <p className="text-gray-400 mt-1">Real-time planetary operational oversight.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700 flex items-center space-x-3">
                 <span className="text-sm font-mono text-cyan-400">SYNC_STATUS: NOMINAL</span>
                 <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-cyan"></div>
              </div>
            </div>

            <MetricsGrid metrics={mainMetrics} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-900/50 border border-gray-800 rounded-[2.5rem] p-4">
                  <MapView />
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] flex flex-col justify-between">
                 <div>
                    <h3 className="text-xl font-bold text-gray-100 mb-6">Predictive Analytics</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockFinanceData}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="revenue" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
                 <div className="mt-8 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
                    <p className="text-sm text-cyan-400 font-medium">NEXUS Recommendation:</p>
                    <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                      Supply chain patterns suggest a 15% bottleneck in South-East sectors. Recommend activating backup routing in 4 hours.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        );

      case AppView.LOGISTICS:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
             <div className="flex justify-between items-center">
               <h2 className="text-4xl font-black text-gray-100 tracking-tight uppercase">Logistics Orchestrator</h2>
               <button className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold px-6 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                 Optimize All Routes
               </button>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {[
                  { id: 'TRK-09', dest: 'Berlin', load: '82%', eta: '14:20', risk: 'Low' },
                  { id: 'TRK-12', dest: 'Paris', load: '45%', eta: '16:45', risk: 'Medium' },
                  { id: 'TRK-45', dest: 'London', load: '98%', eta: '11:10', risk: 'Low' },
                  { id: 'DRN-02', dest: 'Madrid', load: '10%', eta: '09:00', risk: 'High' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono text-cyan-400">{item.id}</span>
                      <span className={`w-2 h-2 rounded-full ${item.risk === 'Low' ? 'bg-green-500' : item.risk === 'Medium' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                    </div>
                    <p className="text-xl font-bold text-gray-100">{item.dest}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase text-gray-500 font-bold">Load</p>
                        <p className="text-sm text-gray-200">{item.load}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-500 font-bold">ETA</p>
                        <p className="text-sm text-gray-200">{item.eta}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl h-[400px]">
                <h3 className="text-lg font-bold text-gray-100 mb-6">Traffic & Delay Patterns (24h Window)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockFinanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
                    <Bar dataKey="costs" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        );

      case AppView.CLIMATE:
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-12 rounded-[3rem] text-center border border-blue-800">
                <h2 className="text-5xl font-black mb-4">RESILIENCE ENGINE</h2>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">Predicting and mitigating global climate impacts on your supply chain 72 hours in advance.</p>
                <div className="mt-8 flex justify-center space-x-4">
                   <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl">
                      <p className="text-[10px] uppercase text-blue-200 font-bold mb-1">Alerts</p>
                      <p className="text-2xl font-bold">2 Active</p>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl">
                      <p className="text-[10px] uppercase text-blue-200 font-bold mb-1">Safe Corridors</p>
                      <p className="text-2xl font-bold">98.2%</p>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl">
                   <h3 className="text-xl font-bold text-gray-100 mb-4">Environmental Risk Matrix</h3>
                   <div className="space-y-4">
                      {['Wildfire (W-Coast)', 'Flood Risk (Central)', 'AQI Warning (Urban)'].map((alert, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
                           <span className="text-gray-200 font-medium">{alert}</span>
                           <span className="text-orange-400 font-mono text-xs">MONITORING</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl">
                   <h3 className="text-xl font-bold text-gray-100 mb-4">Satellite Intelligence</h3>
                   <div className="aspect-video bg-gray-950 rounded-2xl border border-gray-800 flex items-center justify-center text-gray-500">
                      <p className="text-sm font-mono tracking-widest animate-pulse">ESTABLISHING_LINK...</p>
                   </div>
                </div>
             </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
               <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-200">Feature Under Encryption</h2>
            <p className="text-gray-400 max-w-md">Nexus Module {currentView} is currently being calibrated for 2027 enterprise standards. Check system status later.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030712] text-gray-100">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto relative">
        {/* Global Nav Bar */}
        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-12 sticky top-0 bg-[#030712]/80 backdrop-blur-xl z-10">
           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Enterprise</span>
                 <span className="text-sm font-bold text-gray-200">QUANTUM_CORP</span>
              </div>
              <div className="h-4 w-px bg-gray-800"></div>
              <div className="flex items-center space-x-2">
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Network</span>
                 <span className="text-sm font-bold text-green-400">ENCRYPTED</span>
              </div>
           </div>
           
           <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-100 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 border-2 border-gray-800 overflow-hidden shadow-lg">
                 <img src="https://picsum.photos/100/100" alt="Avatar" className="w-full h-full object-cover grayscale" />
              </div>
           </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default App;
