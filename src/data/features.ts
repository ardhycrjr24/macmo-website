/**
 * Homepage section copy.
 * Every claim is traceable to the Macmo V1 PRD (docs/MACMO_V1_PRD.md).
 * No metrics, testimonials, downloads, or production claims.
 */

export const hero = {
  eyebrow: 'Macmo',
  headline: ['AI Agent Command Center', 'for macOS.'],
  support: [
    'See what your AI agents are doing.',
    'Control them when it matters.',
    'Give every agent an identity.',
  ],
  primaryCta: { label: 'Explore Macmo', href: '#features' },
  secondaryCta: { label: 'View Architecture', href: '#how-it-works' },
  status: 'Early Development',
} as const;

export const visibility = {
  id: 'features',
  kicker: 'Agent Visibility',
  title: 'Your agents are scattered across terminals and IDEs.',
  body: 'AI agents run fragmented across terminal windows and editors. It is hard to tell which agent is working, which is waiting, and which is blocked waiting for you. Macmo is designed to make that state visible in one place.',
  footnote: 'Concept UI — illustrative example of Macmo agent cards.',
  reference: 'PRD §3 Problems · §17 Main Dashboard',
} as const;

export const island = {
  kicker: 'Macmo Island',
  title: 'A compact floating interface that stays out of the way.',
  body: 'Macmo Island is a lightweight floating panel showing the agent avatar, current state, current task, and any approval request. It is designed to remain non-intrusive while keeping the important moment — a permission request — within reach.',
  items: [
    'Agent avatar',
    'Current state',
    'Current task',
    'Approval request',
  ],
  footnote: 'Concept UI — Macmo Island is in early development.',
  reference: 'PRD §16 Macmo Island',
} as const;

export const protocol = {
  id: 'how-it-works',
  kicker: 'Universal Agent Protocol',
  title: 'Different runtimes. One normalized system.',
  body: 'Agent-specific behavior belongs in adapters. Macmo operates on normalized events and states, so each runtime becomes interchangeable from Macmo’s perspective.',
  reference: 'PRD §5 Product Architecture · §8 Universal Agent Protocol',
} as const;

export const permission = {
  kicker: 'Human-in-the-Loop',
  title: 'You stay in control.',
  body: 'Permission handling is a first-class feature. When an agent wants to act, Macmo is designed to surface the request so you can approve or reject it — and every decision is logged locally.',
  items: [
    { label: 'Permission requests', detail: 'Agents request before acting' },
    { label: 'Approve', detail: 'Allow the requested action' },
    { label: 'Reject', detail: 'Refuse the requested action' },
    { label: 'Audit trail', detail: 'Decisions logged locally' },
  ],
  footnote: 'Concept UI — permission gateway is in early development.',
  reference: 'PRD §15 Permission Gateway · §22 Security',
} as const;

export const avatars = {
  kicker: 'Avatar System',
  title: 'Your agents have an identity.',
  body: 'Every agent can carry a persistent visual identity. Avatar behavior derives from the normalized agent state, so what you see always reflects what the agent is actually doing.',
  footnote: 'Avatar behavior shown only where defined in PRD §18.',
  reference: 'PRD §18 Avatar System',
} as const;

export const privacy = {
  id: 'security',
  kicker: 'Local-First',
  title: 'Your agents. Your Mac. No mandatory cloud.',
  body: 'Macmo V1 is designed around a local-first model. The core product does not depend on a cloud backend, and telemetry is not required.',
  items: [
    { label: 'Local-first', detail: 'Runs on your Mac' },
    { label: 'No mandatory cloud backend', detail: 'V1 requires no cloud service' },
    { label: 'Local IPC', detail: 'Unix Domain Socket, local-only' },
    { label: 'SQLite', detail: 'Local application state' },
    { label: 'Keychain', detail: 'Secure credential storage' },
    { label: 'Human-controlled permissions', detail: 'Explicit approvals' },
  ],
  reference: 'PRD §22 Security · §23 Privacy',
} as const;

export const supportedAgents = {
  id: 'agents',
  kicker: 'Supported / Planned Agents',
  title: 'Agent-agnostic by design.',
  body: 'Macmo is built to work across agent runtimes through an adapter system. The runtimes below are planned targets for early development — none are presented as shipped integrations.',
  reference: 'PRD §2 Target Users · §9 Adapter System',
} as const;

export const finalCta = {
  title: ['Your agents.', 'One command center.'],
  primaryCta: { label: "Follow Macmo's development", href: 'https://anakterubuk.tech/' },
  footnote: 'Macmo is in early development.',
} as const;
