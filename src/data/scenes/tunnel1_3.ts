import type { SceneType } from "../../types/scene";

const tunnel1_3: SceneType = {
  isStageLookingFront: true,
  doors: {
    front: {
      "#fe0000": "scene2", // scene4 is tunnel1_4
    },
    back: {
      "#fe0000": "scene1",
    },
  },
  sound: "path/of/sound",
};
export default tunnel1_3;
