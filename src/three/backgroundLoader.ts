import * as THREE from "three";

export const backgroundLoader = (sceneName: string, isFront: boolean) => {
  // Texture Loader
  const textureLoader = new THREE.TextureLoader();

  // Load textures
  const albedoMap = textureLoader.load(
    `/scenes/${sceneName}/${isFront ? "front" : "back"}-albedo.jpg`,
  );
  const depthMap = textureLoader.load(
    `/scenes/${sceneName}/${isFront ? "front" : "back"}-depth.jpg`,
  );
  // console.log(sceneName, albedoMap);
  const vertexShader = `
        uniform sampler2D depthMap; // Depth map texture
        varying vec2 vUv;
        void main() {
          vUv = uv;

          // Sample the depth map at the current UV coordinate
          vec4 depthColor = texture2D(depthMap, vUv);

          // Convert the depth color (grayscale) to a depth value
          float depth = depthColor.r; // Assuming depth map is grayscale (r = g = b)

          // Adjust the vertex position along the Z-axis based on the depth value
          vec3 displacedPosition = position + normal * depth * 30.0;

          // Transform the vertex position
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
        }
      `;

  const fragmentShader = `
      uniform sampler2D albedoMap;
      uniform sampler2D depthMap;
      varying vec2 vUv;
      void main() {
        vec4 albedo = texture2D(albedoMap, vUv);
        gl_FragColor = vec4(albedo.rgb, 1.0);
      }
    `;

  const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
      albedoMap: { value: albedoMap },
      depthMap: { value: depthMap },
    },
    vertexShader,
    fragmentShader,
  });

  // Geometry
  const geometry = new THREE.PlaneGeometry(15, 10, 128, 128);
  const plane = new THREE.Mesh(geometry, customMaterial);
  plane.name = "background";

  return plane;
};
