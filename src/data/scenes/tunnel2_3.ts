import type { SceneType } from "../../types/scene";

const tunnel2_3: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene13", // scene4 is tunnel1_4
        },
        back: {
            "#fe0000": "scene11",
        },
    },
    audio: {
        src: "audio/stone_worker_sfx.mp3",
        volume: 0.4,
        stopAfter: 12000, // en ms, optionnel
        stopOnCharacterClick: true, // optionnel
    },
};
export default tunnel2_3;
