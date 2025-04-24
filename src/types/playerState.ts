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
    currentDialog: string | null;
    lastDialog: string | null;
    isInteracting: boolean;
    isLookingFront: boolean;
    isMenuOpen: boolean;
    mouse: {
        target: {
            x: number;
            y: number;
        };
        current: {
            x: number;
            y: number;
        };
    };
}
