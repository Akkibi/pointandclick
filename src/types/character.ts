export interface Character {
    id: number;
    name: string;
    pose: string;
    text: string;
    speed: string;
    sounds?: Sounds;
    idle: CharacterAnimation;
    hover: CharacterAnimation;
    enter: CharacterAnimation;
    onClick: CharacterAnimation;
    onLeave: CharacterAnimation;
    states: stateTypes;
}

export interface Sounds {
    default: string[];
    happy: string[];
    angry: string[];
    sad: string[];
}

export interface CharacterAnimation {
    [key: number]: string[];
}

export interface stateTypes {
    default: talkTypes;
    happy: talkTypes;
    angry: talkTypes;
    sad: talkTypes;
}

export interface talkTypes {
    default: string[];
    taking: string[];
}
