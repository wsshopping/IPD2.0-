import React, { useState } from 'react';
import { ViewMode, Project } from './types';
import { ProductDashboard } from './components/ProductDashboard';
import { ProjectDetail } from './components/ProjectDetail';
import { SystemMap } from './components/SystemMap';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { SystemLevelDashboard } from './components/SystemLevelDashboard';
import { BarChart3, Map, Layers, LayoutDashboard, PieChart, Network } from 'lucide-react';
import { MOCK_PROJECT } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('portfolio-dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string>('security'); // 'security' | 'cloud' | 'platform'

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setViewMode('project-detail');
  };

  const handleSelectSystem = (systemId: string) => {
    setSelectedSystem(systemId);
    setViewMode('system-dashboard');
  }

  const handleSelectProductLine = () => {
    // Logic to select a specific product line could pass an ID here
    // For demo, we just switch view to the singular Product Dashboard
    setViewMode('product-dashboard');
  };

  const handleBack = () => {
     setSelectedProject(null);
     // Smart back logic based on hierarchy
     if (viewMode === 'project-detail') {
        setViewMode('product-dashboard');
     } else if (viewMode === 'product-dashboard') {
        setViewMode('system-dashboard');
     } else if (viewMode === 'system-dashboard') {
        setViewMode('portfolio-dashboard');
     } else {
        setViewMode('portfolio-dashboard');
     }
  };

  const getSystemName = (id: string) => {
    switch(id) {
      case 'security': return '大安全体系 (Big Security)';
      case 'cloud': return '大云体系 (Big Cloud)';
      case 'platform': return '研发平台体系 (R&D Platform)';
      default: return '体系仪表盘';
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              IPD 度量指挥中心
            </h1>
          </div>

          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
             <button
              onClick={() => setViewMode('portfolio-dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${viewMode === 'portfolio-dashboard' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <PieChart className="w-4 h-4" />
              集团组合
            </button>
            
            {/* New System Layer */}
            <button
              onClick={() => setViewMode('system-dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${viewMode === 'system-dashboard' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Network className="w-4 h-4" />
              体系仪表盘
            </button>

            <button
              onClick={() => setViewMode('product-dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${viewMode === 'product-dashboard' || viewMode === 'project-detail' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              产线仪表盘
            </button>
            <button
              onClick={() => setViewMode('system-map')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${viewMode === 'system-map' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Map className="w-4 h-4" />
              参考架构
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Context Header */}
        <div className="mb-6">
           <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-2">
             {viewMode === 'portfolio-dashboard' && <span>集团组合视图 (Portfolio Overview)</span>}
             {viewMode === 'system-dashboard' && (
                 <>
                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setViewMode('portfolio-dashboard')}>集团</span>
                    <span>/</span>
                    <span className="text-slate-800">{getSystemName(selectedSystem)}</span>
                 </>
             )}
             {viewMode === 'product-dashboard' && (
                  <>
                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setViewMode('portfolio-dashboard')}>集团</span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setViewMode('system-dashboard')}>{getSystemName(selectedSystem)}</span>
                    <span>/</span>
                    <span className="text-slate-800">产线仪表盘 (Product Line)</span>
                  </>
             )}
             {viewMode === 'project-detail' && (
                  <>
                     <span className="cursor-pointer hover:text-blue-600" onClick={() => setViewMode('system-dashboard')}>{getSystemName(selectedSystem)}</span>
                     <span>/</span>
                     <span className="cursor-pointer hover:text-blue-600" onClick={() => setViewMode('product-dashboard')}>产线仪表盘</span>
                     <span>/</span>
                     <span className="text-slate-800">项目执行视图</span>
                  </>
             )}
             {viewMode === 'system-map' && <span>参考架构 (Reference Architecture)</span>}
           </h2>
        </div>

        {/* View Switcher */}
        {viewMode === 'portfolio-dashboard' && (
          <PortfolioDashboard 
             onSelectProject={handleSelectProject} 
             onSelectSystem={handleSelectSystem} 
          />
        )}

        {viewMode === 'system-dashboard' && (
          <SystemLevelDashboard 
             systemId={selectedSystem}
             onSelectSystem={handleSelectSystem}
             onSelectProductLine={handleSelectProductLine} 
          />
        )}

        {viewMode === 'system-map' && <SystemMap />}
        
        {viewMode === 'product-dashboard' && (
          <ProductDashboard onSelectProject={handleSelectProject} />
        )}

        {viewMode === 'project-detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onBack={handleBack} 
          />
        )}

      </main>
    </div>
  );
};

export default App;