export type StateTone =
  | 'offline'
  | 'starting'
  | 'idle'
  | 'thinking'
  | 'working'
  | 'waiting'
  | 'approval'
  | 'completed'
  | 'error'
  | 'stopping';

export type IntegrationStatus = 'Planned' | 'Concept';

export type AgentRuntime = {
  readonly name: string;
  /** Always labeled — never implies production readiness. */
  readonly status: IntegrationStatus;
  readonly note?: string;
};
