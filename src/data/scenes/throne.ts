import type { SceneType } from "../../types/scene";

const throne: SceneType = {
  isStageLookingFront: true,
  doors: {
    front: {
      "#fe0000": "scene17", // scene4 is tunnel1_4
        "#00ff00": "scene15", // scene6 is tunnel1_3
    },
  },
  sound: "path/of/sound",
};
export default throne;
