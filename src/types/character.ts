export interface Characters {
  [key: string]: Character;
}

export interface Character {
  id: number;
  name: string;
  sounds?: Sounds;
  idle?: Idle;
  hover?: CharacterAnimation;
  onClick?: CharacterAnimation;
  onLeave?: CharacterAnimation;
  states: stateTypes;
}

export interface Sounds {
  default: string[];
  happy: string[];
  angry: string[];
  sad: string[];
}

export interface Idle {
  [key: string]: string[];
}

export interface CharacterAnimation {
  [key: string]: talkTypes;
}

export interface stateTypes {
  default: talkTypes;
  happy: talkTypes;
  angry: talkTypes;
  sad: talkTypes;
}

export interface talkTypes {
  transition?: string[];
  default?: string[];
  talking?: string[];
}
