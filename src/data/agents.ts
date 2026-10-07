/**
 * Agent runtimes — PRD §2 "Target Users" / §9 "Adapter System".
 * All integrations are PLANNED. Nothing here implies a shipped integration.
 */

import type { AgentRuntime, IntegrationStatus } from '../types/content';

export const AGENT_RUNTIMES: readonly AgentRuntime[] = [
  { name: 'Claude Code', status: 'Planned' },
  { name: 'Codex', status: 'Planned' },
  { name: 'Gemini CLI', status: 'Planned' },
  { name: 'Hermes', status: 'Planned' },
  { name: 'Custom Agents', status: 'Planned', note: 'Via GenericAdapter' },
];

export const RUNTIME_STATUS: IntegrationStatus = 'Planned';

/**
 * Conceptual agent cards — site brief §3.
 * Concept UI examples only; these do NOT represent live integrations.
 */
export type ConceptAgent = {
  readonly name: string;
  readonly stateId: 'WORKING' | 'IDLE' | 'WAITING' | 'OFFLINE';
};

export const CONCEPT_AGENTS: readonly ConceptAgent[] = [
  { name: 'Claude Code', stateId: 'WORKING' },
  { name: 'Codex', stateId: 'IDLE' },
  { name: 'Gemini CLI', stateId: 'WAITING' },
  { name: 'Hermes', stateId: 'OFFLINE' },
];
