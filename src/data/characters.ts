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
    artist: {
        id: 1,
        name: "Artist",
        sounds: {
            default: ["path/to/sound", "path/to/sound"],
            happy: ["path/to/sound"],
            angry: ["path/to/sound"],
            sad: ["path/to/sound"],
        },
        idle: {
            artist1: 50,
            fallback: 50,
        },
        hover: {
            artist1: {
                transition: 13,
                default: 8,
            },
            fallback: {
                transition: 13,
                default: 8,
            },
        },
        onClick: {
            artist1: {
                transition: 50,
            },
            fallback: {
                transition: 50,
            },
        },
        onLeave: {
            artist1: {
                transition: 2,
            },
        },
        states: {
            default: {
                default: 30,
                talking: 30,
            },
            happy: {
                default: 2,
                talking: 2,
            },
            sad: {
                default: 2,
                talking: 2,
            },
            angry: {
                default: 2,
                talking: 2,
            },
        },
    },
    stoneworker: {
        id: 2,
        name: "Stoneworker",
        stopProgressiveAudio: true,
        sounds: {
            default: ["path/to/sound"],
            happy: ["path/to/sound"],
            angry: ["path/to/sound"],
            sad: ["path/to/sound"],
        },
        idle: {
            stoneworker1: 32,
        },
        hover: {
            stoneworker1: {
                transition: 6,
                default: 8,
            },
        },
        onClick: {
            stoneworker1: {
                transition: 0,
            },
        },
        onLeave: {
            stoneworker1: {
                transition: 1,
            },
        },
        states: {
            default: {
                default: 25,
                talking: 25,
            },
            happy: {
                default: 1,
                talking: 1,
            },
            sad: {
                default: 1,
                talking: 1,
            },
            angry: {
                default: 1,
                talking: 1,
            },
        },
    },
    painting: {
        id: 3,
        name: "Painting",
        sounds: {
            default: ["path/to/sound"],
            happy: ["path/to/sound"],
            angry: ["path/to/sound"],
            sad: ["path/to/sound"],
        },
        idle: {
            painting1: 12,
        },
        hover: {
            painting1: {
                transition: 2,
                default: 6,
            },
        },
        onClick: {
            painting1: {
                transition: 1,
            },
        },
        onLeave: {
            painting1: {
                transition: 1,
            },
        },
        states: {
            default: {
                default: 6,
                talking: 6,
            },
            happy: {
                default: 1,
                talking: 1,
            },
            sad: {
                default: 1,
                talking: 1,
            },
            angry: {
                default: 1,
                talking: 1,
            },
        },
    },
};
