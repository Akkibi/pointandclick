import * as THREE from "three";

const loadImage = (
    url: string,
    // onLoad: (texture: THREE.Texture) => void,
): Promise<THREE.Texture> => {
    return new Promise<THREE.Texture>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
            url,
            (texture: THREE.Texture) => {
                // onLoad(texture);
                resolve(texture);
            },
            undefined,
            (err) => {
                console.error(`Error loading texture from ${url}`, err);
                reject(err);
            },
        );
    });
};

export default loadImage;
