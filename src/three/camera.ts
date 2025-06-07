import gsap from "gsap";
import * as THREE from "three";
import { interfaceContent } from "../data/interface";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import { updateMouseSmooth } from "./utils/updateMouseSmooth";
class Camera {
    public instance: THREE.Group;
    private cameraGroup: THREE.Group;
    public camera: THREE.PerspectiveCamera;
    constructor() {
        this.instance = new THREE.Group();
        this.cameraGroup = new THREE.Group();
        this.cameraGroup.position.z = -interfaceContent.sceneDeepness;
        this.instance.add(this.cameraGroup);
        this.camera = new THREE.PerspectiveCamera(
            20,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        this.camera.position.z = interfaceContent.sceneDeepness;
        this.camera.name = "camera";
        this.cameraGroup.add(this.camera);

        // const axesHelper = new THREE.AxesHelper(10);
        // axesHelper.position.z = -interfaceContent.sceneDeepness;
        // this.cameraGroup.add(axesHelper);

        // const instancePos = new THREE.Vector3();
        // this.instance.getWorldPosition(instancePos);
        // const cameraGroupPos = new THREE.Vector3();
        // this.cameraGroup.getWorldPosition(cameraGroupPos);
        // const cameraPos = new THREE.Vector3();
        // this.camera.getWorldPosition(cameraPos);
        // console.log(instancePos, cameraGroupPos, cameraPos, axesHelper.position);

        eventEmitterInstance.on("update", this.updateParalax.bind(this));
        eventEmitterInstance.on("resize", this.handleResize.bind(this));
        eventEmitterInstance.on("turnCamera", this.turnCamera.bind(this));
        eventEmitterInstance.on("sceneChangeOut", this.handleSceneChangeOut.bind(this));
        eventEmitterInstance.on("sceneChangeIn", this.handleSceneChangeIn.bind(this));
        this.handleResize();
        this.camera.lookAt(this.cameraGroup.position);
    }

    private handleSceneChangeOut = (point: THREE.Vector3) => {
        point.x *= playerState.isLookingFront ? 3.14 : -1;
        point.y *= playerState.isLookingFront ? 3.14 : 1;
        point.z -= 35;
        // console.log("point", point);
        gsap.to(this.camera.position, {
            duration: 0.5,
            ease: "expo.in",
            x: point.x,
            y: point.y,
            z: point.z,
            onComplete: () => {
                eventEmitterInstance.trigger("sceneChange");
            },
        });
    };

    private handleSceneChangeIn = () => {
        console.log(this.camera.position);
        gsap.fromTo(
            this.camera.position,
            {
                x: 0,
                y: 0,
                z: 1.5 * interfaceContent.sceneDeepness,
            },
            {
                duration: 1.5,
                delay: 0.1,
                ease: "expo.out",
                x: 0,
                y: 0,
                z: interfaceContent.sceneDeepness,
            },
        );
    };

    public destroy() {
        eventEmitterInstance.off("update");
        eventEmitterInstance.off("resize");
        eventEmitterInstance.off("turnCamera");
        eventEmitterInstance.off("sceneChangeOut");
        eventEmitterInstance.off("sceneChangeIn");
    }

    public turnCamera = () => {
        console.log("turnCamera", this.instance.rotation);
        playerState.isLookingFront = !playerState.isLookingFront;
        gsap.to(this.instance.rotation, {
            y: playerState.isLookingFront ? 0 : Math.PI,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                console.log(
                    this.camera.position,
                    this.cameraGroup.position,
                    this.instance.position,
                    this.instance.rotation,
                );
            },
        });
    };

    private updateParalax = () => {
        updateMouseSmooth(20);
        gsap.set(this.cameraGroup.rotation, {
            x: (playerState.mouse.current.y / window.innerHeight - 0.5) / 12,
            y: (playerState.mouse.current.x / window.innerWidth - 0.5) / 12,
        });
    };

    private handleResize = () => {
        const width = document.body.clientWidth;
        const height = document.body.clientWidth;
        this.camera.aspect = width / height;
        this.camera.fov = (window.innerWidth / window.innerHeight) * 20;
        this.camera.updateProjectionMatrix();
    };
}

export const cameraInstance = new Camera();

export default Camera;
