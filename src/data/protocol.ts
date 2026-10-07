/**
 * Universal Agent Protocol pipeline — PRD §5 "Product Architecture".
 * Order and labels come directly from the PRD diagram.
 */

export type ProtocolStep = {
  readonly index: string;
  readonly label: string;
  readonly detail: string;
};

export const PROTOCOL_STEPS: readonly ProtocolStep[] = [
  {
    index: '01',
    label: 'Agent Runtime',
    detail: 'Claude Code, Codex, Gemini CLI, Hermes, custom agents',
  },
  {
    index: '02',
    label: 'Adapter',
    detail: 'Runtime-specific behavior and event parsing',
  },
  {
    index: '03',
    label: 'Universal Agent Protocol',
    detail: 'One normalized internal event model',
  },
  {
    index: '04',
    label: 'Event Engine',
    detail: 'Validated, normalized events flow through Macmo',
  },
  {
    index: '05',
    label: 'State Engine',
    detail: 'Source of truth for UI, avatar, and notifications',
  },
  {
    index: '06',
    label: 'UI · Avatar · Notification',
    detail: 'Dashboard, Macmo Island, avatars, macOS notifications',
  },
];
