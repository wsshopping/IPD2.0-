import React from 'react';

export const SystemMap: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">IPD 运营指标体系全景图</h2>
          <p className="text-slate-500 mt-2">目标：通过明确的目标与评估方法，将组织能力与商业结果挂钩。</p>
        </div>

        {/* The Matrix */}
        <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr] border-2 border-slate-800 text-sm">
          
          {/* Header Row */}
          <div className="bg-slate-300 p-3 font-bold border-r border-slate-400 flex items-center justify-center">
            对象层次
          </div>
          <div className="bg-slate-200 col-span-4 border-b border-slate-400">
             <div className="text-center p-2 font-bold border-b border-slate-300">指标分类 (INDICATORS)</div>
             <div className="grid grid-cols-4">
                <div className="p-2 font-semibold text-center border-r border-slate-300">价值交付 (Value)</div>
                <div className="p-2 font-semibold text-center border-r border-slate-300">质量 (Quality)</div>
                <div className="p-2 font-semibold text-center border-r border-slate-300">效率/时间 (Efficiency)</div>
                <div className="p-2 font-semibold text-center">财务/回报 (Finance)</div>
             </div>
          </div>

          {/* Row 1: Business Results */}
          <div className="bg-green-200 p-4 font-bold border-r border-b border-slate-400 flex items-center justify-center text-green-900">
            产品商业结果
          </div>
          <div className="col-span-4 grid grid-cols-4 border-b border-slate-400">
            <div className="p-4 border-r border-slate-200 bg-orange-50/50">
               <ul className="list-disc list-inside text-xs space-y-2">
                 <li><strong>产品竞争力</strong> (市场评估 + VOC)</li>
                 <li><strong>新市场/新领域突破</strong> (孵化/标准)</li>
               </ul>
            </div>
            <div className="p-4 border-r border-slate-200 bg-orange-50/50">
               <ul className="list-disc list-inside text-xs space-y-2">
                 <li><strong>客户满意度</strong> (VOC 调研)</li>
                 <li><strong>重大质量问题关闭率</strong></li>
               </ul>
            </div>
            <div className="p-4 border-r border-slate-200 bg-orange-50/50">
               <ul className="list-disc list-inside text-xs space-y-2">
                 <li><strong>平均开发周期</strong> (立项到上市)</li>
                 <li><strong>主要版本发布频率</strong></li>
               </ul>
            </div>
             <div className="p-4 bg-orange-50/50">
               <ul className="list-disc list-inside text-xs space-y-2">
                 <li><strong>研发投产比 ROI</strong> (营收/投入)</li>
                 <li><strong>平台复用率</strong></li>
                 <li>人力资本地图</li>
               </ul>
            </div>
          </div>

          {/* Row 2: Project Results */}
          <div className="bg-green-200 p-4 font-bold border-r border-b border-slate-400 flex items-center justify-center text-green-900">
            项目交付结果
          </div>
          <div className="col-span-4 grid grid-cols-4 border-b border-slate-400 bg-yellow-50">
             <div className="p-4 border-r border-slate-200 flex items-center justify-center text-red-600 font-medium">
               项目价值变现率
             </div>
             <div className="p-4 border-r border-slate-200 flex items-center justify-center text-red-600 font-medium">
               网上问题率 (DI)
             </div>
             <div className="p-4 border-r border-slate-200 flex items-center justify-center text-red-600 font-medium">
               项目周期偏差
             </div>
             <div className="p-4 flex items-center justify-center text-slate-700 font-medium">
               开发成本偏差
             </div>
          </div>

           {/* Row 3: Project Process */}
           <div className="bg-green-200 p-4 font-bold border-r border-slate-400 flex flex-col items-center justify-center text-green-900">
             <span>项目过程控制</span>
             <div className="mt-4 space-y-1 text-xs opacity-75 w-full text-center">
               <div className="bg-green-300/50 px-1 rounded">DCP1 概念</div>
               <div className="bg-green-300/50 px-1 rounded">TR1 需求</div>
               <div className="bg-green-300/50 px-1 rounded">TR2 系统</div>
               <div className="bg-green-300/50 px-1 rounded">TR3 实现</div>
               <div className="bg-green-300/50 px-1 rounded">TR4 验证</div>
               <div className="bg-green-300/50 px-1 rounded">TR5 验收</div>
               <div className="bg-green-300/50 px-1 rounded">TR6 发布</div>
             </div>
           </div>
           <div className="col-span-4 grid grid-cols-4 bg-blue-50/30 text-xs">
              <div className="p-4 border-r border-slate-200 space-y-4">
                 <p className="text-blue-600">PDT 需求产出 & 评审意见</p>
                 <p className="text-blue-600">DCP2-1 需求一致性检查</p>
                 <p className="text-blue-600">Cleanroom vs Playbook 验收</p>
                 <p>Beta 客户备份方案</p>
              </div>
              <div className="p-4 border-r border-slate-200 space-y-4">
                 <p className="text-blue-600 font-medium">质量基线达成率</p>
                 <p>系统需求评审评分</p>
                 <p>代码评审 (CR) 覆盖率/通过率</p>
                 <p>静态分析 (Lint/Bug) 问题率</p>
                 <p>测试用例覆盖度 & 密度</p>
                 <p className="text-blue-600">指标: 问题重开率, 缺陷遗留时长</p>
              </div>
               <div className="p-4 border-r border-slate-200 space-y-4">
                 <p className="text-blue-600">概念阶段周期时间</p>
                 <p>DCP2-2 按时完成率</p>
                 <p>缺陷平均生命周期</p>
                 <p className="text-blue-600">进度偏差率</p>
              </div>
               <div className="p-4 space-y-4">
                 <p>资源投入偏差 (概念阶段)</p>
                 <p className="text-blue-600">资源投入偏差 (开发阶段)</p>
                 <p>Beta 阶段资源偏差</p>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};