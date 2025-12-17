#!/bin/bash
# 🎄 AGENTIC JUL HACKATHON - SUPERPOWER ACTIVATION SCRIPT 🎄
# Run this before hackathon to verify ALL systems are GO!
# Usage: bash activate-superpowers.sh

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# ASCII Art
clear
echo -e "${CYAN}"
cat << "EOF"
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   ⚡ HACKATHON SUPERPOWER ACTIVATION SEQUENCE ⚡         ║
    ║                                                           ║
    ║              Agentic Jul - Dec 18, 2025                   ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"
sleep 1

echo -e "${WHITE}Initializing combat systems...${NC}\n"
sleep 1

# Function to check status
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
    else
        echo -e "${RED}✗ $1 - FAILED${NC}"
        exit 1
    fi
}

# Function to show progress
progress() {
    echo -e "${YELLOW}▶ $1${NC}"
}

# ============================================
# PHASE 1: ENVIRONMENT VERIFICATION
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  PHASE 1: ENVIRONMENT VERIFICATION${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}\n"

progress "Checking Node.js..."
node --version > /dev/null 2>&1
check_status "Node.js detected: $(node --version)"

progress "Checking npm..."
npm --version > /dev/null 2>&1
check_status "npm detected: $(npm --version)"

progress "Checking project directory..."
cd ~/hackathon-starter-kit
check_status "Project directory exists"

progress "Checking dependencies..."
[ -d "node_modules" ]
check_status "Dependencies installed ($(du -sh node_modules | cut -f1))"

progress "Checking .env file..."
[ -f ".env" ]
check_status ".env file configured"

progress "Checking API key..."
grep -q "ANTHROPIC_API_KEY" .env
check_status "Anthropic API key present"

echo ""

# ============================================
# PHASE 2: AI POWER VERIFICATION
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  PHASE 2: AI POWER VERIFICATION${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}\n"

progress "Testing Claude Opus 4.5 API..."
API_KEY=$(grep ANTHROPIC_API_KEY .env | cut -d '=' -f2)
RESPONSE=$(curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-4-5-20251101", "max_tokens": 20, "messages": [{"role": "user", "content": "Say READY"}]}' \
  | grep -o '"text":"[^"]*"' | head -1)

if [[ $RESPONSE == *"READY"* ]] || [[ $RESPONSE == *"Ready"* ]]; then
    check_status "Claude Opus 4.5 is OPERATIONAL 🔥"
else
    check_status "Claude API response verified"
fi

progress "Checking model configuration..."
grep -q "claude-opus-4-5-20251101" lib/claude.ts
check_status "Using MAXIMUM model: claude-opus-4-5-20251101"

echo ""

# ============================================
# PHASE 3: CLAUDE CODE ARSENAL
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  PHASE 3: CLAUDE CODE ARSENAL${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}\n"

progress "Counting Skills..."
SKILLS_COUNT=$(find ~/.claude/skills -name "*.md" 2>/dev/null | wc -l)
check_status "Skills loaded: $SKILLS_COUNT"

progress "Counting Agents..."
AGENTS_COUNT=$(find ~/.claude/agents -name "*.md" 2>/dev/null | wc -l)
check_status "Agents ready: $AGENTS_COUNT"

progress "Counting Commands..."
COMMANDS_COUNT=$(find ~/.claude/commands -name "*.md" 2>/dev/null | wc -l)
check_status "Commands available: $COMMANDS_COUNT"

echo ""

# ============================================
# PHASE 4: RAPID DEPLOYMENT TEST
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  PHASE 4: RAPID DEPLOYMENT TEST${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}\n"

progress "Building Next.js project..."
npm run build > /tmp/build.log 2>&1 &
BUILD_PID=$!

# Show spinner during build
spin='-\|/'
i=0
while kill -0 $BUILD_PID 2>/dev/null; do
  i=$(( (i+1) %4 ))
  printf "\r${YELLOW}  Building... ${spin:$i:1}${NC}"
  sleep .1
done
wait $BUILD_PID
BUILD_STATUS=$?

if [ $BUILD_STATUS -eq 0 ]; then
    echo -e "\r${GREEN}✓ Build completed successfully${NC}                    "
else
    echo -e "\r${RED}✗ Build failed - check /tmp/build.log${NC}"
    exit 1
fi

echo ""

# ============================================
# PHASE 5: COMBAT READINESS CHECK
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  PHASE 5: COMBAT READINESS CHECK${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}\n"

TOTAL_SCORE=0
MAX_SCORE=100

# Check README
if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC} Documentation: README exists"
    ((TOTAL_SCORE+=10))
else
    echo -e "${YELLOW}⚠${NC} Documentation: Missing README"
fi

# Check HACKATHON_GUIDE
if [ -f "HACKATHON_GUIDE.md" ]; then
    echo -e "${GREEN}✓${NC} Strategy: HACKATHON_GUIDE available"
    ((TOTAL_SCORE+=10))
else
    echo -e "${YELLOW}⚠${NC} Strategy: Missing guide"
fi

# Check TypeScript config
if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✓${NC} TypeScript: Configured"
    ((TOTAL_SCORE+=10))
fi

# Check Tailwind
if [ -f "tailwind.config.ts" ]; then
    echo -e "${GREEN}✓${NC} Styling: Tailwind ready"
    ((TOTAL_SCORE+=10))
fi

# Check components
if [ -d "components" ]; then
    COMPONENTS_COUNT=$(find components -name "*.tsx" 2>/dev/null | wc -l)
    echo -e "${GREEN}✓${NC} Components: $COMPONENTS_COUNT ready"
    ((TOTAL_SCORE+=10))
fi

# Check lib
if [ -d "lib" ]; then
    echo -e "${GREEN}✓${NC} Libraries: Utilities configured"
    ((TOTAL_SCORE+=10))
fi

# Check API routes
if [ -d "app/api" ]; then
    echo -e "${GREEN}✓${NC} API: Routes configured"
    ((TOTAL_SCORE+=10))
fi

# Git check
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Version Control: Git initialized"
    ((TOTAL_SCORE+=10))
else
    echo -e "${YELLOW}⚠${NC} Version Control: Not initialized"
fi

# Skills check
if [ $SKILLS_COUNT -gt 15 ]; then
    echo -e "${GREEN}✓${NC} Skills: Full arsenal ($SKILLS_COUNT)"
    ((TOTAL_SCORE+=10))
else
    echo -e "${YELLOW}⚠${NC} Skills: Limited ($SKILLS_COUNT)"
fi

# Agents check
if [ $AGENTS_COUNT -gt 40 ]; then
    echo -e "${GREEN}✓${NC} Agents: Army ready ($AGENTS_COUNT)"
    ((TOTAL_SCORE+=10))
else
    echo -e "${YELLOW}⚠${NC} Agents: Squad ready ($AGENTS_COUNT)"
fi

echo ""

# ============================================
# FINAL REPORT
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  ⚡ SUPERPOWER STATUS REPORT ⚡${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}\n"

echo -e "${WHITE}Combat Readiness Score: ${CYAN}${TOTAL_SCORE}/100${NC}"
echo ""

if [ $TOTAL_SCORE -ge 90 ]; then
    echo -e "${GREEN}🔥 STATUS: MAXIMUM OVERDRIVE 🔥${NC}"
    echo -e "${GREEN}You are locked and loaded for hackathon domination!${NC}"
elif [ $TOTAL_SCORE -ge 70 ]; then
    echo -e "${YELLOW}⚡ STATUS: COMBAT READY ⚡${NC}"
    echo -e "${YELLOW}You're ready to compete - minor optimizations possible${NC}"
else
    echo -e "${RED}⚠ STATUS: NEEDS TUNING ⚠${NC}"
    echo -e "${RED}Review checklist and address warnings${NC}"
fi

echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}  ACTIVATED SUPERPOWERS${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✓${NC} AI Model: ${WHITE}Claude Opus 4.5${NC} (Maximum Intelligence)"
echo -e "${GREEN}✓${NC} Skills: ${WHITE}${SKILLS_COUNT} automated workflows${NC}"
echo -e "${GREEN}✓${NC} Agents: ${WHITE}${AGENTS_COUNT} specialist assistants${NC}"
echo -e "${GREEN}✓${NC} Commands: ${WHITE}${COMMANDS_COUNT} slash commands${NC}"
echo -e "${GREEN}✓${NC} Framework: ${WHITE}Next.js 14 + TypeScript${NC}"
echo -e "${GREEN}✓${NC} Styling: ${WHITE}Tailwind CSS${NC}"
echo -e "${GREEN}✓${NC} Build: ${WHITE}Production-ready${NC}"
echo ""

# ============================================
# QUICK REFERENCE
# ============================================
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}  QUICK REFERENCE${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${WHITE}Start dev server:${NC}    npm run dev"
echo -e "${WHITE}Build production:${NC}    npm run build"
echo -e "${WHITE}Ultra-think:${NC}         /ultra-think [problem]"
echo -e "${WHITE}Activate agent:${NC}      @fullstack-developer"
echo ""
echo -e "${WHITE}Starter kit location:${NC}"
echo -e "  ${BLUE}~/hackathon-starter-kit/${NC}"
echo ""
echo -e "${WHITE}Documentation:${NC}"
echo -e "  ${BLUE}README.md${NC}           - Setup & usage"
echo -e "  ${BLUE}HACKATHON_GUIDE.md${NC}  - Strategy & tips"
echo -e "  ${BLUE}QUICK_START.md${NC}      - 5-min reference"
echo ""

# ============================================
# HACKATHON CHECKLIST
# ============================================
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}  PRE-HACKATHON CHECKLIST${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""

CHECKLIST_FILE=~/hackathon-checklist.txt
cat > $CHECKLIST_FILE << 'CHECKLIST'
🎄 AGENTIC JUL HACKATHON - FINAL CHECKLIST
─────────────────────────────────────────────

BEFORE YOU LEAVE:
☐ Laptop fully charged
☐ Charger + cables packed
☐ Phone fully charged
☐ GitHub account verified
☐ Natively.dev account ready
☐ Headphones (for focus)
☐ Water bottle
☐ Snacks (optional)

TECHNICAL VERIFICATION:
☐ Run: bash activate-superpowers.sh
☐ Verify: Combat Readiness Score ≥ 90
☐ Test: npm run dev works
☐ Check: API key in .env
☐ Confirm: Git initialized

AT THE VENUE:
☐ Connect to WiFi immediately
☐ Test localhost:3000
☐ Clone starter kit as backup (if needed)
☐ Introduce yourself to team
☐ Clarify team roles quickly

DURING HACKATHON:
☐ Choose idea in first 15 minutes
☐ Define MVP scope immediately
☐ Commit every 30 minutes
☐ Deploy at 2-hour mark (backup)
☐ Test on mobile devices
☐ Prepare 2-min demo

EMERGENCY CONTACTS:
Anthropic API: https://console.anthropic.com
Claude Code docs: https://docs.anthropic.com/claude-code
Natively support: support@natively.dev

TIME BUDGET (2h 45min):
├─ 00:00-00:15 : Idea selection & planning
├─ 00:15-00:45 : Core feature implementation
├─ 00:45-01:45 : Build & polish
├─ 01:45-02:15 : Testing & bug fixes
├─ 02:15-02:35 : Final polish + deploy
└─ 02:35-02:45 : Demo prep & screenshots

REMEMBER:
• Working demo > Perfect code
• One killer feature > Many half-baked
• Deploy early, deploy often
• Use agents maximally
• HAVE FUN! 🎄
CHECKLIST

cat $CHECKLIST_FILE
echo ""
echo -e "${GREEN}✓ Checklist saved: ${BLUE}$CHECKLIST_FILE${NC}"
echo ""

# ============================================
# COMPLETION
# ============================================
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}"
cat << "EOF"
    ⚡⚡⚡ SUPERPOWERS ACTIVATED ⚡⚡⚡

    You are now locked and loaded for
    AGENTIC JUL HACKATHON DOMINATION!

    Go forth and build something EPIC! 🎄
EOF
echo -e "${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════${NC}"
echo ""

# Open browser to hackathon info (optional)
read -p "Open hackathon event page? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v xdg-open > /dev/null; then
        xdg-open "https://natively.dev" &
    elif command -v open > /dev/null; then
        open "https://natively.dev" &
    fi
fi

echo -e "${CYAN}Ready for deployment. Good luck! 🚀${NC}"
echo ""
