# MACMO V1 — PRODUCT REQUIREMENTS DOCUMENT

## Product
**Macmo — AI Agent Command Center for macOS**

**Studio:** ANAK TERUBUK  
**Domain:** anakterubuk.tech

---

## 1. Product Vision

Macmo is a native macOS command center for AI agents. It makes agents visible, controllable, monitorable, and personal through real-time activity, human approval, workspace management, notifications, and dynamic avatars.

Macmo is **not an LLM or chatbot**. It is a control and visibility layer for AI agents running on a developer's Mac.

### Core principles
- Agent-agnostic
- Local-first
- Human-in-the-loop
- Visual-first
- Native macOS
- Extensible
- No mandatory cloud backend for V1

---

## 2. Target Users

Primary users are developers who run multiple AI coding agents on macOS.

Potential runtimes:
- Claude Code
- Codex
- Gemini CLI
- Hermes
- Cursor-related agents
- Custom/local agents

---

## 3. Problems

Macmo solves several problems:

1. AI agents are fragmented across terminals and IDEs.
2. Users cannot easily see which agent is working, waiting, or blocked.
3. Permission requests require constant terminal supervision.
4. Different runtimes expose different event formats.
5. Agents have little persistent visual identity.
6. Users lack one place to monitor active sessions and workspaces.

---

## 4. V1 Scope

V1 includes:

1. Native macOS application shell
2. Agent discovery
3. Agent registry
4. Universal Agent Protocol
5. Adapter system
6. Local IPC
7. Agent sessions
8. Workspace management
9. Real-time agent state
10. Activity timeline
11. Permission gateway
12. Notifications
13. Avatar system
14. Avatar creator/library
15. macOS integration
16. Local persistence
17. Security controls

---

# 5. Product Architecture

The central architecture is:

```text
Agent Runtime
      ↓
Agent Adapter
      ↓
Universal Agent Protocol
      ↓
Event Engine
      ↓
State Engine
      ↓
┌────────────┬─────────────┬──────────────┐
│ UI         │ Avatar      │ Notification │
│ Dashboard │ System      │ System       │
└────────────┴─────────────┴──────────────┘
```

This separation is critical. Agent-specific behavior belongs in adapters, while Macmo operates on normalized events and states.

---

# 6. Agent Registry

Each agent receives a persistent identity.

```text
Agent
├── id
├── name
├── type
├── runtime
├── version
├── executablePath
├── workspace
├── status
├── avatar
├── capabilities
├── adapter
└── createdAt
```

Example:

```text
DevBot
Claude Code
Codex
Gemini CLI
Hermes
Custom Agent
```

---

# 7. Agent Discovery

Macmo should detect supported agent runtimes installed locally.

Discovery sources:
- PATH
- Known executable paths
- Package-manager locations
- Known configuration directories
- Existing registrations

Discovery must not execute arbitrary commands without appropriate authorization.

Example:

```text
Detected Agents

✓ Claude Code
✓ Codex
✓ Gemini CLI
✓ Hermes

[Add Agent]
```

---

# 8. Universal Agent Protocol

Macmo needs one normalized internal event model.

Example event types:

```text
session.started
session.ended

agent.started
agent.working
agent.thinking
agent.waiting
agent.completed
agent.error

tool.started
tool.completed
tool.failed

permission.requested
permission.approved
permission.rejected

message.received
message.sent
```

The protocol allows different agent runtimes to become interchangeable from Macmo's perspective.

---

# 9. Adapter System

Every supported runtime should have an adapter.

Suggested interface:

```text
AgentAdapter

detect()
installHooks()
uninstallHooks()
parseEvent()
normalizeEvent()
sendResponse()
capabilities()
healthCheck()
```

Adapters:

```text
ClaudeCodeAdapter
CodexAdapter
GeminiCLIAdapter
HermesAdapter
GenericAdapter
```

The adapter converts runtime-specific events into Macmo's universal event format.

---

# 10. Agent State Machine

Normalized states:

```text
OFFLINE
STARTING
IDLE
THINKING
WORKING
WAITING
NEEDS_APPROVAL
COMPLETED
ERROR
STOPPING
```

Example lifecycle:

```text
OFFLINE
   ↓
STARTING
   ↓
IDLE
   ↓
THINKING
   ↓
WORKING
   ↓
WAITING
   ↓
NEEDS_APPROVAL
   ↓
WORKING
   ↓
COMPLETED
```

The state engine is the source of truth for the UI, avatar, and notifications.

---

# 11. IPC

V1 should prioritize Unix Domain Socket IPC.

```text
Agent Hook / Adapter
        ↓
Unix Domain Socket
        ↓
Macmo IPC Server
        ↓
Event Engine
        ↓
State Engine
```

Requirements:
- Local-only communication
- Payload validation
- Event schema validation
- Client validation
- No public network exposure
- Malformed events rejected

---

# 12. Sessions

Each agent execution becomes a session.

```text
Session
├── id
├── agentId
├── workspace
├── startedAt
├── endedAt
├── status
├── currentTask
├── events
└── result
```

The user can:
- View active sessions
- View session history
- Open session details
- View timeline
- Jump to terminal/workspace

---

# 13. Workspaces

A workspace represents the project context of an agent.

```text
Workspace
├── Project
├── Repository
├── Path
├── Active Agents
└── Sessions
```

Example:

```text
SIMA

DevBot       WORKING
Claude Code  WAITING
Codex        IDLE
```

---

# 14. Activity Timeline

Macmo provides a chronological event stream.

Example:

```text
22:14  Agent started
22:15  Reading project files
22:16  Tool execution
22:16  Tool completed
22:17  Permission requested
22:17  User approved
22:18  Agent working
22:20  Task completed
```

Filters:
- Agent
- Workspace
- Session
- Event type
- Time

---

# 15. Permission Gateway

Permission handling is a first-class feature.

Example:

```text
Claude Code wants to execute:

npm install

[Allow] [Reject]
```

Approval can be available from:
- Main dashboard
- Macmo Island
- macOS notification where appropriate

Every decision should be logged locally.

---

# 16. Macmo Island

Macmo should provide a compact floating interface.

States:

```text
Hidden
Compact
Expanded
Focused
Approval
```

### Compact
Shows:
- Agent avatar
- Current state
- Activity indicator

### Expanded
Shows:
- Agent name
- Workspace
- Current task
- Recent activity
- Controls

### Approval
Shows:
- Agent
- Requested action
- Context
- Approve
- Reject

The interface must remain lightweight and non-intrusive.

---

# 17. Main Dashboard

The dashboard provides global agent visibility.

```text
MACMO

Agents
────────────────────────

● DevBot        WORKING
● Claude Code   WAITING
● Codex         IDLE
● Hermes        OFFLINE

Active Sessions
────────────────────────

SIMA
NexusRouter
Macmo

Recent Activity
────────────────────────

Permission requested
Agent completed
Agent started
```

---

# 18. Avatar System

The avatar system is a **core product feature**, not decoration.

Each agent can have a persistent visual identity.

```text
Avatar
├── identity
├── appearance
├── animation
├── stateMapping
└── metadata
```

Supported V1 sources:
- Built-in avatars
- Custom uploaded avatars
- Avatar library
- Avatar creator

### State mapping

| Agent State | Avatar Behavior |
|---|---|
| OFFLINE | Sleeping / inactive |
| IDLE | Neutral |
| THINKING | Thinking |
| WORKING | Active |
| WAITING | Waiting |
| NEEDS_APPROVAL | Attention |
| COMPLETED | Success |
| ERROR | Error |
| STOPPING | Transition |

Avatar state must always derive from the normalized agent state.

---

# 19. Avatar Creator

V1 should include a lightweight avatar creator.

Customization:
- Character base
- Face
- Hair
- Outfit
- Accessories
- Background
- Expression

The initial implementation can use 2D images and lightweight animation.

Future versions:
- Live2D
- Voice
- Lip sync
- 3D characters
- Advanced character rigs

These are not required for V1.

---

# 20. Notifications

Notifications should be available for:
- Agent completed
- Agent failed
- Permission required
- Agent disconnected
- Long-running task completed

Users can configure notification preferences per agent and event type.

---

# 21. macOS Integration

Use native macOS capabilities where appropriate:

- Notifications
- Menu bar
- Dock
- Window management
- Keyboard shortcuts
- Launch at login
- Terminal/workspace jump
- Keychain
- Accessibility APIs only where explicitly required

---

# 22. Security

Security principles:

1. Local-first
2. Least privilege
3. No unnecessary network listeners
4. Secure credential storage
5. Explicit permissions
6. Event validation
7. Audit logging

Credentials should use macOS Keychain.

SQLite is for local application state and must not replace secure credential storage.

---

# 23. Privacy

Macmo V1 should not require telemetry.

Default model:

```text
Your Agents
     ↓
Your Mac
     ↓
Macmo
```

No mandatory cloud service.

If telemetry is introduced later, it should be:
- Opt-in
- Documented
- Minimal
- Configurable

---

# 24. Technical Stack

Recommended V1 baseline:

- Swift 6
- SwiftUI
- AppKit
- macOS
- SQLite
- macOS Keychain
- Unix Domain Socket
- Native macOS notifications

Avoid heavy local LLMs and unnecessary cloud dependencies.

---

# 25. Repository Structure

```text
Macmo/
├── App/
│   ├── MacmoApp.swift
│   ├── AppDelegate.swift
│   └── AppState.swift
│
├── Core/
│   ├── Agent/
│   ├── Events/
│   ├── Sessions/
│   ├── Workspaces/
│   ├── State/
│   └── Permissions/
│
├── Protocol/
│   ├── AgentProtocol.swift
│   ├── Event.swift
│   └── State.swift
│
├── IPC/
│   ├── UnixSocketServer.swift
│   └── IPCMessage.swift
│
├── Adapters/
│   ├── ClaudeCode/
│   ├── Codex/
│   ├── GeminiCLI/
│   ├── Hermes/
│   └── Generic/
│
├── Avatar/
│   ├── AvatarModel.swift
│   ├── AvatarLibrary.swift
│   ├── AvatarCreator/
│   └── Renderer/
│
├── UI/
│   ├── Dashboard/
│   ├── Island/
│   ├── Sessions/
│   ├── Agents/
│   ├── Workspaces/
│   ├── Timeline/
│   ├── Permissions/
│   └── Settings/
│
├── Storage/
│   ├── SQLite/
│   └── Keychain/
│
└── Tests/
```

---

# 26. Implementation Roadmap

## Phase 0 — Foundation
- Create native Swift 6/macOS project.
- Configure SwiftUI/AppKit.
- Establish architecture.
- Add logging.
- Add local persistence.

## Phase 1 — Macmo Shell
- Application lifecycle.
- Menu bar.
- Main window.
- Floating panel.
- Navigation.
- Keyboard shortcuts.

## Phase 2 — Universal Agent Protocol
- Agent model.
- Session model.
- Event model.
- State model.
- Capability model.

## Phase 3 — IPC
- Unix socket server.
- Message schema.
- Event validation.
- Client validation.
- Event routing.

## Phase 4 — Generic Test Agent
Build a local fake agent capable of emitting:

```text
session.started
agent.working
tool.started
tool.completed
permission.requested
agent.completed
```

This proves the complete event pipeline before real integrations.

## Phase 5 — First Real Adapter
Recommended first adapter: **Claude Code**

Implement:
- Detection
- Hook installation
- Event parsing
- Event normalization
- Permission response
- Health check

## Phase 6 — Dashboard
- Agent registry
- Active sessions
- Workspace view
- State indicators
- Activity timeline

## Phase 7 — Avatar System
- Avatar model
- Avatar library
- Custom avatar
- Avatar creator
- State-driven animation

## Phase 8 — Permission Gateway
- Approval UI
- Reject UI
- Permission logging
- Compact approval interface

## Phase 9 — Notifications
- Completion
- Error
- Permission
- Per-agent settings

## Phase 10 — QA
Test:
- Agent discovery
- IPC reliability
- State transitions
- Session lifecycle
- Permission flow
- Avatar state changes
- Crash recovery
- Restart recovery
- Security boundaries

---

# 27. V1 Acceptance Criteria

Macmo V1 is functional when:

- A supported agent can be detected.
- An agent can be registered.
- An agent can create a session.
- Agent events reach Macmo through local IPC.
- Events are normalized.
- State changes are reflected in the UI.
- Sessions and activity are visible.
- Permission requests can be approved/rejected.
- Agent state changes update the avatar.
- A custom avatar can be assigned.
- Notifications work.
- Credentials are securely stored.
- No mandatory cloud service is required.
- A complete workflow works using the generic test agent.

---

# 28. V1 Non-Goals

Do not expand V1 into:

- Cloud synchronization
- Multi-user accounts
- SaaS backend
- Billing
- Remote agent management
- Windows/Linux support
- Full 3D avatar engine
- Full Live2D engine
- Built-in LLM
- Built-in AI image generation
- Agent marketplace
- Arbitrary autonomous Mac control
- Complex shell execution directly from the UI
- Dozens of integrations

---

# 29. V1.1 Candidates

Potential next features:

- More agent adapters
- Advanced avatar animations
- Better session search
- Agent grouping
- Workspace automation
- Granular permission policies
- Custom notification sounds
- Agent performance statistics
- Configuration import/export

---

# 30. Product Differentiation

Macmo is not another AI chatbot.

Its differentiation:

### Agent Control Plane
One place to observe and control multiple AI agents.

### Universal Protocol
Different runtimes become one normalized system.

### Human Oversight
Approvals and supervision become easy.

### Visual Agent Identity
Agents have persistent avatars and state-driven personality.

### Native macOS
Fast, lightweight, and deeply integrated.

### Local-First Privacy
The core product does not depend on a cloud backend.

---

# 31. Success Metrics

Early metrics:

- Registered agents
- Active sessions
- Event delivery success rate
- Permission response time
- IPC reliability
- Crash-free sessions
- Avatar state accuracy
- Supported runtimes
- Active developer retention

For the prototype, prioritize technical reliability over vanity metrics.

---

# 32. Recommended Build Strategy

Build in this order:

```text
Infrastructure
      ↓
Agent Protocol
      ↓
IPC
      ↓
Generic Test Agent
      ↓
Real Agent Adapter
      ↓
State Engine
      ↓
Dashboard
      ↓
Avatar System
      ↓
Permission Gateway
      ↓
Polish
```

Do not spend most of V1 development on visual polish before the event pipeline works.

The core loop is:

```text
Agent Event
    ↓
Normalized Event
    ↓
State
    ↓
Avatar
    ↓
UI
    ↓
Notification
```

Once this pipeline works, additional agents and interfaces can be added without redesigning the core.

---

# 33. Strategic Architecture

The most important long-term asset is not the avatar alone.

The strategic core is:

```text
Universal Agent Protocol
          +
Adapter Ecosystem
          +
Runtime State Engine
          +
Human Oversight
```

The avatar system becomes the human-facing identity layer on top of that infrastructure.

This gives Macmo a path from a macOS companion into a broader control plane for AI agents.

---

# 34. Final Product Definition

**Macmo** is a native macOS command center for AI agents.

It makes AI agents:

- Visible
- Understandable
- Controllable
- Approveable
- Monitorable
- Personal

The product should make a developer feel that their collection of AI agents is no longer a collection of disconnected terminal processes, but a coherent system that they can see and supervise from one place.

> **Macmo — AI Agent Command Center for macOS.**

> **ANAK TERUBUK — Independent Software & AI Studio**
