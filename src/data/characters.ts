import { Characters } from "../types/character";

export const characters: Characters = {
  cataphile: {
    id: 0,
    name: "Cataphile",
    sounds: {
      default: ["path/to/sound", "path/to/sound", "path/to/sound"],
      happy: ["path/to/sound", "path/to/sound", "path/to/sound"],
      angry: ["path/to/sound", "path/to/sound", "path/to/sound"],
      sad: ["path/to/sound", "path/to/sound", "path/to/sound"],
    },
    idle: {
      cataphile1: [
        "path/to/image",
        "path/to/image",
        "path/to/image",
        "path/to/image",
        "path/to/image",
      ],
    },
    hover: {
      cataphile1: {
        transition: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
    },
    onClick: {
      cataphile1: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
    },
    onLeave: {
      cataphile1: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
    },
    states: {
      default: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
      happy: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
      angry: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
      sad: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
    },
  },
  painter: {
    id: 1,
    name: "Painter",
    sounds: {
      default: ["path/to/sound", "path/to/sound", "path/to/sound"],
      happy: ["path/to/sound", "path/to/sound", "path/to/sound"],
      angry: ["path/to/sound", "path/to/sound", "path/to/sound"],
      sad: ["path/to/sound", "path/to/sound", "path/to/sound"],
    },
    states: {
      default: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
      happy: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
      angry: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
      sad: {
        default: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
        talking: [
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
          "path/to/image",
        ],
      },
    },
  },
};
