import type { SceneType } from "../../types/scene";
import { characters } from "../characters";

const cataphile: SceneType = {
  isStageLookingFront: true,
  doors: {
    front: {
      "#fe0000": "scene18",
    },
    back: {
      "#fe0000": "scene17",
    },
  },
  sound: "path/ot/sound",
  conversations: [
    {
      name: "cataphile1",
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
            0: [
              "Oi! You! What the hell are you doing down here without a light?",
            ],
          },
          options: [
            { text: "Where am I?", destination: "Where am I?" },
            { text: "What Happened?", destination: "What Happened?" },
            { text: "Who are you?", destination: "Who are you?" },
          ],
        },
        "Where am I?": {
          lines: {
            0: [
              "You do too many drugs or something? You're undergound! You're in the catacombs!",
            ],
          },
          options: [
            { text: "That doesn't make any sense", destination: "That doesn't make any sense" },
          ],
        },
        "What Happened?": {
          lines: {
            0: [
              "That's what I want to know, How did you get so far into the tunnels without any gear?",
            ],
          },
          options: [
            { text: "Tunnels? What do you mean?", destination: "Where am I?" },
          ],
        },
        "Who are you?": {
          lines: {
            0: [
              "Hold on, that's what I want to know, who are you?",
            ],
          },
          options: [
            { text: "I... don't remember", destination: "I... don't remember" },
          ],
        },
        "I... don't remember": {
          lines: {
            0: [
              "What do you mean you don't remember, you hit your head on a rock or something?",
            ],
          },
          options: [
            { text: "Am I dead?", destination: "Am I dead?" },
          ],
        },
        "Am I dead?": {
          lines: {
            0: [
              "What? No.",
            ],
          },
          options: [
            { text: "But... I just jumped off of a building", destination: "But... I just jumped off of a building" },
          ],
        },
        "That doesn't make any sense": {
          lines: {
            0: [
              "What do you mean that doesn't make any sense? you're the one who's not making any sense.",
            ],
          },
          options: [
            { text: "Am I dead?", destination: "Am I dead?" },
          ],
        },
        "But... I just jumped off of a building": {
          lines: {
            0: [
              "Ah, I see...",
            ],
          },
          options: [
            { text: "What the hell is going on?", destination: "What the hell is going on?" },
          ],
        },
        "What the hell is going on?": {
          lines: {
            0: [
              "I think you're in-between",
            ],
          },
          options: [
            { text: "In-between? What do you mean?", destination: "In-between? What do you mean?" },
          ],
        },
        "In-between? What do you mean?": {
          lines: {
            0: [
              "This happens from time to time. This place sometimes attracts people like you.",
            ],
          },
          options: [
            { text: "It's not what I wanted to happen. I just want to disappear", destination: "It's not what I wanted to happen. I just want to disappear" },
          ],
        },
        "It's not what I wanted to happen. I just want to disappear": {
          lines: {
            0: [
              "That must not be entirely true. If you really wanted to disappear I don't think you would have ended up here.",
            ],
          },
          options: [
            { text: "This is bullshit, I can't stay here", destination: "This is bullshit, I can't stay here" },
            { text: "Something else? Like what?", destination: "Something else? Like what?" },
          ],
        },
        "This is bullshit, I can't stay here": {
          lines: {
            0: [
              "Well as I see it, for you there's probably only one way out.",
            ],
          },
          options: [
            { text: "What is it?", destination: "What is it?" },
          ],
        },
        "Something else? Like what?": {
          lines: {
            0: [
              "Not for me to know. But as I see it, there's only one way to find out.",
            ],
          },
          options: [
            { text: "What is it?", destination: "What is it?" },
          ],
        },
        "What is it?": {
          lines: {
            0: [
              "There's a special place here in the Catacombs. Me and my friends call it The Kingdom of Lutetia. If you want answers, that's where they would be.",
            ],
          },
          options: [
            { text: "Lutetia?", destination: "Lutetia?" },
          ],
        },
        "Lutetia?": {
          lines: {
            0: [
              "Yeah, it's a place that many of us have looked for but only a few have found. But it definitely exists, I'm sure of it.",
            
            ],
          },
          options: [
            { text: "How can you be certain?", destination: "How can you be certain?" },
          ],
        },
        "How can you be certain?": {
          lines: {
            0: [
              "One of my friends found it and he came back different. When he told us about it, it was clear that he saw something. something that changes people forever. Or maybe it was someone. someone who might be able to help you.",
              
            ],
          },
          options: [
            { text: "Do you really think it will help me?", destination: "Do you really think it will help me?" },
            { text: "How do I get there?", destination: "How do I get there?" },
          ],
        },
        "Do you really think it will help me?": {
          lines: {
            0: [
              "I'm not sure but if you are here it's probably because you need to find it.",
            ],
          },
          options: [
            { text: "What do you mean?", destination: "What do you mean?" },
          ],
        },
        "How do I get there?": {
          lines: {
            0: [
              "I'm not sure. I've never found it myself. But I'm sure if you meet other people down here they will be able to tell you more.",
            ],
          },
          options: [
            { text: "Sounds promising...", destination: "Sounds promising..." },
          ],
        },
        "What do you mean?": {
          lines: {
            0: [
              "I'm not the best at explaining things but if you meet any other people down here I'm sure they can tell you more.",
            ],
          },
          options: [
            { text: "Sounds promising...", destination: "Sounds promising..." },
          ],
        },
        "Sounds promising...": {
          lines: {
            0: [
              "I know this is all probably pretty shocking but give it some time. You might find that you want to stay here longer than you think. this place is full of mystery and wonder. For me it's a place where you can be free.",
            ],
          },
          options: [
            { text: "I don't really have a choice do I?", destination: "I don't really have a choice do I?" },
            { text: "I hope I will see what you mean", destination: "I hope I will see what you mean" },
            { text: "I don't know. I think I'll just find my own way", destination: "I don't know. I think I'll just find my own way" },
          ],
        },
        "I don't really have a choice do I?": {
          lines: {
            0: [
              "No I guess not.",
              "Here, before I go, take this. I hope it helps you find your way.",
            ],
          },
          options: [
            { text: "Thanks", destination: "Thanks" },
          ],
        },
        "I hope I will see what you mean": {
          lines: {
            0: [
              "I'm sure you will.",
              "Here before I go, take this. It will help you find your way.",
            ],
          },
          options: [
            { text: "Thanks", destination: "Thanks" },
          ],
        },
        "I don't know. I think I'll just find my own way": {
          lines: {
            0: [
              "Suit yourself.",
              "Here, before I go, take this. I hope it helps you find your way.",
            ],
          },
          options: [
            { text: "Thanks", destination: "Thanks" },
          ],
        },
        "Thanks": {
          lines: {
            0: [
              "No problem. If we bump into each other again, don't hesitate to say hi.",
              "Good luck!",
            ],
          },
          options: [],
        },
      },
    },
    {
      name: "cataphile2",
      done: false,
      dependences: [],
      characters: [characters.cataphile],
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
      },
      enterAnimation: {
        0: ["path/to/image", "path/to/image"],
      },
      dialog: {
        start: {
          lines: {
            0: ["test2","Oi You!", "You Good?"],
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
              text: "Leave -->",
              destination: null,
            },
          ],
        },
      },
    }
  ],
};
export default cataphile;
