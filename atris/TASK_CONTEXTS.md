# TASK_CONTEXTS.md - StoryMagic Web Task Bank

**Ready-to-execute tasks with exact context. Pick one, assign to executor, ship it.**

---

## T-101: Connect Chat to Real AI Backend

**Priority:** Critical (blocks core feature)
**Complexity:** Large
**Risk Level:** Medium
**Blast Radius:** Feature (dashboard)

**Current State:**
Dashboard chat shows mock responses. Lines 92-100 in `app/dashboard/page.tsx` have placeholder logic.

**Goal:**
Integrate with Atris backend to send messages and receive streamed AI responses.

**Exact References:**
- Mock logic: `app/dashboard/page.tsx:92-114`
- Config: `lib/config.ts:6-9` (getAtrisApiBaseUrl)
- Env: `.env.local:2`

**Execution Plan:**
1. Create `lib/chat-service.ts` with `sendMessage(text, mode)` function
2. Call POST `/api/chat` endpoint (to be created) with { text, mode, conversationId }
3. Backend calls Atris AI service
4. Stream response via SSE
5. Update dashboard to consume stream
6. Add loading spinner during response
7. Test with all modes (quick, pro)

**Dependencies:**
- Backend API implementation (not yet created)
- SSE streaming setup
- Error handling for failed requests

**Testing:**
- [ ] Message sends without errors
- [ ] Response displays in chat
- [ ] Loading state shows correctly
- [ ] Errors show gracefully
- [ ] Mode toggle affects response (quick vs pro)

**Rollback Difficulty:** Medium (just revert handleSubmit logic)

---

## T-102: Implement Message Bookmarking

**Priority:** High
**Complexity:** Medium
**Risk Level:** Low
**Blast Radius:** Feature (dashboard)

**Current State:**
Chat displays messages but no bookmark functionality. `app/dashboard/page.tsx` has Message type (line 15-20) but no bookmark field.

**Goal:**
Let users save/bookmark important messages with persistent storage.

**Exact References:**
- Message type: `app/dashboard/page.tsx:15-20`
- Component rendering: `app/dashboard/page.tsx:85-108`
- Storage strategy: Use localStorage under `chat-bookmarks-{conversationId}`

**Execution Plan:**
1. Add `bookmarked: boolean` field to Message type
2. Add bookmark button UI (heart icon) next to copy button
3. Update handleBookmark to toggle bookmark + save to localStorage
4. Load bookmarks on chat load
5. Style bookmarked messages (glow effect)
6. Add "View Bookmarks" button to show only bookmarked messages

**Dependencies:**
- None (fully local)

**Testing:**
- [ ] Bookmark button appears on hover
- [ ] Clicking bookmark persists across refresh
- [ ] Bookmarks load correctly on page load
- [ ] Filter to bookmarks view works
- [ ] Unbookmarking works

**Rollback Difficulty:** Low (revert localStorage changes)

---

## T-103: Add Thinking Mode Streaming

**Priority:** High
**Complexity:** Medium
**Risk Level:** Medium
**Blast Radius:** Feature (chat)

**Current State:**
ChatInput has thinking toggle (line 130-150 in `components/ChatInput.tsx`) but backend doesn't use it yet.

**Goal:**
Show AI's thinking process as it runs when thinking mode is enabled.

**Exact References:**
- Toggle UI: `components/ChatInput.tsx:130-150`
- Passed but unused: `app/dashboard/page.tsx:108` (thinkingEnabled param)
- Config needed: Add `thinking_enabled` to API payload

**Execution Plan:**
1. Update `/api/chat` endpoint to accept `thinking_enabled: boolean`
2. Backend sends `<thinking>` blocks before response
3. Frontend detects thinking blocks in stream
4. Show thinking in collapsible accordion
5. Display main response below
6. Collapse thinking by default (user can expand)
7. Add "thinking took Xs" badge

**Dependencies:**
- Backend support for thinking mode
- Streaming format spec from backend team

**Testing:**
- [ ] Thinking toggle sends to backend
- [ ] Backend returns thinking blocks
- [ ] Frontend parses & displays correctly
- [ ] Accordion toggle works
- [ ] Thinking section collapses/expands smoothly

**Rollback Difficulty:** Medium (conditionally render thinking)

---

## T-104: Implement File Upload Processing

**Priority:** Medium
**Complexity:** Large
**Risk Level:** High
**Blast Radius:** System (security implications)

**Current State:**
ChatInput accepts files (line 68-94 in `components/ChatInput.tsx`) but dashboard doesn't process them.

**Goal:**
Allow users to upload images & PDFs, send to backend for AI analysis.

**Exact References:**
- File selection: `components/ChatInput.tsx:68-94`
- Unused in dashboard: `app/dashboard/page.tsx:108` (files param)
- Form-data needed: Multipart encoding

**Execution Plan:**
1. Create `lib/file-service.ts` with upload utilities
2. Validate file types & sizes on frontend (security)
3. Update `/api/chat` to accept multipart form-data
4. Send files with message
5. Backend processes (resize images, extract PDF text)
6. Include file context in AI prompt
7. Show file preview in message bubble
8. Add file count indicator

**Dependencies:**
- Backend file processing service
- MIME type validation list
- Max file size policy (default: 10MB images, 50MB PDFs)

**Security Concerns:**
- Validate MIME types (don't trust extension)
- Scan for malware
- Virus check on upload
- Rate limit uploads per user
- Max files per message (5)
- Max storage per user

**Testing:**
- [ ] Image uploads display thumbnail
- [ ] PDF text extracts correctly
- [ ] File size limits enforced
- [ ] Invalid files rejected
- [ ] Large files don't timeout
- [ ] Concurrent uploads work
- [ ] Error handling for failed uploads

**Rollback Difficulty:** High (requires cleanup of uploaded files)

---

## T-105: Add Error Boundary & Graceful Fallbacks

**Priority:** Medium
**Complexity:** Small
**Risk Level:** Low
**Blast Radius:** Component (app-wide)

**Current State:**
No error boundaries. Dashboard crashes on unhandled errors.

**Goal:**
Wrap pages in error boundary, show user-friendly error UI.

**Exact References:**
- Dashboard: `app/dashboard/page.tsx:1`
- Landing: `app/page.tsx:1`
- Both need wrapping

**Execution Plan:**
1. Create `components/ErrorBoundary.tsx` (React class component)
2. Catch errors from child components
3. Log to console (dev) and backend (prod)
4. Show fallback UI with "Something went wrong" + reload button
5. Add error boundary around `<DashboardPage />`
6. Add error boundary around `<LandingPage />`
7. Test with intentional throws

**Dependencies:**
- None (built-in React feature)

**Testing:**
- [ ] Boundary catches errors
- [ ] Fallback UI displays
- [ ] Reload button works
- [ ] Error logged correctly
- [ ] Other components unaffected

**Rollback Difficulty:** Low (remove boundary wrapper)

---

## T-106: Implement Real-time Chat with WebSockets

**Priority:** Medium (future optimization)
**Complexity:** Epic
**Risk Level:** High
**Blast Radius:** System (performance)

**Current State:**
Chat uses HTTP polling. Latency for multi-user features unknown.

**Goal:**
Add WebSocket support for true real-time chat, presence detection, typing indicators.

**Exact References:**
- Chat state: `app/dashboard/page.tsx:25-46`
- Input handler: `app/dashboard/page.tsx:67-100`
- Backend API: `.env.local:2`

**Execution Plan:**
1. Create `lib/ws-client.ts` for WebSocket management
2. Connect on dashboard load, disconnect on unmount
3. Send messages via WS instead of HTTP
4. Receive messages via WS event stream
5. Add typing indicator ("User is typing...")
6. Add presence (who's in chat)
7. Handle reconnection on connection loss
8. Add connection status indicator (top-right)
9. Batch messages if offline, sync on reconnect

**Dependencies:**
- Backend WebSocket server (not built yet)
- Re-architecture of message flow

**Breaking Changes:**
- Changes API contract for messaging
- Requires backward-compatible HTTP fallback

**Testing:**
- [ ] WebSocket connects on page load
- [ ] Messages send/receive via WS
- [ ] Typing indicators work
- [ ] Presence shows active users
- [ ] Reconnection handles network loss
- [ ] Offline message queuing works
- [ ] HTTP fallback activates on WS failure

**Rollback Difficulty:** Critical (significant refactor)

---

## T-107: Add User Profile & Settings Page

**Priority:** Low (nice-to-have)
**Complexity:** Medium
**Risk Level:** Low
**Blast Radius:** Feature (new page)

**Current State:**
No user profile. Logout works but no settings.

**Goal:**
Show user info, preferences, export chat history.

**Exact References:**
- Auth state: `app/api/auth/callback/complete/route.ts:28` (tokens contain user info)
- Dashboard: `app/dashboard/page.tsx:1` (add nav to settings)

**Execution Plan:**
1. Create `app/settings/page.tsx`
2. Add route to dashboard header
3. Fetch user profile from backend
4. Show: name, email, provider, joined date
5. Preferences: theme toggle, notification settings
6. Export chat history as JSON/PDF
7. Delete account option (dangerous!)
8. Settings persisted to backend

**Dependencies:**
- Backend user profile API
- Export service

**Testing:**
- [ ] Settings page loads
- [ ] User data displays correctly
- [ ] Preferences save
- [ ] Export generates valid file
- [ ] Delete account works (with confirmation)

**Rollback Difficulty:** Low (just delete settings page)

---

## T-108: Set Up End-to-End Testing

**Priority:** Medium
**Complexity:** Large
**Risk Level:** Low
**Blast Radius:** Development (not production)

**Current State:**
No tests. Manual testing only.

**Goal:**
Add E2E tests for auth flow and chat interactions.

**Exact References:**
- Auth routes: `app/api/auth/*`
- Chat flow: `app/dashboard/page.tsx`

**Execution Plan:**
1. Install Playwright (E2E) or Cypress
2. Test auth flow: click login → redirect → get cookies
3. Test chat: send message → see response
4. Test logout: clear cookies
5. Add to CI/CD pipeline
6. Run on every PR
7. Add badge to README

**Dependencies:**
- Test framework choice
- CI/CD setup (GitHub Actions)

**Testing:**
- [ ] Auth flow E2E passes
- [ ] Chat flow E2E passes
- [ ] Logout E2E passes
- [ ] Tests run in CI
- [ ] Flaky tests fixed

**Rollback Difficulty:** Low (disable in CI temporarily)

---

## T-109: Performance Optimization - Code Splitting

**Priority:** Low
**Complexity:** Small
**Risk Level:** Low
**Blast Radius:** Performance (all pages)

**Current State:**
All components bundled together. Landing page includes chat components.

**Goal:**
Split dashboard and chat components into separate bundles.

**Exact References:**
- Landing imports: `app/page.tsx:1-4`
- Dashboard imports: `app/dashboard/page.tsx:1-10`
- ChatInput: `components/ChatInput.tsx`

**Execution Plan:**
1. Move ChatInput to lazy load on dashboard
2. Use dynamic() for heavy components
3. Add loading skeleton while chunk loads
4. Measure bundle size before/after
5. Set performance budget

**Dependencies:**
- None (Next.js built-in)

**Testing:**
- [ ] Bundle size < 100KB initial
- [ ] Dashboard lazy loads correctly
- [ ] No breaking changes

**Rollback Difficulty:** Low (revert imports)

---

## T-110: Documentation & Onboarding Guide

**Priority:** Medium
**Complexity:** Small
**Risk Level:** Low
**Blast Radius:** Development

**Current State:**
ATRIS docs exist but no developer guide.

**Goal:**
Create clear README for new contributors.

**Exact References:**
- MAP.md: `atris/MAP.md` (source of truth)
- Tasks: `atris/TASK_CONTEXTS.md`

**Execution Plan:**
1. Create `docs/DEVELOPER.md`
2. Setup: npm install, env config, how to run locally
3. Architecture overview
4. How to add new routes
5. How to update chat interface
6. Testing & linting
7. Deployment instructions
8. Troubleshooting

**Testing:**
- [ ] New dev can setup in 5 min
- [ ] All commands work as documented
- [ ] Troubleshooting section solves common issues

**Rollback Difficulty:** None (just docs)

---

## Quick Win Tasks (Do These First!)

| Task | Time | Difficulty | Value |
|------|------|-----------|-------|
| T-105: Error Boundary | 30min | Trivial | High |
| T-102: Message Bookmarking | 1h | Small | Medium |
| T-110: Developer Docs | 1h | Small | High |
| T-103: Thinking Mode UI | 2h | Medium | Medium |

---

## Blocked / Waiting On

- **T-101:** Chat backend API (waiting on backend team)
- **T-104:** File upload backend (waiting on backend team)
- **T-106:** WebSocket backend (waiting on backend team)

---

## Completed Tasks

(None yet - project just started)

---

**Updated:** Nov 7, 2025
**Next Review:** After T-101 completes (backend integration)
