import * as THREE from "three";
import { eventEmitterInstance } from "../utils/eventEmitter";

interface animationType {
    transition?: string[] | null;
    loop?: string[] | null;
}

class Animation {
    private material: THREE.MeshBasicMaterial;
    private scale: THREE.Vector3;
    private textureLoader: THREE.TextureLoader;
    public speed: number = 200; // in ms
    private deltatime: number = 0;
    private currentIndex: number = 0;
    private transition: Array<THREE.Texture> = [];
    private loop: Array<THREE.Texture> = [];
    private istransitionDone: boolean = false;

    constructor(material: THREE.MeshBasicMaterial, scale: THREE.Vector3) {
        this.scale = scale;
        this.material = material;
        this.textureLoader = new THREE.TextureLoader();
        this.material.map = this.textureLoader.load(
            "https://cdn3.emoji.gg/emojis/6304-whitesmalldot.png",
        );
        eventEmitterInstance.on("update", this.update.bind(this));
    }
    private loadTexture = (src: string): Promise<THREE.Texture> => {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                src,
                (texture) => resolve(texture),
                undefined,
                (err) => reject(err),
            );
        });
    };

    public set = async (animData: animationType) => {
        console.log("set animData");
        const transition = [];
        const loop = [];

        if (animData.transition && animData.transition.length > 0) {
            this.istransitionDone = false;
            for (const src of animData.transition) {
                const texture = await this.loadTexture(src);
                texture.colorSpace = THREE.SRGBColorSpace;
                transition.push(texture);
            }
        } else {
            this.istransitionDone = true;
        }

        if (animData.loop && animData.loop.length > 0) {
            for (const src of animData.loop) {
                const texture = await this.loadTexture(src);
                texture.colorSpace = THREE.SRGBColorSpace;
                loop.push(texture);
            }
        }
        this.currentIndex = 0;
        this.transition = transition;
        this.loop = loop;
        // console.log("loop", loop, loop.length);
    };

    private update = (_time: number, deltatime: number) => {
        this.deltatime += deltatime;
        if (this.deltatime < this.speed) return;
        this.deltatime = 0;

        if (!this.istransitionDone) {
            if (this.transition.length <= 0) {
                this.istransitionDone = true;
                return;
            }
            // console.log("set material map transition", this.transition[this.currentIndex]);
            this.material.map = this.transition[this.currentIndex];
            if (this.material.map?.image) {
                this.scale.set(
                    this.material.map.image.width / 150,
                    this.material.map.image.height / 150,
                    1,
                );
            }

            this.currentIndex++;
            if (this.currentIndex >= this.transition.length) {
                this.istransitionDone = true;
                this.currentIndex = 0;
            }
        } else {
            if (this.loop.length > 0) {
                // console.log("set material map loop", this.loop[this.currentIndex]);
                this.material.map = this.loop[this.currentIndex];
                if (this.material.map?.image) {
                    this.scale.set(
                        this.material.map.image.width / 150,
                        this.material.map.image.height / 150,
                        1,
                    );
                }
                // console.log(this.scale, this.material.map.image);

                this.currentIndex++;
                if (this.currentIndex >= this.loop.length) {
                    this.currentIndex = 0;
                }
            }
        }
    };
}

export default Animation;
