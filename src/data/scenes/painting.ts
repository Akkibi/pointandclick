import type { SceneType } from "../../types/scene";
import { characters } from "../characters";

const painting: SceneType = {
    isStageLookingFront: true,
    doors: {
        back: {
            "#fe0000": "scene8",
        },
    },
    sound: "path/of/sound",
    conversations: [
        {
            name: "painting1",
            done: false,
            dependences: [],
            characters: [characters.painting],
            positions: {
                0: { x: 0, y: 0, pose: "default", speed: 800 },
            },
            dialog: {
                start: {
                    lines: {
                        0: ["Haaa look at this dumb schmuck!"],
                    },
                    options: [
                        { text: "Who are you??", destination: "Who are you??" },
                        { text: "Did that...thing just insult me?", destination: "Did that...thing just insult me?" },
                        { text: "Okay, rude.", destination: "Okay, rude." },
                    ],
                },
                "Who are you??": {
                    lines: {
                        0: [
                            "Whaaat? What are you mumbling about? I can barely hear you over all those pathetic little thoughts swirling around in your head.",
                        ],
                    },
                    options: [
                        { text: "I’m not thinking anything.", destination: "I’m not thinking anything." },
                        { text: "You’re kind of an asshole.", destination: "You’re kind of an asshole." },
                        { text: "Are you alive...?", destination: "Are you alive...?" },
                    ],
                },
                "Did that...thing just insult me?": {
                    lines: {
                        0: [
                            "Whaaat? What are you mumbling about? I can barely hear you over all those pathetic little thoughts swirling around in your head.",
                        ],
                    },
                    options: [
                        { text: "I’m not thinking anything.", destination: "I’m not thinking anything." },
                        { text: "You’re kind of an asshole.", destination: "You’re kind of an asshole." },
                        { text: "Are you alive...?", destination: "Are you alive...?" },
                    ],
                },
                "Okay, rude.": {
                    lines: {
                        0: [
                            "Whaaat? What are you mumbling about? I can barely hear you over all those pathetic little thoughts swirling around in your head.",
                        ],
                    },
                    options: [
                        { text: "I’m not thinking anything.", destination: "I’m not thinking anything." },
                        { text: "You’re kind of an asshole.", destination: "You’re kind of an asshole." },
                        { text: "Are you alive...?", destination: "Are you alive...?" },
                    ],
                },
                "I’m not thinking anything.": {
                    lines: {
                        0: [
                            "It’s your vibe, man! Your whole vibe feels like a soup of bad feelings, thrown together by someone who’s never tasted joy.",
                            "And now you’re here. In front of a dead-end. So ironic haha",
                        ],
                    },
                    options: [
                        { text: "What kind of weird creature are you?", destination: "What kind of weird creature are you?" },
                        { text: "Wait... are you that artist’s painting?", destination: "Wait... are you that artist’s painting?" },
                    ],
                },
                "You’re kind of an asshole.": {
                    lines: {
                        0: [
                            "It’s your vibe, man! Your whole vibe feels like a soup of bad feelings, thrown together by someone who’s never tasted joy.",
                            "And now you’re here. In front of a dead-end. So ironic haha",
                        ],
                    },
                    options: [
                        { text: "What kind of weird creature are you?", destination: "What kind of weird creature are you?" },
                        { text: "Wait... are you that artist’s painting?", destination: "Wait... are you that artist’s painting?" },
                    ],
                },
                "Are you alive...?": {
                    lines: {
                        0: [
                            "Oh please, look at you you barely seem alive yourself. Your whole vibe feels like a soup of bad feelings, thrown together by someone who’s never tasted joy.",
                            "And now you’re here. In front of a dead-end. So ironic haha",
                        ],
                    },
                    options: [
                        { text: "What kind of weird creature are you?", destination: "What kind of weird creature are you?" },
                        { text: "Wait... are you that artist’s painting?", destination: "Wait... are you that artist’s painting?" },
                    ],
                },
                "What kind of weird creature are you?": {
                    lines: {
                        0: [
                            "Weird? Says the stupid fleshy blob talking to a piece of art.",
                        ],
                    },
                    options: [
                        { text: "Wait... are you that artist’s painting?", destination: "Wait... are you that artist’s painting?" },
                    ],
                },
                "Wait... are you that artist’s painting?": {
                    lines: {
                        0: [
                            "Ding ding ding! Give the fleshy blob a prize! Yes, I’m the painting. The one she wouldn’t stop talking about. 'Drawing, you’re special!' Blah blah blah.",
                            "But so you know Maman?",
                        ],
                    },
                    options: [
                        { text: "She told me you could help me find Lutetia.", destination: "She told me you could help me find Lutetia." },
                        { text: "She said you showed her something important.", destination: "She said you showed her something important." },
                    ],
                },
                "She told me you could help me find Lutetia.": {
                    lines: {
                        0: [
                            "It’s true, I did help her. But not like a tour guide. We were already halfway there when I woke up. I didn’t draw her a map, I just... showed her.",
                        ],
                    },
                    options: [
                        { text: "So you don't know the way?", destination: "So you don't know the way?" },
                        { text: "So you forgot how to get there?", destination: "So you forgot how to get there?" },
                    ],
                },
                "She said you showed her something important.": {
                    lines: {
                        0: [
                            "It’s true, I did help her. But not like a tour guide. We were already halfway there when I woke up. I didn’t draw her a map, I just... showed her.",
                        ],
                    },
                    options: [
                        { text: "So you don't know the way?", destination: "So you don't know the way?" },
                        { text: "So you forgot how to get there?", destination: "So you forgot how to get there?" },
                    ],
                },
                "So you don't know the way?": {
                    lines: {
                        0: [
                            "There is no way, don't you understand??",
                        ],
                    },
                    options: [
                        { text: "So no one can really help me.", destination: "So no one can really help me." },
                        { text: "So I have to figure it out alone.", destination: "So I have to figure it out alone." },
                        { text: "This is going to suck", destination: "This is going to suck" },
                    ],
                },
                "So you forgot how to get there?": {
                    lines: {
                        0: [
                            "There is no way, don't you understand??",
                        ],
                    },
                    options: [
                        { text: "So no one can really help me.", destination: "So no one can really help me." },
                        { text: "So I have to figure it out alone.", destination: "So I have to figure it out alone." },
                        { text: "This is going to suck", destination: "This is going to suck" },
                    ],
                },
                "So no one can really help me.": {
                    lines: {
                        0: [
                            "Exactly. Now you’re starting to get it. It’s not a place someone gives you. It’s something you uncover by trying. And failing. And trying again.",
                            "*He stares directly at you, unusually still.*",
                            "It’s yours, if you let it be.",
                        ],
                    },
                    options: [
                        { text: "But how??", destination: "But how??" },
                        { text: "And what if I’m not enough?", destination: "And what if I’m not enough?" },
                        { text: "I don’t know where to start.", destination: "I don’t know where to start." },
                    ],
                },
                "So I have to figure it out alone.": {
                    lines: {
                        0: [
                            "Exactly. Now you’re starting to get it. It’s not a place someone gives you. It’s something you uncover by trying. And failing. And trying again.",
                            "*He stares directly at you, unusually still.*",
                            "It’s yours, if you let it be.",
                        ],
                    },
                    options: [
                        { text: "But how??", destination: "But how??" },
                        { text: "And what if I’m not enough?", destination: "And what if I’m not enough?" },
                        { text: "I don’t know where to start.", destination: "I don’t know where to start." },
                    ],
                },
                "This is going to suck": {
                    lines: {
                        0: [
                            "It doesn't have to be like that stupid. You just need to find your own path.",
                        ],
                    },
                    options: [
                        { text: "So no one can really help me.", destination: "So no one can really help me." },
                        { text: "So I have to figure it out alone.", destination: "So I have to figure it out alone." },
                    ],
                },
                "But how??": {
                    lines: {
                        0: [
                            "You just have to live! You have to try! You have to care! Make something! Leave a mark! Risk something that matters!",
                        ],
                    },
                    options: [
                        { text: "I don’t get it.", destination: "I don’t get it." },
                        { text: "I don’t know how to do that.", destination: "I don’t know how to do that." },
                        { text: "That sounds exhausting.", destination: "That sounds exhausting." },
                    ],
                },
                "And what if I’m not enough?": {
                    lines: {
                        0: [
                            "You just have to live! You have to try! You have to care! Make something! Leave a mark! Risk something that matters!",
                        ],
                    },
                    options: [
                        { text: "I don’t get it.", destination: "I don’t get it." },
                        { text: "I don’t know how to do that.", destination: "I don’t know how to do that." },
                        { text: "That sounds exhausting.", destination: "That sounds exhausting." },
                    ],
                },
                "I don’t know where to start.": {
                    lines: {
                        0: [
                            "You just have to live! You have to try! You have to care! Make something! Leave a mark! Risk something that matters!",
                        ],
                    },
                    options: [
                        { text: "I don’t get it.", destination: "I don’t get it." },
                        { text: "I don’t know how to do that.", destination: "I don’t know how to do that." },
                        { text: "That sounds exhausting.", destination: "That sounds exhausting." },
                    ],
                },
                "I don’t get it.": {
                    lines: {
                        0: [
                            "Look. Come closer. You see this wall behind me? It looks like nothing, cracked stone, dust. But to me? It’s a canvas. Endless. Waiting.",
                            "Give the world something of yourself. Anything. And watch what it gives back.",
                        ],
                    },
                    options: [
                        { text: "What does that mean?", destination: "What does that mean?" },
                        { text: "Like what? A drawing? A scream?", destination: "Like what? A drawing? A scream?" },
                        { text: "Why would it give me anything back?", destination: "Why would it give me anything back?" },
                    ],
                },
                "I don’t know how to do that.": {
                    lines: {
                        0: [
                            "Look. Come closer. You see this wall behind me? It looks like nothing, cracked stone, dust. But to me? It’s a canvas. Endless. Waiting.",
                            "Give the world something of yourself. Anything. And watch what it gives back.",
                        ],
                    },
                    options: [
                        { text: "What does that mean?", destination: "What does that mean?" },
                        { text: "Like what? A drawing? A scream?", destination: "Like what? A drawing? A scream?" },
                        { text: "Why would it give me anything back?", destination: "Why would it give me anything back?" },
                    ],
                },
                "That sounds exhausting.": {
                    lines: {
                        0: [
                            "Look. Come closer. You see this wall behind me? It looks like nothing, cracked stone, dust. But to me? It’s a canvas. Endless. Waiting.",
                            "Give the world something of yourself. Anything. And watch what it gives back.",
                        ],
                    },
                    options: [
                        { text: "What does that mean?", destination: "What does that mean?" },
                        { text: "Like what? A drawing? A scream?", destination: "Like what? A drawing? A scream?" },
                        { text: "Why would it give me anything back?", destination: "Why would it give me anything back?" },
                    ],
                },
                "What does that mean?": {
                    lines: {
                        0: [
                            "*He pulls out a paintbrush*",
                            "Here. Take this. It’s not much. But it’s a beginning.",
                        ],
                    },
                    options: [],
                },
                "Like what? A drawing? A scream?": {
                    lines: {
                        0: [
                            "*He pulls out a paintbrush*",
                            "Here. Take this. It’s not much. But it’s a beginning.",
                        ],
                    },
                    options: [],
                },
                "Why would it give me anything back?": {
                    lines: {
                        0: [
                            "Because that’s how it works. Even here. Especially here.",
                            "*He pulls out a paintbrush*",
                            "Here. Take this. It’s not much. But it’s a beginning.",
                        ],
                    },
                    options: [],
                },
            },
        },
    ],
};

export default painting;
