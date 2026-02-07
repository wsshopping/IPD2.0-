import { RosterMember } from '../types';

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
