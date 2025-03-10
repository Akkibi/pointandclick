import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { backgroundLoader } from "./backgroundLoader";
import { global } from "../global";
import gsap from "gsap";
import { updateMouseSmooth } from "./utils/updateMouseSmooth";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      13,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const cameraGroup = new THREE.Group();
    camera.position.z = 50;
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry
    const cube = backgroundLoader();
    scene.add(cube);
    console.log(cube);

    // Animation loop
    // const animate = () => {
    //   requestAnimationFrame(animate);

    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;

    //   renderer.render(scene, camera);
    // };

    // animate();
    renderer.render(scene, camera);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Handle mouse move for paralax effect
    const handleMouseMove = (event: MouseEvent) => {
      global.mouse.target.x = event.clientX;
      global.mouse.target.y = event.clientY;
    };

    const render = () => {
      if (global.isMenuOpen) return;
      renderer.render(scene, camera);
    };

    const updateParalax = () => {
      if (global.isMenuOpen) return;
      updateMouseSmooth(10);
      gsap.set(cameraGroup.rotation, {
        x: (global.mouse.current.y / window.innerHeight - 0.5) / 12,
        y: (global.mouse.current.x / window.innerWidth - 0.5) / 12,
      });
    };

    gsap.ticker.add(updateParalax);
    gsap.ticker.add(render);
    gsap.ticker.fps(30);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="three-scene" className="" ref={mountRef}></div>;
};

export default ThreeScene;
