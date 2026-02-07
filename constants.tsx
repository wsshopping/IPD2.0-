import { Project, Metric, RosterMember } from './types';
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

// Helper to create consistent metrics
const createMetrics = () => ({
  business: [
    { id: 'bm1', label: '产品竞争力', value: '4.8/5', trend: 'up' },
    { id: 'bm2', label: '客户满意度', value: '92%', trend: 'up' },
    { id: 'bm3', label: '平均开发周期', value: '8.5', unit: '月', trend: 'down' },
    { id: 'bm4', label: '研发投产比', value: '1:4.2', trend: 'stable' },
  ] as Metric[],
  result: [
    { id: 'rm1', label: '价值变现率', value: '95%', trend: 'up' },
    { id: 'rm2', label: '网上问题率', value: '0.05', unit: '单/千行', trend: 'down' },
    { id: 'rm3', label: '开发周期偏差', value: '-3', unit: '天', trend: 'up' },
    { id: 'rm4', label: '交付质量评分', value: '98%', trend: 'stable' },
  ] as Metric[]
});

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
    { id: 'rm4', label: '项目交付质量', value: '98%', trend: 'stable' },
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
      { id: 'rm4', label: '项目交付质量', value: '92%', trend: 'down' },
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
      { id: 'rm4', label: '项目交付质量', value: '99%', trend: 'up' },
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
      { id: 'rm4', label: '项目交付质量', value: '85%', trend: 'down' },
    ]
  },
];

export const ROSTER: RosterMember[] = [
  { id: '10001', name: '张三', system: '大安全', productLine: 'XDR 产品线', team: '核心引擎组', function: '研发', level: 8, projects: ['XDR 核心引擎升级'], role: '核心开发', direction: '引擎架构', keyProject: true, employment: '正式员工' },
  { id: '10002', name: '李四', system: '大安全', productLine: 'XDR 产品线', team: '核心引擎组', function: '测试', level: 6, projects: ['XDR 核心引擎升级'], role: '测试负责人', direction: '稳定性验证', keyProject: true, employment: '正式员工' },
  { id: '10003', name: '王五', system: '大安全', productLine: 'XDR 产品线', team: '数据平台组', function: '研发', level: 7, projects: ['XDR 核心引擎升级'], role: '数据开发', direction: '日志平台', keyProject: true, employment: '正式员工' },
  { id: '10004', name: '赵六', system: '大安全', productLine: 'XDR 产品线', team: '数据平台组', function: '规划', level: 5, projects: ['XDR 核心引擎升级'], role: '产品规划', direction: '数据策略', keyProject: false, employment: '正式员工' },
  { id: '10005', name: '钱七', system: '大安全', productLine: 'XDR 产品线', team: '前端交互组', function: '研发', level: 6, projects: ['XDR 管理中心 UI'], role: '前端开发', direction: '控制台体验', keyProject: false, employment: '正式员工' },
  { id: '10006', name: '孙八', system: '大安全', productLine: 'XDR 产品线', team: '前端交互组', function: '测试', level: 5, projects: ['XDR 管理中心 UI'], role: '测试工程师', direction: '交互验证', keyProject: false, employment: '合作方' },

  { id: '10007', name: '周九', system: '大安全', productLine: '保护 AI 产品线', team: '算法研究组', function: '研发', level: 7, projects: ['保护AI v1.2'], role: '算法工程师', direction: '威胁检测', keyProject: true, employment: '正式员工' },
  { id: '10008', name: '吴十', system: '大安全', productLine: '保护 AI 产品线', team: '算法研究组', function: '规划', level: 6, projects: ['保护AI v1.2'], role: '产品规划', direction: 'AI 防护', keyProject: false, employment: '正式员工' },
  { id: '10009', name: '郑十一', system: '大安全', productLine: '保护 AI 产品线', team: '安全运营组', function: '安全运营', level: 6, projects: ['安全运营自动化'], role: '安全运营', direction: '威胁响应', keyProject: false, employment: '正式员工' },
  { id: '10010', name: '王十二', system: '大安全', productLine: '保护 AI 产品线', team: '安全运营组', function: '技术支持', level: 5, projects: ['安全运营自动化'], role: '技术支持', direction: '客户处置', keyProject: false, employment: '合作方' },

  { id: '10011', name: '刘一', system: '大安全', productLine: 'AC 产品线', team: '应用识别组', function: '研发', level: 6, projects: ['AC 行为管理 v13'], role: '识别引擎开发', direction: 'DPI', keyProject: false, employment: '正式员工' },
  { id: '10012', name: '陈二', system: '大安全', productLine: 'AC 产品线', team: '应用识别组', function: '测试', level: 5, projects: ['AC 行为管理 v13'], role: '测试工程师', direction: '协议验证', keyProject: false, employment: '合作方' },
  { id: '10013', name: '张三一', system: '大安全', productLine: 'AC 产品线', team: '策略引擎组', function: '规划', level: 5, projects: ['AC 行为管理 v13'], role: '产品规划', direction: '策略迭代', keyProject: false, employment: '正式员工' },
  { id: '10014', name: '李四一', system: '大安全', productLine: 'AC 产品线', team: '策略引擎组', function: '研发', level: 7, projects: ['AC 行为管理 v13'], role: '策略引擎开发', direction: '策略平台', keyProject: false, employment: '正式员工' },

  { id: '10015', name: '王五一', system: '大安全', productLine: 'AF 产品线', team: '硬件适配组', function: '研发', level: 7, projects: ['下一代防火墙硬件适配'], role: '硬件适配', direction: '平台兼容', keyProject: true, employment: '正式员工' },
  { id: '10016', name: '赵六一', system: '大安全', productLine: 'AF 产品线', team: '硬件适配组', function: '测试', level: 6, projects: ['下一代防火墙硬件适配'], role: '测试工程师', direction: '兼容性验证', keyProject: true, employment: '合作方' },
  { id: '10017', name: '钱七一', system: '大安全', productLine: 'AF 产品线', team: '威胁防护组', function: '安全运营', level: 5, projects: ['AF 威胁防护策略'], role: '安全运营', direction: '策略响应', keyProject: false, employment: '正式员工' },
  { id: '10018', name: '孙八一', system: '大安全', productLine: 'AF 产品线', team: '威胁防护组', function: '技术支持', level: 5, projects: ['AF 威胁防护策略'], role: '技术支持', direction: '客户处置', keyProject: false, employment: '合作方' },

  { id: '10019', name: '周九一', system: '大云', productLine: '托管云产品线', team: '云平台组', function: '研发', level: 6, projects: ['托管云数据库 RDS v2'], role: '云平台开发', direction: '数据服务', keyProject: false, employment: '正式员工' },
  { id: '10020', name: '郑十二', system: '大云', productLine: '托管云产品线', team: '云平台组', function: '测试', level: 5, projects: ['托管云数据库 RDS v2'], role: '测试工程师', direction: '服务稳定', keyProject: false, employment: '正式员工' },
  { id: '10021', name: '王十三', system: '大云', productLine: '托管云产品线', team: '运维保障组', function: '安全运营', level: 5, projects: ['托管云数据库 RDS v2'], role: '安全运营', direction: '运行保障', keyProject: false, employment: '正式员工' },
  { id: '10022', name: '李十四', system: '大云', productLine: '托管云产品线', team: '运维保障组', function: '技术支持', level: 4, projects: ['托管云数据库 RDS v2'], role: '技术支持', direction: '客户维护', keyProject: false, employment: '合作方' },

  { id: '10023', name: '陈十五', system: '大云', productLine: 'HCI 产品线', team: '存储虚拟化', function: '研发', level: 7, projects: ['HCI 超融合 6.9'], role: '存储研发', direction: '虚拟化', keyProject: true, employment: '正式员工' },
  { id: '10024', name: '徐十六', system: '大云', productLine: 'HCI 产品线', team: '存储虚拟化', function: '测试', level: 6, projects: ['HCI 超融合 6.9'], role: '测试工程师', direction: '存储验证', keyProject: true, employment: '正式员工' },
  { id: '10025', name: '许十七', system: '大云', productLine: 'HCI 产品线', team: '计算虚拟化', function: '研发', level: 7, projects: ['HCI 超融合 6.9'], role: '计算研发', direction: '虚拟化', keyProject: true, employment: '正式员工' },
  { id: '10026', name: '何十八', system: '大云', productLine: 'HCI 产品线', team: '计算虚拟化', function: '规划', level: 5, projects: ['HCI 超融合 6.9'], role: '产品规划', direction: '计算路线', keyProject: false, employment: '正式员工' },
  { id: '10027', name: '吕十九', system: '大云', productLine: 'HCI 产品线', team: '系统测试组', function: '测试', level: 6, projects: ['HCI 超融合 6.9'], role: '测试负责人', direction: '系统验证', keyProject: false, employment: '正式员工' },
  { id: '10028', name: '孔二十', system: '大云', productLine: 'HCI 产品线', team: '系统测试组', function: '技术支持', level: 4, projects: ['HCI 超融合 6.9'], role: '技术支持', direction: '客户交付', keyProject: false, employment: '合作方' },

  { id: '10029', name: '曹二一', system: '大云', productLine: 'AD 产品线', team: '应用交付组', function: '研发', level: 6, projects: ['AD 应用交付 v3'], role: '交付研发', direction: '应用交付', keyProject: false, employment: '正式员工' },
  { id: '10030', name: '严二二', system: '大云', productLine: 'AD 产品线', team: '应用交付组', function: '测试', level: 5, projects: ['AD 应用交付 v3'], role: '测试工程师', direction: '交付验证', keyProject: false, employment: '正式员工' },
  { id: '10031', name: '华二三', system: '大云', productLine: 'AD 产品线', team: '性能优化组', function: '研发', level: 6, projects: ['AD 应用交付 v3'], role: '性能优化', direction: '交付性能', keyProject: false, employment: '正式员工' },
  { id: '10032', name: '金二四', system: '大云', productLine: 'AD 产品线', team: '性能优化组', function: '技术支持', level: 4, projects: ['AD 应用交付 v3'], role: '技术支持', direction: '客户排障', keyProject: false, employment: '合作方' },

  { id: '10033', name: '邹二五', system: '研发平台', productLine: '风云 AI', team: '算法预研组', function: '研发', level: 7, projects: ['风云 AI 预研'], role: '算法研发', direction: '预研算法', keyProject: false, employment: '正式员工' },
  { id: '10034', name: '章二六', system: '研发平台', productLine: '风云 AI', team: '算法预研组', function: '规划', level: 6, projects: ['风云 AI 预研'], role: '产品规划', direction: '技术路线', keyProject: false, employment: '正式员工' },
  { id: '10035', name: '苏二七', system: '研发平台', productLine: '风云 AI', team: '模型平台组', function: '研发', level: 6, projects: ['风云 AI 预研'], role: '平台研发', direction: '模型平台', keyProject: false, employment: '正式员工' },
  { id: '10036', name: '韩二八', system: '研发平台', productLine: '风云 AI', team: '模型平台组', function: '测试', level: 5, projects: ['风云 AI 预研'], role: '测试工程师', direction: '平台验证', keyProject: false, employment: '正式员工' },

  { id: '10037', name: '冯二九', system: '研发平台', productLine: '天问 AI', team: '工具链组', function: '研发', level: 7, projects: ['天问大模型 Gen2'], role: '工具链研发', direction: '开发效率', keyProject: true, employment: '正式员工' },
  { id: '10038', name: '褚三十', system: '研发平台', productLine: '天问 AI', team: '工具链组', function: '测试', level: 6, projects: ['天问大模型 Gen2'], role: '测试工程师', direction: '工具验证', keyProject: true, employment: '正式员工' },
  { id: '10039', name: '卫三一', system: '研发平台', productLine: '天问 AI', team: '模型工程组', function: '研发', level: 7, projects: ['天问大模型 Gen2'], role: '模型工程', direction: '模型部署', keyProject: true, employment: '正式员工' },
  { id: '10040', name: '蒋三二', system: '研发平台', productLine: '天问 AI', team: '模型工程组', function: '技术支持', level: 5, projects: ['天问大模型 Gen2'], role: '技术支持', direction: '模型落地', keyProject: true, employment: '合作方' },

  { id: '10041', name: '沈三三', system: '研发平台', productLine: '中央平台部', team: '基础架构组', function: '研发', level: 7, projects: ['中央平台高可用改造'], role: '平台研发', direction: '高可用架构', keyProject: false, employment: '正式员工' },
  { id: '10042', name: '韩三四', system: '研发平台', productLine: '中央平台部', team: '基础架构组', function: '测试', level: 6, projects: ['中央平台高可用改造'], role: '测试工程师', direction: '架构验证', keyProject: false, employment: '正式员工' },
  { id: '10043', name: '杨三五', system: '研发平台', productLine: '中央平台部', team: '中台服务组', function: '研发', level: 6, projects: ['中台服务复用计划'], role: '服务开发', direction: '中台服务', keyProject: false, employment: '正式员工' },
  { id: '10044', name: '朱三六', system: '研发平台', productLine: '中央平台部', team: '中台服务组', function: '技术支持', level: 5, projects: ['中台服务复用计划'], role: '技术支持', direction: '服务交付', keyProject: false, employment: '合作方' },

  { id: '10045', name: '秦三七', system: 'AI 体系', productLine: '销售数字人产品线', team: '多模态交互组', function: '研发', level: 7, projects: ['数字人 v3.0'], role: '多模态研发', direction: '多模态交互', keyProject: true, employment: '正式员工' },
  { id: '10046', name: '尤三八', system: 'AI 体系', productLine: '销售数字人产品线', team: '多模态交互组', function: '规划', level: 6, projects: ['数字人 v3.0'], role: '产品规划', direction: '场景规划', keyProject: true, employment: '正式员工' },
  { id: '10047', name: '许三九', system: 'AI 体系', productLine: '销售数字人产品线', team: '内容生成组', function: '研发', level: 6, projects: ['数字人 v3.0'], role: '内容生成', direction: '内容模型', keyProject: true, employment: '正式员工' },
  { id: '10048', name: '何四十', system: 'AI 体系', productLine: '销售数字人产品线', team: '内容生成组', function: '测试', level: 5, projects: ['数字人 v3.0'], role: '测试工程师', direction: '内容验证', keyProject: true, employment: '正式员工' },

  { id: '10049', name: '宋四一', system: 'AI 体系', productLine: '具身智能产品线', team: '感知算法组', function: '研发', level: 7, projects: ['机器人抓取算法 Gen2'], role: '算法研发', direction: '感知算法', keyProject: true, employment: '正式员工' },
  { id: '10050', name: '罗四二', system: 'AI 体系', productLine: '具身智能产品线', team: '感知算法组', function: '测试', level: 6, projects: ['机器人抓取算法 Gen2'], role: '测试工程师', direction: '算法验证', keyProject: true, employment: '正式员工' },
  { id: '10051', name: '梁四三', system: 'AI 体系', productLine: '具身智能产品线', team: '控制系统组', function: '研发', level: 6, projects: ['机器人抓取算法 Gen2'], role: '控制研发', direction: '控制系统', keyProject: true, employment: '正式员工' },
  { id: '10052', name: '程四四', system: 'AI 体系', productLine: '具身智能产品线', team: '控制系统组', function: '技术支持', level: 5, projects: ['机器人抓取算法 Gen2'], role: '技术支持', direction: '部署交付', keyProject: true, employment: '正式员工' },
];
