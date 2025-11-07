# MAP.md - StoryMagic Web Navigation Guide

**Source of Truth for the codebase. Use grep shortcuts below to find anything fast.**

---

## File Tree Overview

```
storymagic-web/
├── app/
│   ├── page.tsx                           (landing page)
│   ├── layout.tsx                         (root layout)
│   ├── dashboard/
│   │   └── page.tsx                       (chat dashboard)
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts             (OAuth initiation)
│   │       ├── callback/complete/route.ts (token exchange + cookies)
│   │       └── logout/route.ts            (session cleanup)
│   └── globals.css                        (Tailwind styles)
├── components/
│   └── ChatInput.tsx                      (reusable chat input)
├── lib/
│   ├── config.ts                          (environment config)
│   └── url.ts                             (redirect safety)
├── public/                                (static assets)
├── .env.local                             (runtime config)
├── .env.example                           (template)
├── package.json                           (dependencies)
├── tsconfig.json                          (TypeScript)
└── atris/                                 (agent ops)
```

---

## Quick Reference: Grep Shortcuts

### Authentication
- **OAuth flow initiation:** `grep -r "POST.*auth/login" app/api/`
  - Main file: `app/api/auth/login/route.ts:16`

- **Token exchange & cookie setting:** `grep -r "response.cookies.set" app/api/`
  - Main file: `app/api/auth/callback/complete/route.ts:28`

- **Session termination:** `grep -r "maxAge: 0" app/api/`
  - Main file: `app/api/auth/logout/route.ts:14`

- **httpOnly cookie security:** `grep -r "httpOnly: true" app/api/`
  - Pattern used in: `app/api/auth/callback/complete/route.ts` and `app/api/auth/logout/route.ts`

- **Redirect sanitization:** `grep -r "sanitizeRedirectTarget" lib/`
  - Utility: `lib/url.ts:40`
  - Used in: `app/api/auth/login/route.ts:30`

### Frontend Pages
- **Landing page (login):** `app/page.tsx`
  - Lines 1-140: Full page component with auth buttons

- **Chat dashboard:** `app/dashboard/page.tsx`
  - Lines 1-100: Chat messages & scroll logic
  - Lines 101-130: Chat input integration
  - Lines 131-140: Logout handler

### Components
- **ChatInput component:** `components/ChatInput.tsx`
  - Lines 1-50: Props & state initialization
  - Lines 51-100: Message submission logic
  - Lines 101-180: File upload handling
  - Lines 181-250: UI rendering (textarea, mode toggle, thinking toggle)

### Utilities & Config
- **Environment configuration:** `lib/config.ts`
  - Lines 1-10: Atris API URL resolution
  - Lines 11-23: App URL & fallbacks
  - Lines 24-36: Agent credentials getter

- **URL sanitization & security:** `lib/url.ts`
  - Lines 1-32: Request origin resolution (proxy headers)
  - Lines 33-90: Redirect target validation (prevents open redirects)

### Styling & Theme
- **Global styles:** `app/globals.css`
  - Tailwind CSS configuration
  - Dark theme (slate-900, slate-800)

- **Color palette:** Used throughout
  - Primary: `blue-600`, `blue-500`
  - Secondary: `slate-700`, `slate-800`
  - Accents: `violet-400`, `cyan-400`

---

## Route Map

| Route | Method | Purpose | File |
|-------|--------|---------|------|
| `/` | GET | Landing page with auth | `app/page.tsx:1` |
| `/dashboard` | GET | Chat interface | `app/dashboard/page.tsx:1` |
| `/api/auth/login` | POST | OAuth initiation | `app/api/auth/login/route.ts:16` |
| `/api/auth/callback/complete` | GET | Token exchange | `app/api/auth/callback/complete/route.ts:6` |
| `/api/auth/logout` | POST | Session cleanup | `app/api/auth/logout/route.ts:10` |

---

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/login
├─ Input: { provider: "google" | "github" | "apple" }
├─ Output: { login_url: string } or error
└─ File: app/api/auth/login/route.ts

GET /api/auth/callback/complete
├─ Query: ?token=...&refresh_token=...&destination=...
├─ Action: Sets httpOnly cookies, redirects to destination
└─ File: app/api/auth/callback/complete/route.ts

POST /api/auth/logout
├─ Input: (none)
├─ Action: Clears all auth cookies
└─ File: app/api/auth/logout/route.ts
```

---

## Component Registry

### ChatInput
**File:** `components/ChatInput.tsx`
**Props:**
```typescript
interface ChatInputProps {
  onSubmit?: (text: string, files: File[], mode: Mode, thinking?: boolean) => void
  placeholder?: string
  showModeToggle?: boolean
  isLoading?: boolean
  availableModes?: ("quick" | "pro")[]
  showThinkingToggle?: boolean
}
```
**Features:**
- Auto-expanding textarea (line 157-187)
- File upload (images/PDFs) (line 68-94)
- Mode toggle (line 104-125)
- Thinking mode toggle (line 126-150)
- Keyboard shortcuts: Enter to submit, Shift+Enter for newline

---

## State Management

### Chat State (Dashboard)
**File:** `app/dashboard/page.tsx`
```
messages: Message[]          # localStorage: chat-messages-{id}
isLoading: boolean           # True during API calls
conversationId: string       # localStorage: chat-conversation-id-{id}
```

### Landing Page State
**File:** `app/page.tsx`
```
isLoading: boolean           # True during OAuth redirect
error: string | null         # Auth error messages
```

---

## Environment Configuration

**File:** `.env.local`
```
ATRIS_API_BASE_URL=https://api.atris.ai/api
APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.atris.ai/api
NEXT_PUBLIC_AUTH_API_URL=https://api.atris.ai/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
```

**Accessed via:**
- Backend: `lib/config.ts` functions
- Frontend: `process.env.NEXT_PUBLIC_*` directly

---

## Critical Files (High Impact)

| File | Impact | Reason |
|------|--------|--------|
| `app/api/auth/login/route.ts` | High | OAuth flow entry point |
| `app/api/auth/callback/complete/route.ts` | Critical | Token management + security |
| `app/page.tsx` | High | User's first experience |
| `app/dashboard/page.tsx` | High | Core feature (chat) |
| `lib/url.ts` | Critical | Security (prevents open redirects) |
| `components/ChatInput.tsx` | Medium | UX polish |

---

## Architecture Decisions

### 1. OAuth Proxy Pattern
- Frontend never touches OAuth secrets
- Backend manages all provider plumbing
- Tokens received via secure callback endpoint
- httpOnly cookies prevent XSS

**Files involved:** `lib/url.ts`, `app/api/auth/*`

### 2. httpOnly Cookies for Session
- Cannot be accessed via JavaScript (XSS-proof)
- Auto-transmitted on every request
- SameSite=lax for CSRF protection
- 1 week expiration

**Files involved:** `app/api/auth/callback/complete/route.ts`, `app/api/auth/logout/route.ts`

### 3. localStorage for Chat Persistence
- Messages saved per conversation ID
- Auto-load on page mount
- Debounced save (1s delay)
- Client-side only (no server sync yet)

**Files involved:** `app/dashboard/page.tsx:22-85`

### 4. Component Composition
- ChatInput is reusable (can be imported anywhere)
- Dashboard owns chat state & messages
- Landing page owns auth state

**Files involved:** `components/ChatInput.tsx`, `app/dashboard/page.tsx`

---

## Security Checkpoints

| Checkpoint | Location | Status |
|------------|----------|--------|
| OAuth secrets never in browser | `lib/url.ts`, `app/api/auth/*` | ✅ Implemented |
| Open redirect prevention | `lib/url.ts:40-90` | ✅ Implemented |
| httpOnly cookie security | `app/api/auth/callback/complete/route.ts:28-49` | ✅ Implemented |
| CSRF protection (SameSite) | `app/api/auth/callback/complete/route.ts:32` | ✅ Implemented |
| Token expiration | `app/api/auth/callback/complete/route.ts:4` | ✅ Implemented (7 days) |

---

## Dependencies & Versions

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.0.1 | Web framework |
| react | 19.2.0 | UI library |
| typescript | ^5 | Type safety |
| tailwindcss | ^4 | Styling |
| lucide-react | latest | Icons |

---

## Next Steps for Development

1. **Connect chat to backend:** `app/dashboard/page.tsx:92` needs real API call
2. **Add message bookmarks:** Store in localStorage
3. **Implement thinking mode:** Pass to backend AI service
4. **File upload processing:** Currently accepted, needs backend handler
5. **Real-time chat:** Consider WebSockets for streaming responses
6. **Error boundary:** Wrap components for graceful failures
7. **Testing:** Unit tests for auth flow, component tests for chat

---

## Quick Answers

**Q: Where is authentication?**
A: `app/api/auth/*` for routes. `lib/url.ts` for redirect safety.

**Q: Where is the chat UI?**
A: `app/dashboard/page.tsx` for page, `components/ChatInput.tsx` for input component.

**Q: How does landing page send login request?**
A: `app/page.tsx:15-34` → POST to `/api/auth/login` → Backend returns `login_url` → Redirect.

**Q: Where are cookies set?**
A: `app/api/auth/callback/complete/route.ts:28-49` sets httpOnly cookies from token response.

**Q: How are messages persisted?**
A: `app/dashboard/page.tsx:30-45` saves to localStorage on every message change.

**Q: Where is environment config?**
A: `lib/config.ts` for backend-accessible config, `.env.local` for runtime values.

---

**Last Updated:** Nov 7, 2025
**Maintainer:** Validator Agent (auto-updates when structure changes)
