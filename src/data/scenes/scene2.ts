import type { SceneType } from "../../types/scene";

const scene2: SceneType = {
  id: 0,
  isStageLookingFront: true,
  doors: {
    front: {
      "#ff0010": "scene3",
    },
    back: {
      "#ff0010": "scene1",
    },
  },
  sound: "path/of/sound",
};
export default scene2;
