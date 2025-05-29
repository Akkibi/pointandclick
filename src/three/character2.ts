import * as THREE from "three"
import { eventEmitterInstance } from "../utils/eventEmitter";
import { CharacterType } from "../types/character";
import { preloadImages } from "./utils/ImagePreloader";


class Character{

  public instance : THREE.Mesh;
  private characterMaterial : THREE.MeshBasicMaterial;
  private data : CharacterType;
  private sceneName : string;
  constructor(data : CharacterType, sceneName : string){

    this.sceneName = sceneName;
    this.data = data;

    // create object
    const planeGeometry = new THREE.PlaneGeometry(5, 3);
    const planeMaterial = new THREE.MeshBasicMaterial({
        map: null,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.name = data.name;
    this.characterMaterial = planeMaterial;
    this.instance = plane;

    // events
    eventEmitterInstance.on("character-hover-in", () => this.onHoverIn.bind(this));
    eventEmitterInstance.on("character-hover-out", () => this.onHoverOut.bind(this));
    eventEmitterInstance.on("character-click", () => this.onClick.bind(this));
    eventEmitterInstance.on("character-start-talk", () => this.startTalk.bind(this));
    eventEmitterInstance.on("character-end-talk", () => this.endTalk.bind(this));
    eventEmitterInstance.on("update", () => this.update.bind(this));
  }

  private update() {

  }

  private loadImageExample() {

    //ex load idle animation
    const imagesList = [];
    for (let i = 0; i < this.data.idle[this.sceneName]; i++) {
      imagesList.push(`./characters/${this.data.name}/idle/idle${i+1}.webp`)
    }
    preloadImages(imagesList);
  }

  private onHoverIn() {

  }

  private onHoverOut() {

  }

  private onClick() {

  }

  private startTalk() {

  }

  private endTalk() {

  }
}
