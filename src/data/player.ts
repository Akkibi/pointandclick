import { PlayerState } from "../types/playerState";
import { scenes } from "./scenes";

export const playerState: PlayerState = {
    love: 0,
    truth: 0,
    freedom: 0,
    fool: 0,
    achievements: ["puzzle_1"],
    places: ["scene1"],
    objects: ["map"],
    currentScene: "scene1",
    lastScene: "scene1",
    currentSceneData: scenes[0],
    currentDialog: "start",
    lastDialog: "start",
    currentDialogData: null,
    currentConversation: "cataphile1",
    currentConversationData: null,
    isInteracting: false,
    isLookingFront: true,
    isMenuOpen: false,
    mouse: {
        target: {
            x: 0,
            y: 0,
        },
        current: {
            x: 0,
            y: 0,
        },
    },
};
