import type { SceneType } from "../../types/scene";
import { characters } from "../characters";
import { artistAudio } from "../audio/artistAudio";

const artist: SceneType = {
    isStageLookingFront: true,
    doors: {
        front: {
            "#fe0000": "scene28",
        },
    },
    audioProgressive: { ...artistAudio, current: "scene29" },
    conversations: [
        {
            name: "artist1",
            done: false,
            dependences: [], // Ajoute ici des dépendances si besoin
            characters: [characters.artist],
            fallback: {
                name: "artist",
                pose: "default",
                text: "Now's not the time.",
                speed: 400,
            },
            positions: {
                0: {
                    x: 2,
                    y: -2,
                    pose: "default",
                    speed: 200,
                },
                1: {
                    x: 2,
                    y: -1.5,
                    pose: "hover-transition",
                    speed: 100,
                },
            },
            enterAnimation: {
                0: ["path/to/image", "path/to/image"],
            },
            dialog: {
                start: {
                    lines: {
                        0: ["No, that’s not right... maybe another line here... or... There?"],
                    },
                    options: [
                        { text: "Uhm... Hello?", destination: "Uhm... Hello?" },
                        {
                            text: "...Is all of this yours?",
                            destination: "...Is all of this yours?",
                        },
                        {
                            text: "You’ve been staring at this for a while, haven’t you?",
                            destination: "Uhm... Hello?",
                        },
                    ],
                },
                "Uhm... Hello?": {
                    lines: {
                        0: [
                            "Oh. hey. I guess I got lost in my own world for a moment... I wasn’t expect a visitor.",
                        ],
                    },
                    options: [
                        {
                            text: "I know a thing or two about being lost",
                            destination: "I don’t think I’ve made anything in a long time.",
                        },
                        {
                            text: "...Is all of this yours?",
                            destination: "...Is all of this yours?",
                        },
                    ],
                },
                "...Is all of this yours?": {
                    lines: {
                        0: [
                            "It’s all mine, sure. Though sometimes it feels more like the walls that draw with me. Strange things come out of your hands when you're too tired to care what they mean...",
                        ],
                    },
                    options: [
                        { text: "You don't seem tired", destination: "You don't seem tired" },
                        {
                            text: "I don’t think I’ve made anything in a long time.",
                            destination: "I don’t think I’ve made anything in a long time.",
                        },
                        { text: "Why do you do it?", destination: "Why do you do it?" },
                    ],
                },
                "You don't seem tired": {
                    lines: {
                        0: [
                            "But you do. You’ve got that look... That weight behind your eyes. I had that too, once.",
                        ],
                    },
                    options: [
                        {
                            text: "How do you make it go away?",
                            destination: "It just feels heavier now.",
                        },
                        {
                            text: "I just wanted everything to stop.",
                            destination: "It just feels heavier now.",
                        },
                    ],
                },
                "I don’t think I’ve made anything in a long time.": {
                    lines: {
                        0: [
                            "You’ve got that look. That weight behind your eyes. I had that too, once.",
                        ],
                    },
                    options: [
                        {
                            text: "... How do you make it go away?",
                            destination: "It just feels heavier now.",
                        },
                        {
                            text: "I just wanted everything to stop.",
                            destination: "It just feels heavier now.",
                        },
                    ],
                },
                "Why do you do it?": {
                    lines: {
                        0: [
                            "Because it makes me feel alive. I’m never sure what I’m painting. I just keep going. Feels like if I stop, something bad might happen.",
                        ],
                    },
                    options: [
                        { text: "Looks unfinished.", destination: "Looks unfinished." },
                        { text: "Something bad?", destination: "Looks unfinished." },
                    ],
                },
                "Looks unfinished.": {
                    lines: {
                        0: [
                            "Maybe. Or maybe it’s trying to become something and I’m just in the way. Tell me something. Does it look sad to you, or happy?",
                        ],
                    },
                    options: [
                        { text: "It looks melancolic", destination: "It looks melancolic" },
                        {
                            text: "It’s quiet. Not sad, not happy. Just... still.",
                            destination: "It’s quiet. Not sad, not happy. Just... still.",
                        },
                        {
                            text: "Honestly, I don’t feel anything when I look at it.",
                            destination: "Honestly, I don’t feel anything when I look at it.",
                        },
                    ],
                },
                "It looks melancolic": {
                    lines: {
                        0: [
                            "I think it looks happy... You know, you’ve got a strange vibe. Dark purple and tan like crushed grapes... The kind that people have when they’ve come a long way without knowing why.",
                        ],
                    },
                    options: [
                        {
                            text: "I guess I have been walking around for a while now...",
                            destination: "I don't really remember what I'm looking for.",
                        },
                        {
                            text: "I just want it to stop... so I'm looking for something... A place called Lutetia",
                            destination: "I am looking for something... A place called Lutetia",
                        },
                    ],
                },
                "It’s quiet. Not sad, not happy. Just... still.": {
                    lines: {
                        0: [
                            "I think it's kind of loud actually... You know, you’ve got a strange vibe. Pale and green like icy grass. The kind that people have when they’ve come a long way without knowing why.",
                        ],
                    },
                    options: [
                        {
                            text: "I guess I have been walking around for a while now...",
                            destination: "I don't really remember what I'm looking for.",
                        },
                        {
                            text: "I don't really remember what I'm looking for.",
                            destination: "I don't really remember what I'm looking for.",
                        },
                        {
                            text: "I'm looking for something... A place called Lutetia",
                            destination: "I am looking for something... A place called Lutetia",
                        },
                    ],
                },
                "Honestly, I don’t feel anything when I look at it.": {
                    lines: {
                        0: [
                            "I feel so much... You know, you've got a strange vibe. Dark and blue like murky water. The kind that people have when they’ve come a long way without knowing why.",
                        ],
                    },
                    options: [
                        {
                            text: "I guess I have been walking around for a while now...",
                            destination: "I don't really remember what I'm looking for.",
                        },
                        {
                            text: "I don't really remember what I'm looking for.",
                            destination: "I don't really remember what I'm looking for.",
                        },
                        {
                            text: "I'm looking for something... A place called Lutetia",
                            destination: "I am looking for something... A place called Lutetia",
                        },
                    ],
                },
                "I don't really remember what I'm looking for.": {
                    lines: {
                        0: ["I think you know what you're looking for."],
                    },
                    options: [
                        {
                            text: "Lutetia?",
                            destination: "I am looking for something... A place called Lutetia",
                        },
                    ],
                },
                "I am looking for something... A place called Lutetia": {
                    lines: {
                        0: [
                            "I thought so... Yeah, I remember that name. I found it once, by accident.",
                        ],
                    },
                    options: [
                        {
                            text: "Wait... You've been there??",
                            destination: "Wait... You've been there??",
                        },
                        { text: "So it’s real?!", destination: "So it’s real?!" },
                    ],
                },
                "Wait... You've been there??": {
                    lines: {
                        0: ["Yes. Finding that place changed everything."],
                    },
                    options: [
                        { text: "What was it like?", destination: "What was it like?" },
                        { text: "Really? What happened?", destination: "What was it like?" },
                    ],
                },
                "So it’s real?!": {
                    lines: {
                        0: ["It’s real enough. Finding that place changed everything."],
                    },
                    options: [
                        { text: "What was it like?", destination: "What was it like?" },
                        { text: "Really? What happened?", destination: "What was it like?" },
                    ],
                },
                "What was it like?": {
                    lines: {
                        0: [
                            "I remember it was cold, but not in a bad way, more like the kind of cold that wakes you up. There were drawings on the wall that I don’t remember making, but I knew they were mine. Nothing moved and it was beautiful just standing there. It felt like I could finally breathe... It’s a wonderful place. It’s where I stopped being alone.",
                        ],
                    },
                    options: [
                        { text: "Someone found you?", destination: "Someone found you?" },
                        { text: "There was someone there?", destination: "Someone found you?" },
                    ],
                },
                "Someone found you?": {
                    lines: {
                        0: ["Not there. just before."],
                    },
                    options: [{ text: "What do you mean?", destination: "What do you mean?" }],
                },
                "What do you mean?": {
                    lines: {
                        0: [
                            "My painting. A figure I’d drawn a hundred times before without realizing. He stepped out of the stone like he’d been waiting for me. And then we went together.",
                        ],
                    },
                    options: [
                        {
                            text: "So your painting took you to Lutetia...",
                            destination: "So you're painting took you to Lutetia...",
                        },
                        {
                            text: "This all sounds pretty hard to believe...",
                            destination: "This all sounds pretty hard to believe...",
                        },
                    ],
                },
                "So you're painting took you to Lutetia...": {
                    lines: {
                        0: [
                            "Yeah... I don’t know if it was real. I never found it again. But I remember how it made me feel. Maybe my painting can help you. He's still out there somewhere. You need to find him.",
                        ],
                    },
                    options: [{ text: "Ok. I think I know what I have to do", destination: null }],
                },
                "This all sounds pretty hard to believe...": {
                    lines: {
                        0: [
                            "I don’t know what’s real down here. I stopped trying to define it. My painting helped me when I was lost. Maybe he’ll help you too. You should go and find him.",
                        ],
                    },
                    options: [{ text: "Ok. I think I know what I have to do", destination: null }],
                },
                "It just feels heavier now.": {
                    lines: {
                        0: [
                            "You came looking for something didn't you. Maybe you don’t know what it is yet. But before we talk, can you tell me... When you look at this picture, what do you see?",
                        ],
                    },
                    options: [
                        { text: "Something's missing.", destination: "Something's missing." },
                        {
                            text: "Nothing. It’s just paint on rocks.",
                            destination: "Something's missing.",
                        },
                        {
                            text: "Calm? Or maybe surrender. I can’t tell.",
                            destination: "Something's missing.",
                        },
                    ],
                },
                "Something's missing.": {
                    lines: {
                        0: ["That makes sense. Most people see their own silence in it."],
                    },
                    options: [
                        {
                            text: "I am looking for something... A place called Lutetia",
                            destination: null,
                        },
                    ],
                },
            },
        },
    ],
};

export default artist;
