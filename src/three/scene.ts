import * as THREE from "three";
import { interfaceContent } from "../data/interface";
import { playerState } from "../data/player";
import { SceneType } from "../types/scene";
import getPixelColor from "../utils/getPixelColor";
import rgbToHex from "../utils/rgbToHex";
import { backgroundLoader } from "./backgroundLoader";
import { getScene } from "./utils/getInfo";
class Scene {
  instance: THREE.Scene;
  data: SceneType | null;
  name: string;
  frontBackground: THREE.Mesh;
  backBackground: THREE.Mesh;
  frontDoors: ImageData | null;
  backDoors: ImageData | null;
  constructor(name: string) {
    this.data = getScene(name);
    this.frontDoors = null;
    this.backDoors = null;
    this.name = name;
    this.instance = new THREE.Scene();
    console.log(this.name);
    this.frontBackground = backgroundLoader(this.name, true);
    this.backBackground = backgroundLoader(this.name, false);
    this.frontBackground.position.set(0, 0, -interfaceContent.sceneDeepness);
    this.backBackground.position.set(0, 0, interfaceContent.sceneDeepness);
    this.backBackground.rotation.y = Math.PI;
    this.instance.add(this.frontBackground);
    this.instance.add(this.backBackground);

    // character1
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 6, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    plane.position.set(-1, -1, -interfaceContent.sceneDeepness / 2);
    plane.lookAt(0, 0, 0);
    this.instance.add(plane);

    if (this.data.doors) {
      if (this.data.doors.front) this.loadDoors(true);
      if (this.data.doors.back) this.loadDoors(false);
    }
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
          this.frontDoors = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );
          console.log("load frontdoors", this.frontDoors);
        } else {
          this.backDoors = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );
          console.log("load backdoors", this.backDoors);
        }
      }
    };
    image.onerror = (err) => {
      console.error(
        `Failed to load ${isFront ? "front" : "back"} door image`,
        err,
      );
    };
  }

  public checkDoor(): string | null {
    if (!this.data) return null;
    // translate mouse position between 0 and 1
    const normalizedPos = {
      x: Math.round(
        ((playerState.mouse.target.x +
          (window.innerHeight - window.innerWidth) / 2) /
          window.innerHeight) *
          interfaceContent.doorMapSize,
      ),
      y: Math.round(
        (playerState.mouse.target.y / window.innerHeight) *
          interfaceContent.doorMapSize,
      ),
    };
    if (
      normalizedPos.x < 0 ||
      normalizedPos.x > interfaceContent.doorMapSize ||
      normalizedPos.y < 0 ||
      normalizedPos.y > interfaceContent.doorMapSize
    ) {
      return null;
    } else {
      if (playerState.isLookingFront && this.frontDoors) {
        const rgb = getPixelColor(
          this.frontDoors,
          normalizedPos.x,
          normalizedPos.y,
        );
        if (this.data.doors?.front?.[rgbToHex(rgb)]) {
          // console.log(rgbToHex(rgb));
          return this.data.doors.front[rgbToHex(rgb)];
        }
      } else if (!playerState.isLookingFront && this.backDoors) {
        const rgb = getPixelColor(
          this.backDoors,
          normalizedPos.x,
          normalizedPos.y,
        );
        console.log(rgbToHex(rgb));
        if (this.data.doors?.back?.[rgbToHex(rgb)]) {
          return this.data.doors.back[rgbToHex(rgb)];
        }
      }
      // console.log(normalizedPos);
      return null;
    }
  }
}
export default Scene;
