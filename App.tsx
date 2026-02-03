import React, { useState } from 'react';
import { ViewMode, Project } from './types';
import { ProductDashboard } from './components/ProductDashboard';
import { ProjectDetail } from './components/ProjectDetail';
import { SystemMap } from './components/SystemMap';
import { BarChart3, Map, Layers, LayoutDashboard } from 'lucide-react';
import { MOCK_PROJECT } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('product-dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setViewMode('project-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedProject(null);
    setViewMode('product-dashboard');
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
              onClick={() => setViewMode('product-dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${viewMode === 'product-dashboard' || viewMode === 'project-detail' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              仪表盘
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
             {viewMode === 'system-map' ? '参考架构 (Reference Architecture)' : 
              viewMode === 'project-detail' ? '执行视图 (Project Execution)' : '战略视图 (Strategic Product)'}
           </h2>
        </div>

        {/* View Switcher */}
        {viewMode === 'system-map' && <SystemMap />}
        
        {viewMode === 'product-dashboard' && (
          <ProductDashboard onSelectProject={handleSelectProject} />
        )}

        {viewMode === 'project-detail' && selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onBack={handleBackToDashboard} 
          />
        )}

      </main>
    </div>
  );
};

export default App;