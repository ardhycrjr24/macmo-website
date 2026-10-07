/**
 * Canonical agent states — PRD §10 "Agent State Machine".
 * Exact list, no additions, no omissions.
 *
 * Avatar behavior is included ONLY where PRD §18 "State mapping" defines it.
 * STARTING has no defined avatar behavior in the PRD, so none is invented.
 */

import type { StateTone } from '../types/content';

export type AvatarBehavior = {
  readonly behavior: string;
};

export type AgentState = {
  readonly id: string;
  readonly label: string;
  readonly tone: StateTone;
  readonly hex: string;
  readonly avatar?: AvatarBehavior;
};

export const AGENT_STATES: readonly AgentState[] = [
  {
    id: 'OFFLINE',
    label: 'Offline',
    tone: 'offline',
    hex: '#5B5F66',
    avatar: { behavior: 'Sleeping / inactive' },
  },
  {
    id: 'STARTING',
    label: 'Starting',
    tone: 'starting',
    hex: '#BF5AF2',
    // No avatar behavior defined in PRD §18 — intentionally omitted.
  },
  {
    id: 'IDLE',
    label: 'Idle',
    tone: 'idle',
    hex: '#8E9196',
    avatar: { behavior: 'Neutral' },
  },
  {
    id: 'THINKING',
    label: 'Thinking',
    tone: 'thinking',
    hex: '#5AC8FA',
    avatar: { behavior: 'Thinking' },
  },
  {
    id: 'WORKING',
    label: 'Working',
    tone: 'working',
    hex: '#30D158',
    avatar: { behavior: 'Active' },
  },
  {
    id: 'WAITING',
    label: 'Waiting',
    tone: 'waiting',
    hex: '#FFD60A',
    avatar: { behavior: 'Waiting' },
  },
  {
    id: 'NEEDS_APPROVAL',
    label: 'Needs Approval',
    tone: 'approval',
    hex: '#FF9F0A',
    avatar: { behavior: 'Attention' },
  },
  {
    id: 'COMPLETED',
    label: 'Completed',
    tone: 'completed',
    hex: '#64D2FF',
    avatar: { behavior: 'Success' },
  },
  {
    id: 'ERROR',
    label: 'Error',
    tone: 'error',
    hex: '#FF453A',
    avatar: { behavior: 'Error' },
  },
  {
    id: 'STOPPING',
    label: 'Stopping',
    tone: 'stopping',
    hex: '#FF375F',
    avatar: { behavior: 'Transition' },
  },
];

/** States rendered on the homepage avatar section (site brief §7). */
export const AVATAR_SECTION_STATE_IDS = [
  'IDLE',
  'THINKING',
  'WORKING',
  'WAITING',
  'NEEDS_APPROVAL',
  'COMPLETED',
  'ERROR',
  'OFFLINE',
] as const;

export const stateById = (id: string): AgentState | undefined =>
  AGENT_STATES.find((state) => state.id === id);

export const avatarSectionStates: readonly AgentState[] =
  AVATAR_SECTION_STATE_IDS.map(stateById).filter(
    (state): state is AgentState => state !== undefined
  );
