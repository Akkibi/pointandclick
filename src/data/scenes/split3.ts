import type { SceneType } from "../../types/scene";
import {artistAudio } from "../audio/artistAudio";

const split3: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene26", // devant
        },
        back: {
            "#fe0000": "scene30", // derrière option 1
            "#00ff01": "scene28", // derrière option 2
        },
    },
    audioProgressive: { ...artistAudio, current: "scene27" },   
};
export default split3;
