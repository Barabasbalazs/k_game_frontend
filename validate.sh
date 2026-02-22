#!/bin/bash
# Pre-commit validation script for k_game_frontend
# Run this script before committing code to ensure all checks pass

set -e

echo "🔍 Running pre-commit validation checks..."
echo ""

echo "📦 Step 1: Installing dependencies..."
yarn install
echo "✅ Dependencies installed"
echo ""

echo "🧹 Step 2: Linting code..."
yarn run lint
echo "✅ Linting passed"
echo ""

echo "🧪 Step 3: Running component tests..."
yarn run test:run
echo "✅ Component tests passed"
echo ""

echo "📝 Step 4: TypeScript type checking and production build..."
yarn run build
echo "✅ Build successful"
echo ""

echo "🎉 All validation checks passed!"
echo ""
echo "Optional: Run 'yarn run e2e' to validate E2E tests"
echo "Optional: Run 'yarn run test:coverage' to check test coverage"
