import * as THREE from "three";
// import { Animation, AnimControllerBuilder, AnimationController } from "animation-controller";
// import { eventEmitterInstance } from "../utils/eventEmitter";
import { CharacterType } from "../types/character";
import { interfaceContent } from "../data/interface";
// import { preloadImages } from "./utils/ImagePreloader";

/**
 * Helper that turns a list of image paths into a frame‑by‑frame animation on a material.
 * @param framePaths – list of texture URLs in the desired order
 * @param material – the mesh material that will display the frames
 * @param frameDuration – delay in **milliseconds** between frames (1 ÷ FPS)
 */
export const sleep = (ms: number): Promise<void> => {
   return new Promise((resolve) => setTimeout(resolve, ms));
};

// function createImageSequenceAnimation(
//   framePaths: string[],
//   material: THREE.MeshBasicMaterial,
//   frameDuration: number = 200
// ): () => Promise<void> {
//   const loader = new THREE.TextureLoader();
//   return async () => {
//     for (const path of framePaths) {
//       const texture = await loader.loadAsync(path);
//       material.map = texture;
//       material.needsUpdate = true;
//       await sleep(frameDuration);
//     }
//   };
// }

// type StateName = "idle" | "hovered" | "talking" | "default";
// type TriggerName =
//   | "hover-in"
//   | "hover-out"
//   | "start-talking"
//   | "end-talking"
//   | "click";

// type CharController = AnimationController<StateName, TriggerName, never>;

class Character {
  public readonly instance: THREE.Mesh;
  private readonly characterMaterial: THREE.MeshBasicMaterial;
  private readonly data: CharacterType;
  private readonly sceneName: string;

  /** Animation controller handling all state/transition logic */
  // private controller!: CharController;

  constructor(data: CharacterType, sceneName: string) {
    this.sceneName = sceneName;
    this.data = data;

    // Geometry ↔ Material ↔ Mesh
    const geometry = new THREE.PlaneGeometry(1.5, 5);
    const material = new THREE.MeshBasicMaterial({
      map: null,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = data.name;
    mesh.position.set(0, -2, -interfaceContent.sceneDeepness / 4);

    this.characterMaterial = material;
    this.instance = mesh;

    console.log(this.characterMaterial, this.data, this.sceneName)

    // // Pre‑load all textures up‑front to avoid hitches
    // this.preloadAllTextures();

    // // Create animation controller & start playback
    // this.setupController();

    // // Wire external events to controller triggers
    // this.registerEventListeners();
  }

  // private setupController(): void {
  //   const builder = new AnimControllerBuilder<StateName, TriggerName>();

  //   // 1️⃣  States ------------------------------------------------------------
  //   builder
  //     .addState({
  //       name: "idle",
  //       animation: this.buildStateAnimation("idle", /*loop*/ true),
  //       startingState: true,
  //     })
  //     .addState({
  //       name: "hovered",
  //       animation: this.buildStateAnimation("hover", true),
  //     })
  //     .addState({
  //       name: "talking",
  //       animation: this.buildStateAnimation("talk", true),
  //     })
  //     .addState({
  //       name: "default",
  //       animation: this.buildStateAnimation("click", true),
  //     });

  //   // 2️⃣  Triggers ----------------------------------------------------------
  //   builder
  //     .addTrigger("hover-in")
  //     .addTrigger("hover-out")
  //     .addTrigger("start-talking")
  //     .addTrigger("end-talking")
  //     .addTrigger("click");

  //   // 3️⃣  Transitions -------------------------------------------------------
  //   // Idle ↔ Hover
  //   builder.addTransition("idle->hovered", { trigger: "hover-in" });
  //   builder.addTransition("hovered->idle", { trigger: "hover-out" });

  //   // Hover/Idle → Clicking
  //   builder.addTransition("hovered->default", { trigger: "click" });
  //   builder.addTransition("idle->default", { trigger: "click" });

  //   // Talking cycle
  //   builder.addTransition("default->talking", { trigger: "start-talking" });
  //   builder.addTransition("hovered->talking", { trigger: "start-talking" });
  //   builder.addTransition("talking->default", { trigger: "end-talking" });

  //   // 4️⃣  Build
  //   builder.setTrigger("hover-in");
  //   this.controller = builder.build();
  //   this.controller.start();
  // }

  /**
   * Creates an `Animation` object for the given state using the CharacterType
   * counts, assuming your assets follow the pattern:
   *   ./characters/{name}/{state}/{state}{index}.webp
   */
  // private buildStateAnimation(
  //   key: keyof CharacterType["idle"],
  //   loop: boolean
  // ): Animation<() => Promise<void>> {

  //   console.log("key", key)
  //   // How many frames exist for this state in the current scene?
  //   const count = (this.data as any)[key]?.[this.sceneName] ?? 0;
  //   const framePaths = Array.from({ length: count }, (_, i) =>
  //     `./characters/${this.data.name}/${key}/${key}${i + 1}.webp`
  //   );

  //   const playFn = createImageSequenceAnimation(
  //     framePaths,
  //     this.characterMaterial,
  //     100 // ~10 FPS — tweak as needed or make data‑driven
  //   );

  //   return new Animation({
  //     name: key as string,
  //     play: playFn,
  //     loop,
  //   });
  // }

  // ──────────────────────────────────────────────────────────────────────────
  // Event handling
  // ──────────────────────────────────────────────────────────────────────────

  // private registerEventListeners(): void {
  //   eventEmitterInstance.on("character-hover-in", this.onHoverIn.bind(this));
  //   eventEmitterInstance.on("character-hover-out", this.onHoverOut.bind(this));
  //   eventEmitterInstance.on("character-click", this.onClick.bind(this));
  //   eventEmitterInstance.on("character-start-talk", this.startTalk.bind(this));
  //   eventEmitterInstance.on("character-end-talk", this.endTalk.bind(this));
  // }

  // private onHoverIn(): void {
  //   this.controller.setTrigger("hover-in");
  // }

  // private onHoverOut(): void {
  //   this.controller.setTrigger("hover-out");
  // }

  // private onClick(): void {
  //   this.controller.setTrigger("click");
  // }

  // private startTalk(): void {
  //   this.controller.setTrigger("start-talking");
  // }

  // private endTalk(): void {
  //   this.controller.setTrigger("end-talking");
  // }

  /** Pre‑loads every texture declared in CharacterType for the current scene */
  // private preloadAllTextures(): void {
  //   const states: (keyof CharacterType["idle"])[] = [
  //     "idle",
  //     "hover",
  //     "talk",
  //     "click",
  //   ] as const;

  //   const paths: string[] = [];
  //   for (const state of states) {
  //     const count = (this.data as any)[state]?.[this.sceneName] ?? 0;
  //     for (let i = 0; i < count; i++) {
  //       paths.push(
  //         `./characters/${this.data.name}/${state}/${state}${i + 1}.webp`
  //       );
  //     }
  //   }
  //   preloadImages(paths);
  // }
}

export default Character;
