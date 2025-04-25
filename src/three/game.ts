import * as THREE from "three";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import Camera from "./camera";
import Scene from "./scene";

class Game {
  public camera: Camera;
  public scene: Scene;
  private raycaster: THREE.Raycaster;
  public renderer: THREE.WebGLRenderer;
  constructor() {
    this.camera = new Camera();
    this.scene = new Scene(playerState.currentScene);
    this.handleSceneChange();
    this.scene.instance.add(this.camera.instance);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.raycaster = new THREE.Raycaster();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);

    eventEmitterInstance.on("update", this.render.bind(this));
    eventEmitterInstance.on("resize", this.handleResize.bind(this));
    eventEmitterInstance.on("sceneChange", this.handleSceneChange.bind(this));
    eventEmitterInstance.on("mouseMove", this.raycast.bind(this));
    eventEmitterInstance.on("mouseMove", this.mouseMove.bind(this));
    eventEmitterInstance.on("mouseDown", this.mouseDown.bind(this));
    this.render();
  }

  private handleSceneChange = () => {
    this.scene.instance.remove(this.camera.instance);
    // this.scene.destroy();
    this.scene = new Scene(playerState.currentScene);
    console.log("new scene", this.scene, this.camera);
    this.scene.instance.add(this.camera.instance);
    this.scene.loadBackgrounds();
  };

  private raycast = () => {
    const mousePos = new THREE.Vector2(
      (playerState.mouse.target.x / window.innerWidth) * 2 - 1,
      -(playerState.mouse.target.y / window.innerHeight) * 2 + 1,
    );
    this.raycaster.setFromCamera(mousePos, this.camera.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.instance.children,
    );
    return intersects;
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

  private mouseMove() {
    if (playerState.mouse.target.y >= window.innerHeight * 0.9) {
      document.body.classList.add("bottom-cursor");
      document.body.classList.remove("door-cursor");
    } else {
      document.body.classList.remove("bottom-cursor");
      if (this.scene.checkDoor() !== null) {
        document.body.classList.add("door-cursor");
      } else {
        document.body.classList.remove("door-cursor");
      }
    }
  }

  private mouseDown() {
    if (playerState.mouse.target.y >= window.innerHeight * 0.9) {
      eventEmitterInstance.trigger("turnCamera", []);
    } else {
      const sceneTarget = this.scene.checkDoor();
      console.log(sceneTarget);
      if (sceneTarget !== null) {
        playerState.currentScene = sceneTarget;
        const intersects = this.raycast();
        if (intersects.length > 0) {
          intersects.forEach((intersect) => {
            if (intersect.object.name === "background") {
              console.log("Scene transition start");
              eventEmitterInstance.trigger("sceneChangeOut", [intersect.point]);
            }
          });
        }
      }
    }
  }
}

export default Game;
