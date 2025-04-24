import * as THREE from 'three';

const raycast = (
    camera: THREE.Camera, scene: THREE.Scene) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    return raycaster.intersectObjects(scene.children);
}

export default raycast;
