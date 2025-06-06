export interface Characters {
    [key: string]: CharacterType;
}

export interface CharacterType {
    id: number;
    name: string;
    sounds?: Sounds;
    idle: Idle;
    hover: CharacterAnimation;
    onClick: CharacterAnimation;
    onLeave: CharacterAnimation;
    states: stateTypes;
    stopProgressiveAudio?: boolean; // <-- ajoute cette ligne ici
}

export interface Sounds {
    default: string[];
    happy: string[];
    angry: string[];
    sad: string[];
}

export interface Idle {
    [key: string]: number;
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
    transition?: number;
    default?: number;
    talking?: number;
}
