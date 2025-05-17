import * as THREE from "three";
import { interfaceContent } from "../data/interface";
import { CharacterType } from "../types/character";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import { cameraInstance } from "./camera";

class Character {
  public name: string;
  public instance: THREE.Mesh;
  private index: number;
  private position: THREE.Vector2;
  constructor(characterData: CharacterType, index: number) {
    this.index = index;
    this.name = characterData.name;
    console.log(this.name);
    // character1
    this.instance = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 7, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );

    this.position = new THREE.Vector2();
    const position = playerState.currentConversationData?.positions[this.index];
    if (position && position.x !== undefined && position.y !== undefined) {
      this.position.set(position.x, position.y);
      this.instance.position.set(
        this.position.x,
        this.position.y,
        -interfaceContent.sceneDeepness / 2,
      );
    }

    this.instance.name = "character";
    this.instance.userData = { name: this.name, position: this.position };

    eventEmitterInstance.on("update", this.turnTowardsCam.bind(this));
    eventEmitterInstance.on(`hover-character`, this.hoverEffect.bind(this));
    eventEmitterInstance.on(`click-character`, this.clickEffect.bind(this));
  }

  private hoverEffect = () => {
    console.log("hover on" , this.name);
  };

  private clickEffect = () => {
    console.log("click on" , this.name);
  };

  private turnTowardsCam = () => {
    const cameraPosition = new THREE.Vector3();
    cameraInstance.camera.getWorldPosition(cameraPosition);
    this.instance.lookAt(cameraPosition.multiplyScalar(2));
  };
}

export default Character;
