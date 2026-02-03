import React, { useState } from 'react';
import { ViewMode, Project } from './types';
import { ProductDashboard } from './components/ProductDashboard';
import { ProjectDetail } from './components/ProjectDetail';
import { SystemMap } from './components/SystemMap';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { BarChart3, Map, Layers, LayoutDashboard, PieChart } from 'lucide-react';
import { MOCK_PROJECT } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('portfolio-dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setViewMode('project-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedProject(null);
    setViewMode('portfolio-dashboard'); // Return to portfolio if that was the entry point, or simplify to handle history. For now, default back logic.
  };

  // Improved back handler to determine where to go based on context could be added, 
  // but for now simple toggle works. If entered from Portfolio, we might want to go back there.
  // We can track 'previousView' if needed, but for simplicity:
  const handleBack = () => {
     setSelectedProject(null);
     // Default back to product dashboard if strict hierarchy, 
     // but if we support drilling from Portfolio, we might want to stay in 'project-detail' mode until closed?
     // Actually, let's just go back to the view that makes sense. 
     // Since the user can switch views via top nav, simple nulling is safest.
     // To keep it simple: simpler logic -> if we are in project detail, we likely want to go back to the list we came from.
     // For this specific requirement, simply exiting detail mode is enough, the tab remains active.
     // However, setViewMode needs a target. 
     // Let's assume we go back to Product Dashboard as standard, OR stay on Portfolio if we can.
     // But wait, the tabs switch viewMode. 
     // Let's just default to 'product-dashboard' for now as the 'list' view, 
     // OR strictly speaking, if we clicked from Portfolio, we might want to return to Portfolio.
     // For this demo, let's Default to 'product-dashboard' as it is the main list view, 
     // or we can add a simple check.
     if (viewMode === 'project-detail') {
        // Ideally we return to previous, but let's default to product dashboard as it's the main "list"
        setViewMode('product-dashboard');
     }
  };


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

          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
             <button
              onClick={() => setViewMode('portfolio-dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${viewMode === 'portfolio-dashboard' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <PieChart className="w-4 h-4" />
              集团组合概览
            </button>
            <button
              onClick={() => setViewMode('product-dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${viewMode === 'product-dashboard' || viewMode === 'project-detail' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              产品线仪表盘
            </button>
            <button
              onClick={() => setViewMode('system-map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${viewMode === 'system-map' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Map className="w-4 h-4" />
              体系全景图
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Context Header */}
        <div className="mb-6">
           <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
             {viewMode === 'portfolio-dashboard' ? '集团组合视图 (Portfolio Overview)' :
              viewMode === 'system-map' ? '参考架构 (Reference Architecture)' : 
              viewMode === 'project-detail' ? '执行视图 (Project Execution)' : '战略视图 (Strategic Product)'}
           </h2>
        </div>

        {/* View Switcher */}
        {viewMode === 'portfolio-dashboard' && (
          <PortfolioDashboard onSelectProject={handleSelectProject} />
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