import type { SceneType } from "../../types/scene";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";   

const split1: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene3",
            "#00ff01": "scene10",
        },
        back: {
            "#fe0000": "scene18",
        },
    },
    audioProgressive: { ...stoneWorkerAudio, current: "scene12", volume: 0.1 },

};
export default split1;
