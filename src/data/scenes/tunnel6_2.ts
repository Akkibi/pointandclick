import type { SceneType } from "../../types/scene";
import { paintingAudio } from "../audio/paintingAudio";

const tunnel6_2: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene8", // scène suivante
        },
        back: {
            "#fe0000": "scene6", // scène précédente
        },
    },
    audioProgressive: { ...paintingAudio, current: "scene7" },
};

export default tunnel6_2;
