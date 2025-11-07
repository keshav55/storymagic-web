# ATRIS Operations Directory - StoryMagic Web

**AI-powered team coordination system for StoryMagic Web.**

This directory contains everything you need to work on the storymagic-web codebase using the ATRIS framework:
- Navigation guide (MAP.md)
- Task management (TASK_CONTEXTS.md)
- Specialized AI agents (agent_team/)

---

## Quick Start

### For Developers

```bash
# Navigate to project
cd /Users/keshavrao/arena/storymagic-web

# Read the navigation guide
cat atris/MAP.md

# Pick a task
cat atris/TASK_CONTEXTS.md

# Run the project
npm run dev
```

### For AI Agents

**You are here to help build StoryMagic Web.**

1. **Read MAP.md** - Understand the codebase structure
2. **Read TASK_CONTEXTS.md** - See available tasks
3. **Ask navigator** - "Where is X?" (use MAP.md)
4. **Ask executor** - "Do task T-XXX"
5. **Ask validator** - "Review my code"

---

## Files in This Directory

| File | Purpose | Who Uses It |
|------|---------|------------|
| **atris.md** | System blueprint & phases | Reference (read once) |
| **MAP.md** | Codebase navigation guide | Navigator, Executor (constantly) |
| **TASK_CONTEXTS.md** | Task bank with specs | Executor, User (pick tasks) |
| **agent_team/navigator.md** | "Where is X?" agent | Navigator (self-reference) |
| **agent_team/executor.md** | Task runner agent | Executor (self-reference) |
| **agent_team/validator.md** | Quality gatekeeper agent | Validator (self-reference) |
| **tasks/** | Per-agent collaboration notebooks | (Coming soon) |

---

## The Three Agents

### 🧭 Navigator
**"I know where everything is"**
- Answers "where is X?" questions
- Cites MAP.md with file:line references
- Never modifies code

**Use:** `@navigator where is the chat input component?`

### ⚙️ Executor
**"I build things"**
- Reads tasks from TASK_CONTEXTS.md
- Plans changes with ASCII diagrams
- Implements step-by-step
- Tests before asking validator

**Use:** `@executor execute T-101: Connect Chat to Real AI Backend`

### ✅ Validator
**"I verify quality"**
- Tests executor's code
- Checks for bugs, security issues
- Updates MAP.md after changes
- Approves or blocks shipping

**Use:** `@validator review T-101 changes`

---

## Workflow

```
1. User/Task → "Build feature T-XXX"
                    ↓
2. Executor      → "Where do I start?"
                    ↓
3. Navigator     → "See MAP.md § [section], file/to/file.ts:LINE"
                    ↓
4. Executor      → "I'll implement now [ASCII plan shown]"
                    ↓
5. Executor      → [Code written, tested]
                    ↓
6. Validator     → "Testing... [checks run]"
                    ↓
7. Validator     → "PASS ✅ Ready to ship"
                    ↓
8. Executor      → git commit + git push
```

---

## Daily Workflow

### Morning
1. Read inbox of user requests
2. Navigator reviews new tasks
3. Update TASK_CONTEXTS.md with any new priorities

### During Day
1. Executor picks a task
2. Implements with navigator's help
3. Asks validator to review when done

### Evening
1. Validator updates MAP.md if structure changed
2. Extract learnings/patterns
3. Plan tomorrow's tasks

---

## Key Principles

### 1. MAP.md is Law
All navigation questions answered from MAP.md. If MAP.md is wrong, validator fixes it.

### 2. File:Line References Always
No "it's in the auth folder somewhere." Always: `app/api/auth/login/route.ts:16`

### 3. Tasks Have Context
Every task in TASK_CONTEXTS.md has:
- Current state (where we are)
- Goal (where we're going)
- Exact references (file:line)
- Execution plan (step-by-step)
- Testing checklist (how to verify)

### 4. Three-Agent Loop
Navigator → Executor → Validator → repeat
Each agent specializes. No overlap.

### 5. Bias Toward Action
- Tasks marked Trivial/Small → execute immediately
- Tasks marked Medium → plan first, then execute
- Tasks marked Large/Epic → discuss approach before building

---

## Example: Complete a Task

**Scenario:** User asks to implement message bookmarking

```
User: "I want users to save their favorite messages"

Navigator: "That's T-102 in TASK_CONTEXTS.md. See the spec."

Executor: "@navigator where do messages render?"
Navigator: "app/dashboard/page.tsx:85-108 (Message component rendering)"

Executor: "I'll add bookmark field to Message type, add button, and localStorage"
[Implements]
[Tests locally]

Executor: "@validator review T-102"

Validator:
- Runs npm run build ✅
- Tests bookmark flow manually ✅
- Updates MAP.md § Component Registry with bookmark field ✅
- Reports: "PASS ✅ Ready to ship"

Executor: Commits + pushes to main
```

---

## Metrics & Success

| Metric | Target | Current |
|--------|--------|---------|
| Time to find code | <1min | TBD |
| Task spec clarity | 100% | 100% |
| Validator approval rate | >95% | TBD |
| Breaking changes caught | 100% | TBD |
| New dev onboarding time | <5 min | TBD |

---

## Troubleshooting

### "I can't find X in the code"
→ Ask navigator with exact phrase
→ Navigator cites MAP.md § [section]
→ If MAP.md wrong, ask validator to update

### "What should I work on?"
→ Open TASK_CONTEXTS.md
→ Pick one marked "Trivial" or "Small"
→ Read the spec
→ Ask executor to implement

### "Is this task blocked?"
→ Check TASK_CONTEXTS.md § Blocked section
→ If blocked, pick a different task
→ Report blocker to user

### "I found a bug in existing code"
→ Stop what you're doing
→ Report to validator
→ Validator creates new task for bug fix
→ Prioritize bug fix above current task

---

## Updating ATRIS

When ATRIS framework itself updates with new features:

```bash
# Download latest atris.md
# (Curator handles this)

# Run regeneration
@navigator scan codebase → update MAP.md
@executor [any structural changes]
@validator verify all docs fresh
```

---

## Contact & Questions

**For questions about:**
- **Where is X?** → Ask navigator
- **How do I implement Y?** → Ask executor
- **Does this work?** → Ask validator

All three agents know how to forward your question to the right specialist.

---

## File Structure (Expanded)

```
atris/
├── README.md                           (you are here)
├── atris.md                            (system blueprint)
├── MAP.md                              (navigation guide) ⭐
├── TASK_CONTEXTS.md                    (task bank) ⭐
├── agent_team/
│   ├── navigator.md                    (find things)
│   ├── executor.md                     (build things)
│   └── validator.md                    (verify things)
└── tasks/                              (collaboration notebooks)
    └── (per-agent todo lists)
```

---

## Philosophy

> **ATRIS exists so that humans + AI can work together efficiently.**
>
> One source of truth (MAP.md).
> Clear task specs (TASK_CONTEXTS.md).
> Specialized agents (navigator/executor/validator).
> No hidden knowledge, no tribal wisdom, no "ask person X."

---

**System Created:** Nov 7, 2025
**Version:** 1.0 (initial launch)
**Next Review:** After 5 tasks completed
