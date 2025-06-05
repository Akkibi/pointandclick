import { Conversation, Dialog, SceneType } from "./scene";

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
    currentSceneData: SceneType;
    currentDialog: string | null;
    lastDialog: string | null;
    currentDialogData: Dialog | null;
    currentConversation: string | null;
    currentConversationData: Conversation | null;
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
