export const DASHBOARD_MOCK_DATA: Record<string, any> = {
  'XDR': {
    competitiveness: { rank: 'No.1', score: '4.9', voc: '92.5', nps: '+58', trend: '领先竞对', quadrant: '领跑者' },
    cycle: { value: '8.5', trend: 'down', trendValue: '12%', unit: '月' },
    roi: { ratio: '1:4.2', input: '50M', revenue: '210M' },
    battlefield: { current: 1, total: 5, name: '实战攻防' },
    quality: { 
      closed: 12, total: 15, topN: '年度累计 TopN',
      metrics: {
        removalRate: '100.0%', effectiveTD: 5,
        reopenCount: 0, reopenUsers: 0,
        changeTriggerRate: '0.0%', changeTriggerCount: 0,
        uncoveredRate: '0', uncoveredCount: 0, 
        leakageRate: '0%', leakageCount: 0,
        legacyRate: '0.0%', legacyCount: 0, 
        diValue: 0, haltCount: 0,
        betaWeighted: 0, betaP1: 0,
        fixCycle: 0, closedTD: 0
      },
      tableData: [
        { name: 'HC16.12.0_VT', removalRate: '100.0%', effectiveTD: 5, reopen: 0, changeRate: '0.0%', leakage: '0.0%', coverage: '100%' },
        { name: 'XDR 核心引擎组', removalRate: '99.5%', effectiveTD: 12, reopen: 1, changeRate: '0.2%', leakage: '0.01%', coverage: '98%' },
        { name: 'XDR 管理中心 UI', removalRate: '92.0%', effectiveTD: 25, reopen: 5, changeRate: '1.5%', leakage: '0.1%', coverage: '88%' }
      ]
    },
    version: { count: '2.0', reuse: '68%' },
    manpower: { 
      total: 350, 
      growth: '65%',
      aiStats: { total: 65, algo: 15, eng: 30, native: 20 }
    },
    aiNative: {
      adoption: 78,
      silicon: 46,
      savedPersonDays: 3200,
      automation: { autoShare: 62, aiExec: 45, aiFirstPass: 94 }
    }
  },
  'HCI': {
    competitiveness: { rank: 'No.1', score: '4.7', voc: '91.0', nps: '+45', trend: '领先竞对', quadrant: '领跑者' },
    cycle: { value: '6.5', trend: 'down', trendValue: '5%', unit: '月' },
    roi: { ratio: '1:3.8', input: '80M', revenue: '304M' },
    battlefield: { current: 2, total: 4, name: '企业级云化' },
    quality: { 
      closed: 8, total: 10, topN: '年度累计 TopN',
      metrics: {
        removalRate: '99.2%', effectiveTD: 8,
        reopenCount: 2, reopenUsers: 1,
        changeTriggerRate: '0.1%', changeTriggerCount: 1,
        uncoveredRate: '2', uncoveredCount: 5,
        leakageRate: '0.01%', leakageCount: 1,
        legacyRate: '1.5%', legacyCount: 3,
        diValue: 8, haltCount: 2,
        betaWeighted: 5, betaP1: 0,
        fixCycle: 3.2, closedTD: 45
      },
      tableData: [
        { name: 'HCI 存储层', removalRate: '100%', effectiveTD: 2, reopen: 0, changeRate: '0.0%', leakage: '0.0%', coverage: '99%' },
        { name: 'HCI 计算虚拟化', removalRate: '99.5%', effectiveTD: 8, reopen: 0, changeRate: '0.1%', leakage: '0.0%', coverage: '97%' },
      ]
    },
    version: { count: '3.0', reuse: '75%' },
    manpower: { 
      total: 350, 
      growth: '40%',
      aiStats: { total: 25, algo: 5, eng: 15, native: 5 }
    },
    aiNative: {
      adoption: 66,
      silicon: 38,
      savedPersonDays: 2100,
      automation: { autoShare: 55, aiExec: 36, aiFirstPass: 92 }
    }
  },
  'DEFAULT': {
    competitiveness: { rank: 'No.1', score: '4.6', voc: '90.0', nps: '+50', trend: '领先竞对', quadrant: '领跑者' },
    cycle: { value: '7.0', trend: 'stable', trendValue: '0%', unit: '月' },
    roi: { ratio: '1:3.0', input: '40M', revenue: '120M' },
    battlefield: { current: 1, total: 3, name: '战略新市场' },
    quality: { 
      closed: 10, total: 12, topN: '年度累计 TopN', 
      metrics: { 
         removalRate: '95%', effectiveTD: 10,
         reopenCount: 5, reopenUsers: 2,
         changeTriggerRate: '1.0%', changeTriggerCount: 2,
         uncoveredRate: '5', uncoveredCount: 10,
         leakageRate: '0.05%', leakageCount: 1,
         legacyRate: '2.0%', legacyCount: 4,
         diValue: 20, haltCount: 1,
         betaWeighted: 10, betaP1: 1,
         fixCycle: 5.0, closedTD: 50
      }, 
      tableData: [] 
    },
    version: { count: '2.0', reuse: '60%' },
    manpower: { 
      total: 200, 
      growth: '50%',
      aiStats: { total: 40, algo: 10, eng: 20, native: 10 }
    },
    aiNative: {
      adoption: 60,
      silicon: 35,
      savedPersonDays: 1800,
      automation: { autoShare: 50, aiExec: 32, aiFirstPass: 90 }
    }
  }
};

