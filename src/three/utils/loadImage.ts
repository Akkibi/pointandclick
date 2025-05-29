import * as THREE from "three";

const loadImage = (
  url: string,
  onLoad: (texture: THREE.Texture) => void,
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (texture: THREE.Texture) => {
        onLoad(texture);
        resolve();
      },
      undefined,
      (err) => {
        console.error(`Error loading texture from ${url}`, err);
        reject(err);
      },
    );
  });
}

export default loadImage;
