import type { Scene } from "../../types/scene";

const sceneff0001: Scene = {
  id: 0,
  isStageLookingFront: true,
  doors: [
    {
      back: {
        map: "image",
        colors: {
          "#ff0010": "other-scene",
        },
      },
    },
  ],
  textures: {
    back: {
      depth: "path/to/image",
      albedo: "path/to/image",
    },
    front: {
      depth: "path/to/image",
      albedo: "data",
    },
  },
  sound: "path/of/sound",
};
export default sceneff0001;
