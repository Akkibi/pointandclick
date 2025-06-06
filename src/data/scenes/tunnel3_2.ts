import type { SceneType } from "../../types/scene";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";

const tunnel3_2: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene14", // scene4 is tunnel1_4
        },
        back: {
            "#fe0000": "scene16",
        },
    },
    audioProgressive: { ...stoneWorkerAudio, current: "scene12", volume: 0.1 },
};
export default tunnel3_2;
