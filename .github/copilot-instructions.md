# Copilot Instructions for k_game_frontend

## Repository Overview

**k_game_frontend** is a React-based web game frontend built with TypeScript and Vite. It serves as the client-side interface for a game application, featuring modern tooling for development, testing, linting, and production builds. The project uses Tailwind CSS for styling and Zustand for state management.

### Key Technologies
- **Runtime**: Node.js (v22.22.0)
- **Language**: TypeScript (v5.9.3)
- **Framework**: React (v19.2.0)
- **Build Tool**: Vite (v7.3.1)
- **Package Manager**: npm/yarn (yarn.lock present; use npm commands)
- **CSS Framework**: Tailwind CSS (v4.2.0)
- **State Management**: Zustand (v5.0.11)
- **Linting**: ESLint with TypeScript support
- **Testing**: Vitest (v4.0.18)
- **Package Management**: Yarn (v1.22.19)

## Project Structure

### Root Files
```
.github/copilot-instructions.md    # This file
.gitignore                          # Git ignore patterns
eslint.config.js                    # ESLint configuration
index.html                          # Main HTML entry point
package.json                        # Dependencies and scripts
tsconfig.json                       # TypeScript root config
tsconfig.app.json                   # TypeScript app config (target: ES2022)
tsconfig.node.json                  # TypeScript node config (target: ES2023)
vite.config.ts                      # Vite build configuration
yarn.lock                           # Dependency lock file (use yarn, not npm)
```

### Source Directory (`src/`)
```
src/
├── App.tsx                         # Root React component
├── main.tsx                        # Application entry point
├── index.css                       # Global styles
├── assets/                         # Static assets (currently empty)
└── components/
    └── Tmp.tsx                     # Example temporary component
```

### Important Configuration Details
- **Path Alias**: `@/` resolves to `./src/` (configured in vite.config.ts and tsconfig.app.json)
- **HTML Root**: Entry point is `<div id="root"></div>` in index.html
- **CSS**: Global styles in `src/index.css` with Tailwind CSS support
- **Module System**: ES modules (type: "module" in package.json)

## Build and Development Commands

### Prerequisites
**Always run `yarn install` before any other command** to ensure dependencies are in sync with lockfile.

### Available yarn Scripts
All commands must be run from the workspace root directory.

| Command | Purpose | Notes |
|---------|---------|-------|
| `yarn install` | Install/sync dependencies | **Always run this first** after pulling changes |
| `yarn run dev` | Start development server | Runs on http://localhost:5173 (or next available port); Hot Module Replacement enabled |
| `yarn run build` | Production build | Executes TypeScript check (`tsc -b`) then Vite build; output in `dist/` directory |
| `yarn run lint` | Run ESLint | Checks all `.ts` and `.tsx` files; run before committing |
| `yarn run preview` | Preview production build locally | Requires `yarn run build` to have run first |

### Build Process Details

#### Development (`yarn run dev`)
- **Command**: `vite`
- **Output**: None (serves from memory)
- **Port**: 5173 (or higher if port is in use)
- **Features**: Hot Module Replacement (HMR), fast refresh
- **Time**: ~300ms startup
- **Notes**: Watch mode is automatic; server restarts on config changes

#### Production Build (`yarn run build`)
- **Command**: `tsc -b && vite build`
- **Step 1**: TypeScript compilation check (`tsc -b`) - validates all `.ts` and `.tsx` files
- **Step 2**: Vite build - bundles and optimizes for production
- **Output Directory**: `dist/`
- **Build Time**: ~1000ms typical
- **Output Files**:
  - `dist/index.html` - HTML entry point
  - `dist/assets/index-[hash].css` - Compiled CSS (~1.36 kB gzipped)
  - `dist/assets/index-[hash].js` - Bundled JavaScript (~60.69 kB gzipped)

#### Linting (`yarn run lint`)
- **Command**: `eslint .`
- **Scope**: All `.ts` and `.tsx` files
- **Config**: Uses flat config format (eslint.config.js)
- **Rules Include**:
  - TypeScript recommended rules
  - React Hooks best practices
  - React Refresh compatibility checks
  - ESLint recommended rules
- **Note**: No type-aware linting enabled by default (see README.md for upgrade path)

### Type Checking
- **Command**: `tsc -b` (run as part of build)
- **Strictness**: All strict mode options enabled
  - Unused locals flagged (`noUnusedLocals: true`)
  - Unused parameters flagged (`noUnusedParameters: true`)
  - No side-effect imports allowed (`noUncheckedSideEffectImports: true`)
  - Case fallthrough prevented in switches
- **Incremental Build**: Uses tsbuildinfo files in `node_modules/.tmp/` for fast rebuilds

## Validation and Quality Checks

### Pre-Commit Validation Steps
Before making changes, ensure the agent can:
1. Run `yarn install` successfully (validates lockfile integrity)
2. Run `yarn run lint` with no errors (validates code style)
3. Run `yarn run build` successfully (validates TypeScript and production bundle)
4. Verify the build output exists in `dist/` directory

### Making Code Changes
When implementing features:
1. **Add/modify components**: Place in `src/components/` with `.tsx` extension
2. **Add styles**: Use Tailwind CSS classes in components (index.css imported globally)
3. **State management**: Use Zustand for application state
4. **TypeScript**: All files must pass strict type checking

### Recommended Pre-Push Validation Sequence
```bash
yarn install                # Sync dependencies
yarn run lint              # Check code style
yarn run build             # Full TypeScript check + production build
yarn run preview           # (Optional) Verify production build locally
```

## Known Configuration and Dependencies

### Unused Dependencies Warning
The project has 10 high severity vulnerability warnings from npm audit (as of latest scan). These are informational and can be safely ignored for development purposes. The dependencies currently installed are stable and tested:
- React/ReactDOM v19.2.0: Latest stable versions
- Zustand v5.0.11: Used for state management
- Tailwind CSS v4.2.0: CSS framework with Vite plugin

### Port Binding
- Dev server default port: 5173
- If port 5173 is in use, Vite automatically tries the next available port
- Check the terminal output to see which port was selected

### Path Aliases
The `@/` prefix is configured to resolve to `src/`:
- `import Tmp from '@/components/Tmp'` resolves to `src/components/Tmp.tsx`
- This applies in TypeScript (`tsconfig.app.json`) and Vite (`vite.config.ts`)

## CI/CD and GitHub Workflows
**No GitHub Actions workflows are currently configured** in this repository. The agent should validate changes locally using the commands listed above.

## Troubleshooting Guide

### Issue: TypeScript compilation errors after changes
**Solution**: Ensure all types are properly imported/exported. Run `yarn run build` to get full error details.

### Issue: ESLint fails with unused variable warnings
**Solution**: Either use the variable or remove it. The project has strict mode enabled for code quality.

### Issue: Port 5173 already in use
**Solution**: This is normal and handled automatically by Vite. Check the terminal output for the actual port number. No manual intervention needed.

### Issue: Stale dependencies or broken builds
**Solution**: Always run `yarn install` first to sync with the lockfile. Delete `node_modules/` and `.next/.tmp/` if issues persist.

## Trust These Instructions

This document provides all necessary information for the agent to build, test, lint, and validate the project. **Trust these instructions and only perform exploratory searches if this information is found to be incomplete or in error.** The commands have been validated to work correctly in the current environment.

## Update Instructions
- If you make changes to the project structure, dependencies, or build process, update this document accordingly to reflect those changes.
- Ensure that all commands and configurations are tested and verified before updating this document.

## Dependency Management
- Always use `yarn` commands to manage dependencies, as the project uses a `yarn.lock` file. Avoid using `npm` commands to prevent lockfile conflicts.