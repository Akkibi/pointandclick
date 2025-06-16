import type { SceneType } from "../../types/scene";
import { characters } from "../characters";
import { stoneWorkerAudio } from "../audio/stoneWorkerAudio";

const stoneworker: SceneType = {
    isStageLookingFront: true,
    doors: {
        back: {
            "#fe0000": "scene14",
            "#00ff01": "scene12",
        },
    },
    audioProgressive: { ...stoneWorkerAudio, current: "scene13", volume: 0.5 },
    conversations: [
        {
            name: "stoneworker1",
            done: false,
            dependences: [],
            characters: [characters.stoneworker],
            fallback: {
                name: "stoneworker",
                position: {},
                text: "The stoneworker is busy.",
            },
            positions: {
                0: {
                    x: -1,
                    y: -1.5,
                    z: 8,
                    speed: 100,
                },
            },
            enterAnimation: {
                0: ["path/to/image1", "path/to/image2"],
            },
            dialog: {
                start: {
                    lines: {
                        0: ["Ahh! Joe! You're back! Just in time, I'm almost out of snacks."],
                    },
                    options: [
                        { text: "What?!", destination: "What?!" },
                        { text: "Uh...", destination: "What?!" },
                        { text: "Yes, it is me... Joe.", destination: "What?!" },
                    ],
                },
                "What?!": {
                    lines: {
                        0: [
                            "Oh hold on. you're not Joe. I'm sorry, my eyes don't work like they used to. Too much time in the dark I suppose! haha.",
                        ],
                    },
                    options: [
                        {
                            text: "Yeah... you don't look so good.",
                            destination: "Yeah... you don't look so good.",
                        },
                        { text: "Great. A crazy old man.", destination: "Great. A crazy old man." },
                        { text: "Who's Joe?", destination: "Who's Joe?" },
                    ],
                },
                "Yeah... you don't look so good.": {
                    lines: {
                        0: [
                            "Oh, don't worry about me! I'm as healthy as a spring onion! It's you who I'd be worried about. You look aweful!",
                        ],
                    },
                    options: [
                        { text: "It's been a rough day", destination: "It's been a rough day" },
                        { text: "You don't know me!", destination: "Great. A crazy old man." },
                    ],
                },
                "Great. A crazy old man.": {
                    lines: {
                        0: [
                            "Ok, well someone seems a bit cranky... Why don't I put on some soup and you can tell me what's wrong.",
                        ],
                    },
                    options: [
                        {
                            text: "I don't have time for soup. I have to get out of here!",
                            destination: "I don't have time for soup. I have to get out of here!",
                        },
                    ],
                },
                "Who's Joe?": {
                    lines: {
                        0: [
                            "Ah, He's a wonderful fellow. He brings me food. And everything else I need to live down here.",
                        ],
                    },
                    options: [
                        {
                            text: "Wait a second, you live down here?",
                            destination: "Wait a second, you live down here?",
                        },
                    ],
                },
                "It's been a rough day": {
                    lines: {
                        0: [
                            "That's alright. Why don't I put on some soup and you can tell me what's wrong.",
                        ],
                    },
                    options: [
                        {
                            text: "I don't have time for soup. I have to get out of here!",
                            destination: "I don't have time for soup. I have to get out of here!",
                        },
                    ],
                },
                "Wait a second, you live down here?": {
                    lines: {
                        0: ["Well. Yes! Pretty sweet deal wouldn't you say?"],
                    },
                    options: [
                        { text: "You're insane", destination: "Great. A crazy old man." },
                        {
                            text: "How long have you been down here??",
                            destination: "Wait. What do you mean a long time.",
                        },
                    ],
                },
                "I don't have time for soup. I have to get out of here!": {
                    lines: {
                        0: [
                            "And where are you rushing off to? This place is quite amazing you know, and there's no need to be in a hurry. Believe me, I've been down here a long time.",
                        ],
                    },
                    options: [
                        {
                            text: "Wait. What do you mean a long time.",
                            destination: "Wait. What do you mean a long time.",
                        },
                    ],
                },
                "Wait. What do you mean a long time.": {
                    lines: {
                        0: [
                            "Hmm. That's a good question. I'm not quite sure anymore. but the last time I talked with Joe I think he said... around 25 years?",
                        ],
                    },
                    options: [
                        { text: "25 Years???", destination: "25 Years???" },
                        { text: "That's just wrong", destination: "25 Years???" },
                        { text: "How is that possible???", destination: "25 Years???" },
                    ],
                },
                "25 Years???": {
                    lines: {
                        0: [
                            "Yes, well... It happened gradually, you see. I found this place by accident and I was absolutely trasnfixed. I couldn't stay away. It was all beautifully romantic at the beginning... Sooner or later I realized that I was down here more than I was up there. So I just decided, why not stay!",
                        ],
                    },
                    options: [
                        {
                            text: "Don't you miss the light? The people? Real life?",
                            destination: "Don't you miss the light? The people? Real life?",
                        },
                        { text: "It was... Romantic?", destination: "It was... Romantic?" },
                        { text: "You really are crazy", destination: "You really are crazy" },
                    ],
                },
                "Don't you miss the light? The people? Real life?": {
                    lines: {
                        0: [
                            "I always found it harder to be with people than to be by myself. And when I stumbled across the catacombs it was like a new world opened up to me. The stones down here have talked to me more than anyone I've ever known up above.",
                        ],
                    },
                    options: [
                        { text: "That's incredibly sad", destination: "That's incredibly sad" },
                        {
                            text: "I guess in a way I see what you mean",
                            destination: "I guess in a way I see what you mean",
                        },
                    ],
                },
                "It was... Romantic?": {
                    lines: {
                        0: [
                            "Yes. Enthralling. I always found it harder to be with people than to be by myself. but when I stumbled across the catacombs it was like I found a part of me that had always been missing. The stones down here have taught me more than anyone I've ever known up above.",
                        ],
                    },
                    options: [
                        { text: "That's incredibly sad", destination: "That's incredibly sad" },
                        {
                            text: "I guess in a way I see what you mean",
                            destination: "I guess in a way I see what you mean",
                        },
                    ],
                },
                "You really are crazy": {
                    lines: {
                        0: [
                            "That's what people used to call me... You see, I always found it harder to be with people than to be by myself. But when I stumbled across the catacombs it was like a new world opened up to me. A world where I could be free from all the expectations. A world where I could build my own way of life.",
                        ],
                    },
                    options: [
                        { text: "That's incredibly sad", destination: "That's incredibly sad" },
                        {
                            text: "I guess in a way I see what you mean",
                            destination: "I guess in a way I see what you mean",
                        },
                    ],
                },
                "That's incredibly sad": {
                    lines: {
                        0: [
                            "Nothing is lonelier than trying to fit into a world that doesn't understand you. But this place, it gave me a chance to be myself. This is how I found my way. You have no idea how lonely I was before. And how happy I became when I decided to let go of trying to fit in.",
                        ],
                    },
                    options: [
                        {
                            text: "Do you really feel less lonely here?",
                            destination: "Do you really feel less lonely here?",
                        },
                    ],
                },
                "I guess in a way I see what you mean": {
                    lines: {
                        0: [
                            "Nothing is lonelier than trying to fit into a world that doesn't understand you. Trying to bend towards the convinience of others, that's something I couldn't do. You have no idea how lonely I was before. And how happy I became when I decided to let go of trying to fit in.",
                        ],
                    },
                    options: [
                        {
                            text: "Do you really feel less lonely here?",
                            destination: "Do you really feel less lonely here?",
                        },
                    ],
                },
                "Do you really feel less lonely here?": {
                    lines: {
                        0: [
                            "Yes, of course! I know it might be hard to understand, but I really love it here. And I've found myself in good company. These rocks? These are my real friends. If you listen closely, they can tell you all kinds of secrets. They always have something interesting to say.",
                        ],
                    },
                    options: [
                        {
                            text: "Like what? What do they say?",
                            destination: "Like what? What do they say?",
                        },
                        {
                            text: "The stones... Speak to you?",
                            destination: "The stones... Speak to you?",
                        },
                        { text: "I don't get it...", destination: "I don't get it..." },
                    ],
                },
                "Like what? What do they say?": {
                    lines: {
                        0: [
                            "So many wonderful things... You see, this limestone? you walk on millions of years of history. Did you know this rock was once the floor of an ancient sea?",
                        ],
                    },
                    options: [{ text: "A sea?", destination: "A sea?" }],
                },
                "The stones... Speak to you?": {
                    lines: {
                        0: [
                            "Yes! They can tell you so many wonderful things... You see this limestone? you walk on millions of years of history. Did you know this rock was once the floor of an ancient sea?",
                        ],
                    },
                    options: [{ text: "A sea?", destination: "A sea?" }],
                },
                "I don't get it...": {
                    lines: {
                        0: [
                            "Here, let me show you... You see this limestone? you walk on millions of years of history. Did you know this rock was once the floor of an ancient sea?",
                        ],
                    },
                    options: [{ text: "A sea?", destination: "A sea?" }],
                },
                "A sea?": {
                    lines: {
                        0: [
                            "Yes. Around 45 million years ago this entire region was submerged under water. Over time, shells, corals, tiny marine organisms settled at the bottom. Layer upon layer, until they became the limestone you see all around you.",
                        ],
                    },
                    options: [{ text: "Ok... So?", destination: "Ok... So?" }],
                },
                "Ok... So?": {
                    lines: {
                        0: [
                            "Have you seen the writing on the walls around here? There is a mason's signature back there that is over two hundred years old. He shaped these tunnels with his own hands. And in doing so he left a part of himself here.",
                        ],
                    },
                    options: [
                        {
                            text: "What are you getting at?",
                            destination: "What are you getting at?",
                        },
                    ],
                },
                "What are you getting at?": {
                    lines: {
                        0: [
                            "That if you learn how to listen, these tunnels tell of an endless story. Within each stone there is drama, there is mystery. Triumph, and failure, knowledge, and truth. A traceable chain of causes and effects leading back farther and farther until...",
                        ],
                    },
                    options: [{ text: "Until what?", destination: "Until what?" }],
                },
                "Until what?": {
                    lines: {
                        0: [
                            "Until it stops. It seems that no matter how much we explain there will always be more questions. Don't you see? In the end it is up to you to make your own sense of this world.",
                        ],
                    },
                    options: [
                        {
                            text: "Yes... I think I understand",
                            destination: "Yes... I think I understand",
                        },
                        { text: "They're just rocks...", destination: "They're just rocks..." },
                    ],
                },
                "Yes... I think I understand": {
                    lines: {
                        0: [
                            "I'm very happy to hear that, The world could learn a lot from taking more time to listen to these stones. most people walk around on top of them without even trying to hear what they have to say. Did you know that Paris itself wouldn't exist without them?",
                        ],
                    },
                    options: [{ text: "What do you mean?", destination: "What do you mean?" }],
                },
                "They're just rocks...": {
                    lines: {
                        0: [
                            "I understand... Not very many young people these days know how to listen. They come down here and cover the stones with their paint without even trying to hear what they have to say first. They don't know that they owe everything to these tunnels.",
                        ],
                    },
                    options: [{ text: "What do you mean?", destination: "What do you mean?" }],
                },
                "What do you mean?": {
                    lines: {
                        0: [
                            "From the beginning, this land was settled by the Romans to extract it's building materials. With the gypsem, clay and limestone they harvested, they created all kinds of monumental structures. Including the ancient city of Lutetia.",
                        ],
                    },
                    options: [
                        { text: "Did you say... Lutetia?", destination: "Did you say... Lutetia?" },
                    ],
                },
                "Did you say... Lutetia?": {
                    lines: {
                        0: ["Yes! The old Roman name for Paris. Why do you ask?"],
                    },
                    options: [
                        {
                            text: "That's where I have to go! Do you know how to get there?",
                            destination: "That's where I have to go! Do you know how to get there?",
                        },
                    ],
                },
                "That's where I have to go! Do you know how to get there?": {
                    lines: {
                        0: [
                            "Hmm... I'm not sure I understand. Lutetia is all around us. It is the scaffolding onwhich the modern city of Paris was built.",
                        ],
                    },
                    options: [
                        {
                            text: "But... It's supposed to be my way out",
                            destination: "But... It's supposed to be my way out",
                        },
                    ],
                },
                "But... It's supposed to be my way out": {
                    lines: {
                        0: [
                            "I'm afraid I can't tell you more than I know. perhaps whoever told you that was pulling your leg?",
                        ],
                    },
                    options: [
                        { text: "No. That can't be true", destination: "No. That can't be true" },
                        {
                            text: "Am I really stuck here forever?",
                            destination: "No. That can't be true",
                        },
                    ],
                },
                "No. That can't be true": {
                    lines: {
                        0: [
                            "It might be the nickname one of the rooms around here. Cataphiles love giving things strange names.",
                        ],
                    },
                    options: [
                        {
                            text: "I guess it was more of a nickname...",
                            destination: "I guess I'll keep looking then",
                        },
                        {
                            text: "No that doesn't sound right...",
                            destination: "I guess I'll keep looking then",
                        },
                    ],
                },
                "I guess I'll keep looking then": {
                    lines: {
                        0: [
                            "In any case you are welcome to stay here as long as you like. Like I said, there is no need to rush back to the surface. Judging from the last few visitors, it must be quite scary up there these days.",
                        ],
                    },
                    options: [
                        { text: "It's not all bad", destination: "It's not all bad" },
                        {
                            text: "There are still some beautiful things that I want to see up there",
                            destination: "It's not all bad",
                        },
                        {
                            text: "Yeah... I'll take my time",
                            destination: "Yeah... I'll take my time",
                        },
                    ],
                },
                "It's not all bad": {
                    lines: {
                        0: [
                            "I'm glad you think so. It seems like you have sorted a few things out. It's nice to meet a young person like you. I'm sure you'll find what you're looking for.",
                        ],
                    },
                    options: [{ text: "Thanks. It was nice to meet you too", destination: null }],
                },
                "Yeah... I'll take my time": {
                    lines: {
                        0: [
                            "That's the spirit. slow and steady. If you keep your ears open, the stones surely will guide you to where you need to go. It's been nice to meet a young person like you. I quite enjoyed our conversation.",
                        ],
                    },
                    options: [{ text: "Thanks. It was nice to meet you too", destination: null }],
                },
            },
        },
        {
            name: "end",
            done: false,
            dependences: ["no-access"], // impossible to get dependence
            characters: [characters.artist],
            fallback: {
                name: "Cataphile",
                text: "I am tired, please let me rest.",
                position: {
                    x: -1,
                    y: -1.5,
                    z: 8,
                    speed: 100,
                    orientation: "front",
                },
            },
            positions: {},
        },
    ],
};

export default stoneworker;
