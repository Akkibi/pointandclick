import * as THREE from "three";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import Camera, { cameraInstance } from "./camera";
import Scene from "./scene";

class Game {
    public camera: Camera;
    public scene: Scene;
    private raycaster: THREE.Raycaster;
    public renderer: THREE.WebGLRenderer;
    private currentHoveredElement: string = "";
    constructor() {
        this.camera = cameraInstance;
        this.scene = new Scene(playerState.currentScene);
        this.handleSceneChange();
        this.scene.instance.add(this.camera.instance);

        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.raycaster = new THREE.Raycaster();
        console.log("this.raycaster", this.raycaster);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 1);

        console.log("load eventEmitter");
        eventEmitterInstance.on("update", this.render.bind(this));
        eventEmitterInstance.on("resize", this.handleResize.bind(this));
        eventEmitterInstance.on("sceneChange", this.handleSceneChange.bind(this));
        eventEmitterInstance.on("mouseMove", this.raycast.bind(this));
        eventEmitterInstance.on("mouseMove", this.mouseMove.bind(this));
        eventEmitterInstance.on("mouseDown", this.mouseDown.bind(this));

        this.render();
    }

    private handleSceneChange = () => {
        // Arrête le son de la scène précédente AVANT de la remplacer
        if (this.scene) {
            this.scene.stopSfx();
            this.scene.instance.remove(this.camera.instance);
            this.scene.unload();
        }
        this.scene = new Scene(playerState.currentScene);
        console.log("new scene", this.scene, this.camera);
        this.scene.instance.add(this.camera.instance);
        this.scene.loadBackgrounds();
    };

    private raycast = () => {
        if (playerState.isInteracting) return [];
        const mousePos = new THREE.Vector2(
            (playerState.mouse.target.x / window.innerWidth) * 2 - 1,
            -(playerState.mouse.target.y / window.innerHeight) * 2 + 1,
        );
        this.raycaster.setFromCamera(mousePos, this.camera.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.instance.children);
        return intersects ?? [];
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
            if (playerState.cutScene) return;
            if (playerState.isInteracting) return;
            const intersect = this.raycast();
            const intersectName = intersect[0]?.object.name;
            console.log("hover", intersectName);
            if (intersectName === "background" || !intersectName) {
                if (this.scene.checkDoor() === null) {
                    document.body.classList.remove("door-cursor");
                } else {
                    document.body.classList.add("door-cursor");
                }
            } else {
                document.body.classList.remove("door-cursor");
            }
            if (intersectName === "character" && this.currentHoveredElement !== intersectName) {
                eventEmitterInstance.trigger(`hover-${intersectName}`, []);
            }
            if (
                this.currentHoveredElement === "character" &&
                this.currentHoveredElement !== intersectName
            ) {
                eventEmitterInstance.trigger(`end-hover-${this.currentHoveredElement}`, []);
            }

            this.currentHoveredElement = intersectName;
        }
    }

    private mouseDown() {
        if (playerState.mouse.target.y >= window.innerHeight * 0.9) {
            eventEmitterInstance.trigger("turnCamera", []);
        } else {
            console.log("cutscene, isinteracting", playerState.cutScene, playerState.isInteracting);
            if (playerState.cutScene) return;
            if (playerState.isInteracting) return;
            const intersect = this.raycast();
            const intersectName = intersect[0].object.name;
            if (!intersectName) return;
            const sceneTarget = this.scene.checkDoor();
            console.log("sceneTarget", sceneTarget);
            if (intersectName === "background") {
                if (sceneTarget === null) return;
                playerState.currentScene = sceneTarget;
                console.log("Scene transition start");
                eventEmitterInstance.trigger("sceneChangeOut", [intersect[0].point]);
            } else if (intersectName === "character") {
                eventEmitterInstance.trigger("click-character");
                // console.log("click", intersectName);
            } else {
                eventEmitterInstance.trigger(`click-${intersectName}`);
                // console.log("click", intersectName);
            }
        }
    }
}

export default Game;
