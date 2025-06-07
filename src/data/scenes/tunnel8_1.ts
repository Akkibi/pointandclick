import type { SceneType } from "../../types/scene";
import { artistAudio } from "../audio/artistAudio";

const tunnel8_1: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene27", // scène suivante
        },
        back: {
            "#fe0000": "artist", // scène précédente
        },
    },
    audioProgressive: { ...artistAudio, current: "scene28", volume: 0.35 },
};

export default tunnel8_1;
