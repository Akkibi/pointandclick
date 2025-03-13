import type { Scene } from "../../types/scene";

const sceneff0001: Scene = {
  id: 0,
  isStageLookingFront: true,
  doors: [
    {
      front: {
        map: "image",
        colors: {
          "#ff00020": "scene2-name",
        },
      },
      back: {
        map: "image",
        colors: {
          "#ff0000": "other-scene",
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
