import { Project } from '../types';

export const MOCK_PROJECT: Project = {
  id: 'PRJ-2024-001',
  name: 'XDR 威胁检测引擎 v3.0',
  projectSet: '大安全 - XDR产品线',
  battlefield: '实战攻防',
  manager: '陈亚历',
  progress: 65,
  status: 'normal',
  isHilltop: true,
  phase: 'TR6',
  headcount: 120,
  headcountPercentage: 35,
  manpowerDeviation: '+2%',
  businessMetrics: [
    { id: 'bm1', label: '产品竞争力', value: '4.8/5', trend: 'up', description: 'Gartner 象限位置' },
    { id: 'bm2', label: '客户满意度', value: '92%', trend: 'up', description: 'VOC 问卷调查' },
    { id: 'bm3', label: '平均开发周期', value: '8.5', unit: '月', trend: 'down', description: '从立项到上市' },
    { id: 'bm4', label: '研发投产比 (ROI)', value: '1:4.2', trend: 'stable', description: '投入/营收' },
  ],
  resultMetrics: [
    { id: 'rm1', label: '项目价值兑现率', value: '95%', trend: 'up' },
    { id: 'rm2', label: '项目网上问题率', value: '0.05', unit: 'DI', trend: 'down' },
    { id: 'rm3', label: '项目开发周期', value: '8.2', unit: '月', trend: 'up' },
    { id: 'rm4', label: '产品上架交付周期', value: '98%', trend: 'stable' },
  ],
  phases: [
    { 
      id: 'dcp2-1', name: 'DCP2-1', subName: '立项', status: 'completed', plannedDate: '10-15', actualDate: '11-13', 
      metrics: [
        { id: 'm1', label: 'PDT代表需求输出数', value: '12', unit: '个', trend: 'stable' },
        { id: 'm2', label: '评审保留意见数', value: '3', unit: '个', trend: 'down' },
        { id: 'm3', label: '立项材料完整度', value: '100%', unit: '', trend: 'stable' }
      ] 
    },
    { 
      id: 'tr1', name: 'TR1', subName: '用户需求', status: 'completed', plannedDate: '10-15', actualDate: '02-03', 
      metrics: [
        { id: 'm1', label: '产品质量基线达成率', value: '100%', unit: '', trend: 'stable' },
        { id: 'm2', label: '通用需求合入率', value: '95%', unit: '', trend: 'up' },
        { id: 'm3', label: '用户场景覆盖数', value: '45', unit: '个', trend: 'up' }
      ] 
    },
    { 
      id: 'tr2', name: 'TR2', subName: '系统需求', status: 'completed', plannedDate: '10-15', actualDate: '02-03', 
      metrics: [
        { id: 'm1', label: '系统需求评审得分', value: '4.2', unit: '/5', trend: 'up' },
        { id: 'm2', label: '项目沙盘评审结果', value: '通过', unit: '', trend: 'stable' }
      ] 
    },
    { 
      id: 'mr1', name: 'MR1', subName: '市场计划', status: 'completed', plannedDate: '12-31', actualDate: '/', 
      metrics: [
         { id: 'm1', label: '市场分析报告评审', value: '通过', unit: '' },
         { id: 'm2', label: '目标客户画像清晰度', value: '高', unit: '' }
      ] 
    },
    { 
      id: 'sr1', name: 'SR1', subName: '服务计划', status: 'completed', plannedDate: '12-31', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '服务策略评审', value: '通过', unit: '' }
      ] 
    },
    { 
      id: 'dcp2-2', name: 'DCP2-2', subName: '立项', status: 'completed', plannedDate: '12-31', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '立项周期', value: '45', unit: '天', trend: 'down' },
        { id: 'm2', label: 'DCP2-2 及时完成率', value: '100%', unit: '', trend: 'stable' }
      ] 
    },
    { 
      id: 'tr3-1', name: 'TR3-1', subName: '总体设计', status: 'completed', plannedDate: '12-23', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '总体设计评审结果', value: '无保留', unit: '', trend: 'up' },
        { id: 'm2', label: '关键技术风险闭环率', value: '100%', unit: '' }
      ] 
    },
    { 
      id: 'tr3-2', name: 'TR3-2', subName: '测试总体策略', status: 'completed', plannedDate: '12-23', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '测试总体策略评审', value: '通过', unit: '' },
        { id: 'm2', label: '测试工具准备就绪', value: 'Yes', unit: '' }
      ] 
    },
    { 
      id: 'dcp3', name: 'DCP3', subName: '计划', status: 'completed', plannedDate: '01-05', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '项目计划评审结果', value: '通过', unit: '' },
        { id: 'm2', label: '资源锁定率', value: '98%', unit: '' }
      ] 
    },
    { 
      id: 'cr', name: '交付', subName: 'Cleanroom验', status: 'completed', plannedDate: '01-30', actualDate: '/', 
      metrics: [
        { id: 'm1', label: 'Cleanroom验收结果', value: 'Pass', unit: '' },
        { id: 'm2', label: 'Playbook执行符合度', value: '95%', unit: '' }
      ] 
    },
    { 
      id: 'tr6', name: 'TR6', subName: '版本预发布', status: 'completed', plannedDate: '01-30', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '千行Bug率', value: '0.02', unit: '', trend: 'down' },
        { id: 'm2', label: '圈复杂度(平均)', value: '12', unit: '', trend: 'stable' },
        { id: 'm3', label: '代码强制合并且次', value: '0', unit: '次', trend: 'stable' },
        { id: 'm4', label: '遗留问题DI值', value: '2.5', unit: '', trend: 'down' }
      ] 
    },
    { 
      id: 'mr3', name: 'MR3', subName: '市场预发布', status: 'completed', plannedDate: '01-30', actualDate: '/', 
      metrics: [
         { id: 'm1', label: '上市资料就绪度', value: '100%', unit: '' }
      ]
    },
    { 
      id: 'sr3', name: 'SR3', subName: '服务预发布', status: 'current', plannedDate: '01-30', actualDate: '/', 
      metrics: [
         { id: 'm1', label: '服务培训覆盖率', value: '80%', unit: '', trend: 'up' },
         { id: 'm2', label: '备件就绪率', value: '90%', unit: '' }
      ] 
    },
    { 
      id: 'dcp4', name: 'DCP4', subName: 'Beta发布', status: 'pending', plannedDate: '01-30', actualDate: '/', 
      metrics: [
        { id: 'm1', label: 'Beta客户储备数', value: '3', unit: '家' },
        { id: 'm2', label: 'Beta准入缺陷数', value: '0', unit: '个' }
      ] 
    },
    { 
      id: 'dcp5', name: 'DCP5', subName: '上市发布', status: 'pending', plannedDate: '02-27', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '缺陷平均生命周期', value: '-', unit: '天' },
        { id: 'm2', label: '项目进度偏差率', value: '-', unit: '%' },
        { id: 'm3', label: 'Beta周期', value: '-', unit: '天' }
      ] 
    },
    { id: 'maint', name: '质量与价值运营', subName: '', status: 'pending', plannedDate: '-', actualDate: '/', metrics: [] },
    { id: 'sp', name: 'SP补丁', subName: '', status: 'pending', plannedDate: '-', actualDate: '/', metrics: [] },
    { 
      id: 'dcp6', name: 'DCP6', subName: '默认发货', status: 'pending', plannedDate: '03-31', actualDate: '/', 
      metrics: [
        { id: 'm1', label: '切换默认发货周期', value: '-', unit: '月' },
        { id: 'm2', label: '资源投入偏差率', value: '-', unit: '%' }
      ] 
    },
  ]
};

export const PROJECTS_LIST: Project[] = [
  MOCK_PROJECT,
  { 
    ...MOCK_PROJECT,
    id: 'PRJ-2024-002', 
    name: 'HCI 超融合 6.8.0', 
    projectSet: '大云 - HCI产品线',
    battlefield: '企业级云化',
    manager: '李莎拉', 
    progress: 30, 
    status: 'warning',
    isHilltop: true,
    phase: 'TR4',
    headcount: 45,
    headcountPercentage: 15,
    manpowerDeviation: '+10%',
    resultMetrics: [
      { id: 'rm1', label: '项目价值兑现率', value: '80%', trend: 'down' },
      { id: 'rm2', label: '项目网上问题率', value: '0.12', unit: 'DI', trend: 'up' },
      { id: 'rm3', label: '项目开发周期', value: '11.0', unit: '月', trend: 'down' },
      { id: 'rm4', label: '产品上架交付周期', value: '92%', trend: 'down' },
    ]
  },
  { 
    ...MOCK_PROJECT,
    id: 'PRJ-2024-003', 
    name: '天问大模型-代码助手 Gen2', 
    projectSet: '研发平台 - 天问AI',
    battlefield: 'AI 效能',
    manager: '王迈克', 
    progress: 88, 
    status: 'normal',
    isHilltop: false,
    phase: 'DCP4',
    headcount: 60,
    headcountPercentage: 20,
    manpowerDeviation: '0%',
    resultMetrics: [
      { id: 'rm1', label: '项目价值兑现率', value: '100%', trend: 'up' },
      { id: 'rm2', label: '项目网上问题率', value: '0.02', unit: 'DI', trend: 'down' },
      { id: 'rm3', label: '项目开发周期', value: '6.5', unit: '月', trend: 'up' },
      { id: 'rm4', label: '产品上架交付周期', value: '99%', trend: 'up' },
    ]
  },
  { 
    ...MOCK_PROJECT,
    id: 'PRJ-2024-004', 
    name: '托管云数据库 RDS v2', 
    projectSet: '大云 - 托管云产品线',
    battlefield: '数据库上云',
    manager: '吴杰茜', 
    progress: 15, 
    status: 'risk',
    isHilltop: false,
    phase: 'DCP2',
    headcount: 85,
    headcountPercentage: 30,
    manpowerDeviation: '-15%',
    resultMetrics: [
      { id: 'rm1', label: '项目价值兑现率', value: '60%', trend: 'down' },
      { id: 'rm2', label: '项目网上问题率', value: '-', unit: 'DI', trend: 'stable' },
      { id: 'rm3', label: '项目开发周期', value: '14.0', unit: '月', trend: 'down' },
      { id: 'rm4', label: '产品上架交付周期', value: '85%', trend: 'down' },
    ]
  },
];

