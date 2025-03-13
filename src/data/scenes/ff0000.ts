import type { Scene } from "../../types/scene";
import { characters } from "../characters";
const sceneff0000: Scene = {
  id: 0,
  isStageLookingFront: true,
  doors: [
    {
      front: {
        map: "image",
        colors: {
          "#ff0010": "scene-name",
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
  conversations: [
    {
      name: "cataphile1",
      id: 0,
      done: false,
      dependences: ["puzzle_1"],
      characters: [characters.cataphile],
      // optional fallback
      fallback: {
        name: "cataphile",
        pose: "default",
        text: "it's not the right moment",
        speed: "400ms",
      },
      positions: [
        {
          x: 10,
          y: 10,
          pose: "default",
          speed: "400ms",
        },
      ],
      dialog: {
        start: {
          lines: [
            {
              name: "cataphile",
              line: ["Oi You!", "You Good?"],
            },
          ],
          options: [
            {
              text: "...",
              destination: "path/to/destination",
              points: {
                fool: 1,
              },
            },
            {
              text: "Who's there?",
              destination: "path/to/destination",
              points: {
                love: 1,
              },
            },
          ],
        },
        "...": {
          lines: [
            {
              name: "cataphile",
              line: [
                "Yo",
                "are you forreal?",
                "what the hell are you doing down here without a light!",
              ],
            },
          ],
          options: [
            {
              text: "Where am I?",
              destination: "Where am I?",
              points: {
                freedom: 1,
              },
            },
            {
              text: "What happened?",
              destination: "What happened?",
              points: {
                truth: 1,
              },
            },
            {
              text: "Who are you?",
              destination: "Who are you?",
              points: {
                love: 1,
              },
            },
            {
              text: "...",
              destination: "Just leave me alone",
            },
          ],
        },
        "Just leave me alone": {
          lines: [
            {
              name: "cataphile",
              line: [
                "Ah shit.",
                "A fucking debutant.",
                "Where the hell is your guide?",
              ],
            },
          ],
          options: [
            {
              text: "I don't know what you're talking about",
              destination: "Where am I?",
            },
            {
              text: "Just  leave me be",
              destination: "Just leave me be",
            },
          ],
        },
        "Where am I?": {
          lines: [
            {
              name: "cataphile",
              line: [
                "You do too many drugs or something?",
                "You're in the catacombs!",
                "You know? Like the undergrounds??",
              ],
            },
          ],
        },
      },
    },
  ],
};
export default sceneff0000;
