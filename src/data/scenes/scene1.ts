import type { SceneType } from "../../types/scene";
import { characters } from "../characters";
const scene1: SceneType = {
  isStageLookingFront: true,
  doors: {
    front: {
      "#ee0000": "scene2",
    },
  },
  sound: "path/ot/sound",
  conversations: [
    {
      name: "cataphile1",
      done: false,
      dependences: ["puzzle_1"],
      characters: [characters.cataphile, characters.painter],
      // optional fallback
      fallback: {
        name: "cataphile",
        pose: "default",
        text: "it's not the right moment",
        speed: "400ms",
      },
      positions: {
        0: {
          x: -2,
          y: -1.5,
          pose: "default",
          speed: "400ms",
        },
        1: {
          x: 2,
          y: -1.5,
          pose: "default",
          speed: "400ms",
        },
      },
      enterAnimation: {
        0: ["path/to/image", "path/to/image"],
      },
      dialog: {
        start: {
          lines: {
            1: ["i'm testing", "with multiple lines", "to see if it works"],
            0: ["Oi You!", "You Good?"],
          },
          options: [
            {
              text: "...",
              destination: "...",
              points: {
                fool: 1,
              },
            },
            {
              text: "Who's there?",
              destination: "...",
              points: {
                love: 1,
              },
            },
          ],
        },
        "...": {
          lines: {
            0: [
              "Yo",
              "are you forreal?",
              "what the hell are you doing down here without a light!",
            ],
          },

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
              destination: null,
              points: {
                truth: 1,
              },
            },
            {
              text: "Who are you?",
              destination: null,
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
          lines: {
            0: [
              "Ah shit.",
              "A fucking debutant.",
              "Where the hell is your guide?",
            ],
          },
          options: [
            {
              text: "I don't know what you're talking about",
              destination: "Where am I?",
            },
            {
              text: "Just  leave me be",
              destination: null,
            },
          ],
        },
        "Where am I?": {
          lines: {
            0: [
              "You do too many drugs or something?",
              "You're in the catacombs!",
              "You know? Like the undergrounds??",
            ],
          },

          options: [
            {
              text: "Leave You do too many drugs or something?",
              destination: null,
            },
          ],
        },
      },
    },
  ],
};
export default scene1;
