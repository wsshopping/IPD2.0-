# 仓库指南

## 项目意图与背景（对内）
- 产品目标：交付一个可钻取的 IPD 决策驾驶舱，覆盖组合→系统→产线→项目四层视图。
- 当前阶段：以 Mock 数据驱动前端，优先验证信息架构、交互路径、指标编排与可解释性。
- 工程目标：保持“数据层与展示层解耦”，便于后续替换为真实 API。
- 核心痛点：数据口径分散、跨域分析链路长、业务与研发指标割裂、页面扩展时耦合风险高。
- 演进方向：先稳住 `mock/index.ts` 统一入口，再逐步引入真实数据仓/API 与权限控制。


## 项目结构与模块组织
- 根目录 Vite + React 应用。入口是 `index.html`，它引导 `index.tsx` 并渲染 `App.tsx`。
- UI 构建块在 `components/`（每个文件一个组件，PascalCase 命名，如 `ProductDashboard.tsx`）。
- 共享类型在 `types.ts`，业务 Mock 数据在 `mock/`（通过 `mock/index.ts` 聚合导出）。
- `mock/` 建议按领域分层：`project.ts`（项目）、`roster.ts`（人力）、`product.ts`（产线仪表盘）、`system.ts`（系统级质量）、`portfolio.ts`（组合仪表盘钻取）。
- 新增或重命名 Mock 文件后，必须在 `mock/index.ts` 同步导出，确保统一导入入口稳定。
- 构建输出在 `dist/`（不要手动编辑）。
- `metadata.json` 和 `index-test.html` 是用于打包/测试的辅助资源。

## 构建、测试与开发命令
- `npm install` 安装依赖。
- `npm run dev` 启动本地开发服务。
- `npm run build` 生成 `dist/` 的生产构建。
- `npm run preview` 在本地预览生产构建。

## 编码风格与命名约定
- TypeScript + React，使用函数式组件和 hooks。
- 缩进 2 空格；字符串引号优先单引号以匹配现有文件。
- 组件文件使用 PascalCase；变量与函数使用 camelCase。
- JSX `className` 字符串保持与现有组件一致（相关工具类分组）。

## 测试指南
- 目前未配置自动化测试框架。
- 最低检查：运行 `npm run dev` 验证关键视图；运行 `npm run build` 确认可编译。
- 如后续添加测试，使用 `*.test.tsx` 命名并放在相关模块附近。

## 提交与 PR 指南
- 提交信息使用简化 Conventional Commits（如 `feat: add personal dashboard`、`refactor: rename metric label`、`update`），简短且使用祈使语气。
- PR 需包含：清晰摘要、关联 issue（如有）、UI 截图或录屏（视觉变更）。
- 在 PR 描述中注明手动验证步骤（如 `npm run dev`、已检查的导航流程）。

## 安全与配置提示
- API key 放在 `.env.local`（如 `GEMINI_API_KEY=...`），不要提交。
- 如新增环境变量，在 `README.md` 中记录并保持默认值安全。
