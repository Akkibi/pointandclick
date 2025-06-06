import type { SceneType } from "../../types/scene";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";

const tunnel2_3: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene13",
        },
        back: {
            "#fe0000": "scene11",
        },
    },
    audioProgressive: { ...stoneWorkerAudio, current: "scene12" },
};

export default tunnel2_3;
