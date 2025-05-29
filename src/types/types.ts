export type Frame = string;

export interface State<StateName extends string> {
  name: StateName;
  frames: Frame[];
}

export interface Transition<StateName extends string, Trigger extends string, Flag extends string> {
  from: StateName;
  to: StateName;
  frames: Frame[];
  options: {
    trigger: Trigger;
    reversible?: boolean;
    flagConditions?: Partial<Record<Flag, boolean>>;
  };
}
