import type { SceneType } from "../../types/scene";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";

const tunnel3_1: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene13", // scene4 is tunnel1_4
        },
        back: {
            "#fe0000": "scene16",
        },
    },
    audioProgressive: { ...stoneWorkerAudio, current: "scene12", volume: 0.3 },
};
export default tunnel3_1;
