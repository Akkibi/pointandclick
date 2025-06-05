import type { SceneType } from "../../types/scene";

const deadend: SceneType = {
    isStageLookingFront: true,
    doors: {
        back: {
            "#fe0000": "scene20", // scène précédente
        },
    },
    sound: "path/of/sound",
};

export default deadend;
