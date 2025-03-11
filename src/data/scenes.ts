export const scenes = [
  {
    id: 0,
    isLocked: true,
    isDialogStageFront: true,
    doors: [
      {
        front: {
          texture: "image",
          colors: {
            "#ff0000": "scene2-name",
            "#ffff00": "scene-name",
          },
        },
        back: {
          texture: "image",
          colors: {
            "#0000ff": "other-scene",
          },
        },
      },
    ],
    textures: {
      back: {
        depth: "path/to/image",
        imageData: "data",
      },
      front: {
        depth: "path/to/image",
        imageData: "data",
      },
    },
    sound: "path/of/sound",

    conversations: [
      {
        // if not done and id is next one and buzzle not done, show characters and tell fallback => else play stage
        name: "cataphile1",
        id: 0,
        done: false,
        dependences: ["puzzle_1"],
        characters: [
          {
            class: "bob",
            name: "bob.name",
          },
          {
            class: "character2",
            name: "character2.name",
          },
          {
            class: "character3",
            name: "character3.name",
          },
        ],
        fallback: {
          name: "bob",
          pose: "happy",
          text: "it's not the right moment",
          speed: "100ms",
        },
        dialog: {
          start: {
            id: 0,
            positions: [
              {
                x: 10,
                y: 10,
                pose: "default",
                speed: "100ms",
              },
              {
                x: 20,
                y: 10,
                pose: "angry",
                speed: "200ms",
              },
              {
                x: 15,
                y: 10,
                pose: "happy",
                speed: "200ms",
              },
            ],
            sound: "path/to/sound",
            // change animation to that character talking during the time of the speech
            lines: [
              {
                name: "bob",
                line: "vous faites quoi?",
              },
              {
                name: "character2",
                line: "Je sais pas ...",
              },
            ],
            options: [
              {
                text: "l'option 1",
                // path to title in the scenes object
                destination: "path/to/destination",
                points: {
                  fool: 1,
                },
              },
              {
                text: "l'option 2",
                // path to title in the scenes object
                destination: "path/to/destination",
                points: {
                  love: 1,
                },
              },
            ],
          },
        },
      },
    ],
  },
];
