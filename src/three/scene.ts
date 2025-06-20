import * as THREE from "three";
import { interfaceContent } from "../data/interface";
import { playerState } from "../data/player";
import getPixelColor from "../utils/getPixelColor";
import rgbToHex from "../utils/rgbToHex";
// import { backgroundLoader } from "./backgroundLoader";
import {
    getConversationCharacters,
    getCurrentConversation,
    getCurrentFallback,
    getDialog,
} from "./utils/getInfo";
import { eventEmitterInstance } from "../utils/eventEmitter";
import Character from "./character";
import loadImage from "./utils/loadImage";
import hexDistance from "../utils/hexDistance";
import { characters } from "../data/characters";
import { scenes } from "../data/scenes";
import { preloadImages } from "./utils/ImagePreloader";
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

    // Ajoute ces propriétés statiques pour l'audio progressif
    private static progressiveAudio?: HTMLAudioElement;
    private static progressiveAudioSrc?: string;

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
        const sceneData = scenes[this.name];
        if (sceneData) {
            playerState.currentSceneData = sceneData;
        }
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
                if (playerState.currentConversationData?.positions[index]) {
                    character.setPosition(playerState.currentConversationData?.positions[index]);
                }
                this.charactersGroup.add(character.instance);
                this.characters.push(character);
            });
        } else {
            const fallback = getCurrentFallback(playerState.currentScene);
            console.log(fallback);
            if (fallback) {
                const characterData = characters[fallback.name];
                console.log(characterData);
                const character: Character = new Character(characterData, 0);
                character.setPosition(fallback.position);
                this.charactersGroup.add(character.instance);
                this.characters.push(character);
            }
        }
        this.charactersGroup.position.set(0, 0, -interfaceContent.sceneDeepness / 4);
        this.instance.add(this.charactersGroup);

        // noise effect shader
        eventEmitterInstance.on("update", this.updateShaderTime.bind(this));

        //preload other scenes background and characters
        if (sceneData.doors) {
            if (sceneData.doors.front) {
                const doors = sceneData.doors.back ? Object.values(sceneData.doors.back) : null;
                if (doors) {
                    doors.forEach((value, _key) => {
                        preloadImages([
                            `/scenes/${value}/front-albedo.webp`,
                            `/scenes/${value}/back-albedo.webp`,
                            `/scenes/${value}/front-depth.opti.webp`,
                            `/scenes/${value}/back-depth.opti.webp`,
                        ]);
                    });
                }
            }
            if (sceneData.doors.back) {
                const doors = sceneData.doors.front ? Object.values(sceneData.doors.front) : null;
                if (doors) {
                    doors.forEach((value, _key) => {
                        preloadImages([
                            `/scenes/${value}/front-albedo.webp`,
                            `/scenes/${value}/back-albedo.webp`,
                            `/scenes/${value}/front-depth.opti.webp`,
                            `/scenes/${value}/back-depth.opti.webp`,
                        ]);
                    });
                }
            }
        }
        // preloadImage(`/scenes/${this.name}/front-albedo.webp`),
        // preloadImage(`/scenes/${this.name}/back-albedo.webp`),
        // preloadImage(`/scenes/${this.name}/front-depth.opti.webp`),
        // preloadImage(`/scenes/${this.name}/back-depth.opti.webp`),

        if (playerState.currentSceneData.doors) {
            if (playerState.currentSceneData.doors.front) this.loadDoors(true);
            if (playerState.currentSceneData.doors.back) this.loadDoors(false);
        }

        // === AUDIO PROGRESSIF ===
        const audioProgressive = playerState.currentSceneData?.audioProgressive;
        if (audioProgressive) {
            const { src, minVolume, maxVolume, scenes, last, current } = audioProgressive;
            const step = scenes.indexOf(current ?? name);

            // Si la scène fait partie de la progression
            if (step !== -1) {
                // Si l'audio n'est pas déjà lancé ou a changé de source
                if (!Scene.progressiveAudio || Scene.progressiveAudioSrc !== src) {
                    if (Scene.progressiveAudio) {
                        Scene.progressiveAudio.pause();
                        Scene.progressiveAudio = undefined;
                    }
                    Scene.progressiveAudio = new Audio(src);
                    Scene.progressiveAudio.loop = true;
                    Scene.progressiveAudioSrc = src;
                    Scene.progressiveAudio.volume = minVolume;
                    Scene.progressiveAudio.play().catch((e) => {
                        console.warn("Impossible de jouer le son progressif :", e);
                    });
                }
                // Calcule le volume en fonction de la progression OU prend le volume personnalisé
                const volume =
                    typeof audioProgressive.volume === "number"
                        ? audioProgressive.volume
                        : minVolume + ((maxVolume - minVolume) * step) / (scenes.length - 1);
                if (Scene.progressiveAudio) Scene.progressiveAudio.volume = volume;
            }

            // Si on est dans la salle "last", on coupe le son
            if ((current ?? name) === last && Scene.progressiveAudio) {
                Scene.progressiveAudio.pause();
                Scene.progressiveAudio.currentTime = 0;
                Scene.progressiveAudio = undefined;
                Scene.progressiveAudioSrc = undefined;
            }
        } else {
            // Si la salle n'est pas concernée par un audio progressif, on coupe tout
            Scene.stopProgressiveAudio?.();
        }
    }
    public unload = () => {
        this.characters.map((character) => {
            character.unload();
        });
    };

    private updateShaderTime(time: number) {
        (this.frontBackground.material as THREE.ShaderMaterial).uniforms.time.value = time;
        (this.backBackground.material as THREE.ShaderMaterial).uniforms.time.value = time;
    }
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
            0.8 *
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

                const doors = playerState.currentSceneData.doors?.front;
                if (doors) {
                    let target = null;
                    Object.entries(doors).map(([key, value]) => {
                        if (hexDistance(rgbToHex(rgb), key, 10)) {
                            target = value;
                        }
                    });
                    return target;
                }
            } else if (!playerState.isLookingFront && this.backDoors) {
                const rgb = getPixelColor(this.backDoors, normalizedPos.x, normalizedPos.y);

                const doors = playerState.currentSceneData.doors?.back;
                if (doors) {
                    let target = null;
                    Object.entries(doors).forEach(([key, value]) => {
                        if (hexDistance(rgbToHex(rgb), key, 10)) {
                            target = value;
                        }
                    });
                    return target;
                }
            }
            console.log("sceneTarget", null);
            return null;
        }
    }
    public async loadBackgrounds() {
        try {
            const [frontAlbedo, backAlbedo, frontDepth, backDepth] = await Promise.all([
                loadImage(`/scenes/${this.name}/front-albedo.webp`),
                loadImage(`/scenes/${this.name}/back-albedo.webp`),
                loadImage(`/scenes/${this.name}/front-depth.opti.webp`),
                loadImage(`/scenes/${this.name}/back-depth.opti.webp`),
            ]);

            (this.frontBackground.material as THREE.ShaderMaterial).uniforms.albedoMap.value =
                frontAlbedo;
            (this.backBackground.material as THREE.ShaderMaterial).uniforms.albedoMap.value =
                backAlbedo;
            (this.frontBackground.material as THREE.ShaderMaterial).uniforms.depthMap.value =
                frontDepth;
            (this.backBackground.material as THREE.ShaderMaterial).uniforms.depthMap.value =
                backDepth;

            if (this.characters.length > 0) {
                const texturePromises = this.characters.map((character) =>
                    character.loadAllTextures(),
                );
                Promise.all(texturePromises).then(() => {
                    eventEmitterInstance.trigger("sceneChangeIn");
                });
            } else {
                eventEmitterInstance.trigger("sceneChangeIn");
            }
            console.log("Scene transition end");
        } catch (err) {
            console.error("Error loading images", err);
        }
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
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        float random (vec2 st) {
            return fract(sin(dot(st.xy,
                                 vec2(12.9898,78.233)))*
                43758.5453123);
        }

        void main() {
          vec4 albedo = texture2D(albedoMap, vUv);

          vec2 st = gl_FragCoord.xy/resolution.xy;

          // float rnd = random( st + time * 0.01 ) * 0.25;
          // albedo.rgb = mix(albedo.rgb, vec3(0.0), rnd);
          // calbedo.b += rnd * 0.1;

          gl_FragColor = vec4(albedo.rgb, 1.0);
        }
      `;

        const customMaterial = new THREE.ShaderMaterial({
            uniforms: {
                albedoMap: { value: null },
                depthMap: { value: null },
                time: { value: 0 },
                resolution: { value: new THREE.Vector2(5000, 1000) },
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

    // Ajoute une méthode statique pour couper le son depuis un clic sur un personnage
    static stopProgressiveAudio(fadeDuration = 1000) {
        if (Scene.progressiveAudio) {
            const audio = Scene.progressiveAudio;
            const initialVolume = audio.volume;
            const steps = 20;
            const stepTime = fadeDuration / steps;
            let currentStep = 0;

            const fade = () => {
                currentStep++;
                audio.volume = initialVolume * (1 - currentStep / steps);
                if (currentStep < steps) {
                    setTimeout(fade, stepTime);
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                    Scene.progressiveAudio = undefined;
                    Scene.progressiveAudioSrc = undefined;
                }
            };

            fade();
        }
    }
}
export default Scene;
