<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ElxH3xMFxs5qGRvJVHzzZ54yZU6tOS4V

## 项目意图（对外）

这是一个面向 IPD（集成产品开发）场景的可视化决策指挥平台，目标是让管理者在一个界面内看清“经营结果、研发进度、质量状态、人力投入”之间的关系，并支持快速钻取与决策。

## 项目目的（对外）

- 统一视图：把组合级、系统级、产线级、项目级信息放到同一产品中。
- 快速决策：缩短从“发现异常”到“定位问题”到“推动动作”的时间。
- 沟通对齐：为管理层、PM、研发、测试提供统一的数据语言与展示口径。
- 平滑演进：先用 Mock 验证框架，后续无缝切换到真实数据。

## 项目背景（对外）

研发管理常见现状是：项目、质量、人力、经营数据分散在不同系统和表格中，跨层级汇总成本高、周期长、可追踪性弱。该项目先以 Mock 数据快速搭建统一驾驶舱，验证信息架构和交互路径，再逐步接入真实数据源。

## 当前痛点（对外）

- 数据分散：跨系统查询，口径不一致。
- 分析链路长：定位问题依赖人工拼接信息。
- 视角割裂：业务结果与研发过程难以联动解释。
- 迭代成本高：新增指标时容易改动多个页面与数据定义。
- 演示到落地断层：缺少稳定的数据组织与统一导入出口。


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Mock 数据组织

业务 Mock 数据统一放在 `mock/` 目录，并通过 `mock/index.ts` 聚合导出：

- `mock/project.ts`：项目数据（`MOCK_PROJECT`、`PROJECTS_LIST`）
- `mock/roster.ts`：人员数据（`ROSTER`）
- `mock/product.ts`：产线仪表盘数据（`DASHBOARD_MOCK_DATA`）
- `mock/system.ts`：系统级质量数据（`MOCK_QUALITY_DATASET`）
- `mock/portfolio.ts`：组合仪表盘钻取数据（竞争力、满意度、集团 AI 统计）

新代码统一从 `mock/` 目录导入数据。
