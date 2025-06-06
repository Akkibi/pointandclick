import type { SceneType } from "../../types/scene";
import { paintingAudio } from "../audio/paintingAudio";

const tunnel6_3: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene9", // scène suivante
        },
        back: {
            "#fe0000": "scene7", // scène précédente
        },
    },
    audioProgressive: { ...paintingAudio, current: "scene8", volume: 0.3 },
};

export default tunnel6_3;
