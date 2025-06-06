import type { SceneType } from "../../types/scene";

const tunnel2_1: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene11",
        },
        back: {
            "#fe0000": "scene2",
        },
    },
    audio: {
        src: "audio/stone_worker_sfx.mp3",
        volume: 0.1,
        stopAfter: 12000, // en ms, optionnel
        stopOnCharacterClick: true, // optionnel
    },
};
export default tunnel2_1;
