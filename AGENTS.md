# Repository Guidelines

## Project Structure & Module Organization
- Root-level Vite + React app. Entry is `index.html` which bootstraps `index.tsx` and renders `App.tsx`.
- UI building blocks live in `components/` (one component per file, PascalCase names like `ProductDashboard.tsx`).
- Shared types and constants are in `types.ts` and `constants.tsx`.
- Build output is generated into `dist/` (do not edit manually).
- `metadata.json` and `index-test.html` are auxiliary assets used for packaging/testing.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server for local development.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally to validate it.

## Coding Style & Naming Conventions
- TypeScript + React with functional components and hooks.
- Indentation: 2 spaces; string quotes: prefer single quotes to match existing files.
- Component files use PascalCase; variables and functions use camelCase.
- Keep JSX `className` strings consistent with existing components (group related utility classes together).

## Testing Guidelines
- No automated test framework is configured yet.
- Minimum checks for changes: run `npm run dev` and verify key views; run `npm run build` to confirm the app compiles.
- If adding tests later, follow the naming pattern `*.test.tsx` and place them near related modules.

## Commit & Pull Request Guidelines
- Commit messages follow a lightweight Conventional Commits style (e.g., `feat: add personal dashboard`, `refactor: rename metric label`, `update`). Keep them short and imperative.
- PRs should include: a clear summary, linked issue (if any), and UI screenshots or screen recordings for visual changes.
- Note manual verification steps in the PR description (e.g., `npm run dev`, navigation flows checked).

## Security & Configuration Tips
- Store API keys in `.env.local` (e.g., `GEMINI_API_KEY=...`) and do not commit secrets.
- If you introduce new environment variables, document them in `README.md` and keep defaults safe.
