#!/bin/bash
# scripts/audit-tokens.sh
# Automated token quality audit script for CI/CD

set -e

echo "=== LUMA TOKEN AUDIT ==="
echo ""

# Change to project root
cd "$(dirname "$0")/.."

# 1. Count tokens
echo "📊 Token Count:"
CORE_TOKENS=$(find packages/tokens/src/core -name "*.json" -exec grep -c "\"value\"" {} \; 2>/dev/null | awk '{sum+=$1} END {print sum}')
COMPONENT_TOKENS=$(find packages/tokens/src/components -name "*.json" ! -name "*.dark.json" -exec grep -c "\"value\"" {} \; 2>/dev/null | awk '{sum+=$1} END {print sum}')
TOTAL_TOKENS=$((CORE_TOKENS + COMPONENT_TOKENS))

echo "  Core: $CORE_TOKENS"
echo "  Component: $COMPONENT_TOKENS"
echo "  Total: $TOTAL_TOKENS"
echo ""

# 2. Count utilities generated
UTILITIES=$(grep -c "@utility lm-" packages/tokens/build/luma.css 2>/dev/null || echo 0)
echo "🔧 Utilities Generated: $UTILITIES"
echo ""

# 3. Find orphaned utilities
echo "🔍 Orphaned Utilities (defined but never used):"
ORPHANED_COUNT=0
while IFS= read -r utility; do
  utility_name=$(echo "$utility" | awk '{print $2}')
  if ! grep -rq "$utility_name" packages/angular packages/core --include="*.ts" 2>/dev/null; then
    echo "  ❌ $utility_name"
    ORPHANED_COUNT=$((ORPHANED_COUNT + 1))
  fi
done < <(grep "@utility lm-" packages/tokens/build/luma.css 2>/dev/null || true)

if [ $ORPHANED_COUNT -eq 0 ]; then
  echo "  ✅ No orphaned utilities found"
fi
echo ""

# 4. Find hardcoded Tailwind classes (should use lm-* tokens)
echo "⚠️  Hardcoded Tailwind Classes (should use lm-* tokens):"
HARDCODED_TEXT=$(grep -r "text-sm\|text-lg\|text-base\|text-xl" packages/core/src/variants packages/angular/src/lib --include="*.ts" 2>/dev/null | grep -v "lm-text-size" | grep -v ".spec.ts" | wc -l || echo 0)
HARDCODED_PADDING=$(grep -r "px-\[var\|py-\[var" packages/core/src/variants packages/angular/src/lib --include="*.ts" 2>/dev/null | grep -v ".spec.ts" | wc -l || echo 0)

echo "  Typography (text-*): $HARDCODED_TEXT occurrences"
echo "  Padding (px-[var/py-[var): $HARDCODED_PADDING occurrences"

if [ $HARDCODED_TEXT -gt 0 ] || [ $HARDCODED_PADDING -gt 0 ]; then
  echo "  ⚠️  Consider migrating to lm-* utilities"
else
  echo "  ✅ All using lm-* utilities"
fi
echo ""

# 5. Core token integration percentage
echo "📈 Core Token Integration:"
for component in button accordion card tooltip tabs modal toast badge; do
  COMPONENT_FILE="packages/tokens/src/components/$component/$component.json"
  if [ -f "$COMPONENT_FILE" ]; then
    TOTAL=$(grep -c "\"value\"" "$COMPONENT_FILE" 2>/dev/null || echo 0)
    REFS=$(grep -c "{luma\." "$COMPONENT_FILE" 2>/dev/null || echo 0)

    if [ $TOTAL -gt 0 ]; then
      PERCENT=$((REFS * 100 / TOTAL))
      if [ $PERCENT -ge 80 ]; then
        STATUS="✅"
      elif [ $PERCENT -ge 60 ]; then
        STATUS="⚠️ "
      else
        STATUS="❌"
      fi
      printf "  %s %-12s %3d%% (%d/%d)\n" "$STATUS" "$component:" "$PERCENT" "$REFS" "$TOTAL"
    fi
  fi
done
echo ""

# 6. Check for duplicate values (DRY violations)
echo "🔄 DRY Principle Check:"
DUPLICATE_EASE=$(grep -r "\"value\": \"ease-out\"" packages/tokens/src/components --include="*.json" 2>/dev/null | wc -l || echo 0)
echo "  Duplicate 'ease-out' values: $DUPLICATE_EASE"
if [ $DUPLICATE_EASE -gt 0 ]; then
  echo "  ❌ Found duplicate timing values (should use {luma.transition.ease})"
else
  echo "  ✅ No duplicate transition timing values"
fi
echo ""

# 7. Summary and exit code
echo "✅ Audit complete!"
echo ""

# Determine exit code based on critical issues
EXIT_CODE=0

if [ $ORPHANED_COUNT -gt 20 ]; then
  echo "❌ FAIL: Too many orphaned utilities ($ORPHANED_COUNT > 20 limit)"
  EXIT_CODE=1
fi

if [ $DUPLICATE_EASE -gt 0 ]; then
  echo "⚠️  WARNING: DRY violations found (duplicate values)"
fi

# Check if any component has <50% integration (critical threshold)
for component in button accordion card tooltip tabs modal toast badge; do
  COMPONENT_FILE="packages/tokens/src/components/$component/$component.json"
  if [ -f "$COMPONENT_FILE" ]; then
    TOTAL=$(grep -c "\"value\"" "$COMPONENT_FILE" 2>/dev/null || echo 0)
    REFS=$(grep -c "{luma\." "$COMPONENT_FILE" 2>/dev/null || echo 0)

    if [ $TOTAL -gt 0 ]; then
      PERCENT=$((REFS * 100 / TOTAL))
      if [ $PERCENT -lt 50 ]; then
        echo "❌ FAIL: $component has critically low integration ($PERCENT% < 50%)"
        EXIT_CODE=1
      fi
    fi
  fi
done

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All quality checks passed"
fi

exit $EXIT_CODE
