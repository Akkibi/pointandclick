import * as THREE from "three";
import { interfaceContent } from "../data/interface";
import { CharacterType } from "../types/character";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import { cameraInstance } from "./camera";
import Animation from "./animation";
import { preloadImagesWithPromise } from "./utils/ImagePreloader";
import { PositionType } from "../types/scene";
import Scene from "./scene";

// external functions or files if needed

type stateType =
    | "idle"
    | "hovered"
    | "default"
    | "talking"
    | "happy"
    | "angry"
    | "sad"
    | "default-talking"
    | "happy-talking"
    | "angry-talking"
    | "sad-talking"
    | "end";

interface AnimationDataType {
    idle?: string[];
    hoverTransition?: string[];
    hover?: string[];
    clickTransition?: string[];
    default?: string[];
    defaultTalking?: string[];
    happy?: string[];
    happyTalking?: string[];
    angry?: string[];
    angryTalking?: string[];
    sad?: string[];
    sadTalking?: string[];
    endTransition?: string[];
}

class Character {
    private defaultPosition: THREE.Vector3;
    private position: THREE.Vector3;
    public name: string;
    public instance: THREE.Mesh;
    private index: number;
    private state: stateType;
    private animation: Animation;
    private animationData: AnimationDataType = {};
    private orientation: "front" | "back";
    private characterData: CharacterType;
    constructor(characterData: CharacterType, index: number) {
        this.characterData = characterData;
        this.index = index;
        this.state = "idle";
        this.name = characterData.name;
        console.log(this.name);
        // character1
        const material = new THREE.MeshBasicMaterial({ map: null, transparent: true });
        this.instance = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), material);
        this.animation = new Animation(material, this.instance.scale);
        this.defaultPosition = new THREE.Vector3(0, 0, -interfaceContent.sceneDeepness / 2);
        this.position = new THREE.Vector3().copy(this.defaultPosition);
        this.generateAnimationData(characterData);
        this.orientation = "front";

        this.instance.name = "character";
        this.instance.userData = { name: this.name };

        eventEmitterInstance.on("update", this.turnTowardsCam.bind(this));
        eventEmitterInstance.on("hover-character", this.hover.bind(this));
        eventEmitterInstance.on("end-hover-character", this.endHover.bind(this));
        eventEmitterInstance.on("end-character-interaction", this.endInteraction.bind(this));
        eventEmitterInstance.on("character-start-talking", this.startTalking.bind(this));
        eventEmitterInstance.on("character-end-talking", this.endTalking.bind(this));
        eventEmitterInstance.on("click-character", this.click.bind(this));
        eventEmitterInstance.on("set-character-default", this.default.bind(this));
        eventEmitterInstance.on("set-character-happy", this.happy.bind(this));
        eventEmitterInstance.on("set-character-angry", this.angry.bind(this));
        eventEmitterInstance.on("set-character-sad", this.sad.bind(this));
        eventEmitterInstance.on(
            `set-character-${this.index}-position`,
            this.setPosition.bind(this),
        );
    }

    public setPosition = (data: PositionType) => {
        if (data.speed) {
            this.animation.setSpeed(data.speed);
        }
        if (data.orientation) {
            if (data.orientation === "front") {
                this.orientation = "front";
                this.defaultPosition.z = -interfaceContent.sceneDeepness / 2;
                this.instance.rotation.y = 0;
                this.position.z = this.defaultPosition.z;
            } else {
                this.orientation = "back";
                this.defaultPosition.z = interfaceContent.sceneDeepness;
                this.instance.rotation.y = Math.PI;
                this.position.z = this.defaultPosition.z;
            }
        }
        if (data.x) {
            this.position.x =
                this.defaultPosition.x + (this.orientation === "front" ? data.x : data.x * -1);
        }
        if (data.y) {
            this.position.y = data.y + this.defaultPosition.y;
        }
        if (data.z) {
            this.position.z =
                this.defaultPosition.z + (this.orientation === "front" ? data.z : data.z * -1);
        }
        this.instance.position.copy(this.position);
        switch (data.pose) {
            case "default":
                this.default();
                break;
            case "happy":
                this.happy();
                break;
            case "angry":
                this.angry();
                break;
            case "sad":
                this.sad();
                break;
            default:
                break;
        }
        // console.log(
        //     "character set data position",
        //     data,
        //     this.instance.position,
        //     this.position,
        //     this.defaultPosition,
        // );
    };

    public loadAllTextures = async () => {
        const texturesList = [];
        for (const textures of Object.values(this.animationData)) {
            for (const texture of textures) {
                texturesList.push(texture);
            }
        }
        return preloadImagesWithPromise(texturesList);
    };

    private generateAnimationData = (characterData: CharacterType) => {
        // add emotions later

        const conversation = playerState.currentConversation ?? "fallback";
        const idle: string[] = [];
        if (characterData.idle[conversation ?? 0]) {
            for (let i = 0; i < characterData.idle[conversation ?? 0]; i++) {
                idle.push(
                    `./characters/${characterData.name.toLowerCase()}/${conversation}/idle/idle${i}.webp`,
                );
            }
        }
        const hoverTransition: string[] = [];
        if (conversation && characterData.hover[conversation]?.transition) {
            for (let i = 0; i < (characterData.hover[conversation].transition ?? 0); i++) {
                hoverTransition.push(
                    `./characters/${characterData.name.toLowerCase()}/${conversation}/hover-transition/hover-transition${i}.webp`,
                );
            }
        }
        const hover: string[] = [];
        if (conversation && characterData.hover[conversation].default) {
            for (let i = 0; i < (characterData.hover[conversation].default ?? 0); i++) {
                hover.push(
                    `./characters/${characterData.name.toLowerCase()}/${conversation}/hover/hover${i}.webp`,
                );
            }
        }
        const clickTransition: string[] = [];
        if (conversation && characterData.onClick[conversation].transition) {
            for (let i = 0; i < (characterData.onClick[conversation].transition ?? 0); i++) {
                clickTransition.push(
                    `./characters/${characterData.name.toLowerCase()}/${conversation}/click-transition/click-transition${i}.webp`,
                );
            }
        }
        const theDefault: string[] = [];
        if (characterData.states.default.default) {
            for (let i = 0; i < (characterData.states.default.default ?? 0); i++) {
                theDefault.push(
                    `./characters/${characterData.name.toLowerCase()}/default/default${i}.webp`,
                );
            }
        }

        // add new emotions types
        const theDefaultTalking: string[] = [];
        const happy: string[] = [];
        const happyTalking: string[] = [];
        const angry: string[] = [];
        const angryTalking: string[] = [];
        const sad: string[] = [];
        const sadTalking: string[] = [];
        const endTransition: string[] = [];

        // add new emotions to the animation data
        this.animationData.idle = idle;
        this.animationData.hoverTransition = hoverTransition;
        this.animationData.hover = hover;
        this.animationData.clickTransition = clickTransition;
        this.animationData.default = theDefault;
        this.animationData.defaultTalking = theDefaultTalking;
        this.animationData.happy = happy;
        this.animationData.happyTalking = happyTalking;
        this.animationData.angry = angry;
        this.animationData.angryTalking = angryTalking;
        this.animationData.sad = sad;
        this.animationData.sadTalking = sadTalking;
        this.animationData.endTransition = endTransition;

        this.animation.set({ transition: [], loop: this.animationData.idle });
    };

    public unload = () => {
        eventEmitterInstance.off("hover-character");
        eventEmitterInstance.off("end-hover-character");
        eventEmitterInstance.off("end-character-interaction");
        eventEmitterInstance.off("character-start-talking");
        eventEmitterInstance.off("character-end-talking");
        eventEmitterInstance.off("set-character-default");
        eventEmitterInstance.off("set-character-happy");
        eventEmitterInstance.off("set-character-angry");
        eventEmitterInstance.off("set-character-sad");
    };

    // the character starts on idle state (looping animation)
    // when hovered, it will do a transition animation to hovered state
    // when on hovered state it does a looping animation
    // when clicked, it will do a transition animation to default state
    // when on default state it does a looping animation
    // when an emotion is set it will switch to the corresponding animation loop
    // when talking is called it will switch to the talking emotion animation loop from whatever emotion is was in ex: happy -> talking happy, default -> talking default, sad -> talking sad etc
    // when stop talking is called it will switch back to the emotion it was in before talking
    // when end talking, it will to a transition animation to end state
    // end state dosent have any looping animation

    private hover = () => {
        console.log("hover", this.state);
        if (this.state === "end" || this.state === "hovered") return;
        if (this.state !== "idle") return;
        this.state = "hovered";

        const animation = {
            transition: this.animationData.hoverTransition,
            loop: this.animationData.hover,
        };
        this.animation.set(animation);
    };

    private endHover = () => {
        console.log("end-hover", this.state);
        if (this.state === "end" || this.state !== "hovered") return;
        this.state = "idle";

        const reverseTransition = [...(this.animationData.hoverTransition ?? [])];
        reverseTransition?.reverse();

        const animation = {
            transition: reverseTransition,
            loop: this.animationData.idle,
        };
        this.animation.set(animation);
    };

    private click = () => {
        if (this.state === "end") return;
        if (this.state !== "hovered") return;

        // Coupe le son progressif seulement si le personnage le demande
        if (this.characterData.stopProgressiveAudio) {
            Scene.stopProgressiveAudio();
        }

        this.state = "default";
        // start dialog
        console.log("start available dialog");
        playerState.isInteracting = true;
        eventEmitterInstance.trigger("openInteraction");

        const animation = {
            transition: this.animationData.clickTransition,
            loop: this.animationData.default,
        };
        this.animation.set(animation);
    };

    private endInteraction = () => {
        if (this.state === "idle") return;
        this.state = "idle";

        const reverseTransition = [...(this.animationData.hoverTransition ?? [])];
        reverseTransition?.reverse();

        const animation = {
            transition: reverseTransition,
            loop: this.animationData.idle,
        };
        this.animation.set(animation);
    };

    private startTalking = () => {
        if (this.state === "end") return;
        if (
            this.state === "idle" ||
            this.state === "hovered" ||
            this.state.search("talking") !== -1
        )
            return;
        switch (this.state) {
            case "default":
                this.state = "default-talking";
                break;
            case "happy":
                this.state = "happy-talking";
                break;
            case "angry":
                this.state = "angry-talking";
                break;
            case "sad":
                this.state = "sad-talking";
                break;
            default:
                this.state = "default-talking";
                break;
        }
    };

    private endTalking = () => {
        if (this.state === "end") return;
        if (this.state.search("talking") === -1) return;
        switch (this.state) {
            case "default-talking":
                this.state = "default";
                break;
            case "happy-talking":
                this.state = "happy";
                break;
            case "angry-talking":
                this.state = "angry";
                break;
            case "sad-talking":
                this.state = "sad";
                break;
            default:
                this.state = "default";
                break;
        }
    };

    private default = () => {
        if (this.state === "end") return;
        this.state = "default";
    };

    private happy = () => {
        if (this.state === "end") return;
        this.state = "happy";
    };

    private angry = () => {
        if (this.state === "end") return;
        this.state = "angry";
    };

    private sad = () => {
        if (this.state === "end") return;
        this.state = "sad";
    };

    // ...

    private turnTowardsCam = () => {
        const cameraPosition = new THREE.Vector3();
        cameraInstance.camera.getWorldPosition(cameraPosition);
        this.instance.lookAt(cameraPosition.multiplyScalar(0.5));
    };
}

export default Character;
