import type { SceneType } from "../../types/scene";

const tunnel2_2: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene12", // scene4 is tunnel1_4
        },
        back: {
            "#fe0000": "scene10",
        },
    },
    audio: {
        src: "audio/stone_worker_sfx.mp3",
        volume: 0.2,
        stopAfter: 12000, // en ms, optionnel
        stopOnCharacterClick: true, // optionnel
    },
};
export default tunnel2_2;
