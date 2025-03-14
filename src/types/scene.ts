export interface Scene {
  id: number;
  dependences?: string[];
  isStageLookingFront: boolean;
  doors?: Doors[];
  textures?: Textures;
  sound?: string;
  conversations?: Conversation[];
}

export interface Doors {
  front?: DoorMap;
  back?: DoorMap;
}

export interface DoorMap {
  map: string;
  colors: color;
}

export interface color {
  [key: string]: string;
}

export interface Textures {
  front?: Texture;
  back?: Texture;
}

export interface Texture {
  depth: string;
  albedo: string;
}

export interface Conversation {
  // sound is optional and it overrides the current one
  // change animation to that character talking during the time of the speech
  name: string;
  id: number;
  done: boolean;
  dependences?: string[];
  fallback?: Fallback;
  characters: any[];
  dialog?: Dialogs;
  positions: Position[];
}

export interface soundTypes {
  [key: string]: string;
}

export interface stateTypes {
  [key: string]: talkTypes;
}

export interface talkTypes {
  default: string[];
  taking: string[];
}

export interface Fallback {
  name: string;
  pose: string;
  text: string;
  speed: string;
}

export interface Dialogs {
  [key: string]: Dialog;
}

export interface Dialog {
  positions?: Position[];
  objects?: string;
  achievements?: string;
  sound?: string;
  // change animation to that character talking during the time of the speech
  lines: Lines[];
  options?: Options[];
}

export interface Lines {
  name: string;
  line: string[];
}

export interface Options {
  text: string;
  destination: string | null;
  points?: Points;
}

export interface Points {
  truth?: number;
  love?: number;
  freedom?: number;
  fool?: number;
}

export interface Position {
  x?: number;
  y?: number;
  pose?: string;
  speed?: string;
}

export interface PlayerState {
  love: number;
  truth: number;
  freedom: number;
  fool: number;
  achievements: string[];
  places: string[];
  objects: string[];
  currentScene: string;
  lastScene: string;
}

export interface ScenesType {
  [key: string]: Scene;
}
