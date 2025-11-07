# ATRIS Blueprint: StoryMagic Web

**System Purpose:** AI-powered storytelling application using Next.js 16, React 19, with OAuth authentication and real-time chat interface.

**App Type:** Agentic web app (template for iOS version coming next)

**Technology Stack:**
- Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- Auth: OAuth proxy pattern (Google, GitHub, Apple) → httpOnly cookies
- Chat: Real-time message interface with localStorage persistence
- Icons: Lucide React (latest)
- Backend: Atris API (https://api.atris.ai/api)

**Key Features:**
1. Beautiful landing page with social login
2. Dashboard with chat interface
3. Secure OAuth implementation (no tokens in browser)
4. Message persistence
5. Mode toggle (QUICK/PRO) + thinking mode
6. File upload support (images/PDFs)

---

## Phase 1: Codebase Scanning & Navigation Map Generation

**Goal:** Create MAP.md with grep-friendly navigation shortcuts

**Tasks:**
1. Scan `/app` directory tree
2. Document all routes and their purposes
3. Map API endpoints in `/app/api`
4. Identify all components in `/components`
5. Find utility functions in `/lib`
6. List environment configuration points
7. Create grep patterns for quick lookups

**Output:** MAP.md with sections:
- File tree overview
- Route map (pages)
- API endpoint map
- Component registry
- Utility functions
- Critical files (auth, chat, landing page)
- Architecture decisions

---

## Phase 2: Task Context Generation

**Goal:** Extract high-impact tasks from system analysis

**Discover:**
1. Frontend improvements (UI/UX, performance)
2. Auth enhancements (session refresh, error handling)
3. Chat features (streaming, tool integration, real-time updates)
4. Backend integration points
5. Testing gaps
6. Documentation needs

**Generate:** TASK_CONTEXTS.md with:
- Task ID (T-101, T-102, etc.)
- Title & description
- Complexity: Trivial/Small/Medium/Large/Epic
- Risk level: Low/Medium/High
- Blast radius: Component/Feature/System
- Exact file:line references
- Execution plan
- Dependencies

---

## Phase 3: Agent Team Specification

**Goal:** Create 3 specialized agents for collaborative development

### navigator.md
**Role:** "Where is X?" expert
- Answers architecture questions with MAP.md references
- Shows file locations with line numbers
- Explains system patterns

### executor.md
**Role:** Task runner & builder
- Reads tasks from TASK_CONTEXTS.md
- Plans with file:line references
- Executes step-by-step with ASCII validation
- Writes production-ready code

### validator.md
**Role:** Quality gatekeeper
- Tests changes (TypeScript, build, runtime)
- Updates MAP.md if structure changes
- Checks for breaking changes
- Extracts lessons & patterns

---

## Phase 4: Daily Workflow

**Morning:** Review inbox → Navigator creates tasks → Update TASK_CONTEXTS.md

**During day:** Executor runs tasks → Validator checks → Merge if approved

**Evening:** Validator updates docs → Extract patterns → Plan tomorrow

**Loop:** Inbox → Navigator → Executor → Validator → Inbox Zero

---

## Key Files to Document

```
storymagic-web/
├── app/
│   ├── page.tsx                    # Landing page with login
│   ├── dashboard/page.tsx          # Chat dashboard
│   ├── api/auth/login              # OAuth initiation
│   ├── api/auth/callback/complete  # Token exchange
│   ├── api/auth/logout             # Session termination
│   └── layout.tsx                  # Root layout
├── components/
│   └── ChatInput.tsx               # Chat input component
├── lib/
│   ├── config.ts                   # Environment config
│   └── url.ts                      # Redirect sanitization
├── .env.local                      # Runtime config
└── package.json                    # Dependencies
```

---

## Success Metrics

✅ MAP.md is source of truth for all navigation questions
✅ All tasks have exact file:line references
✅ Executor can complete tasks without human intervention
✅ Validator catches 100% of breaking changes
✅ New features documented automatically
✅ Team onboarding < 5 minutes

---

## Communication Style (PERSONA)

- **Max 3-4 sentences per message**
- **Lead with action, trail with context**
- **File:line references always** (e.g., `app/page.tsx:29`)
- **No fluff, no validation-seeking**
- **Bias toward shipping over perfection**
- **Ruthlessly trim bloat, keep signal**

---

## Next Steps

1. Generate MAP.md by scanning codebase
2. Create TASK_CONTEXTS.md with actionable tasks
3. Spec agent_team/ roles (navigator, executor, validator)
4. Begin daily workflow with inbox entries

**Start here:** Scan the codebase and generate MAP.md with grep-friendly shortcuts.
