import type { SceneType } from "../../types/scene";

const split1: SceneType = {
  isStageLookingFront: true,
  doors: {
    front: {
      "#fe0000": "scene3", 
      "#00ff01": "scene10", 
    },
    back: {
      "#fe0000": "scene18",
    },
  },
  sound: "path/of/sound",
};
export default split1;
