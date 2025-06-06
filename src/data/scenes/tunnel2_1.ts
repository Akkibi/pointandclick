import type { SceneType } from "../../types/scene";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";

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
    audioProgressive: { ...stoneWorkerAudio, current: "scene10", volume: 0.1 },
};
export default tunnel2_1;
