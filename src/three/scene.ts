import * as THREE from "three";
import { interfaceContent } from "../data/interface";
import { playerState } from "../data/player";
import getPixelColor from "../utils/getPixelColor";
import rgbToHex from "../utils/rgbToHex";
// import { backgroundLoader } from "./backgroundLoader";
import {
    getConversationCharacters,
    getCurrentConversation,
    getDialog,
    getScene,
    getSfx,
} from "./utils/getInfo";
import { eventEmitterInstance } from "../utils/eventEmitter";
import Character from "./character";
import loadImage from "./utils/loadImage";
class Scene {
    public instance: THREE.Scene;
    public name: string;
    private frontBackground: THREE.Mesh;
    private backBackground: THREE.Mesh;
    private frontDoors: ImageData | null;
    private backDoors: ImageData | null;
    private charactersGroup: THREE.Group;
    private characters: Character[];
    private audio?: HTMLAudioElement;
    constructor(name: string) {
        this.frontDoors = null;
        this.backDoors = null;
        this.name = name;
        this.characters = [];
        this.instance = new THREE.Scene();
        console.log(this.name);
        // background catcher
        const frontBackgroundCatcher = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 20, 128, 128),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: false, opacity: 1 }),
        );
        const backBackgroundCatcher = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 20, 128, 128),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: false, opacity: 1 }),
        );
        frontBackgroundCatcher.position.set(0, 0, -interfaceContent.sceneDeepness * 1.01);
        backBackgroundCatcher.position.set(0, 0, interfaceContent.sceneDeepness * 1.01);
        backBackgroundCatcher.rotation.y = Math.PI;
        frontBackgroundCatcher.name = "background";
        backBackgroundCatcher.name = "background";
        this.instance.add(frontBackgroundCatcher);
        this.instance.add(backBackgroundCatcher);

        // background images
        this.frontBackground = this.backgroundElementsLoader();
        this.backBackground = this.backgroundElementsLoader();
        this.frontBackground.position.set(0, 0, -interfaceContent.sceneDeepness);
        this.backBackground.position.set(0, 0, interfaceContent.sceneDeepness);
        this.backBackground.rotation.y = Math.PI;
        this.instance.add(this.frontBackground);
        this.instance.add(this.backBackground);

        playerState.currentScene = this.name;
        playerState.currentSceneData = getScene(name);
        playerState.currentConversation = getCurrentConversation(this.name)?.name ?? null;
        playerState.currentConversationData = getCurrentConversation(this.name) ?? null;
        if (playerState.currentConversation) {
            playerState.currentDialog = "start";
            playerState.currentDialogData = getDialog(
                this.name,
                playerState.currentConversation,
                "start",
            );
        } else {
            playerState.currentDialog = null;
            playerState.currentDialogData = null;
        }

        // characters group
        this.charactersGroup = new THREE.Group();

        // load characters
        if (playerState.currentDialog) {
            const charactersData = getConversationCharacters(this.name, playerState.currentDialog);
            charactersData.forEach((characterData, index) => {
                const character: Character = new Character(characterData, index);
                this.charactersGroup.add(character.instance);
                this.characters.push(character);
                character.loadAllTextures();
            });
        }
        this.charactersGroup.position.set(0, 0, -interfaceContent.sceneDeepness / 4);
        this.instance.add(this.charactersGroup);

        // plane.lookAt(0, 0, 0);
        // this.instance.add(plane);

        if (playerState.currentSceneData.doors) {
            if (playerState.currentSceneData.doors.front) this.loadDoors(true);
            if (playerState.currentSceneData.doors.back) this.loadDoors(false);
        }

        const sfx = getSfx(this.name);
        if (sfx) {
            this.audio = new Audio(sfx);
            this.audio.loop = true;
            this.audio.volume = 0.5;
            this.audio.play().catch((e) => {
                console.warn("Impossible de jouer le son automatiquement :", e);
            });
        }
    }
    public unload = () => {
        this.characters.map((character) => {
            character.unload();
        });
    };
    private loadDoors(isFront: boolean) {
        // import an image from `/scenes/${sceneName}/front-doors.jpg` and store its imagedata in this.frontDoors
        const image = new Image();
        image.src = `/scenes/${this.name}/${isFront ? "front" : "back"}-doors.jpg`;
        image.crossOrigin = "anonymous";

        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(image, 0, 0);
                if (isFront) {
                    this.frontDoors = context.getImageData(0, 0, canvas.width, canvas.height);
                    console.log("load frontdoors", this.frontDoors);
                } else {
                    this.backDoors = context.getImageData(0, 0, canvas.width, canvas.height);
                    console.log("load backdoors", this.backDoors);
                }
            }
        };
        image.onerror = (err) => {
            console.error(`Failed to load ${isFront ? "front" : "back"} door image`, err);
        };
    }

    public checkDoor(): string | null {
        if (!playerState.currentSceneData) return null;
        // translate mouse position between 0 and 1

        const widthScaledUp =
            interfaceContent.doorMapSize.width *
            (window.innerHeight / interfaceContent.doorMapSize.height);
        // console.log("widthScaledUp", widthScaledUp)
        const troncatedWidth = playerState.mouse.target.x - (window.innerWidth - widthScaledUp) / 2;
        const finalWidth = (troncatedWidth / widthScaledUp) * interfaceContent.doorMapSize.width;
        // console.log("finalWidth" , finalWidth )

        const normalizedPos = {
            x: Math.round(
                finalWidth,
                // ((playerState.mouse.target.x +
                //   (window.innerHeight - window.innerWidth) / 2) /
                //   window.innerHeight) *
                //   interfaceContent.doorMapSize.width,
            ),
            y: Math.round(
                (playerState.mouse.target.y / window.innerHeight) *
                    interfaceContent.doorMapSize.height,
            ),
        };
        // console.log("pos", normalizedPos)
        if (
            normalizedPos.x < 0 ||
            normalizedPos.x > interfaceContent.doorMapSize.width ||
            normalizedPos.y < 0 ||
            normalizedPos.y > interfaceContent.doorMapSize.height
        ) {
            return null;
        } else {
            if (playerState.isLookingFront && this.frontDoors) {
                const rgb = getPixelColor(this.frontDoors, normalizedPos.x, normalizedPos.y);
                // console.log("tgb",rgb)
                if (playerState.currentSceneData.doors?.front?.[rgbToHex(rgb)]) {
                    return playerState.currentSceneData.doors.front[rgbToHex(rgb)];
                }
            } else if (!playerState.isLookingFront && this.backDoors) {
                const rgb = getPixelColor(this.backDoors, normalizedPos.x, normalizedPos.y);
                if (playerState.currentSceneData.doors?.back?.[rgbToHex(rgb)]) {
                    return playerState.currentSceneData.doors.back[rgbToHex(rgb)];
                }
            }
            return null;
        }
    }

    public loadBackgrounds() {
        loadImage(`/scenes/${this.name}/front-albedo.opti.webp`, (texture: THREE.Texture) => {
            (this.frontBackground.material as THREE.ShaderMaterial).uniforms.albedoMap.value =
                texture;
        })
            .then(() =>
                loadImage(
                    `/scenes/${this.name}/back-albedo.opti.webp`,
                    (texture: THREE.Texture) => {
                        (
                            this.backBackground.material as THREE.ShaderMaterial
                        ).uniforms.albedoMap.value = texture;
                    },
                ),
            )
            .then(() =>
                loadImage(
                    `/scenes/${this.name}/front-depth.opti.webp`,
                    (texture: THREE.Texture) => {
                        (
                            this.frontBackground.material as THREE.ShaderMaterial
                        ).uniforms.depthMap.value = texture;
                    },
                ),
            )
            .then(() =>
                loadImage(`/scenes/${this.name}/back-depth.opti.webp`, (texture: THREE.Texture) => {
                    (this.backBackground.material as THREE.ShaderMaterial).uniforms.depthMap.value =
                        texture;
                }),
            )
            .then(() => {
                eventEmitterInstance.trigger("sceneChangeIn");
                console.log("Scene transition end");
            })
            .catch((err) => {
                console.error("Error during loading sequence", err);
            });
    }

    public backgroundElementsLoader() {
        const vertexShader = `
          uniform sampler2D depthMap; // Depth map texture
          varying vec2 vUv;
          void main() {
            vUv = uv;

            // Sample the depth map at the current UV coordinate
            vec4 depthColor = texture2D(depthMap, vUv);

            // Convert the depth color (grayscale) to a depth value
            float depth = depthColor.r; // Assuming depth map is grayscale (r = g = b)

            // Adjust the vertex position along the Z-axis based on the depth value
            vec3 displacedPosition = position + normal * depth * 30.0;

            // Transform the vertex position
            gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
          }
        `;

        const fragmentShader = `
        uniform sampler2D albedoMap;
        uniform sampler2D depthMap;
        varying vec2 vUv;
        void main() {
          vec4 albedo = texture2D(albedoMap, vUv);
          gl_FragColor = vec4(albedo.rgb, 1.0);
        }
      `;

        const customMaterial = new THREE.ShaderMaterial({
            uniforms: {
                albedoMap: { value: null },
                depthMap: { value: null },
            },
            vertexShader,
            fragmentShader,
        });

        // Geometry
        const geometry = new THREE.PlaneGeometry(15, 10, 128, 128);
        const plane = new THREE.Mesh(geometry, customMaterial);
        plane.name = "background";

        return plane;
    }

    public stopSfx() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.src = "";
            this.audio.load();
            this.audio = undefined;
        }
    }
}
export default Scene;
