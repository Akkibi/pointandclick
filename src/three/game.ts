import * as THREE from "three";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import Camera from "./camera";
import Scene from "./scene";

class Game {
  public camera: Camera;
  public scene: Scene | null;
  private raycaster: THREE.Raycaster;
  public renderer: THREE.WebGLRenderer;
  constructor() {
    this.scene = new Scene(playerState.currentScene);
    this.camera = new Camera();
    this.scene.instance.add(this.camera.instance);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.raycaster = new THREE.Raycaster();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);

    eventEmitterInstance.on("update", this.render.bind(this));
    eventEmitterInstance.on("resize", this.handleResize.bind(this));
    eventEmitterInstance.on("sceneChange", this.handleSceneChange.bind(this));
    eventEmitterInstance.on("mouseMove", this.raycast.bind(this));
    this.render();
  }

  private handleSceneChange = () => {
    this.scene?.instance.remove(this.camera.instance);
    this.scene?.destroy();
    this.scene = null;
    this.scene = new Scene(playerState.currentScene);
    console.log("new scene", this.scene, this.camera);
    this.scene.instance.add(this.camera.instance);
  };

  private raycast = () => {
    if (!this.scene) return;
    this.raycaster.setFromCamera(
      new THREE.Vector2(playerState.mouse.target.x, playerState.mouse.target.y),
      this.camera.camera,
    );
    return this.raycaster.intersectObjects(this.scene.instance.children);
  };

  private handleResize = () => {
    const width = document.body.clientWidth;
    const height = document.body.clientWidth;
    this.renderer.setSize(width, height);
  };

  public render() {
    if (!this.scene || !this.camera) return;
    this.renderer.render(this.scene.instance, this.camera.camera);
  }
}

export default Game;
