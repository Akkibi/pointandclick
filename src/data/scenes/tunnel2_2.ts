import type { SceneType } from "../../types/scene";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";

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
    audioProgressive: { ...stoneWorkerAudio, current: "scene11", volume: 0.2 },
};
export default tunnel2_2;
