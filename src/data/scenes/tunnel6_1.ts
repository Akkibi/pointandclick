import type { SceneType } from "../../types/scene";

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
  sound: "path/of/sound",
};

export default tunnel6_1;