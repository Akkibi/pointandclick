import { Characters } from "../types/character";

export const characters: Characters = {
    painter: {
        id: 0,
        name: "Painter",
        sounds: {
            default: ["path/to/sound", "path/to/sound", "path/to/sound"],
            happy: ["path/to/sound", "path/to/sound", "path/to/sound"],
            angry: ["path/to/sound", "path/to/sound", "path/to/sound"],
            sad: ["path/to/sound", "path/to/sound", "path/to/sound"],
        },
        idle: {
            cataphile1: 32,
        },
        hover: {
            cataphile1: {
                transition: 14,
                default: 8,
            },
        },
        onClick: {
            cataphile1: {
                transition: 3,
            },
        },
        onLeave: {
            cataphile1: {
                transition: 3,
            },
        },
        states: {
            default: {
                default: 25,
                talking: 3,
            },
            happy: {
                default: 3,
                talking: 3,
            },
            angry: {
                default: 3,
                talking: 3,
            },
            sad: {
                default: 3,
                talking: 3,
            },
        },
    },
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
            cataphile1: 3,
        },
        hover: {
            cataphile1: {
                transition: 2,
                default: 3,
            },
        },
        onClick: {
            cataphile1: {
                transition: 3,
            },
        },
        onLeave: {
            cataphile1: {
                transition: 3,
            },
        },
        states: {
            default: {
                default: 3,
                talking: 3,
            },
            happy: {
                default: 3,
                talking: 3,
            },
            angry: {
                default: 3,
                talking: 3,
            },
            sad: {
                default: 3,
                talking: 3,
            },
        },
    },
};
