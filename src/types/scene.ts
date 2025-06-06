import { CharacterType } from "./character";

export type SceneAudio = {
    src: string;
    volume?: number;
    stopAfter?: number;
    stopOnCharacterClick?: boolean;
};

export interface SceneType {
    dependences?: string[];
    isStageLookingFront: boolean;
    doors?: Doors;
    sound?: string;
    conversations?: Conversation[];
    audio?: SceneAudio;

    // Ajoute ceci :
    audioProgressive?: {
        src: string;
        minVolume: number;
        maxVolume: number;
        scenes: string[];
        last: string;
        current?: string;
        volume?: number; // <-- ajoute cette ligne
    };
}

export interface Doors {
    front?: DoorMap;
    back?: DoorMap;
}

export interface DoorMap {
    [key: string]: string;
}

export interface color {
    [key: string]: string;
}

export interface Conversation {
    // sound is optional and it overrides the current one
    // change animation to that character talking during the time of the speech
    name: string;
    done: boolean;
    dependences?: string[];
    fallback?: Fallback;
    characters: CharacterType[];
    dialog?: Dialogs;
    positions: CharacterPositions;
    idleAnimation?: IdleAnimation;
    hoverAnimation?: HoverAnimation;
    enterAnimation?: EnterAnimation;
    exitAnimation?: ExitAnimation;
}

export interface IdleAnimation {
    [key: string]: string[];
}

export interface HoverAnimation {
    [key: string]: string[];
}

export interface EnterAnimation {
    [key: string]: string[];
}

export interface ExitAnimation {
    [key: string]: string;
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
    speed: number;
}

export interface Dialogs {
    [key: string]: Dialog;
}

export interface Dialog {
    positions?: CharacterPositions;
    objects?: string;
    achievements?: string;
    sound?: string;
    // change animation to that character talking during the time of the speech
    lines: Lines;
    options?: Options[];
}

export interface Lines {
    [key: number]: string[];
}

export interface Options {
    text: string;
    destination: string | null;
    points?: Points;
    customFunction?: () => void;
}

export interface Points {
    truth?: number;
    love?: number;
    freedom?: number;
    fool?: number;
}

export interface CharacterPositions {
    [key: number]: PositionType;
}

export interface PositionType {
    x?: number;
    y?: number;
    z?: number;
    scale?: number;
    transition?: boolean;
    orientation?: "front" | "back";
    pose?: string;
    speed?: number;
}

export interface ScenesType {
    [key: string]: SceneType;
}
