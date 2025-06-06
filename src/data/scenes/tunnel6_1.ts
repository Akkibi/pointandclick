import type { SceneType } from "../../types/scene";
import { paintingAudio } from "../audio/paintingAudio";

const tunnel6_1: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene7", // scène suivante
        },
        back: {
            "#fe0000": "scene5", // scène précédente
        },
    },
    audioProgressive: { ...paintingAudio, current: "scene6", volume: 0.1 },
};

export default tunnel6_1;
