import type { SceneType } from "../../types/scene";

const tourists: SceneType = {
  isStageLookingFront: true,
  doors: {
    front: {
      "#fe0000": "scene23", // scène suivante
    },
    back: {
      "#fe0000": "scene25", // scène précédente
    },
  },
  sound: "path/of/sound",
};

export default tourists;