import type { SceneType } from "../../types/scene";

const tunnel5_1: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene20", // scène suivante
        },
        back: {
            "#fe0000": "scene5", // scène précédente
        },
    },
    sound: "path/of/sound",
};

export default tunnel5_1;
